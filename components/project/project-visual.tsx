import Image from "next/image";

import type { Project } from "@/data/projects";

type ProjectVisualProps = Readonly<{
  project: Project;
}>;

export function ProjectVisual({ project }: ProjectVisualProps) {
  if (!project.cover) return null;

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
