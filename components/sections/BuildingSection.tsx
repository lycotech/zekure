import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Sparkle } from "@/components/ui/Pill";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { building } from "@/content/home";
import { legal } from "@/content/legal";
import { products } from "@/content/products";

export function BuildingSection() {
  return (
    <section aria-labelledby="building-h" className="cv-auto bg-black py-20 text-white md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="building-h"
            parts={building.heading}
            sub={building.sub}
            className="[&_p]:text-white/70"
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3" itemClassName="h-full">
          {building.cards.map((c) => {
            const p = products[c.product];
            return (
              <article
                key={c.title}
                className="flex h-full flex-col rounded-[24px] bg-card-dark p-8"
              >
                <Sparkle color={p.color} size={28} className="anim-twinkle" />
                <h3 className="mt-5 font-display text-2xl font-semibold leading-snug">{c.title}</h3>
                <p className="mt-3 flex-1 text-white/70">{c.text}</p>
                {"risk" in c && c.risk && (
                  <p className="mt-3 text-sm text-white/75">{legal.investRisk}</p>
                )}
              </article>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
