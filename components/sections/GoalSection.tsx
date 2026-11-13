import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icons";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { goal } from "@/content/home";

export function GoalSection() {
  return (
    <section aria-labelledby="goal-h" className="bg-black py-20 text-white md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="goal-h"
            eyebrow={goal.eyebrow}
            parts={goal.heading}
            sub={goal.sub}
            className="[&_p]:text-white/70"
          />
        </Reveal>
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemClassName="h-full">
          {goal.features.map((f) => (
            <article key={f.title} className="feature h-full rounded-[24px] bg-card-dark p-7">
              <span className="feature-icon flex h-12 w-12 items-center justify-center rounded-full bg-black text-cyan">
                <Icon name={f.icon} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-white/70">{f.text}</p>
            </article>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
