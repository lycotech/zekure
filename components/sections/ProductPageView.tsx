import { Container, Panel } from "@/components/ui/Container";
import { Heading, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Pill, Sparkle } from "@/components/ui/Pill";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Accordion } from "@/components/ui/Accordion";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { Waitlist } from "@/components/sections/Waitlist";
import { ProviderBox } from "@/components/sections/providers";
import { legal } from "@/content/legal";
import { products } from "@/content/products";
import type { ProductPage } from "@/content/productPages";

/** One template for all four product pages. */
export function ProductPageView({ page }: { page: ProductPage }) {
  const accent = products[page.slug].color;
  return (
    <>
      <section aria-labelledby="pp-h" className="bg-black text-white">
        <Container className="grid items-center gap-12 pb-20 pt-10 md:grid-cols-2 md:pb-28 md:pt-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Sparkle color={accent} size={22} className="anim-twinkle" />
              <Eyebrow className="!text-white/70">{page.eyebrow}</Eyebrow>
              {page.comingLater && <Pill tone="cyan">Coming later</Pill>}
            </div>
            <Heading
              id="pp-h"
              as="h1"
              parts={page.headline}
              className="text-[length:var(--text-hero)]"
            />
            <p className="mt-6 max-w-lg text-white/75">{page.sub}</p>
            <div className="mt-8">
              <Button href="/#waitlist">
                {page.comingLater ? "Join the waitlist" : "Get Started"}
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <ImagePlaceholder description={page.image} className="aspect-[4/3] w-full" />
            <FloatingCard
              title={page.ui.title}
              className="absolute -bottom-4 right-3 md:-right-4"
            />
          </div>
        </Container>
      </section>

      <section aria-label="Benefits" className="bg-black pb-20 text-white md:pb-28">
        <Container>
          <Stagger className="grid gap-5 md:grid-cols-3" itemClassName="h-full">
            {page.benefits.map((b) => (
              <article key={b.title} className="h-full rounded-[24px] bg-card-dark p-8">
                <Sparkle color={accent} size={24} />
                <h2 className="mt-4 font-display text-xl font-semibold">{b.title}</h2>
                <p className="mt-2 text-white/70">{b.text}</p>
              </article>
            ))}
          </Stagger>
        </Container>
      </section>

      <Panel className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading id="steps-h" parts={[{ t: "How it " }, { t: "works", em: true }]} />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3" itemClassName="h-full">
            {page.steps.map((s, i) => (
              <div key={s.title} className="h-full rounded-[24px] bg-cyan-tint p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </div>
            ))}
          </Stagger>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] border-[1.5px] border-black bg-cyan-tint p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-muted">
                  Illustrative
                </p>
                <h2 className="mt-1 font-display text-xl font-bold">{page.ui.title}</h2>
                <ul className="mt-4 space-y-3">
                  {page.ui.items.map((it) => (
                    <li key={it.label} className="rounded-2xl bg-white p-4">
                      <p className="font-semibold">{it.label}</p>
                      {it.detail && <p className="text-sm text-muted">{it.detail}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <ProviderBox ids={page.providerIds} />
            </Reveal>
          </div>

          <Reveal className="mt-8 rounded-[24px] bg-ink p-6 text-white">
            <h2 className="font-display text-lg font-semibold">Risk and fees</h2>
            <p className="mt-2 text-white/80">{page.note}</p>
            {page.showInvestRisk && page.note !== legal.investRisk && (
              <p className="mt-2 text-white/80">{legal.investRisk}</p>
            )}
          </Reveal>

          <div className="mt-16 max-w-3xl">
            <h2 className="mb-4 font-display text-3xl font-bold">Questions</h2>
            <Accordion items={page.faqs} />
          </div>
        </Container>
      </Panel>

      <Waitlist />
    </>
  );
}
