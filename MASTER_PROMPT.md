# Kazuki (James) Portfolio — Codex Master Prompt

You are implementing the professional portfolio of Kazuki (English name: James), an AI-focused software engineer with about a decade of experience across web development, AI, mobile, and blockchain technologies. His current specialization is AI evaluation, benchmark engineering, agentic systems, and reliable AI software.

## Mission
Build a polished, technically credible personal portfolio that presents James as a senior software engineer working at the intersection of AI evaluation and production software engineering.

The portfolio must not feel like a generic developer template, resume dump, or collection of tutorial projects. It should feel like a restrained technical editorial site backed by real, working public engineering projects.

## Read Before Editing
Before making changes:
1. Read every Markdown specification in this package.
2. Inspect the existing repository and identify its framework, versions, conventions, linting, tests, and current design decisions.
3. Preserve useful existing work unless it conflicts with this specification.
4. Build a concise implementation checklist.
5. Work phase by phase and validate each phase before continuing.

## Authoritative Documents
- `PRODUCT_REQUIREMENTS.md`
- `DESIGN_SYSTEM.md`
- `SITE_ARCHITECTURE.md`
- `CONTENT.md`
- `PROJECTS.md`
- `RESPONSIVE_REQUIREMENTS.md`
- `ACCESSIBILITY.md`
- `SEO.md`
- `TESTING.md`
- `ACCEPTANCE_CRITERIA.md`
- `projects/EVALFORGE_SPEC.md`
- `projects/AGENTSCOPE_SPEC.md`
- `projects/ESTATEAI_SPEC.md`
- `projects/LAUNCHKIT_SPEC.md`
- `implementation/BUILD_ORDER.md`
- `implementation/COMPONENT_MAP.md`
- `implementation/DATA_MODEL.md`
- `implementation/CODEX_INSTRUCTIONS.md`

If requirements conflict, use this priority order:
1. User-provided facts and confidentiality constraints
2. MASTER_PROMPT.md
3. ACCEPTANCE_CRITERIA.md
4. Product/project specs
5. Design and implementation specs

## Public Identity
Use:
- Full display identity: `Kazuki (James)`
- Compact brand/logo: `JAMES.`
- Primary title: `AI-Focused Software Engineer`

Primary positioning line:
> I build intelligent products—and systems that evaluate intelligence.

## Professional Facts — Do Not Invent Beyond These
Known safe facts:
- Name: Kazuki
- English name: James
- AI-focused software engineer
- About a decade of engineering experience
- Experience spans web, AI, mobile, and blockchain technologies
- Has worked on private SaaS and real-estate software
- Current work includes AI evaluation projects aimed at improving AI performance
- Much professional work is private and cannot be publicly linked

Never invent:
- surname
- employer or client names
- exact employment dates
- degrees or schools
- location
- revenue/user metrics
- project outcomes
- awards
- certifications
- proprietary benchmark content
- production URLs

Use placeholders or omit unknown personal data rather than guessing.

## Portfolio Narrative
The portfolio should tell this story:

Broad software engineering experience
→ AI engineering and intelligent products
→ current specialization in AI evaluation and agent reliability
→ public proof through serious engineering projects

Flagship projects:
1. EvalForge — AI evaluation infrastructure
2. AgentScope — AI agent observability
3. EstateAI — AI real-estate intelligence
4. LaunchKit AI — production multi-tenant SaaS infrastructure

Secondary projects:
5. ChainLens — blockchain intelligence explorer
6. PocketAI — multimodal mobile AI workspace

Do not present incomplete projects as completed. Use `In Development` when appropriate.

## Preferred Portfolio Stack
Use the existing project stack if already appropriate. For a new portfolio, prefer:
- Next.js (current stable major supported by the environment)
- TypeScript with strict mode
- Tailwind CSS
- Motion / Framer Motion only where useful
- MDX or an equally maintainable local content system
- Zod where runtime validation is needed
- Lucide for lightweight icons
- Vercel-compatible deployment

Do not add a CMS for V1.
Do not add a backend unless a real feature requires it.

## Product Quality
The site must be:
- technically editorial
- dark-first
- restrained
- highly readable
- responsive
- accessible
- fast
- evidence-led
- consistent

Avoid:
- skill percentage bars
- proficiency circles
- animated particle backgrounds
- typing animations
- cursor trails
- giant framework logo clouds
- excessive gradients
- glassmorphism
- 3D card tilt
- fake testimonials
- fake client logos
- fake metrics
- empty blog sections

## Working Behavior
Operate as a senior implementation agent:
- use existing conventions where sound
- prefer the smallest coherent implementation
- avoid unnecessary dependencies
- do not rewrite unrelated code
- do not replace working features with placeholders
- do not silently change approved copy
- validate every major phase
- state clearly what was and was not validated

## Destructive Operations
Do not:
- force push
- rewrite Git history
- delete unknown files
- drop databases containing non-seed data
- overwrite `.env` files
- remove working functionality merely because it appears unused

## Definition of Done
A phase is complete only when:
- required implementation exists
- stated requirements are satisfied
- relevant linting passes
- type checking passes
- tests relevant to the change pass
- production build passes
- responsive behavior is verified
- accessibility implications are handled
- documentation is updated when needed

## Session Completion Report
At the end of each substantial Codex work session, report:

### Completed
- ...

### Changed
- ...

### Validation
- lint: pass/fail/not run
- typecheck: pass/fail/not run
- tests: pass/fail/not run
- build: pass/fail/not run

### Not validated
- ...

### Remaining
- ...

### Risks / decisions
- ...
