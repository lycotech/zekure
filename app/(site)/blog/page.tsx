import Link from "next/link";
import { Container, Panel } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Stagger } from "@/components/motion/Stagger";
import { getAllPosts } from "@/lib/blog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Blog",
  "Take a trip to our blog to get new insights and articles.",
  "/blog",
);

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <>
      <PageHero
        eyebrow="Blog"
        parts={[{ t: "Read new " }, { t: "insights", em: true }]}
        sub="Take a trip to our blog to get new insights and articles."
      />
      <Panel className="py-16 md:py-20">
        <Container>
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
            {posts.map((p) => (
              <article
                key={p.slug}
                className="relative flex h-full flex-col rounded-[24px] bg-cyan-tint p-7 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
              >
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  {fmt(p.date)} · {p.readMinutes} min read
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-snug">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="after:absolute after:inset-0 after:rounded-[24px]"
                  >
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-muted">{p.description}</p>
                <span aria-hidden className="mt-4 font-medium text-link-blue">
                  Read more →
                </span>
              </article>
            ))}
          </Stagger>
        </Container>
      </Panel>
    </>
  );
}
