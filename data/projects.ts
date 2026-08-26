export type ProjectStatus = "concept" | "building" | "complete";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  order: number;
  title: string;
  shortTitle?: string;
  category: string;
  year?: string;
  summary: string;
  description: string;
  roles: string[];
  technologies: string[];
  featured: boolean;
  status: ProjectStatus;
  repository?: string;
  demo?: string;
  cover?: string;
  screenshots: ProjectScreenshot[];
};

export const flagshipProjects: Project[] = [
  {
    slug: "evalforge",
    order: 1,
    title: "EvalForge",
    category: "AI Evaluation Infrastructure",
    year: "2026",
    summary:
      "A benchmark and evaluation platform for measuring how AI models and agents perform across complex tasks. Define benchmark suites, execute agent runs, apply configurable evaluators, inspect failures, and compare performance from a unified environment.",
    description:
      "A benchmark and evaluation platform for measuring how AI models and agents perform across complex tasks.",
    roles: [
      "Product design",
      "System architecture",
      "Full-stack engineering",
      "Testing and documentation",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    featured: true,
    status: "building",
    cover: "/projects/evalforge/dashboard.png",
    screenshots: [
      {
        src: "/projects/evalforge/dashboard.png",
        alt: "EvalForge dashboard showing evaluation volume, average pass rate, active benchmarks, and recent completed runs.",
        caption:
          "The seeded dashboard summarizes four reproducible historical runs and their aggregate outcomes.",
      },
      {
        src: "/projects/evalforge/benchmark-detail.png",
        alt: "EvalForge Operational Reasoning benchmark with eight tasks and controls for configuring a new evaluation.",
        caption:
          "A benchmark binds versioned tasks and evaluator contracts to a selected agent and attempt count.",
      },
      {
        src: "/projects/evalforge/run-detail.png",
        alt: "EvalForge run detail showing aggregate metrics, failed task output, evaluator reasoning, and execution events.",
        caption:
          "The flagship run view keeps failed output, evaluator reasoning, and the ordered execution timeline together.",
      },
      {
        src: "/projects/evalforge/architecture.svg",
        alt: "EvalForge architecture connecting the Next.js application, FastAPI service, PostgreSQL, Redis, and Dramatiq worker.",
        caption:
          "The control plane persists a queued run before the worker executes agents, evaluators, and aggregate updates.",
      },
    ],
  },
  {
    slug: "agentscope",
    order: 2,
    title: "AgentScope",
    category: "Observability for AI Agents",
    year: "2026",
    summary:
      "An observability platform designed to make complex agent behavior understandable. It captures execution traces, tool calls, model interactions, errors, latency, token usage, and evaluation outcomes so developers can understand how an agent arrived at a result.",
    description:
      "An observability platform designed to make complex agent behavior understandable.",
    roles: [
      "Product design",
      "Trace model and SDK design",
      "Full-stack engineering",
      "Testing and documentation",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
    ],
    featured: true,
    status: "building",
    cover: "/projects/agentscope/overview.png",
    screenshots: [
      {
        src: "/projects/agentscope/overview.png",
        alt: "AgentScope overview showing six synthetic agent executions, success rate, latency, cost, recent traces, and common tools.",
        caption:
          "The overview aggregates durable execution metrics from six deterministic synthetic trace scenarios.",
      },
      {
        src: "/projects/agentscope/trace-detail.png",
        alt: "AgentScope trace detail showing an ordered event timeline, repeated tool-call diagnostic, span hierarchy, tokens, latency, and cost.",
        caption:
          "The flagship trace keeps ordered events, inspectable payloads, hierarchy, metrics, and explainable loop evidence together.",
      },
      {
        src: "/projects/agentscope/comparison.png",
        alt: "AgentScope trace comparison showing baseline and candidate execution metrics and final results side by side.",
        caption:
          "Two persisted traces can be compared across result, latency, tokens, cost, errors, events, and diagnostics.",
      },
      {
        src: "/projects/agentscope/architecture.svg",
        alt: "AgentScope architecture connecting the Python SDK, FastAPI ingestion, PostgreSQL, deterministic diagnostics, and Next.js explorer.",
        caption:
          "A validated complete-trace document is reconstructed in two passes before durable storage and diagnostic analysis.",
      },
    ],
  },
  {
    slug: "estate-ai",
    order: 3,
    title: "EstateAI",
    category: "Property Investment Analysis",
    year: "2026",
    summary:
      "A property intelligence workbench for comparing original synthetic properties, testing investment assumptions, inspecting comparables, and generating constrained demo briefs from structured application data.",
    description:
      "A property intelligence workbench combining deterministic investment analysis with constrained, structured explanation.",
    roles: [
      "Product design",
      "Financial model and API design",
      "Full-stack engineering",
      "Testing and documentation",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "MapLibre",
      "Docker",
    ],
    featured: true,
    status: "building",
    cover: "/projects/estate-ai/discovery.png",
    screenshots: [
      {
        src: "/projects/estate-ai/discovery.png",
        alt: "EstateAI discovery view showing six synthetic properties, deterministic cap rates, filters, and an offline MapLibre map.",
        caption:
          "Discovery keeps original synthetic records and clearly labeled modeled metrics beside an offline map with no listing or tile dependency.",
      },
      {
        src: "/projects/estate-ai/property-analysis.png",
        alt: "EstateAI Juniper Row Duplex detail showing synthetic property facts, deterministic return metrics, and property overview.",
        caption:
          "The property view leads with supplied assumptions, deterministic outputs, and persistent synthetic-data disclosure.",
      },
      {
        src: "/projects/estate-ai/scenario-analysis.png",
        alt: "EstateAI scenario table comparing conservative, base, optimistic, and custom investment assumptions.",
        caption:
          "Built-in and user-defined scenarios run through the same Decimal-based calculation boundary for comparable outputs.",
      },
      {
        src: "/projects/estate-ai/comparison.png",
        alt: "EstateAI side-by-side comparison showing consistent investment metrics for three synthetic properties.",
        caption:
          "Comparison aligns price, income, cash flow, NOI, cap rate, cash-on-cash return, DSCR, and break-even occupancy.",
      },
      {
        src: "/projects/estate-ai/architecture.svg",
        alt: "EstateAI architecture connecting the Next.js application, FastAPI service, deterministic finance core, PostgreSQL, and structured demo brief.",
        caption:
          "Authoritative financial calculations stay separate from the downstream explanation layer and synthetic persistence model.",
      },
    ],
  },
  {
    slug: "launchkit-ai",
    order: 4,
    title: "LaunchKit AI",
    category: "Production SaaS Architecture",
    summary:
      "A production-oriented multi-tenant SaaS foundation demonstrating organizations, workspaces, role-based authorization, subscriptions, API keys, usage metering, background processing, webhooks, audit logs, and AI cost tracking.",
    description:
      "A production-oriented multi-tenant SaaS foundation for AI products.",
    roles: ["Product architecture", "Full-stack engineering"],
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Stripe test mode",
      "Docker",
    ],
    featured: true,
    status: "building",
    screenshots: [],
  },
];

export const secondaryProjects: Project[] = [
  {
    slug: "chainlens",
    order: 5,
    title: "ChainLens",
    category: "Blockchain Transaction Intelligence",
    summary: "Blockchain transaction intelligence and wallet relationship explorer.",
    description:
      "Blockchain transaction intelligence and wallet relationship explorer.",
    roles: [],
    technologies: [],
    featured: false,
    status: "concept",
    screenshots: [],
  },
  {
    slug: "pocketai",
    order: 6,
    title: "PocketAI",
    category: "Cross-Platform AI Workspace",
    summary: "Cross-platform multimodal AI workspace.",
    description: "Cross-platform multimodal AI workspace.",
    roles: [],
    technologies: [],
    featured: false,
    status: "concept",
    screenshots: [],
  },
];

export const projects: Project[] = [
  ...flagshipProjects,
  ...secondaryProjects,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return flagshipProjects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project | undefined {
  const projectIndex = flagshipProjects.findIndex(
    (project) => project.slug === slug,
  );

  if (projectIndex === -1) {
    return undefined;
  }

  return flagshipProjects[(projectIndex + 1) % flagshipProjects.length];
}
