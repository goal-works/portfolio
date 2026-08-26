"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavigationLink = Readonly<{
  href: string;
  label: string;
}>;

type MobileNavProps = Readonly<{
  links: readonly NavigationLink[];
}>;

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="inline-flex min-h-11 min-w-11 items-center justify-end font-mono text-xs uppercase tracking-[0.12em]"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      <div
        id="mobile-navigation"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-border bg-background"
      >
        <nav aria-label="Mobile">
          <ul className="mx-auto grid w-full max-w-[1440px] px-5 py-4">
            {links.map((item) => (
              <li key={item.href} className="border-t border-border first:border-t-0">
                <Link
                  href={item.href}
                  className="flex min-h-14 items-center justify-between font-mono text-xs uppercase tracking-[0.12em] text-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-accent">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
