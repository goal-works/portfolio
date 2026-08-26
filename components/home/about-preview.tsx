import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

export function AboutPreview() {
  return (
    <Section id="about-preview" aria-labelledby="about-preview-heading">
      <Container className="grid gap-8 md:grid-cols-12">
        <SectionLabel className="md:col-span-3">About</SectionLabel>
        <div className="md:col-span-8 md:col-start-5">
          <h2
            id="about-preview-heading"
            className="text-[clamp(3rem,6.5vw,6.5rem)] font-medium leading-[0.9] tracking-[-0.06em]"
          >
            I&apos;m Kazuki—
            <span className="text-secondary">James in English.</span>
          </h2>
          <div className="mt-10 grid gap-6 text-lg leading-relaxed text-secondary md:max-w-[64ch] md:text-xl">
            <p>
              Over the past decade, I&apos;ve worked across web platforms, SaaS products,
              mobile applications, blockchain systems, and AI-powered software.
            </p>
            <p>
              My current focus is AI evaluation and agent reliability: understanding not
              just what intelligent systems can produce, but how reliably they perform and
              why they fail.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-10 inline-flex min-h-11 items-center gap-4 border-b border-accent pb-1 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:border-primary"
          >
            More about my approach
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
