import { Container, Panel } from "@/components/ui/Container";
import { PageHero } from "./PageHero";
import type { LegalSection } from "@/content/legalPages";

export function LegalShell({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero eyebrow="Legal" parts={[{ t: title }]} />
      <Panel className="py-16 md:py-20">
        <Container className="max-w-3xl">
          {sections.map((s) => (
            <section key={s.heading} className="mb-10">
              <h2 className="font-display text-2xl font-bold">{s.heading}</h2>
              {s.body?.map((p, i) => (
                <p key={i} className="mt-3 text-muted">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </Container>
      </Panel>
    </>
  );
}
