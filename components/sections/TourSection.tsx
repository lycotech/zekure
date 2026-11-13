import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Pill";
import { Reveal } from "@/components/motion/Reveal";
import { LazyTour } from "@/components/tour/LazyTour";
import { tourLabels } from "@/content/tour";

/** Home section 7: "See it in action". */
export function TourSection() {
  return (
    <section id="tour" aria-labelledby="tour-h" className="cv-auto py-4">
      <div className="on-light mx-2 rounded-[32px] bg-cyan-tint py-20 text-ink md:mx-4 md:py-28">
        <Container className="grid items-center gap-14 md:grid-cols-[1fr_auto] md:gap-20">
          <Reveal>
            <Eyebrow>See it in action</Eyebrow>
            <Heading
              id="tour-h"
              className="mt-4 text-[length:var(--text-section)]"
              parts={[{ t: "Try the app, " }, { t: "before it launches", em: true }]}
            />
            <p className="mt-5 max-w-md text-[#475467]">
              Tap through the five tabs and edit the monthly plan to see how it works.{" "}
              {tourLabels.disclaimer}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <LazyTour />
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
