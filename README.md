# Kazuki (James) Portfolio

Technical editorial portfolio for Kazuki (James), an AI-focused software engineer specializing in AI evaluation, agentic systems, and production software engineering.

## Current status

Stage 9 is complete. The portfolio now presents three locally validated V1 implementations—EvalForge, AgentScope, and EstateAI—with captured product evidence, architecture visuals, implementation decisions, tradeoffs, and exact validation claims. LaunchKit AI remains clearly labeled as an implementation blueprint, while ChainLens and PocketAI remain smaller planned concepts.

The site also includes automated accessibility coverage, responsive regression tests, a branded 404, crawler routes, canonical-safe metadata, truthful generated social previews, accurate Person structured data, optimized project imagery, security headers, visible keyboard focus, and reduced-motion support.

## Flagship work

- **EvalForge** — reproducible AI benchmark authoring, asynchronous evaluation, configurable scoring, and failure analysis.
- **AgentScope** — dependency-free agent tracing, hierarchical execution evidence, deterministic diagnostics, and trace comparison.
- **EstateAI** — synthetic property discovery, deterministic financial modeling, persisted scenarios, structured briefs, and comparison.
- **LaunchKit AI** — a documented multi-tenant SaaS architecture blueprint; implementation evidence remains pending.

The three implemented products live in independent local repositories and are intentionally excluded from this portfolio repository. Their validated screenshots and factual case studies are included here.

## Local development

Requirements:

- Node.js 22.13 or newer
- npm 10 or newer

Install and run:

```bash
npm ci
npm run dev
```

The development site is available at `http://localhost:3000`.

## Metadata configuration

Set `NEXT_PUBLIC_SITE_URL` only after a real deployment URL is available. Until then, the site intentionally omits absolute canonical and social-image URLs and emits an empty sitemap rather than publishing an invented domain. Once configured, the same verified URL populates canonical links, sitemap entries, and social-preview metadata.

```bash
cp .env.example .env.local
```

## Validation

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Run the code and production-build gate with `npm run validate`, then run the browser
suite separately with `npm run test:e2e`.

The current portfolio browser suite contains 33 tests covering primary content routes,
responsive layouts, keyboard navigation, accessibility, SEO endpoints, security headers,
and honest evidence states.

The production script uses Next.js's supported Webpack builder because the managed
development environment does not permit Turbopack's internal PostCSS IPC port. The
build also uses Next's compiler-API type checker; the standalone `npm run typecheck`
command remains part of every validation run.

## Specifications

`MASTER_PROMPT.md` is the primary implementation brief. The supporting product, design, content, accessibility, responsive, SEO, testing, project, and implementation documents remain authoritative according to the priority order stated there.
