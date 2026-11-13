import { Container, Panel } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { MessageForm } from "@/components/sections/MessageForm";
import { contact } from "@/content/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Contact", "Get in touch with the Zekured team.", "/contact");

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        parts={[{ t: "We would love to " }, { t: "hear from you", em: true }]}
        sub="Send us a message, or reach us by email or phone."
      />
      <Panel className="py-16 md:py-20">
        <Container className="grid gap-14 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-display text-3xl font-bold">Reach us</h2>
            <ul className="mt-6 space-y-2">
              <li>
                <a
                  href={`mailto:${contact.supportEmail}`}
                  className="inline-flex min-h-11 items-center text-lg font-medium text-link-blue underline underline-offset-2"
                >
                  {contact.supportEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="inline-flex min-h-11 items-center text-lg font-medium text-link-blue underline underline-offset-2"
                >
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 font-display text-3xl font-bold">Send a message</h2>
            <MessageForm
              kind="contact"
              messageLabel="Message"
              submitLabel="Send message"
              successText="Thank you. We have your message and will reply by email."
            />
          </div>
        </Container>
      </Panel>
    </>
  );
}
