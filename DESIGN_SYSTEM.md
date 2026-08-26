# Design System

## Direction
Technical editorial. Premium, calm, engineering-first. Typography, spacing, screenshots, and technical metadata should carry the visual identity.

## Theme
Dark-first. Optional light mode may be added later; do not delay V1 for it.

## Base Tokens
Suggested values; adjust only for accessibility or coherent integration with an existing system.

- Background: `#0B0B0B`
- Surface: `#111111`
- Raised surface: `#161616`
- Primary text: `#F2F0EA`
- Secondary text: `#A3A3A0`
- Muted text: `#737370`
- Border: `rgba(255,255,255,0.10)`
- Hover border: `rgba(255,255,255,0.22)`
- Accent: `#B8FF5A` used sparingly

## Typography
Preferred:
- Display/body: Geist
- Technical metadata/code: Geist Mono

Approximate scale:
- Hero H1: `clamp(3.5rem, 8vw, 8.5rem)`
- Section heading: `clamp(2.5rem, 5vw, 5.5rem)`
- Project heading: `clamp(2.4rem, 5vw, 5rem)`
- Large body: 20–24px
- Body: 16–18px
- Metadata: 11–13px, uppercase, tracking ~0.08em

Readable narrative line length should generally stay around 55–70 characters.

## Layout
- Max width: ~1440px
- Large desktop gutters: 48px
- Tablet gutters: 32px
- Mobile gutters: 20px
- 12-column desktop grid

Spacing scale:
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160`

Major sections should generally use 128–160px vertical separation on large desktop where content supports it.

## Shapes and Effects
- Border radius: mostly 0–8px
- Shadows: minimal
- Gradients: rare
- Glassmorphism: avoid
- Decorative blobs/particles: avoid
- Cards: use only when information benefits from containment

## Motion
Motion should communicate hierarchy, not spectacle.

Allowed:
- opacity reveals
- 12–20px vertical reveals
- slight project-image scale (1–2%) on hover
- subtle line/clip reveals
- small link translations

Typical duration: 300–700ms.
Respect `prefers-reduced-motion` and remove non-essential animation.

Avoid:
- scroll hijacking
- 3D perspective
- cursor trails
- continuous background animations
- typing effects
- parallax everywhere

## Project Visual Hierarchy
Project screenshots are primary visual evidence. Each flagship project may have its own visual character while remaining inside the portfolio shell:
- EvalForge: graphite, dense evaluation data
- AgentScope: traces/timelines/diagnostics
- EstateAI: brighter product/data visualization feel
- LaunchKit AI: clean B2B SaaS/admin interface
