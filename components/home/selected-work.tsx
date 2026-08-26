import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";
import { flagshipProjects } from "@/data/projects";

import { FeaturedProject } from "./featured-project";

export function SelectedWork() {
  return (
    <Section id="selected-work" aria-labelledby="selected-work-heading">
      <Container>
        <div className="grid gap-8 pb-20 md:grid-cols-12 md:pb-28">
          <SectionLabel className="md:col-span-3">Selected Work</SectionLabel>
          <div className="md:col-span-8 md:col-start-5">
            <h2
              id="selected-work-heading"
              className="text-[clamp(2.75rem,5.5vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.055em] text-balance"
            >
              A selection of AI systems and production applications exploring
              evaluation, reliability, intelligent automation, and modern software
              architecture.
            </h2>
          </div>
        </div>

        <div className="grid gap-24 md:gap-32 xl:gap-40">
          {flagshipProjects.map((project) => (
            <FeaturedProject key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
