import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Pill";

/** Black hero used by company and legal pages. Always renders the page's single h1. */
export function PageHero({
  eyebrow,
  parts,
  sub,
}: {
  eyebrow?: string;
  parts: { t: string; em?: boolean }[];
  sub?: string;
}) {
  return (
    <section className="bg-black pb-14 pt-12 text-white md:pb-20 md:pt-20">
      <Container>
        {eyebrow && <Eyebrow className="mb-4 !text-white/70">{eyebrow}</Eyebrow>}
        <Heading as="h1" parts={parts} className="max-w-3xl text-[length:var(--text-hero)]" />
        {sub && <p className="mt-6 max-w-2xl text-white/75">{sub}</p>}
      </Container>
    </section>
  );
}
