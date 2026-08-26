import Image from "next/image";

import type { Project } from "@/data/projects";

type ProjectVisualProps = Readonly<{
  project: Project;
}>;

const modules = ["Input", "Process", "Evidence"] as const;

export function ProjectVisual({ project }: ProjectVisualProps) {
  const order = String(project.order).padStart(2, "0");

  if (project.cover) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden border border-border bg-surface">
        <Image
          src={project.cover}
          alt={project.screenshots[0]?.alt ?? `${project.title} product interface`}
          fill
          priority
          sizes="(min-width: 1440px) 960px, (min-width: 768px) 66vw, 100vw"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${project.title} interface preview placeholder. The project is in development.`}
      className="relative aspect-[16/10] overflow-hidden border border-border bg-surface p-4 sm:p-6 lg:p-8"
    >
      <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
        <span>System / {order}</span>
        <span className="text-accent">In Development</span>
      </div>

      <div className="grid h-[calc(100%-2.25rem)] content-between pt-5 sm:pt-7">
        <div className="grid grid-cols-12 gap-1" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => (
            <span
              key={index}
              className={`h-1 bg-primary ${
                index < project.order + 3 ? "opacity-70" : "opacity-10"
              }`}
            />
          ))}
        </div>

        <div>
          <p
            aria-hidden="true"
            className="font-mono text-[clamp(2.75rem,8vw,7rem)] leading-none tracking-[-0.07em] text-primary/40"
          >
            {order}
          </p>
          <div className="mt-[-0.75rem] grid grid-cols-3 gap-2 sm:mt-[-1.5rem] sm:gap-3">
            {modules.map((module, index) => (
              <div
                key={module}
                className="border border-border bg-background/80 p-2 sm:p-3"
              >
                <span className="block font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted sm:text-[0.65rem]">
                  0{index + 1}
                </span>
                <span className="mt-2 hidden font-mono text-[0.65rem] uppercase tracking-[0.08em] text-secondary sm:block">
                  {module}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between gap-4 border-t border-border pt-4 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted sm:text-[0.65rem]">
          <span>{project.category}</span>
          <span className="shrink-0 text-secondary">Preview pending</span>
        </div>
      </div>
    </div>
  );
}
