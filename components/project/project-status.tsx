import type { ProjectStatus as ProjectStatusValue } from "@/data/projects";

const labels: Record<ProjectStatusValue, string> = {
  concept: "Planned",
  building: "In Development",
  complete: "Complete",
};

type ProjectStatusProps = Readonly<{
  status: ProjectStatusValue;
}>;

export function ProjectStatus({ status }: ProjectStatusProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-secondary">
      <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
      {labels[status]}
    </span>
  );
}
