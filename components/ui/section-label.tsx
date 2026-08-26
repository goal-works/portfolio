import type { ComponentPropsWithoutRef } from "react";

type SectionLabelProps = ComponentPropsWithoutRef<"p">;

export function SectionLabel({ className = "", ...props }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.12em] text-muted ${className}`}
      {...props}
    />
  );
}
