import { Container, Panel } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Stagger } from "@/components/motion/Stagger";
import { Waitlist } from "@/components/sections/Waitlist";
import { about } from "@/content/about";
import { shown } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("About", about.mission, "/about");

export default function AboutPage() {
  // Placeholder rows (still "[TO CONFIRM]") are dropped, so nothing unfinished is shown.
  const values = about.values.filter((v) => shown(v.title) && shown(v.text));
  const timeline = about.timeline.filter((t) => shown(t.when) && shown(t.what));
  return (
    <>
      <PageHero eyebrow="About" parts={about.heading} sub={about.mission} />
      {(values.length > 0 || timeline.length > 0) && (
        <Panel className="py-16 md:py-20">
          <Container>
            {values.length > 0 && (
              <>
                <h2 className="font-display text-3xl font-bold">Our values</h2>
                <Stagger className="mt-8 grid gap-5 md:grid-cols-3" itemClassName="h-full">
                  {values.map((v) => (
                    <article key={v.title} className="h-full rounded-[24px] bg-cyan-tint p-7">
                      <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                      <p className="mt-2 text-muted">{v.text}</p>
                    </article>
                  ))}
                </Stagger>
              </>
            )}
            {timeline.length > 0 && (
              <>
                <h2 className="mt-16 font-display text-3xl font-bold">Our journey</h2>
                <ol className="mt-8 space-y-5 border-l-2 border-ink/15 pl-6">
                  {timeline.map((t) => (
                    <li key={t.when + t.what}>
                      <p className="text-sm font-medium uppercase tracking-widest text-muted">
                        {t.when}
                      </p>
                      <p className="font-display text-lg font-semibold">{t.what}</p>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </Container>
        </Panel>
      )}
      <Waitlist />
    </>
  );
}
