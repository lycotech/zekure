import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductPageView } from "@/components/sections/ProductPageView";
import { productPages, productSlugs } from "@/content/productPages";
import type { ProductSlug } from "@/content/products";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = productPages[slug as ProductSlug];
  if (!page) return {};
  return pageMeta(page.metaTitle, page.metaDescription, `/products/${slug}`);
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const page = productPages[slug as ProductSlug];
  if (!page) notFound();
  return <ProductPageView page={page} />;
}
