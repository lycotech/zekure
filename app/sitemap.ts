import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { siteUrl, staticRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.date,
  }));
  // /privacy and /terms are noindex shells until the legal team supplies the text.
  return [...staticRoutes.map((r) => ({ url: `${siteUrl}${r}` })), ...posts];
}
