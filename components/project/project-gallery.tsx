import Image from "next/image";

import type { Project } from "@/data/projects";

type ProjectGalleryProps = Readonly<{
  project: Project;
}>;

export function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <ul className="grid gap-8">
      {project.screenshots.map((screenshot) => (
        <li key={screenshot.src}>
          <div className="relative aspect-[16/10] overflow-hidden bg-surface">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              fill
              sizes="(min-width: 1440px) 960px, (min-width: 768px) 66vw, 100vw"
              className="object-contain"
            />
          </div>
          {screenshot.caption ? (
            <p className="mt-3 text-sm text-muted">{screenshot.caption}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
