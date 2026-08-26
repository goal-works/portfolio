import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArchitectureDiagram } from "@/components/project/architecture-diagram";
import { CaseStudySection } from "@/components/project/case-study-section";
import { NextProject } from "@/components/project/next-project";
import { ProjectGallery } from "@/components/project/project-gallery";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectMeta } from "@/components/project/project-meta";
import { ProjectVisual } from "@/components/project/project-visual";
import { TechnicalCallout } from "@/components/project/technical-callout";
import { getCaseStudyBySlug } from "@/data/case-studies";
import {
  flagshipProjects,
  getNextProject,
  getProjectBySlug,
} from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

type ProjectPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return flagshipProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const siteUrl = getSiteUrl();
  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    alternates: siteUrl ? { canonical: `/work/${project.slug}` } : undefined,
    openGraph: {
      title: `${project.title} — ${project.category} | James`,
      description: project.summary,
      type: "article",
      images: siteUrl
        ? [
            {
              url: `/og/${project.slug}`,
              width: 1200,
              height: 630,
              alt: `${project.title} validated implementation`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.category} | James`,
      description: project.summary,
      images: siteUrl ? [`/og/${project.slug}`] : undefined,
    },
  };
}

function ItemGrid({
  items,
}: Readonly<{
  items: { title: string; description: string }[];
}>) {
  return (
    <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
      {items.map((item, index) => (
        <li key={item.title} className="bg-background p-5 sm:p-7">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-8 text-xl font-medium tracking-[-0.025em]">
            {item.title}
          </h3>
          <p className="mt-3 leading-relaxed text-secondary">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: Readonly<{ items: string[] }>) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {items.map((item, index) => (
        <li key={item} className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr]">
          <span className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="leading-relaxed text-secondary">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const caseStudy = getCaseStudyBySlug(slug);

  if (!project || !caseStudy) {
    notFound();
  }

  const nextProject = getNextProject(slug);
  return (
    <main id="main-content" className="flex-1">
      <ProjectHero project={project} />

      <CaseStudySection
        index="01"
        label="Product preview"
        title="Validated product capture"
      >
        <ProjectVisual project={project} />
        <p className="mt-5 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted">
          Captured from the locally validated product using deterministic demo data.
        </p>
      </CaseStudySection>

      <CaseStudySection
        index="02"
        label="Overview"
        title="Implemented product"
      >
        <p className="max-w-[68ch] text-xl leading-relaxed text-secondary">
          {caseStudy.overview}
        </p>
        <div className="mt-10">
          <ProjectMeta project={project} />
        </div>
      </CaseStudySection>

      <CaseStudySection index="03" label="Problem" title="The engineering problem">
        <p className="max-w-[66ch] text-xl leading-relaxed text-secondary">
          {caseStudy.problem}
        </p>
      </CaseStudySection>

      <CaseStudySection
        index="04"
        label="System architecture"
        title="A deliberate system boundary"
      >
        <p className="mb-10 max-w-[66ch] text-lg leading-relaxed text-secondary">
          {caseStudy.architectureSummary}
        </p>
        <ArchitectureDiagram steps={caseStudy.architecture} />
      </CaseStudySection>

      <CaseStudySection
        index="05"
        label="Engineering decisions"
        title="Implemented design decisions"
      >
        <ItemGrid items={caseStudy.decisions} />
      </CaseStudySection>

      <CaseStudySection
        index="06"
        label="Product capabilities"
        title="Implemented V1 capabilities"
      >
        <ItemGrid items={caseStudy.capabilities} />
      </CaseStudySection>

      <CaseStudySection
        index="07"
        label="Technical deep dive"
        title="The primary engineering focus"
      >
        <TechnicalCallout {...caseStudy.deepDive} />
      </CaseStudySection>

      <CaseStudySection
        index="08"
        label="Testing and reliability"
        title="Validation evidence"
      >
        <NumberedList items={caseStudy.reliability} />
      </CaseStudySection>

      <CaseStudySection index="09" label="Screens and gallery" title="Visual evidence">
        <ProjectGallery project={project} />
      </CaseStudySection>

      <CaseStudySection
        index="10"
        label="Lessons and tradeoffs"
        title="Deliberate V1 constraints"
      >
        <NumberedList items={caseStudy.tradeoffs} />
      </CaseStudySection>

      <CaseStudySection
        index="11"
        label="Technology"
        title="Implementation stack"
      >
        <ul
          className="flex flex-wrap gap-2"
          aria-label="Implementation technologies"
        >
          {project.technologies.map((technology) => (
            <li
              key={technology}
              className="border border-border bg-surface px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-secondary"
            >
              {technology}
            </li>
          ))}
        </ul>
        {project.repository ? (
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-11 items-center border-b border-accent font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent"
          >
            View source repository <span className="ml-2" aria-hidden="true">↗</span>
          </a>
        ) : null}
      </CaseStudySection>

      {nextProject ? <NextProject project={nextProject} /> : null}
    </main>
  );
}
