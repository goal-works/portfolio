import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";

export function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <Container className="grid gap-8 md:grid-cols-12">
        <SectionLabel className="md:col-span-3">Contact</SectionLabel>
        <div className="md:col-span-8 md:col-start-5">
          <h2
            id="contact-heading"
            className="text-[clamp(3.25rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.065em]"
          >
            Have an interesting problem?
          </h2>
          <p className="mt-10 max-w-[60ch] text-lg leading-relaxed text-secondary md:text-xl">
            I&apos;m interested in technically challenging collaboration across AI
            engineering, AI evaluation, SaaS, and full-stack systems.
          </p>
          <p className="mt-10 max-w-[58ch] border-l-2 border-accent pl-5 font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-muted">
            Contact channels will be added when verified details are supplied.
          </p>
        </div>
      </Container>
    </Section>
  );
}
