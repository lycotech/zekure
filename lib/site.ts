export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.zekured.com").replace(
  /\/$/,
  "",
);

/** Static routes for the sitemap. Blog posts are added from content/blog. */
export const staticRoutes = [
  "/",
  "/products/savings",
  "/products/investments",
  "/products/insurance",
  "/products/loans",
  "/how-it-works",
  "/providers",
  "/about",
  "/careers",
  "/blog",
  "/contact",
];

/** Serialise JSON-LD safely for inline <script>. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
