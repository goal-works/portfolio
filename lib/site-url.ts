export function getSiteUrl(): URL | undefined {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configuredUrl) {
    return undefined;
  }

  try {
    const url = new URL(configuredUrl);
    return url.protocol === "https:" || url.protocol === "http:" ? url : undefined;
  } catch {
    return undefined;
  }
}

export function getCanonical(path: string): string | undefined {
  const siteUrl = getSiteUrl();
  return siteUrl ? new URL(path, siteUrl).toString() : undefined;
}

export function getSocialImagePath(slug = "home"): string {
  const extension = process.env.PORTFOLIO_STATIC_EXPORT === "true" ? ".png" : "";
  return `/og/${slug}${extension}`;
}
