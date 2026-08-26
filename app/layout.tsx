import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteUrl, getSocialImagePath } from "@/lib/site-url";

import "./globals.css";

const title = "Kazuki (James) — AI-Focused Software Engineer";
const description =
  "AI-focused software engineer with a decade of experience across web, AI, mobile, and blockchain, specializing in AI evaluation, agentic systems, and full-stack product engineering.";

const metadataBase = getSiteUrl();

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: title,
    template: "%s | James",
  },
  description,
  applicationName: "James Portfolio",
  authors: [{ name: "Kazuki (James)" }],
  creator: "Kazuki (James)",
  referrer: "strict-origin-when-cross-origin",
  alternates: metadataBase ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kazuki (James)",
    title,
    description,
    images: metadataBase
      ? [
          {
            url: getSocialImagePath(),
            width: 1200,
            height: 630,
            alt: "Kazuki (James), AI-focused software engineer portfolio preview",
          },
        ]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: metadataBase ? [getSocialImagePath()] : undefined,
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0B0B0B",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Kazuki (James)",
    alternateName: "James",
    jobTitle: "AI-Focused Software Engineer",
    description,
    ...(metadataBase ? { url: new URL("/", metadataBase).toString() } : {}),
  };

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; base-uri 'self'; connect-src 'self'; font-src 'self'; form-action 'self'; img-src 'self' data:; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; upgrade-insecure-requests"
        />
      </head>
      <body className="min-h-dvh bg-background font-sans text-primary antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="flex min-h-dvh flex-col">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
