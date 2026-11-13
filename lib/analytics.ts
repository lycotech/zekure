/**
 * Privacy-respecting analytics: self-hosted and cookieless (for example Plausible or Umami run on
 * your own Nigerian-hosted server). No advertising trackers, no cookies, so no consent banner is
 * needed. The script loads only when NEXT_PUBLIC_ANALYTICS_SRC is set.
 */
export const analytics = {
  src: process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? "",
  domain: process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN ?? "",
};
