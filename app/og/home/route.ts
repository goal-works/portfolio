import { createElement } from "react";
import { ImageResponse } from "next/og";

import { SocialImage } from "@/components/social/social-image";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    createElement(SocialImage, {
      eyebrow: "Portfolio",
      title:
        "I build intelligent products—and systems that evaluate intelligence.",
      description:
        "AI evaluation, agentic systems, and production software engineering.",
    }),
    { width: 1200, height: 630 },
  );
}
