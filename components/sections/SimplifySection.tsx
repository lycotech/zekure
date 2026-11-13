import { Container, Panel } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LearnMore } from "@/components/ui/Button";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { PinnedShowcase } from "./PinnedShowcase";
import { simplify } from "@/content/home";
import { legal } from "@/content/legal";
import { products } from "@/content/products";

/**
 * Stacked by default (mobile, no-JS, reduced motion). On large screens PinnedShowcase pins
 * the section and cross-fades the three rows with GSAP ScrollTrigger, loaded on demand.
 */
export function SimplifySection() {
  return (
    <Panel className="py-20 md:py-28">
      <Container>
        <PinnedShowcase
          heading={
            <Reveal>
              <SectionHeading id="simplify-h" parts={simplify.heading} sub={simplify.sub} />
            </Reveal>
          }
        >
          {simplify.rows.map((r, i) => {
            const p = products[r.product];
            return (
              <div key={r.title} className="row grid items-center gap-10 md:grid-cols-2 md:gap-16">
                <Reveal className={i % 2 ? "md:order-2" : ""}>
                  <Parallax distance={24}>
                    <ImagePlaceholder description={r.image} className="aspect-[4/3] w-full">
                      <div className="slide-card absolute bottom-5 right-4 md:-right-1">
                        <FloatingCard title={r.card.title} action={r.card.action} delay={i}>
                          {"body" in r.card ? r.card.body : undefined}
                          {"pill" in r.card && (
                            <span className="mt-2 inline-flex rounded-full border-[1.5px] border-ink px-3 py-1 text-xs font-medium text-ink">
                              {r.card.pill}
                            </span>
                          )}
                        </FloatingCard>
                      </div>
                    </ImagePlaceholder>
                  </Parallax>
                </Reveal>
                <Reveal delay={80}>
                  <h3 className="font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                    {r.title}
                  </h3>
                  <p className="mt-4 max-w-md text-muted">{r.text}</p>
                  {r.risk && <p className="mt-2 text-sm text-muted">{legal.investRisk}</p>}
                  <div className="mt-5">
                    <LearnMore
                      href={p.href}
                      color={p.linkColor}
                      about={`about ${p.name.toLowerCase()}`}
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </PinnedShowcase>
      </Container>
    </Panel>
  );
}
