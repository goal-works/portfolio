# Portfolio Data Model

Use one source of truth for project metadata.

Suggested TypeScript model:

```ts
export type ProjectStatus = "concept" | "building" | "complete";

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  order: number;
  title: string;
  shortTitle?: string;
  category: string;
  year?: string;
  summary: string;
  description: string;
  roles: string[];
  technologies: string[];
  featured: boolean;
  status: ProjectStatus;
  repository?: string;
  demo?: string;
  cover?: string;
  screenshots: ProjectScreenshot[];
};
```

## Initial Entries
- evalforge
- agentscope
- estate-ai
- launchkit-ai
- chainlens
- pocketai

For missing links/images/years, leave fields absent rather than inventing values.

## Derived UI State
Map project status to user-facing labels:
- `concept` → `Planned` or omit from flagship UI
- `building` → `In Development`
- `complete` → use `Open Source` / `Live` only if the actual link exists
