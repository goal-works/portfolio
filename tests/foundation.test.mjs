import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function source(path) {
  return readFile(new URL(`../${path}`, import.meta.url), "utf8");
}

test("TypeScript is configured in strict mode", async () => {
  const config = JSON.parse(await source("tsconfig.json"));

  assert.equal(config.compilerOptions.strict, true);
  assert.equal(config.compilerOptions.noUncheckedIndexedAccess, true);
  assert.equal(config.compilerOptions.allowJs, false);
});

test("the root shell exposes an accessible content target", async () => {
  const [layout, page] = await Promise.all([
    source("app/layout.tsx"),
    source("app/page.tsx"),
  ]);

  assert.match(layout, /href="#main-content"/);
  assert.match(page, /<main id="main-content"/);
  assert.match(layout, /<Header \/>/);
  assert.match(layout, /<Footer \/>/);
});

test("baseline metadata uses approved identity and does not guess a domain", async () => {
  const [layout, siteUrl] = await Promise.all([
    source("app/layout.tsx"),
    source("lib/site-url.ts"),
  ]);

  assert.match(layout, /Kazuki \(James\) — AI-Focused Software Engineer/);
  assert.match(layout, /getSiteUrl/);
  assert.match(siteUrl, /process\.env\.NEXT_PUBLIC_SITE_URL/);
  assert.doesNotMatch(siteUrl, /https?:\/\/[\w.-]+/);
});

test("static exports accept only an explicit secure production origin", async () => {
  const [packageJson, buildScript, verifier] = await Promise.all([
    source("package.json"),
    source("scripts/build-static-export.mjs"),
    source("scripts/verify-pages-export.mjs"),
  ]);

  assert.doesNotMatch(packageJson, /NEXT_PUBLIC_SITE_URL=https:\/\//);
  assert.match(buildScript, /process\.env\.NEXT_PUBLIC_SITE_URL/);
  assert.match(buildScript, /siteUrl\.protocol !== "https:"/);
  assert.match(buildScript, /siteUrl\.pathname !== "\/"/);
  assert.match(verifier, /process\.env\.PORTFOLIO_EXPECTED_SITE_URL/);
});

test("primary navigation includes the specified destinations", async () => {
  const header = await source("components/layout/header.tsx");

  assert.match(header, /href: "\/work"/);
  assert.match(header, /href: "\/about"/);
  assert.match(header, /href: "\/#contact"/);
  assert.match(header, /aria-label="Primary"/);
});

test("contact uses the user-verified email address", async () => {
  const contact = await source("components/home/contact.tsx");

  assert.match(contact, /mailto:goal\.works\.box@gmail\.com/);
  assert.doesNotMatch(contact, /Contact channels will be added/);
});

test("design tokens and reduced-motion handling are present", async () => {
  const styles = await source("app/globals.css");

  assert.match(styles, /--portfolio-accent: #b8ff5a/);
  assert.match(styles, /prefers-reduced-motion: reduce/);
  assert.match(styles, /:focus-visible/);
});

test("Stage 2 homepage sections are composed in the required order", async () => {
  const page = await source("app/page.tsx");
  const sections = [
    "<Hero />",
    "<SelectedWork />",
    "<AiEvaluation />",
    "<Expertise />",
    "<ProfessionalWork />",
    "<AboutPreview />",
    "<Technology />",
    "<Contact />",
  ];

  let previousIndex = -1;
  for (const section of sections) {
    const index = page.indexOf(section);
    assert.ok(index > previousIndex, `${section} is present in the correct order`);
    previousIndex = index;
  }
});

test("flagship project evidence remains factual", async () => {
  const projects = await source("data/projects.ts");

  assert.equal((projects.match(/status: "building"/g) ?? []).length, 4);
  assert.equal((projects.match(/featured: true/g) ?? []).length, 4);
  assert.equal((projects.match(/repository: "https:\/\/github\.com\/goal-works\//g) ?? []).length, 4);
  assert.doesNotMatch(projects, /demo:/);
  assert.match(projects, /slug: "evalforge"[\s\S]*year: "2026"/);
  assert.match(projects, /cover: "\/projects\/evalforge\/dashboard\.webp"/);
  assert.match(projects, /cover: "\/projects\/agentscope\/overview\.webp"/);
  assert.match(projects, /cover: "\/projects\/estate-ai\/discovery\.webp"/);
  assert.match(projects, /cover: "\/projects\/launchkit-ai\/dashboard\.webp"/);
  assert.equal((projects.match(/year: "/g) ?? []).length, 4);
});

test("Stage 3 defines one structured case study for every flagship project", async () => {
  const caseStudies = await source("data/case-studies.ts");

  for (const slug of ["evalforge", "agentscope", "estate-ai", "launchkit-ai"]) {
    assert.match(caseStudies, new RegExp(`slug: "${slug}"`));
  }

  assert.equal((caseStudies.match(/slug: "/g) ?? []).length, 4);
  assert.equal((caseStudies.match(/currently in development/g) ?? []).length, 0);
  assert.match(caseStudies, /21 backend tests cover evaluator behavior/);
  assert.match(caseStudies, /Playwright validates benchmark creation/);
  assert.match(caseStudies, /14 backend and SDK tests cover ingestion validation/);
  assert.match(caseStudies, /Nine Playwright tests validate the primary workflows/);
  assert.match(caseStudies, /15 backend tests cover finance formulas/);
  assert.match(caseStudies, /15 Playwright tests validate discovery through comparison/);
  assert.match(caseStudies, /13 domain tests cover session tampering/);
  assert.match(caseStudies, /20 Playwright tests validate authentication/);
});

test("the project route is statically generated from centralized metadata", async () => {
  const projectPage = await source("app/work/[slug]/page.tsx");

  assert.match(projectPage, /generateStaticParams/);
  assert.match(projectPage, /flagshipProjects\.map/);
  assert.match(projectPage, /generateMetadata/);
  assert.match(projectPage, /getProjectBySlug/);
  assert.match(projectPage, /getCaseStudyBySlug/);
  assert.match(projectPage, /notFound\(\)/);
});

test("case studies follow the required section order and end with the next project", async () => {
  const projectPage = await source("app/work/[slug]/page.tsx");
  const labels = [
    'label="Product preview"',
    'label="Overview"',
    'label="Problem"',
    'label="System architecture"',
    'label="Engineering decisions"',
    'label="Product capabilities"',
    'label="Technical deep dive"',
    'label="Testing and reliability"',
    'label="Screens and gallery"',
    'label="Lessons and tradeoffs"',
    'label="Technology"',
    "<NextProject",
  ];

  let previousIndex = -1;
  for (const label of labels) {
    const index = projectPage.indexOf(label);
    assert.ok(index > previousIndex, `${label} is present in the correct order`);
    previousIndex = index;
  }
});

test("Stage 4 keeps secondary projects planned and separate from flagship work", async () => {
  const projects = await source("data/projects.ts");
  const work = await source("app/work/page.tsx");

  assert.match(projects, /slug: "chainlens"/);
  assert.match(projects, /slug: "pocketai"/);
  assert.equal((projects.match(/status: "concept"/g) ?? []).length, 2);
  assert.equal((projects.match(/featured: false/g) ?? []).length, 2);
  assert.match(work, /secondaryProjects\.map/);
  assert.match(work, /No public case study or implementation evidence/);
});

test("the About page uses the approved narrative and complete principle set", async () => {
  const [about, aboutData] = await Promise.all([
    source("app/about/page.tsx"),
    source("data/about.ts"),
  ]);

  assert.match(about, /A software engineer focused on intelligent systems\./);
  assert.match(about, /From building software to evaluating intelligence/);
  assert.match(about, /How do we build powerful AI systems—and how do we know they/);
  assert.match(about, /AI evaluation and agentic systems/);

  for (const principle of [
    "Understandable",
    "Measurable",
    "Reliable",
    "Maintainable",
    "Useful",
  ]) {
    assert.match(aboutData, new RegExp(`title: "${principle}"`));
  }

  assert.equal((aboutData.match(/title: "/g) ?? []).length, 5);
  assert.doesNotMatch(about, /employer|university|degree|certification/i);
});

test("Stage 5 metadata routes are canonical-safe and cover every public route", async () => {
  const [siteUrl, sitemap, robots, layout] = await Promise.all([
    source("lib/site-url.ts"),
    source("app/sitemap.ts"),
    source("app/robots.ts"),
    source("app/layout.tsx"),
  ]);

  assert.match(siteUrl, /process\.env\.NEXT_PUBLIC_SITE_URL/);
  assert.match(siteUrl, /url\.protocol === "https:"/);
  assert.doesNotMatch(siteUrl, /localhost|example\.com/);
  assert.match(sitemap, /flagshipProjects/);
  assert.match(sitemap, /path: "\/work"/);
  assert.match(sitemap, /path: "\/about"/);
  assert.match(sitemap, /if \(!siteUrl\)/);
  assert.match(robots, /userAgent: "\*"/);
  assert.match(robots, /allow: "\/"/);
  assert.match(layout, /"@type": "Person"/);
  assert.doesNotMatch(layout, /sameAs|worksFor|alumniOf/);
});

test("social images use truthful code-generated metadata", async () => {
  const [homeImage, projectImage] = await Promise.all([
    source("app/og/home/route.ts"),
    source("app/og/[slug]/route.ts"),
  ]);

  for (const image of [homeImage, projectImage]) {
    assert.match(image, /ImageResponse/);
    assert.match(image, /width: 1200/);
    assert.match(image, /height: 630/);
  }

  assert.match(projectImage, /getProjectBySlug/);
  assert.match(projectImage, /Validated implementation/);
  assert.match(projectImage, /Validated V1/);
  assert.match(projectImage, /status: 404/);
});

test("Stage 5 includes a branded 404, optimized images, and security headers", async () => {
  const [notFound, gallery, config, styles] = await Promise.all([
    source("app/not-found.tsx"),
    source("components/project/project-gallery.tsx"),
    source("next.config.ts"),
    source("app/globals.css"),
  ]);

  assert.match(notFound, /This route doesn&apos;t exist\./);
  assert.match(notFound, /href="\/work"/);
  assert.match(gallery, /import Image from "next\/image"/);
  assert.match(gallery, /sizes=/);
  assert.match(config, /X-Content-Type-Options/);
  assert.match(config, /X-Frame-Options/);
  assert.match(config, /Permissions-Policy/);
  assert.match(styles, /--portfolio-text-muted: #7f7f7b/);
});
