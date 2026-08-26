import { ProjectStatus } from "@/components/project/project-status";
import { ProjectVisual } from "@/components/project/project-visual";
import type { Project } from "@/data/projects";
import Link from "next/link";

type FeaturedProjectProps = Readonly<{
  project: Project;
}>;

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const order = String(project.order).padStart(2, "0");

  return (
    <article className="scroll-mt-24 border-t border-border pt-8 md:pt-12">
      <div className="grid gap-8 md:grid-cols-12 md:gap-y-12">
        <div className="flex items-start justify-between gap-6 md:col-span-3 md:block">
          <p className="font-mono text-xs tracking-[0.12em] text-muted">/{order}</p>
          <p className="max-w-[20ch] text-right font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-secondary md:mt-5 md:text-left">
            {project.category}
          </p>
        </div>

        <div className="md:col-span-9">
          <h3 className="text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em]">
            {project.title}
          </h3>
        </div>

        <div className="md:col-span-9 md:col-start-4">
          <ProjectVisual project={project} />
        </div>

        <div className="grid gap-8 md:col-span-9 md:col-start-4 md:grid-cols-9">
          <p className="max-w-[64ch] text-lg leading-relaxed text-secondary md:col-span-6 md:text-xl">
            {project.summary}
          </p>

          <div className="md:col-span-3">
            <ProjectStatus status={project.status} />
            <p className="mt-6 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted">
              Validated V1 · product evidence available
            </p>
            <Link
              href={`/work/${project.slug}`}
              className="mt-4 inline-flex min-h-11 items-center border-b border-accent font-mono text-xs uppercase tracking-[0.1em] text-primary transition-colors hover:text-accent"
            >
              View case study{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <dl className="grid gap-px border border-border bg-border text-sm md:col-span-9 md:col-start-4 md:grid-cols-2">
          <div className="bg-background p-5 sm:p-6">
            <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Responsibilities
            </dt>
            <dd className="mt-3 leading-relaxed text-secondary">
              {project.roles.join(" · ")}
            </dd>
          </div>
          <div className="bg-background p-5 sm:p-6">
            <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
              Implementation stack
            </dt>
            <dd className="mt-3 leading-relaxed text-secondary">
              {project.technologies.join(" · ")}
            </dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
