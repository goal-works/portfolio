import { ProjectStatus } from "@/components/project/project-status";
import type { Project } from "@/data/projects";

type ProjectMetaProps = Readonly<{
  project: Project;
}>;

export function ProjectMeta({ project }: ProjectMetaProps) {
  const hasEvidence = project.screenshots.length > 0;
  const evidence = [
    hasEvidence ? `${project.screenshots.length} validated visuals` : null,
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
          {evidence.length > 0
            ? evidence.join(" · ")
            : "Implementation, repository, demo, and screenshots pending."}
        </dd>
      </div>
      <div className="bg-background p-5 sm:p-6">
        <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
          {hasEvidence ? "Responsibilities" : "Planned responsibilities"}
        </dt>
        <dd className="mt-4 text-sm leading-relaxed text-secondary">
          {project.roles.join(" · ")}
        </dd>
      </div>
      <div className="bg-background p-5 sm:p-6">
        <dt className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
          {hasEvidence ? "Implementation stack" : "Planned stack"}
        </dt>
        <dd className="mt-4 text-sm leading-relaxed text-secondary">
          {project.technologies.join(" · ")}
        </dd>
      </div>
    </dl>
  );
}
