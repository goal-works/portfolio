import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectStatus } from "@/components/project/project-status";
import { ProjectVisual } from "@/components/project/project-visual";
import { SectionLabel } from "@/components/ui/section-label";
import { flagshipProjects, secondaryProjects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Work",
  description:
    "Flagship AI systems and production application blueprints focused on evaluation, reliability, intelligent automation, and software architecture.",
  alternates: siteUrl ? { canonical: "/work" } : undefined,
};

export default function WorkPage() {
  return (
    <main id="main-content" className="flex-1">
      <section className="py-20 md:py-28 xl:py-36">
        <Container>
          <SectionLabel>Work archive</SectionLabel>
          <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
            <h1 className="text-[clamp(4rem,11vw,10rem)] font-medium leading-[0.8] tracking-[-0.075em] md:col-span-8">
              Selected Work
            </h1>
            <p className="max-w-[50ch] text-lg leading-relaxed text-secondary md:col-span-4 md:pb-2">
              A selection of AI systems and production applications exploring
              evaluation, reliability, intelligent automation, and modern
              software architecture.
            </p>
          </div>
          <p className="mt-12 border-l-2 border-accent pl-5 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted md:ml-[33.333%]">
            All flagship projects remain in development. EvalForge,
            AgentScope, and EstateAI now have locally validated V1
            implementations and captured evidence; LaunchKit AI remains an
            implementation blueprint.
          </p>
        </Container>
      </section>

      <Section className="border-t border-border">
        <Container className="grid gap-24 xl:gap-32">
          {flagshipProjects.map((project) => {
            const hasEvidence = project.screenshots.length > 0;

            return (
              <article
                key={project.slug}
                className="grid gap-8 md:grid-cols-12 md:gap-12"
              >
              <div className="md:col-span-3">
                <p className="font-mono text-xs tracking-[0.12em] text-muted">
                  /{String(project.order).padStart(2, "0")}
                </p>
                <p className="mt-4 max-w-[24ch] font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-secondary">
                  {project.category}
                </p>
              </div>
              <div className="md:col-span-9">
                <div className="flex flex-wrap items-end justify-between gap-5">
                  <h2 className="text-[clamp(3rem,7vw,7rem)] font-medium leading-[0.88] tracking-[-0.065em]">
                    {project.title}
                  </h2>
                  <ProjectStatus status={project.status} />
                </div>
                <div className="mt-8">
                  <ProjectVisual project={project} />
                </div>
                <div className="mt-8 grid gap-7 lg:grid-cols-3">
                  <p className="text-lg leading-relaxed text-secondary lg:col-span-2">
                    {project.summary}
                  </p>
                  <div>
                    <p className="font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted">
                      {hasEvidence
                        ? "Validated V1 · product evidence available"
                        : "Implementation blueprint · evidence pending"}
                    </p>
                    <Link
                      href={`/work/${project.slug}`}
                      className="mt-4 inline-flex min-h-11 items-center border-b border-accent font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent"
                    >
                      {hasEvidence ? "View case study" : "View blueprint"}{" "}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
              </article>
            );
          })}
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-3">
              <SectionLabel>Secondary projects</SectionLabel>
            </div>
            <div className="md:col-span-9">
              <div className="flex flex-wrap items-end justify-between gap-6">
                <h2 className="max-w-[12ch] text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                  Early product concepts
                </h2>
                <p className="max-w-[36ch] text-sm leading-relaxed text-muted">
                  Smaller concepts remain separate from flagship work until
                  implementation evidence justifies a larger presentation.
                </p>
              </div>

              <div className="mt-12 divide-y divide-border border-y border-border">
                {secondaryProjects.map((project) => (
                  <article
                    key={project.slug}
                    className="grid gap-5 py-8 sm:grid-cols-12 sm:items-start"
                  >
                    <p className="font-mono text-xs text-muted sm:col-span-1">
                      /{String(project.order).padStart(2, "0")}
                    </p>
                    <div className="sm:col-span-4">
                      <h3 className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-2 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted">
                        {project.category}
                      </p>
                    </div>
                    <p className="leading-relaxed text-secondary sm:col-span-4">
                      {project.summary}
                    </p>
                    <div className="sm:col-span-3 sm:text-right">
                      <ProjectStatus status={project.status} />
                      <p className="mt-3 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted">
                        No public case study or implementation evidence
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
