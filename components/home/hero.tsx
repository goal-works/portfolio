import { Container } from "@/components/layout/container";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100svh-5rem)] items-end border-b border-border py-16 md:min-h-[calc(100svh-6rem)] md:py-20 xl:py-24"
    >
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5 font-mono text-xs uppercase tracking-[0.12em] md:mb-14">
          <p className="text-primary">Kazuki (James)</p>
          <p className="text-accent">AI-Focused Software Engineer</p>
        </div>

        <h1
          id="hero-heading"
          className="max-w-[12ch] text-[clamp(3.25rem,8.25vw,8.25rem)] font-medium leading-[0.9] tracking-[-0.065em] text-balance"
        >
          I build intelligent products—
          <span className="text-secondary">and systems that evaluate intelligence.</span>
        </h1>

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
          <p className="max-w-[64ch] text-lg leading-relaxed text-secondary md:col-span-7 md:text-xl lg:col-span-6">
            AI-focused software engineer with a decade of experience across web, AI,
            mobile, and blockchain, currently specializing in AI evaluation, benchmark
            engineering, agentic systems, and production AI applications.
          </p>
          <div className="md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10">
            <a
              href="#selected-work"
              className="inline-flex min-h-11 items-center gap-4 border-b border-accent pb-1 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:border-primary"
            >
              Selected work
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
