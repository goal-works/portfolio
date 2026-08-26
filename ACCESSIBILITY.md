# Accessibility Requirements

Target WCAG 2.2 AA where practical.

## Required
- semantic document structure
- logical heading hierarchy
- keyboard navigation
- visible focus styles
- accessible mobile navigation
- skip-to-content link
- correct link vs button semantics
- descriptive alt text
- sufficient color contrast
- no color-only communication of important state
- accessible external-link labels where useful
- `prefers-reduced-motion` support
- form labels if forms are introduced
- proper table semantics for real data tables

## Motion
Reduced-motion users must not be forced through reveal/scroll animations.

## Interactive Project Cards
Project blocks must remain usable without hover. Hover may enhance but cannot reveal the only path to the project.

## Testing
Use automated accessibility tooling if already available or lightweight to add. Also manually verify keyboard navigation of the header, mobile menu, primary CTAs, project links, and case-study navigation.
