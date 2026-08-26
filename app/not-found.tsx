import Link from "next/link";

import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <main id="main-content" className="flex flex-1 items-center py-20 md:py-28">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
          404 / Not found
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
          <h1 className="max-w-[10ch] text-[clamp(4rem,10vw,9rem)] font-medium leading-[0.82] tracking-[-0.07em] md:col-span-8">
            This route doesn&apos;t exist.
          </h1>
          <div className="md:col-span-4">
            <p className="max-w-[38ch] text-lg leading-relaxed text-secondary">
              The page may have moved, or the requested project does not have a
              public case study.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center border-b border-accent font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:text-accent"
              >
                Home <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/work"
                className="inline-flex min-h-11 items-center border-b border-border font-mono text-xs uppercase tracking-[0.1em] text-secondary transition-colors hover:border-accent hover:text-primary"
              >
                Work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
