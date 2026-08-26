import type { NextConfig } from "next";

const isStaticExport = process.env.PORTFOLIO_STATIC_EXPORT === "true";

const securityHeaders = async () => [
  {
    source: "/(.*)",
    headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ],
  },
];

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : { headers: securityHeaders }),
};

export default nextConfig;
