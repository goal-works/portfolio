import type { MetadataRoute } from "next";

import { flagshipProjects } from "@/data/projects";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  if (!siteUrl) {
    return [];
  }

  const routes = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    ...flagshipProjects.map((project) => ({
      path: `/work/${project.slug}`,
      priority: 0.8,
    })),
  ];

  return routes.map((route) => ({
    url: new URL(route.path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
