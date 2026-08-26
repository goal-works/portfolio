import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionLabel } from "@/components/ui/section-label";
import { currentFocus, engineeringPrinciples } from "@/data/about";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "About",
  description:
    "Kazuki (James) is an AI-focused software engineer with a decade of experience building across web, AI, mobile, and blockchain technologies.",
  alternates: siteUrl ? { canonical: "/about" } : undefined,
};

export default function AboutPage() {
  return (
    <main id="main-content" className="flex-1">
      <section className="py-20 md:py-28 xl:py-36">
        <Container>
          <SectionLabel>About</SectionLabel>
          <h1 className="mt-8 max-w-[12ch] text-[clamp(4rem,9vw,9rem)] font-medium leading-[0.84] tracking-[-0.07em]">
            A software engineer focused on intelligent systems.
          </h1>

          <div className="mt-16 grid gap-8 md:grid-cols-12 md:gap-12 xl:mt-24">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent md:col-span-3">
              Kazuki — James in English
            </p>
            <div className="grid max-w-[68ch] gap-7 text-lg leading-relaxed text-secondary md:col-span-8 md:text-xl">
              <p>I&apos;m Kazuki—James in English.</p>
              <p>
                I&apos;m an AI-focused software engineer with a decade of
                experience building software across web, AI, mobile, and
                blockchain technologies.
              </p>
              <p>
                My career started primarily in software and product development.
                Over the years, I&apos;ve worked across frontend and backend
                systems, SaaS products, real-estate software, mobile applications,
                blockchain technologies, APIs, infrastructure, and other
                production systems.
              </p>
              <p>
                More recently, my work has moved increasingly toward artificial
                intelligence.
              </p>
              <p>
                Today, I&apos;m particularly focused on{" "}
                <strong className="font-medium text-primary">
                  AI evaluation and agentic systems
                </strong>
                : designing challenging evaluation tasks, analyzing model and
                agent behavior, defining measurable success criteria,
                identifying failure modes, and developing systems that help
                determine whether AI actually performs reliably.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <SectionLabel className="md:col-span-3">
              Engineering and evaluation
            </SectionLabel>
            <div className="md:col-span-9">
              <h2 className="max-w-[15ch] text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                From building software to evaluating intelligence
              </h2>
              <div className="mt-10 grid max-w-[68ch] gap-7 text-lg leading-relaxed text-secondary md:mt-14 md:text-xl">
                <p>
                  Traditional software engineering gives us a relatively clear
                  contract. Given a particular input, a system should produce an
                  expected result.
                </p>
                <p>AI changes that relationship.</p>
                <p>
                  An intelligent system may produce an answer that looks
                  reasonable while violating an important requirement. An agent
                  may reach the correct result through an unreliable process. A
                  model may succeed once and fail when the same task is repeated.
                </p>
                <p>That makes evaluation an engineering problem of its own.</p>
                <p>My current interests sit at that intersection:</p>
              </div>
              <p className="mt-12 max-w-[24ch] border-l-2 border-accent pl-6 text-2xl font-medium leading-tight tracking-[-0.035em] sm:text-3xl md:ml-8 md:text-4xl">
                How do we build powerful AI systems—and how do we know they
                actually work?
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <SectionLabel className="md:col-span-3">
              Engineering principles
            </SectionLabel>
            <div className="md:col-span-9">
              <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                How I approach the work
              </h2>
              <ol className="mt-12 divide-y divide-border border-y border-border">
                {engineeringPrinciples.map((principle, index) => (
                  <li
                    key={principle.title}
                    className="grid gap-4 py-7 lg:grid-cols-12 lg:gap-6"
                  >
                    <span className="font-mono text-xs text-muted lg:col-span-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-medium tracking-[-0.025em] lg:col-span-3">
                      {principle.title}
                    </h3>
                    <p className="leading-relaxed text-secondary lg:col-span-8">
                      {principle.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <div className="grid gap-8 md:grid-cols-12 md:gap-12">
            <SectionLabel className="md:col-span-3">Current focus</SectionLabel>
            <div className="md:col-span-9">
              <h2 className="max-w-[12ch] text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Problems I&apos;m interested in
              </h2>
              <ul className="mt-12 flex flex-wrap gap-2">
                {currentFocus.map((focus) => (
                  <li
                    key={focus}
                    className="border border-border bg-background px-4 py-3 font-mono text-xs uppercase tracking-[0.08em] text-secondary"
                  >
                    {focus}
                  </li>
                ))}
              </ul>
              <p className="mt-12 max-w-[58ch] text-lg leading-relaxed text-secondary">
                I&apos;m interested in technically challenging collaboration
                across AI engineering, AI evaluation, SaaS, and full-stack
                systems.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex min-h-11 items-center border-b border-accent font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent"
              >
                Contact <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
