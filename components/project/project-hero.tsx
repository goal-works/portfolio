import { Container } from "@/components/layout/container";
import { ProjectStatus } from "@/components/project/project-status";
import type { Project } from "@/data/projects";

type ProjectHeroProps = Readonly<{
  project: Project;
}>;

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="py-20 md:py-28 xl:py-36">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-border pb-6">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-secondary">
            {project.category}
          </p>
          <ProjectStatus status={project.status} />
        </div>

        <div className="grid gap-10 pt-12 md:grid-cols-12 md:pt-16">
          <div className="md:col-span-9">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
              Validated implementation
            </p>
            <h1 className="mt-5 text-[clamp(4rem,10vw,9rem)] font-medium leading-[0.82] tracking-[-0.07em]">
              {project.title}
            </h1>
          </div>
          <p className="max-w-[62ch] text-lg leading-relaxed text-secondary md:col-span-8 md:col-start-4 md:text-xl">
            {project.summary}
          </p>
        </div>
      </Container>
    </section>
  );
}
