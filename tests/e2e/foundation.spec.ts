import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const viewports = [375, 430, 768, 1024, 1440, 1920] as const;

for (const width of viewports) {
  test(`homepage fits a ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: width >= 1440 ? 1080 : 900 });
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const layout = await page.evaluate(() => {
      const heading = document.querySelector("h1")?.getBoundingClientRect();

      return {
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        headingLeft: heading?.left,
        headingRight: heading?.right,
      };
    });

    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
    expect(layout.headingLeft).toBeGreaterThanOrEqual(0);
    expect(layout.headingRight).toBeLessThanOrEqual(width);
  });
}

test("Stage 2 sections and flagship projects render in the required order", async ({
  page,
}) => {
  await page.goto("/");

  const sectionIds = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => section.id),
  );

  expect(sectionIds).toEqual([
    "",
    "selected-work",
    "ai-evaluation",
    "expertise",
    "professional-work",
    "about-preview",
    "technology",
    "contact",
  ]);

  await expect(page.locator("#selected-work article")).toHaveCount(4);
  for (const title of ["EvalForge", "AgentScope", "EstateAI", "LaunchKit AI"]) {
    const project = page.locator("#selected-work article").filter({ hasText: title });
    await expect(project).toContainText("Validated V1 · product evidence available");
    await expect(project.getByRole("link", { name: "View case study" })).toBeVisible();
  }
});

test("work index lists every flagship blueprint in order", async ({ page }) => {
  await page.goto("/work");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Selected Work");
  const articles = page.locator("main > section").nth(1).locator("article");
  await expect(articles).toHaveCount(4);
  await expect(articles.locator("h2")).toHaveText([
    "EvalForge",
    "AgentScope",
    "EstateAI",
    "LaunchKit AI",
  ]);
  await expect(page.getByText("In Development", { exact: true })).toHaveCount(4);
  await expect(page.getByRole("link", { name: "View blueprint" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "View case study" })).toHaveCount(4);
  await expect(page).toHaveTitle("Work | James");
});

test("work archive keeps secondary concepts smaller and unlinked", async ({ page }) => {
  await page.goto("/work");

  const secondarySection = page.locator("main > section").nth(2);
  await expect(
    secondarySection.getByRole("heading", { level: 2, name: "Early product concepts" }),
  ).toBeVisible();

  const concepts = secondarySection.locator("article");
  await expect(concepts).toHaveCount(2);
  await expect(concepts.locator("h3")).toHaveText(["ChainLens", "PocketAI"]);
  await expect(secondarySection.getByText("Planned", { exact: true })).toHaveCount(2);
  await expect(secondarySection.locator("a")).toHaveCount(0);
  await expect(secondarySection).toContainText(
    "No public case study or implementation evidence",
  );
});

const projectRoutes = [
  ["evalforge", "EvalForge", "AgentScope"],
  ["agentscope", "AgentScope", "EstateAI"],
  ["estate-ai", "EstateAI", "LaunchKit AI"],
  ["launchkit-ai", "LaunchKit AI", "EvalForge"],
] as const;

for (const [slug, title, nextTitle] of projectRoutes) {
  test(`${title} case study is statically accessible and honest`, async ({ page }) => {
    const response = await page.goto(`/work/${slug}`);

    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(page.locator("main > section")).toHaveCount(12);

    await expect(page.getByText("Validated implementation", { exact: true })).toBeVisible();
    await expect(page.getByText("In Development", { exact: true })).toHaveCount(2);
    const visualCount = slug === "estate-ai" || slug === "launchkit-ai" ? 5 : 4;
    await expect(page.getByText(`${visualCount} validated visuals`, { exact: true })).toBeVisible();
    await expect(page.getByText("Evidence pending", { exact: true })).toHaveCount(0);

    await expect(page.locator('a[href^="http"]')).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Next project" })).toContainText(
      nextTitle,
    );
    await expect(page).toHaveTitle(new RegExp(`^${title} — .+ \\| James$`));
  });
}

for (const width of [375, 768, 1440] as const) {
  for (const route of ["/work", "/work/evalforge", "/about"] as const) {
    test(`${route} fits a ${width}px viewport`, async ({ page }) => {
      await page.setViewportSize({ width, height: width === 1440 ? 1080 : 900 });
      await page.goto(route);

      const layout = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
    });
  }
}

test("About page renders the approved narrative and focus areas", async ({ page }) => {
  const response = await page.goto("/about");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("About | James");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A software engineer focused on intelligent systems.",
  );
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "From building software to evaluating intelligence",
    }),
  ).toBeVisible();
  await expect(page.getByText("How do we build powerful AI systems—")).toBeVisible();
  await expect(page.locator("main ol li")).toHaveCount(5);
  await expect(page.locator("main ul li")).toHaveCount(8);
  await expect(page.locator('a[href^="http"], a[href^="mailto:"]')).toHaveCount(0);
});

test("all public content routes have valid heading structure and no Axe violations", async ({
  page,
}) => {
  const routes = [
    "/",
    "/work",
    "/about",
    "/work/evalforge",
    "/work/agentscope",
    "/work/estate-ai",
    "/work/launchkit-ai",
  ];

  for (const route of routes) {
    await page.goto(route);

    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);

    const levels = await page
      .locator("main h1, main h2, main h3, main h4, main h5, main h6")
      .evaluateAll((headings) =>
        headings.map((heading) => Number(heading.tagName.slice(1))),
      );

    expect(levels[0]).toBe(1);
    for (let index = 1; index < levels.length; index += 1) {
      expect(levels[index]).toBeLessThanOrEqual((levels[index - 1] ?? 1) + 1);
    }

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, `${route} accessibility violations`).toEqual([]);
  }
});

test("SEO endpoints, structured data, and generated social images are valid", async ({
  page,
  request,
}) => {
  await page.goto("/");

  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(structuredData ?? "{}")).toMatchObject({
    "@type": "Person",
    name: "Kazuki (James)",
    jobTitle: "AI-Focused Software Engineer",
  });
  expect(JSON.parse(structuredData ?? "{}")).not.toHaveProperty("sameAs");
  expect(JSON.parse(structuredData ?? "{}")).not.toHaveProperty("url");

  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(0);

  const [openGraph, twitter, robots, sitemap] = await Promise.all([
    request.get("/og/home"),
    request.get("/og/home"),
    request.get("/robots.txt"),
    request.get("/sitemap.xml"),
  ]);

  expect(openGraph.ok()).toBe(true);
  expect(openGraph.headers()["content-type"]).toContain("image/png");
  expect(twitter.ok()).toBe(true);
  expect(twitter.headers()["content-type"]).toContain("image/png");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("Allow: /");
  expect(sitemap.ok()).toBe(true);
  expect(sitemap.headers()["content-type"]).toContain("application/xml");

  await page.goto("/work/evalforge");
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(0);
  const projectImage = await request.get("/og/evalforge");
  expect(projectImage.ok()).toBe(true);
  expect(projectImage.headers()["content-type"]).toContain("image/png");
});

test("desktop keyboard order and focus indicators remain visible", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Kazuki (James), home" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" })).toBeFocused();

  const focusStyle = await page.evaluate(() => {
    const element = document.activeElement;
    return element ? getComputedStyle(element).outlineStyle : "none";
  });
  expect(focusStyle).not.toBe("none");
});

test("custom 404 is branded, keyboard reachable, and functional", async ({ page }) => {
  const response = await page.goto("/missing-stage-five-route");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "This route doesn't exist.",
  );
  await expect(page.getByRole("link", { name: "Home", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Work" }).last()).toBeVisible();
});

test("production responses include the configured security headers", async ({ request }) => {
  const response = await request.get("/");

  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-frame-options"]).toBe("DENY");
  expect(response.headers()["referrer-policy"]).toBe(
    "strict-origin-when-cross-origin",
  );
  expect(response.headers()["permissions-policy"]).toBe(
    "camera=(), microphone=(), geolocation=()",
  );
});

test("hero and approved positioning content are visible", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "I build intelligent products—and systems that evaluate intelligence.",
  );
  await expect(page.getByText("AI systems need more than demos.")).toBeVisible();
  await expect(page.getByText("I'm Kazuki—James in English.")).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
});

test("metadata uses approved content without an invented canonical URL", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Kazuki (James) — AI-Focused Software Engineer");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /specializing in AI evaluation/,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Kazuki (James) — AI-Focused Software Engineer",
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test("mobile navigation opens and closes from the keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/");

  const menuButton = page.getByRole("button", { name: "Open navigation menu" });
  await menuButton.focus();
  await page.keyboard.press("Enter");

  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Close navigation menu" }),
  ).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Work" }),
  ).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("skip link and reduced-motion preference are honored", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();

  const scrollBehavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  expect(scrollBehavior).toBe("auto");
});

test("unknown routes return a real 404 response", async ({ page }) => {
  const response = await page.goto("/not-a-real-route");

  expect(response?.status()).toBe(404);

  const projectResponse = await page.goto("/work/not-a-project");
  expect(projectResponse?.status()).toBe(404);

  const secondaryResponse = await page.goto("/work/chainlens");
  expect(secondaryResponse?.status()).toBe(404);
});
