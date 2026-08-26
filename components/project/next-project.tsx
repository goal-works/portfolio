import Link from "next/link";

import { Container } from "@/components/layout/container";
import type { Project } from "@/data/projects";

type NextProjectProps = Readonly<{
  project: Project;
}>;

export function NextProject({ project }: NextProjectProps) {
  return (
    <nav aria-label="Next project" className="border-t border-border py-20 md:py-28">
      <Container>
        <Link href={`/work/${project.slug}`} className="group block">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
            Next project / {String(project.order).padStart(2, "0")}
          </p>
          <div className="mt-7 flex items-end justify-between gap-8">
            <span className="text-[clamp(3rem,8vw,8rem)] font-medium leading-[0.85] tracking-[-0.065em] transition-colors group-hover:text-accent">
              {project.title}
            </span>
            <span
              className="pb-2 font-mono text-xl text-accent transition-transform group-hover:translate-x-2"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </Link>
      </Container>
    </nav>
  );
}
