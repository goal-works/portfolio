export const engineeringPrinciples = [
  {
    title: "Understandable",
    description:
      "Architecture should make it possible for another engineer to understand why the system works the way it does.",
  },
  {
    title: "Measurable",
    description:
      "Whether we're talking about API latency or AI-agent performance, important behavior should be observable and measurable.",
  },
  {
    title: "Reliable",
    description:
      "A feature working once is not enough. Good engineering accounts for failures, edge cases, concurrency, recovery, and changing conditions.",
  },
  {
    title: "Maintainable",
    description:
      "Prefer clear boundaries and deliberate abstractions over unnecessary complexity.",
  },
  {
    title: "Useful",
    description:
      "Technology exists to solve a problem; product quality and user experience matter alongside implementation.",
  },
] as const;

export const currentFocus = [
  "AI evaluation",
  "AI agents",
  "benchmark engineering",
  "AI reliability",
  "LLM applications",
  "developer infrastructure",
  "production AI systems",
  "technically challenging SaaS products",
] as const;
