import { ProjectStatus } from "@/components/project/project-status";
import type { Project } from "@/data/projects";

type ProjectMetaProps = Readonly<{
  project: Project;
}>;

export function ProjectMeta({ project }: ProjectMetaProps) {
  const evidence = [
    `${project.screenshots.length} validated visuals`,
    project.repository ? "public repository" : null,
    project.demo ? "deployed demo" : null,
  ].filter(Boolean);

  return (
    <dl className="grid gap-px border border-border bg-border sm:grid-cols-2">
      <div className="bg-background p-5 sm:p-6">
        <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
          Current status
        </dt>
        <dd className="mt-4">
          <ProjectStatus status={project.status} />
        </dd>
      </div>
      <div className="bg-background p-5 sm:p-6">
        <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
          Evidence
        </dt>
        <dd className="mt-4 text-sm leading-relaxed text-secondary">
          {evidence.join(" · ")}
        </dd>
      </div>
      <div className="bg-background p-5 sm:p-6">
        <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
          Responsibilities
        </dt>
        <dd className="mt-4 text-sm leading-relaxed text-secondary">
          {project.roles.join(" · ")}
        </dd>
      </div>
      <div className="bg-background p-5 sm:p-6">
        <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
          Implementation stack
        </dt>
        <dd className="mt-4 text-sm leading-relaxed text-secondary">
          {project.technologies.join(" · ")}
        </dd>
      </div>
    </dl>
  );
}
