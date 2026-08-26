import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

const workAreas = [
  {
    title: "Private SaaS Products",
    description:
      "Full-stack development of production SaaS applications, internal systems, and platform features across frontend and backend architecture.",
  },
  {
    title: "Real-Estate Software",
    description:
      "Development of property-oriented products involving business workflows, data-heavy interfaces, integrations, and user-facing tools.",
  },
  {
    title: "AI Evaluation",
    description:
      "Benchmark task development, model and agent evaluation, scoring design, reliability analysis, and evaluation workflow development.",
  },
  {
    title: "Mobile & Blockchain",
    description:
      "Earlier engineering work spanning mobile applications, blockchain integrations, and decentralized product development.",
  },
] as const;

export function ProfessionalWork() {
  return (
    <Section
      id="professional-work"
      aria-labelledby="professional-work-heading"
      className="border-y border-border"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-12">
          <SectionLabel className="md:col-span-3">Selected Professional Work</SectionLabel>
          <div className="md:col-span-8 md:col-start-5">
            <h2
              id="professional-work-heading"
              className="text-[clamp(2.75rem,5.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em]"
            >
              Selected Professional Work
            </h2>
          </div>
        </div>

        <div className="mt-20 border-t border-border md:mt-28">
          {workAreas.map((area, index) => (
            <article
              key={area.title}
              className="grid gap-5 border-b border-border py-8 md:grid-cols-12 md:gap-6 md:py-10"
            >
              <p className="font-mono text-xs tracking-[0.1em] text-muted md:col-span-1">
                0{index + 1}
              </p>
              <h3 className="text-2xl font-medium tracking-[-0.035em] md:col-span-3">
                {area.title}
              </h3>
              <p className="max-w-[62ch] leading-relaxed text-secondary md:col-span-6 md:col-start-6">
                {area.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-[76ch] border-l-2 border-accent pl-5 text-sm leading-relaxed text-secondary md:ml-[41.666%]">
          Selected commercial implementations remain private due to client and product
          confidentiality. The public projects in this portfolio demonstrate related
          engineering patterns without exposing proprietary systems.
        </p>
      </Container>
    </Section>
  );
}
