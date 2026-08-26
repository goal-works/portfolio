export type CaseStudyItem = {
  title: string;
  description: string;
};

export type ArchitectureStep = CaseStudyItem & {
  shortLabel: string;
};

export type CaseStudy = {
  slug: string;
  overview: string;
  problem: string;
  architectureSummary: string;
  architecture: ArchitectureStep[];
  decisions: CaseStudyItem[];
  capabilities: CaseStudyItem[];
  deepDive: {
    title: string;
    summary: string;
    focus: string[];
  };
  reliability: string[];
  tradeoffs: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "evalforge",
    overview:
      "EvalForge is a working V1 evaluation platform for testing AI models and agents against reproducible benchmarks. The local product includes benchmark and task authoring, deterministic mock agents, asynchronous execution, persisted evaluator evidence, failure inspection, multi-run comparison, migrations, and an API-backed analytics interface.",
    problem:
      "AI demonstrations can hide inconsistent behavior, weak instruction following, and failures across repeated attempts. EvalForge makes the task inputs, evaluation criteria, agent configuration, execution history, scoring decisions, and failure evidence inspectable in one workflow.",
    architectureSummary:
      "The implementation separates the Next.js product surface, FastAPI control plane, durable relational state, Redis queue, and Dramatiq execution worker. Local demo mode can execute inline, while the container workflow dispatches persisted runs to the worker.",
    architecture: [
      {
        shortLabel: "Web",
        title: "Next.js application",
        description: "Benchmark, task, agent, run, comparison, and analytics interfaces.",
      },
      {
        shortLabel: "API",
        title: "FastAPI service",
        description: "Validated domain API, run state transitions, and queue dispatch boundary.",
      },
      {
        shortLabel: "State",
        title: "PostgreSQL and Redis",
        description: "Durable run evidence, Alembic-managed schema, and queued background work.",
      },
      {
        shortLabel: "Worker",
        title: "Agent and evaluator execution",
        description: "Atomic run claims, deterministic task attempts, scoring, retries, and aggregation.",
      },
    ],
    decisions: [
      {
        title: "Asynchronous evaluation",
        description:
          "Runs are persisted before dispatch, claimed atomically, retried without duplicate attempts, and moved through explicit queued, running, completed, or failed states.",
      },
      {
        title: "Common evaluator contract",
        description:
          "Exact Match, Contains, JSON Schema, and Deterministic Judge evaluators return a score, pass state, reason, and metadata through one contract.",
      },
      {
        title: "Deterministic demo mode",
        description:
          "Three stable mock-agent profiles and 15 original seeded tasks run the complete workflow without paid model keys.",
      },
    ],
    capabilities: [
      {
        title: "Benchmark authoring",
        description: "Create benchmark suites and edit tasks, JSON inputs, metadata, difficulty, timeouts, and evaluator configuration.",
      },
      {
        title: "Evaluation runs",
        description: "Execute one to five attempts per task with persisted progress, output, tokens, latency, cost, and events.",
      },
      {
        title: "Configurable scoring",
        description: "Combine weighted deterministic evaluators and aggregate mean score, execution verdicts, and simplified pass@k.",
      },
      {
        title: "Failure analysis",
        description: "Inspect evaluator reasons and event timelines, classify failures, and compare two to four runs.",
      },
    ],
    deepDive: {
      title: "Asynchronous evaluation execution and aggregation",
      summary:
        "The implementation persists a queued run, atomically claims it, records each task attempt and event, applies evaluator contracts, and updates durable aggregates. Failed retries clear partial attempts before re-execution, and uniqueness constraints protect task-attempt identity.",
      focus: [
        "Run and task-run state transitions",
        "Retry and idempotency boundaries",
        "Evaluator result persistence",
        "Progress and aggregate consistency",
      ],
    },
    reliability: [
      "21 backend tests cover evaluator behavior, pass@k, aggregation, API validation, persistence, comparison ordering, retries, and duplicate delivery.",
      "Alembic upgrade, schema-drift check, downgrade, and re-upgrade pass against an isolated database.",
      "ESLint, strict TypeScript, and the optimized Next.js production build pass.",
      "Playwright validates benchmark creation through result inspection; Axe reports no serious or critical violations across five primary screens.",
    ],
    tradeoffs: [
      "Polling is acceptable for V1 progress updates.",
      "A maintainable Redis-backed queue is preferred over distributed scheduling complexity.",
      "V1 intentionally excludes enterprise identity, billing, and arbitrary code sandboxing.",
    ],
  },
  {
    slug: "agentscope",
    overview:
      "AgentScope is a working V1 observability and debugging product for AI agents. It combines a dependency-free Python instrumentation SDK, validated trace ingestion, durable hierarchical spans and ordered events, deterministic diagnostics, filtering, timeline inspection, and two-trace comparison over six original synthetic execution scenarios.",
    problem:
      "An agent can return a plausible result while hiding failed tool calls, loops, costly retries, or an unreliable path. AgentScope preserves the ordered evidence needed to understand what happened during execution and makes each diagnostic rule inspectable.",
    architectureSummary:
      "The implementation moves a complete trace document from the lightweight Python SDK through a FastAPI validation boundary. A two-pass ingestion service resolves parent and child spans, persists the graph and metrics, runs explainable diagnostics, and serves a Next.js exploration interface.",
    architecture: [
      {
        shortLabel: "SDK",
        title: "Python instrumentation",
        description: "Dependency-free context managers capture traces, nested spans, ordered events, usage, errors, and final output.",
      },
      {
        shortLabel: "Ingest",
        title: "Trace ingestion API",
        description: "Validated identities, timestamps, graph references, ordering, and idempotent complete-document delivery.",
      },
      {
        shortLabel: "Store",
        title: "PostgreSQL",
        description: "Relational trace, span, event, metric, and diagnostic evidence with SQLite local mode.",
      },
      {
        shortLabel: "Explore",
        title: "Next.js trace explorer",
        description: "Overview metrics, filters, payload timelines, hierarchy, diagnostics, and trace comparison.",
      },
    ],
    decisions: [
      {
        title: "Hierarchical trace model",
        description:
          "Spans are persisted in two passes, allowing children to arrive before parents while durable foreign keys preserve structure independently from unique event sequence order.",
      },
      {
        title: "Durable incomplete traces",
        description:
          "Running and error states, optional end times, final output, and error evidence model interrupted or unsuccessful execution without assuming perfect completion.",
      },
      {
        title: "Deterministic diagnostics",
        description:
          "V1 rules persist thresholds and matching evidence for repeated calls, tool errors, malformed arguments, context growth, slow traces, and expensive traces.",
      },
    ],
    capabilities: [
      {
        title: "Trace explorer",
        description: "Filter durable traces by agent, status, duration, cost, error outcome, and tool use.",
      },
      {
        title: "Execution timeline",
        description: "Inspect ordered events, payloads, token and cost usage, parent-child spans, diagnostics, and final output.",
      },
      {
        title: "Trace comparison",
        description: "Compare two persisted executions across results, latency, tokens, cost, errors, events, and diagnostic counts.",
      },
      {
        title: "Diagnostics",
        description: "Detect repeated identical calls, tool errors, malformed arguments, context growth, high latency, and unusual cost.",
      },
    ],
    deepDive: {
      title: "Trace ingestion and hierarchical span reconstruction",
      summary:
        "The ingestion boundary validates unique external identities, event sequence, timestamps, missing parents, self-parenting, and cycles before persisting the graph. A two-pass span write resolves parent relationships regardless of payload order, while trace identity makes delivery retries idempotent.",
      focus: [
        "Trace and span identity",
        "Out-of-order event handling",
        "Parent-child reconstruction",
        "Incomplete execution visibility",
      ],
    },
    reliability: [
      "14 backend and SDK tests cover ingestion validation, hierarchy, cycle rejection, event ordering, metrics, filters, comparison, diagnostics, idempotency, context management, and exception evidence.",
      "Ruff passes across the FastAPI server, diagnostic services, seed data, SDK, and Python tests.",
      "ESLint, strict TypeScript, and the optimized Next.js production build pass across all product routes.",
      "Nine Playwright tests validate the primary workflows; Axe reports no serious or critical violations across overview, explorer, comparison, diagnostics, and SDK screens.",
    ],
    tradeoffs: [
      "PostgreSQL remains sufficient until measured workload needs justify a specialized analytics store.",
      "Complete-document upload keeps V1 idempotency and graph validation clear; streaming delivery is deferred.",
      "Inline deterministic diagnostics favor understandable evidence over background or opaque anomaly models.",
      "Six original synthetic traces cover successful, failed, recovered, looping, malformed, and expensive executions.",
    ],
  },
  {
    slug: "estate-ai",
    overview:
      "EstateAI is a working V1 property investment analysis product built entirely around original synthetic data. It combines filterable map-and-list discovery, detailed property assumptions, deterministic financial calculations, persisted custom scenarios, saved selections, comparable records, three-property comparison, and constrained demo briefs.",
    problem:
      "Property interfaces can blur supplied facts, derived numbers, market claims, and generated narrative. EstateAI makes that boundary visible: every record is synthetic, every authoritative metric is derived from displayed assumptions, and every explanation is limited to known structured application values.",
    architectureSummary:
      "The Next.js product calls a typed FastAPI boundary backed by PostgreSQL in the container workflow and SQLite in local mode. A Decimal-based finance core owns every authoritative calculation, while a separate deterministic brief service explains only the persisted property, scenario, and calculated result data supplied to it.",
    architecture: [
      {
        shortLabel: "Product",
        title: "Next.js application",
        description: "Responsive discovery, offline MapLibre map, property analysis, scenario, saved, comparison, and methodology interfaces.",
      },
      {
        shortLabel: "API",
        title: "FastAPI service",
        description: "Validated property, calculation, scenario, saved-selection, comparison, and structured-brief endpoints.",
      },
      {
        shortLabel: "Logic",
        title: "Decimal-based finance core",
        description: "Mortgage, effective income, expenses, NOI, cash flow, cap rate, cash-on-cash, DSCR, and break-even occupancy.",
      },
      {
        shortLabel: "Data",
        title: "PostgreSQL with SQLite local mode",
        description: "Six fictional properties, 18 comparables, neighborhoods, saved state, and built-in or custom scenarios.",
      },
    ],
    decisions: [
      {
        title: "Deterministic financial outputs",
        description:
          "Business-critical numbers remain explicit, repeatable application logic with Decimal arithmetic and output quantization rather than generated values.",
      },
      {
        title: "Constrained explanation boundary",
        description:
          "The V1 demo brief receives only known property, assumption, comparable, neighborhood, scenario, and calculation fields; it cannot add external market facts.",
      },
      {
        title: "Synthetic portfolio data",
        description:
          "Six fictional properties and 18 fictional comparables are seeded from original demo records, never scraped listings or implied opportunities.",
      },
    ],
    capabilities: [
      {
        title: "Property discovery",
        description: "Filter a synchronized list and offline MapLibre view by city, property type, price, beds, cap rate, and saved state.",
      },
      {
        title: "Investment calculator",
        description: "Change displayed assumptions and recompute mortgage, NOI, returns, DSCR, cash flow, and occupancy through the API.",
      },
      {
        title: "Scenario comparison",
        description: "Compare conservative, base, optimistic, and persisted user-defined assumptions through one calculation contract.",
      },
      {
        title: "Structured demo brief",
        description: "Review strengths, risks, observations, and follow-up questions derived only from supplied structured product data.",
      },
    ],
    deepDive: {
      title: "Deterministic calculations and constrained explanation",
      summary:
        "The finance boundary converts validated inputs to Decimal values, calculates authoritative metrics in pure functions, and quantizes display outputs. Scenario transformations use the same functions, and the downstream brief consumes their structured results without becoming a second source of numeric truth.",
      focus: [
        "Decimal arithmetic and quantization",
        "Scenario transformation and validation",
        "Structured explanation context",
        "Synthetic-data and non-advice language",
      ],
    },
    reliability: [
      "15 backend tests cover finance formulas, seeded data, combined filters, detail composition, custom calculations, scenarios, saved state, comparison, CORS, brief constraints, and invalid boundaries.",
      "Ruff passes across the FastAPI service, finance and brief cores, persistence models, seed data, and Python tests.",
      "ESLint, strict TypeScript, and the optimized Next.js production build pass across every product route.",
      "15 Playwright tests validate discovery through comparison at three responsive widths; Axe reports no serious or critical violations across five primary routes.",
    ],
    tradeoffs: [
      "Synthetic data protects privacy and avoids dependence on scraped services.",
      "An offline MapLibre style and original geometry keep V1 mapping deterministic; external tiles and listing feeds are intentionally absent.",
      "PostGIS is deferred because V1 performs no spatial query that justifies the operational dependency.",
      "The demo brief is deterministic rather than model-backed, preserving the structured-data contract without implying unavailable AI integration.",
      "Authentication, live market data, migrations, and external service integrations remain roadmap work.",
    ],
  },
  {
    slug: "launchkit-ai",
    overview:
      "LaunchKit AI is a working V1 multi-tenant SaaS control plane for AI products. The TypeScript implementation combines signed demo sessions, organization switching, server-enforced roles, invitations, workspaces, one-time API keys, usage metering, budget policy, audit evidence, notifications, and signed webhook jobs over entirely synthetic data.",
    problem:
      "SaaS foundations must protect tenant boundaries while coordinating membership, permissions, secrets, usage, billing state, jobs, and administrative history. LaunchKit makes each authorization step explicit and keeps resource ownership testable independently from client-side visibility.",
    architectureSummary:
      "Next.js route handlers decode a signed actor context and call a service that resolves current membership, role permissions, organization, and resource ownership before every protected read or mutation. The service persists through an atomic in-memory adapter or row-locked PostgreSQL document and dispatches webhook work inline or through Redis.",
    architecture: [
      {
        shortLabel: "App",
        title: "Next.js application",
        description: "Responsive product UI, server components, signed session cookies, and tenant-aware route handlers.",
      },
      {
        shortLabel: "AuthZ",
        title: "Authorization service",
        description: "Membership, current role, permission, organization, and resource ownership checks on the server.",
      },
      {
        shortLabel: "State",
        title: "PostgreSQL",
        description: "Row-locked JSONB transactions for tenant-scoped domain, usage, audit, job, and delivery records.",
      },
      {
        shortLabel: "Async",
        title: "Redis and background worker",
        description: "Tenant-bearing webhook jobs processed through the same service authorization boundary.",
      },
    ],
    decisions: [
      {
        title: "Server-side authorization",
        description:
          "Authentication alone is insufficient; every protected operation resolves durable membership and role permissions before using organization-qualified resource lookups.",
      },
      {
        title: "Write-only secret reveal",
        description:
          "Cryptographic API keys and per-endpoint webhook secrets are shown only when created, with non-reversible digests stored and sensitive fields removed from snapshots.",
      },
      {
        title: "Auditable administration",
        description:
          "Membership, workspace, key, billing, organization, and webhook mutations create actor-attributed, tenant-scoped audit events.",
      },
    ],
    capabilities: [
      {
        title: "Organizations and workspaces",
        description: "Create and switch organizations, invite role-bound members, and manage tenant-scoped development or production workspaces.",
      },
      {
        title: "Roles and permissions",
        description: "Exercise Owner, Admin, Developer, Member, and Viewer profiles with independent UI and server enforcement.",
      },
      {
        title: "Usage and subscriptions",
        description: "Attribute synthetic provider, model, token, cost, latency, and actor records; update budget warnings through billing permissions.",
      },
      {
        title: "Operational controls",
        description: "Issue and revoke API keys, inspect audit events, register HTTPS webhooks, and record signed job delivery history.",
      },
    ],
    deepDive: {
      title: "Tenant-aware authorization and one-time secrets",
      summary:
        "A protected request becomes an actor only after its HMAC session passes verification. The service re-resolves membership and role from state, checks the operation's permission, qualifies resources by organization, and records audit evidence. API and webhook secrets cross the response boundary once while only digests remain in durable state.",
      focus: [
        "Membership and active-tenant resolution",
        "Role-to-permission checks",
        "Resource ownership constraints",
        "One-time secret and HMAC boundaries",
      ],
    },
    reliability: [
      "13 domain tests cover session tampering, membership, roles, cross-tenant access, audit evidence, one-time secrets, metering, billing permissions, invitations, and signed webhooks.",
      "ESLint, strict TypeScript, and the optimized Next.js production build pass across all product routes.",
      "20 Playwright tests validate authentication and full workflows at three viewport widths; Axe reports no serious or critical violations across eight product routes.",
      "The four-service Compose definition for Next.js, PostgreSQL, Redis, and the worker passes static parsing; runtime startup remains unverified in the current read-only Snap Docker environment.",
    ],
    tradeoffs: [
      "A TypeScript-only service boundary keeps V1 authorization and domain behavior cohesive; a separate Python service is excluded without a concrete requirement.",
      "The PostgreSQL adapter uses a row-locked JSONB document for inspectable atomic V1 behavior; normalized migrated tables are required for production scale and database-level constraints.",
      "Demo authentication is intentionally not a production identity provider, and synthetic webhook delivery does not contact external endpoints.",
      "Stripe remains disabled unless explicit test-only credentials are configured, so no checkout or charge is implied by the seeded subscription state.",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
