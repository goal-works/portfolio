import type { ComponentPropsWithoutRef } from "react";

type SectionProps = ComponentPropsWithoutRef<"section">;

export function Section({ className = "", ...props }: SectionProps) {
  return <section className={`py-20 md:py-24 xl:py-32 ${className}`} {...props} />;
}
