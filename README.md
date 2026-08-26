# Kazuki (James) Portfolio

Technical editorial portfolio for Kazuki (James), an AI-focused software engineer specializing in AI evaluation, agentic systems, and production software engineering.

## Current status

The launch implementation is complete and published at **[goal-works.github.io](https://goal-works.github.io/)**. The portfolio presents four validated V1 implementations—EvalForge, AgentScope, EstateAI, and LaunchKit AI—with captured product evidence, architecture visuals, implementation decisions, tradeoffs, and exact validation claims. ChainLens and PocketAI remain smaller planned concepts.

The site also includes automated accessibility coverage, responsive regression tests, a branded 404, crawler routes, canonical-safe metadata, truthful generated social previews, accurate Person structured data, optimized project imagery, security headers, visible keyboard focus, and reduced-motion support.

## Flagship work

- **[EvalForge](https://github.com/goal-works/evalforge)** — reproducible AI benchmark authoring, asynchronous evaluation, configurable scoring, and failure analysis.
- **[AgentScope](https://github.com/goal-works/agentscope)** — dependency-free agent tracing, hierarchical execution evidence, deterministic diagnostics, and trace comparison.
- **[EstateAI](https://github.com/goal-works/estate-ai)** — synthetic property discovery, deterministic financial modeling, persisted scenarios, structured briefs, and comparison.
- **[LaunchKit AI](https://github.com/goal-works/launchkit-ai)** — tenant-aware SaaS control-plane infrastructure with server-enforced roles, one-time secrets, metering, audit evidence, and signed webhook jobs.

The four implemented products live in independent public repositories and are intentionally excluded from this portfolio repository. Their validated screenshots and factual case studies are included here.

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

Local builds intentionally omit canonical and social-image URLs unless `NEXT_PUBLIC_SITE_URL` is configured. Static exports default to the current `https://goal-works.github.io` production origin and accept an explicit HTTPS origin for a controlled custom host. This populates canonical links, sitemap entries, structured data, and social-preview metadata with the real deployment URL.

```bash
cp .env.example .env.local
```

## Deployment

The canonical site is published from the generated [`goal-works.github.io`](https://github.com/goal-works/goal-works.github.io) repository. Build and verify the exact static artifact with:

```bash
npm run build:pages
npm run verify:pages
```

For a custom production host, build and verify the artifact against that exact origin:

```bash
NEXT_PUBLIC_SITE_URL=https://goal.works.com npm run build:pages
PORTFOLIO_EXPECTED_SITE_URL=https://goal.works.com npm run verify:pages
PORTFOLIO_VERIFY_URL=https://goal.works.com npm run verify:secure-live
```

Do not switch the canonical origin or GitHub Pages custom-domain setting until the
hostname resolves from public DNS and the configurable host serves the validated export.

After publication, verify the real HTTPS deployment with:

```bash
npm run verify:live
```

The export includes `.nojekyll` so GitHub Pages serves Next.js `_next` assets correctly. It also embeds a restrictive content-security policy and referrer policy in the HTML. GitHub Pages enforces HTTPS and HSTS, but it does not provide repository-level custom response headers; headers such as `frame-ancestors` and `X-Content-Type-Options` would require a host or reverse proxy with header configuration.

The export also includes a validated `_headers` policy for static hosts such as Cloudflare
Pages or Netlify. It adds clickjacking, content-type, permissions, referrer, transport,
and CSP response protections. After connecting a configurable host, verify the real
responses with:

```bash
PORTFOLIO_VERIFY_URL=https://your-owned-host.example npm run verify:secure-live
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

The live homepage was measured on August 26, 2026 with Lighthouse 12.8.2: 97
performance, 100 accessibility, 100 best practices, and 100 SEO. Project screenshots
are served as WebP assets; the optimized set is 54% smaller than its PNG sources.

The production script uses Next.js's supported Webpack builder because the managed
development environment does not permit Turbopack's internal PostCSS IPC port. The
build also uses Next's compiler-API type checker; the standalone `npm run typecheck`
command remains part of every validation run.

## Specifications

`MASTER_PROMPT.md` is the primary implementation brief. The supporting product, design, content, accessibility, responsive, SEO, testing, project, and implementation documents remain authoritative according to the priority order stated there.
