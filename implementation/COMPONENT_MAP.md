# Suggested Component Map

Adapt names to existing conventions where appropriate.

```text
app/
├── layout.tsx
├── page.tsx
├── work/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── about/page.tsx
└── not-found.tsx

components/
├── layout/
│   ├── header.tsx
│   ├── mobile-nav.tsx
│   ├── footer.tsx
│   └── container.tsx
├── home/
│   ├── hero.tsx
│   ├── selected-work.tsx
│   ├── featured-project.tsx
│   ├── ai-evaluation.tsx
│   ├── expertise.tsx
│   ├── professional-work.tsx
│   ├── about-preview.tsx
│   └── contact.tsx
├── project/
│   ├── project-hero.tsx
│   ├── project-meta.tsx
│   ├── project-status.tsx
│   ├── project-gallery.tsx
│   ├── architecture-diagram.tsx
│   ├── technical-callout.tsx
│   └── next-project.tsx
└── ui/
    ├── section-label.tsx
    ├── external-link.tsx
    ├── reveal.tsx
    └── ...
```

## Guidance
- prefer server components where interaction is unnecessary
- keep client boundaries small
- use reusable layout primitives rather than abstracting every piece of markup
- do not build a heavyweight design-system package for a single portfolio
- avoid hardcoding project metadata in multiple sections
