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
      "LaunchKit AI is planned as a production-oriented multi-tenant SaaS foundation for AI products. It is currently in development; this blueprint focuses on tenant-aware authorization, metering, and auditability.",
    problem:
      "SaaS foundations must protect tenant boundaries while coordinating membership, permissions, secrets, usage, billing state, jobs, and administrative history. The planned system will make those boundaries explicit and testable.",
    architectureSummary:
      "The planned TypeScript-heavy architecture resolves every protected action through membership, organization, permission, and resource ownership before reading or mutating tenant data.",
    architecture: [
      {
        shortLabel: "App",
        title: "Next.js application",
        description: "Planned product UI, server actions, and tenant-aware request boundaries.",
      },
      {
        shortLabel: "AuthZ",
        title: "Authorization service",
        description: "Planned membership, role, permission, and resource ownership checks.",
      },
      {
        shortLabel: "State",
        title: "PostgreSQL",
        description: "Planned tenant-scoped domain, usage, audit, and delivery records.",
      },
      {
        shortLabel: "Async",
        title: "Redis and background worker",
        description: "Planned notifications, webhooks, and deferred processing.",
      },
    ],
    decisions: [
      {
        title: "Server-side authorization",
        description:
          "Authentication alone is insufficient; every planned protected operation will enforce tenant and permission checks on the server.",
      },
      {
        title: "Write-only secret reveal",
        description:
          "Planned API keys will be shown only when created, with non-reversible values stored afterward.",
      },
      {
        title: "Auditable administration",
        description:
          "Meaningful membership, key, billing, and configuration actions are planned to create tenant-scoped audit events.",
      },
    ],
    capabilities: [
      {
        title: "Organizations and workspaces",
        description: "Planned creation, switching, invitations, memberships, and scoped resources.",
      },
      {
        title: "Roles and permissions",
        description: "Planned owner, admin, developer, member, and viewer authorization.",
      },
      {
        title: "Usage and subscriptions",
        description: "Planned AI token, cost, latency, quota, and Stripe test-state tracking.",
      },
      {
        title: "Operational controls",
        description: "Planned API keys, audit logs, background jobs, and webhook history.",
      },
    ],
    deepDive: {
      title: "Tenant-aware authorization",
      summary:
        "The primary planned deep dive follows authorization from user identity through membership, role, permission, organization, and resource ownership.",
      focus: [
        "Membership and active-tenant resolution",
        "Role-to-permission checks",
        "Resource ownership constraints",
        "Cross-tenant isolation tests",
      ],
    },
    reliability: [
      "Planned role and permission matrix tests",
      "Planned cross-tenant access tests",
      "Planned API-key lifecycle and secret-handling tests",
      "Planned usage aggregation and audit-event tests",
    ],
    tradeoffs: [
      "A TypeScript-heavy stack keeps the V1 architecture cohesive.",
      "Stripe behavior will remain in test mode until real deployment requirements exist.",
      "A separate Python service is excluded unless a concrete requirement justifies it.",
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
