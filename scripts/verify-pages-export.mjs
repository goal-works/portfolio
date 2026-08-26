import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "@playwright/test";

const outputDirectory = path.resolve(fileURLToPath(new URL("../out/", import.meta.url)));
const requiredFiles = [
  ".nojekyll",
  "404.html",
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "og/home",
  "work/evalforge/index.html",
];

await Promise.all(
  requiredFiles.map((file) => access(path.join(outputDirectory, file))),
);

const contentTypes = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".woff2", "font/woff2"],
  [".xml", "application/xml; charset=utf-8"],
]);

function resolveRequest(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const relativePath = decodedPath.replace(/^\/+/, "");
  const candidates = decodedPath.endsWith("/")
    ? [path.join(relativePath, "index.html")]
    : path.extname(decodedPath) || decodedPath.startsWith("/og/")
      ? [relativePath]
      : [path.join(relativePath, "index.html"), relativePath];

  return candidates.map((candidate) => path.resolve(outputDirectory, candidate));
}

async function findFile(pathname) {
  for (const candidate of resolveRequest(pathname)) {
    if (!candidate.startsWith(`${outputDirectory}${path.sep}`)) continue;
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Try the next static-export path shape.
    }
  }
  return undefined;
}

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
  const file = await findFile(pathname);

  if (!file) {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    createReadStream(path.join(outputDirectory, "404.html")).pipe(response);
    return;
  }

  const contentType = pathname.startsWith("/og/")
    ? "image/png"
    : contentTypes.get(path.extname(file)) ?? "application/octet-stream";
  response.writeHead(200, { "Content-Type": contentType });
  createReadStream(file).pipe(response);
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});

const address = server.address();
if (!address || typeof address === "string") throw new Error("Static server did not start");
const baseUrl = `http://127.0.0.1:${address.port}`;
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ viewport: { width: 375, height: 900 } });
  const failedResources = [];
  page.on("response", (response) => {
    if (response.url().startsWith(baseUrl) && response.status() >= 400) {
      failedResources.push(`${response.status()} ${response.url()}`);
    }
  });

  const routes = [
    ["/", "https://goal-works.github.io/"],
    ["/work/", "https://goal-works.github.io/work/"],
    ["/about/", "https://goal-works.github.io/about/"],
    ["/work/evalforge/", "https://goal-works.github.io/work/evalforge/"],
    ["/work/agentscope/", "https://goal-works.github.io/work/agentscope/"],
    ["/work/estate-ai/", "https://goal-works.github.io/work/estate-ai/"],
    ["/work/launchkit-ai/", "https://goal-works.github.io/work/launchkit-ai/"],
  ];

  for (const [route, canonical] of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    if (response?.status() !== 200) throw new Error(`${route} returned ${response?.status()}`);
    if ((await page.locator("h1").count()) !== 1) throw new Error(`${route} needs one h1`);
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute("href");
    if (canonicalHref !== canonical) {
      throw new Error(`${route} canonical was ${canonicalHref ?? "missing"}`);
    }
  }

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const layout = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  if (layout.scrollWidth > layout.clientWidth) throw new Error("Mobile homepage overflows");

  const socialImage = await page.locator('meta[property="og:image"]').getAttribute("content");
  if (socialImage !== "https://goal-works.github.io/og/home") {
    throw new Error(`Unexpected social image URL: ${socialImage ?? "missing"}`);
  }

  await page.getByRole("link", { name: "View case study" }).first().click();
  await page.waitForURL(`${baseUrl}/work/evalforge/`);
  if (failedResources.length > 0) {
    throw new Error(`Static resources failed:\n${failedResources.join("\n")}`);
  }
} finally {
  await browser.close();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
}

console.log("GitHub Pages export verified");
