import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Pill, Sparkle } from "@/components/ui/Pill";
import { FloatingCard } from "@/components/ui/FloatingCard";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { hero } from "@/content/home";
import { HeroEffects } from "./HeroEffects";

/** Word-by-word reveal via CSS only: the text is in the server HTML and never JS-gated. */
function Words({ parts }: { parts: { t: string; em?: boolean }[] }) {
  let i = 0;
  return (
    <>
      {parts.map((p, pi) => {
        const words = p.t.trim().split(/\s+/);
        const nodes = words.map((w) => (
          <span
            key={`${pi}-${w}-${i}`}
            className="word"
            style={{ "--i": i++ } as React.CSSProperties}
          >
            {w}
            {" "}
          </span>
        ));
        return p.em ? (
          <span key={pi} className="em sweep">
            {nodes}
          </span>
        ) : (
          <span key={pi}>{nodes}</span>
        );
      })}
    </>
  );
}

function Badge() {
  const text = "SAVE · INVEST · INSURE · LEND · ";
  return (
    <div
      className="absolute -left-4 bottom-10 h-[116px] w-[116px] md:-left-10 md:h-[136px] md:w-[136px]"
      aria-hidden
    >
      <svg viewBox="0 0 120 120" className="anim-spin h-full w-full">
        <defs>
          <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="#000" stroke="rgba(255,255,255,0.25)" />
        <text fill="#fff" fontSize="10.5" letterSpacing="2.2" fontWeight="500">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <Sparkle
        size={34}
        className="anim-twinkle absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-h"
      className="hero relative overflow-hidden bg-black text-white"
    >
      <HeroEffects />
      <Container className="relative grid items-center gap-12 pb-20 pt-10 md:grid-cols-[1.05fr_0.95fr] md:pb-28 md:pt-16">
        <div>
          <Pill className="mb-6 normal-case tracking-normal !text-[13px]">{hero.chip}</Pill>
          <h1
            id="hero-h"
            className="font-display text-[length:var(--text-hero)] font-bold leading-[1.05] tracking-tight"
          >
            <Words parts={hero.headline} />
          </h1>
          <p className="mt-6 max-w-lg text-white/75">{hero.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/#waitlist" className="hero-btn">
              Get Started
            </Button>
            <Button href="/how-it-works" variant="secondary" className="hero-btn">
              Learn more<span className="sr-only"> about how Zekured works</span>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="photo-reveal">
            <ImagePlaceholder
              description="young Nigerian woman smiling, holding a phone, blue top"
              className="aspect-[4/5] w-full"
            />
          </div>
          <Badge />
          <FloatingCard
            title="Portfolio Diversity"
            className="absolute -right-2 top-8 md:-right-6"
            delay={0}
          />
          <FloatingCard
            title="Save for rainy days"
            className="absolute bottom-6 right-2 md:-right-2"
            delay={1.5}
          />
        </div>
      </Container>
    </section>
  );
}
