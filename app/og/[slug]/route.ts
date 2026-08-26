import { createElement } from "react";
import { ImageResponse } from "next/og";

import { SocialImage } from "@/components/social/social-image";
import { flagshipProjects, getProjectBySlug } from "@/data/projects";

type ProjectImageRouteProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export function generateStaticParams() {
  return flagshipProjects.map((project) => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: ProjectImageRouteProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return new Response("Not found", { status: 404 });
  }

  const hasEvidence = project.screenshots.length > 0;

  return new ImageResponse(
    createElement(SocialImage, {
      eyebrow: hasEvidence ? "Validated V1" : "In Development",
      title: project.title,
      description: `${project.category} · ${hasEvidence ? "Validated implementation" : "Implementation blueprint"}`,
    }),
    { width: 1200, height: 630 },
  );
}
