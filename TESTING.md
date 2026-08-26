# Testing and Validation

## Portfolio
At minimum run the repository's equivalents of:
- lint
- TypeScript/typecheck
- tests
- production build

Visual verification at:
- 375px
- 768px
- 1440px

Also verify:
- all routes
- navigation
- external links that are actually configured
- 404
- metadata
- no accidental overflow
- reduced-motion behavior
- keyboard navigation

## Lighthouse Goals
Targets, not fabricated guarantees:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

If targets are not met, report actual results and the reasons. Do not claim unmeasured scores.

## Project Applications
Each flagship project needs project-specific testing. See each project specification.

## Completion Integrity
Never report `pass` unless the command was actually run successfully in the current environment.
Use `not run` or `unable to validate` explicitly when required tooling/services are unavailable.
