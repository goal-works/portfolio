import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

type CaseStudySectionProps = Readonly<{
  index: string;
  label: string;
  title: string;
  children: ReactNode;
  id?: string;
  className?: string;
}>;

export function CaseStudySection({
  index,
  label,
  title,
  children,
  id,
  className = "",
}: CaseStudySectionProps) {
  return (
    <Section id={id} className={`border-t border-border ${className}`}>
      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-mono text-xs tracking-[0.12em] text-muted">/{index}</p>
            <SectionLabel className="mt-4">{label}</SectionLabel>
          </div>
          <div className="md:col-span-9">
            <h2 className="max-w-[16ch] text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              {title}
            </h2>
            <div className="mt-10 md:mt-14">{children}</div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
