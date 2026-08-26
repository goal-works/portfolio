import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

const expertise = [
  {
    title: "AI Systems",
    description:
      "AI evaluation, agentic workflows, LLM applications, RAG, structured generation, model integration.",
  },
  {
    title: "Product Engineering",
    description:
      "Application architecture, frontend systems, backend APIs, authentication, data modeling, background processing.",
  },
  {
    title: "Web",
    description: "TypeScript, React, Next.js, Node.js, Python, FastAPI, Django.",
  },
  {
    title: "Infrastructure",
    description: "PostgreSQL, Redis, Docker, Linux, CI/CD, cloud deployment.",
  },
  {
    title: "Additional Experience",
    description: "Mobile, blockchain, automation, third-party integrations.",
  },
] as const;

export function Expertise() {
  return (
    <Section id="expertise" aria-labelledby="expertise-heading">
      <Container>
        <div className="grid gap-8 md:grid-cols-12">
          <SectionLabel className="md:col-span-3">Engineering Expertise</SectionLabel>
          <h2
            id="expertise-heading"
            className="text-[clamp(2.75rem,5.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em] md:col-span-8 md:col-start-5"
          >
            Engineering Expertise
          </h2>
        </div>

        <div className="mt-20 grid border-l border-t border-border sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
          {expertise.map((area, index) => (
            <article
              key={area.title}
              className="min-h-64 border-r border-b border-border p-6 md:min-h-72 md:p-8"
            >
              <p className="font-mono text-xs tracking-[0.1em] text-muted">
                0{index + 1}
              </p>
              <h3 className="mt-12 text-2xl font-medium tracking-[-0.035em]">
                {area.title}
              </h3>
              <p className="mt-5 max-w-[36ch] leading-relaxed text-secondary">
                {area.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
