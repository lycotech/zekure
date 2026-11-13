import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Pill";
import { LazyTour } from "@/components/tour/LazyTour";
import { Waitlist } from "@/components/sections/Waitlist";
import { Reveal } from "@/components/motion/Reveal";
import { grow, home, money, more, plan, tourLabels } from "@/content/tour";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "How it works",
  "Tour the Zekured app in five tabs: Home, Money, Plan, Grow and More. Simulated money, no real transactions.",
  "/how-it-works",
);

// Plain-text summary of each tab so the page is fully readable without JavaScript.
const summary = [
  { tab: "Home", line: home.headline },
  { tab: "Money", line: money.headline },
  { tab: "Plan", line: plan.headline },
  { tab: "Grow", line: grow.headline },
  { tab: "More", line: more.tiles.slice(0, 4).join(", ") + " and more" },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="bg-black pb-8 pt-12 text-white md:pt-20">
        <Container>
          <Eyebrow className="mb-4 !text-white/70">How it works</Eyebrow>
          <Heading
            as="h1"
            className="max-w-3xl text-[length:var(--text-hero)]"
            parts={[{ t: "Five tabs. " }, { t: "One simple app.", em: true }]}
          />
          <p className="mt-6 max-w-2xl text-white/75">
            Tap through the demo and try the monthly plan. {tourLabels.disclaimer}
          </p>
        </Container>
      </section>

      <section className="bg-black pb-20 text-white" aria-label="App tour">
        <Container className="grid items-start gap-12 md:grid-cols-[1fr_auto] md:gap-20">
          <ol className="space-y-6 md:pt-6">
            {summary.map((s, i) => (
              <Reveal as="li" key={s.tab} delay={i * 80} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan font-display font-bold text-on-cyan">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-display text-xl font-semibold">{s.tab}</h2>
                  <p className="text-white/70">{s.line}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="rounded-[32px] bg-cyan-tint p-6 md:p-10">
            <LazyTour />
          </div>
        </Container>
      </section>
      <Waitlist />
    </>
  );
}
