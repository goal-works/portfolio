import Link from "next/link";

import { Container } from "./container";
import { MobileNav } from "./mobile-nav";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="relative z-50 border-b border-border bg-background/95">
      <Container className="flex min-h-20 items-center justify-between md:min-h-24">
        <Link
          href="/"
          aria-label="Kazuki (James), home"
          className="inline-flex min-h-11 items-center font-mono text-sm font-semibold tracking-[0.08em]"
        >
          JAMES<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 lg:gap-12">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center font-mono text-xs uppercase tracking-[0.12em] text-secondary transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav links={navigation} />
      </Container>
    </header>
  );
}
