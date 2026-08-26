import Link from "next/link";

import { Container } from "./container";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 md:py-12">
      <Container className="grid gap-8 text-sm text-secondary md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
            Kazuki (James)
          </p>
          <p className="mt-2">AI-Focused Software Engineer</p>
        </div>

        <nav aria-label="Footer" className="md:col-span-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.1em]">
            <li>
              <Link
                className="inline-flex min-h-11 items-center transition-colors hover:text-primary"
                href="/work"
              >
                Work
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex min-h-11 items-center transition-colors hover:text-primary"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex min-h-11 items-center transition-colors hover:text-primary"
                href="/#contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <p className="font-mono text-xs uppercase tracking-[0.1em] md:col-span-3 md:text-right">
          Built with care. No tracking.
        </p>
      </Container>
    </footer>
  );
}
