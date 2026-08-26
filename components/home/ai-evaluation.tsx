import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

const capabilities = [
  {
    title: "Benchmark Design",
    description:
      "Designing reproducible tasks that measure specific model or agent capabilities.",
  },
  {
    title: "Agent Evaluation",
    description:
      "Evaluating multi-step execution, tool use, reliability, and task completion.",
  },
  {
    title: "Rubric Design",
    description:
      "Turning qualitative requirements into observable, measurable criteria.",
  },
  {
    title: "Failure Analysis",
    description:
      "Understanding why intelligent systems fail, not simply recording that they failed.",
  },
] as const;

export function AiEvaluation() {
  return (
    <Section
      id="ai-evaluation"
      aria-labelledby="ai-evaluation-heading"
      className="border-y border-border bg-surface"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-12">
          <SectionLabel className="md:col-span-3">AI Evaluation Focus</SectionLabel>
          <div className="md:col-span-8 md:col-start-5">
            <h2
              id="ai-evaluation-heading"
              className="text-[clamp(3rem,6.5vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em] text-balance"
            >
              AI systems need more than demos. <span className="text-accent">They need evidence.</span>
            </h2>
            <p className="mt-10 max-w-[64ch] text-lg leading-relaxed text-secondary md:text-xl">
              My recent work focuses on evaluating how AI models and agents behave under
              realistic constraints—designing benchmark tasks, defining measurable
              criteria, analyzing failures, and building workflows that expose weaknesses
              that simple demonstrations often miss.
            </p>
          </div>
        </div>

        <ol className="mt-20 border-t border-border md:mt-28 md:ml-[33.333%]">
          {capabilities.map((capability, index) => (
            <li
              key={capability.title}
              className="grid gap-4 border-b border-border py-7 sm:grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr_1.5fr] md:items-start md:gap-8 md:py-9"
            >
              <span className="font-mono text-xs tracking-[0.1em] text-muted">
                0{index + 1}
              </span>
              <h3 className="text-xl font-medium tracking-[-0.025em]">
                {capability.title}
              </h3>
              <p className="col-start-2 leading-relaxed text-secondary md:col-start-auto">
                {capability.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
