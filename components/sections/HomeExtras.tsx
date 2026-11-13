import { Container, Panel } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { faqContactLead, faqs } from "@/content/faqs";
import { contact } from "@/content/legal";

/** Home section 9. */
export function FaqSection() {
  return (
    <Panel className="py-20 md:py-28">
      <Container className="max-w-3xl">
        <Reveal>
          <SectionHeading
            id="faq-h"
            parts={[{ t: "Frequently asked " }, { t: "questions", em: true }]}
          />
        </Reveal>
        <div className="mt-10">
          <Accordion items={faqs} />
        </div>
        <p className="mt-8 text-muted">
          {faqContactLead}{" "}
          <a
            href={`mailto:${contact.supportEmail}`}
            className="font-medium text-link-blue underline underline-offset-2"
          >
            {contact.supportEmail}
          </a>
          .
        </p>
      </Container>
    </Panel>
  );
}

/** Home section 10: careers and blog cards. */
export function CareersBlogCards() {
  return (
    <section aria-label="Careers and blog" className="cv-auto bg-black py-20 text-white md:py-28">
      <Container>
        <Stagger className="grid gap-5 md:grid-cols-2" itemClassName="h-full">
          <article className="flex h-full flex-col rounded-[24px] bg-card-dark p-8 md:p-10">
            <h2 className="font-display text-3xl font-bold">
              Come <span className="em">Join Us</span>
            </h2>
            <p className="mt-3 flex-1 text-white/70">
              We invite you to explore the exciting career possibilities that await you at Zekured.
            </p>
            <div className="mt-6">
              <Button href="/careers">Explore Careers</Button>
            </div>
          </article>
          <article className="flex h-full flex-col rounded-[24px] bg-card-dark p-8 md:p-10">
            <h2 className="font-display text-3xl font-bold">
              Our <span className="em">Blog</span>
            </h2>
            <p className="mt-3 flex-1 text-white/70">
              Take a trip to our blog to get new insights and articles.
            </p>
            <div className="mt-6">
              <Button href="/blog">Go to Blog</Button>
            </div>
          </article>
        </Stagger>
      </Container>
    </section>
  );
}
