import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

const technologyGroups = [
  {
    label: "Application",
    items: ["TypeScript", "React", "Next.js", "Node.js"],
  },
  {
    label: "AI & Backend",
    items: ["Python", "FastAPI", "Django", "LLM applications"],
  },
  {
    label: "Data & Infrastructure",
    items: ["PostgreSQL", "Redis", "Docker", "Linux", "CI/CD"],
  },
] as const;

export function Technology() {
  return (
    <Section
      id="technology"
      aria-labelledby="technology-heading"
      className="border-y border-border bg-surface"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-12">
          <SectionLabel className="md:col-span-3">Technology</SectionLabel>
          <h2
            id="technology-heading"
            className="text-[clamp(2.75rem,5.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em] md:col-span-8 md:col-start-5"
          >
            Technology
          </h2>
        </div>

        <dl className="mt-20 border-t border-border md:mt-28 md:ml-[33.333%]">
          {technologyGroups.map((group) => (
            <div
              key={group.label}
              className="grid gap-5 border-b border-border py-8 md:grid-cols-[minmax(9rem,1fr)_2fr] md:gap-10"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                {group.label}
              </dt>
              <dd className="flex flex-wrap gap-x-3 gap-y-2 text-xl tracking-[-0.025em] text-secondary md:text-2xl">
                {group.items.map((item, index) => (
                  <span key={item}>
                    {item}
                    {index < group.items.length - 1 ? (
                      <span className="ml-3 text-muted" aria-hidden="true">
                        /
                      </span>
                    ) : null}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
