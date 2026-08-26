import type { ArchitectureStep } from "@/data/case-studies";

type ArchitectureDiagramProps = Readonly<{
  steps: ArchitectureStep[];
}>;

export function ArchitectureDiagram({ steps }: ArchitectureDiagramProps) {
  return (
    <ol
      aria-label="Planned system flow"
      className="grid gap-px border border-border bg-border lg:grid-cols-4"
    >
      {steps.map((step, index) => (
        <li key={step.shortLabel} className="relative bg-surface p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
              {step.shortLabel}
            </span>
            <span className="font-mono text-xs text-muted">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="mt-8 text-xl font-medium tracking-[-0.025em]">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-secondary">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
