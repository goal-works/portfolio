import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const defaultSiteUrl = "https://goal-works.github.io";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;

let siteUrl;
try {
  siteUrl = new URL(configuredSiteUrl);
} catch {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL");
}

if (
  siteUrl.protocol !== "https:" ||
  siteUrl.username ||
  siteUrl.password ||
  siteUrl.pathname !== "/" ||
  siteUrl.search ||
  siteUrl.hash
) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin without credentials, path, query, or fragment");
}

const nextCli = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const exitCode = await new Promise((resolve, reject) => {
  const build = spawn(process.execPath, [nextCli, "build", "--webpack"], {
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL: siteUrl.origin,
      PORTFOLIO_STATIC_EXPORT: "true",
    },
    stdio: "inherit",
  });

  build.once("error", reject);
  build.once("exit", (code) => resolve(code));
});

if (exitCode !== 0) {
  throw new Error(`Static export build failed with exit code ${exitCode ?? "unknown"}`);
}

await import("./prepare-pages.mjs");
