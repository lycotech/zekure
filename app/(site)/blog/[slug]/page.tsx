import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, Panel } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Waitlist } from "@/components/sections/Waitlist";
import { getAllPosts, getPost } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    ...pageMeta(post.meta.title, post.meta.description, `/blog/${slug}`),
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: post.meta.date,
      authors: [post.meta.author],
    },
  };
}

const prose =
  "max-w-2xl text-lg leading-relaxed [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-2 [&_strong]:font-semibold [&_a]:text-link-blue [&_a]:underline";

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, content } = post;

  // Article structured data (no licence or regulated-business claims).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    author: { "@type": "Organization", name: meta.author },
    publisher: { "@type": "Organization", name: "Zekured" },
    mainEntityOfPage: `/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow={`${meta.readMinutes} min read`}
        parts={[{ t: meta.title }]}
        sub={meta.description}
      />
      <Panel className="py-16 md:py-20">
        <Container>
          <article className={prose}>
            <MDXRemote source={content} />
          </article>
          <p className="mt-12">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center font-medium text-link-blue underline underline-offset-2"
            >
              ← Back to the blog
            </Link>
          </p>
        </Container>
      </Panel>
      <Waitlist />
    </>
  );
}
