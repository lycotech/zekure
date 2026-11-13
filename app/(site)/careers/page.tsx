import Link from "next/link";
import { Container, Panel } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { MessageForm } from "@/components/sections/MessageForm";
import { careersCopy, openRoles } from "@/content/careers";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("Careers", careersCopy.text, "/careers");

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Careers" parts={careersCopy.heading} sub={careersCopy.text} />
      <Panel className="py-16 md:py-20">
        <Container className="grid gap-14 md:grid-cols-2">
          <section aria-labelledby="roles-h">
            <h2 id="roles-h" className="font-display text-3xl font-bold">
              Open roles
            </h2>
            {openRoles.length > 0 ? (
              <ul className="mt-6 divide-y divide-ink/10">
                {openRoles.map((r) => (
                  <li key={r.title} className="py-4">
                    {r.href ? (
                      <Link
                        href={r.href}
                        className="font-display text-lg font-semibold text-link-blue underline underline-offset-2"
                      >
                        {r.title}
                      </Link>
                    ) : (
                      <p className="font-display text-lg font-semibold">{r.title}</p>
                    )}
                    <p className="text-sm text-muted">
                      {r.team} · {r.location}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-muted">
                We do not have specific roles listed right now. Send us a general application and
                tell us how you could help.
              </p>
            )}
          </section>
          <section aria-labelledby="apply-h">
            <h2 id="apply-h" className="font-display text-3xl font-bold">
              General application
            </h2>
            <div className="mt-6">
              <MessageForm
                kind="careers"
                messageLabel="Tell us about yourself and the work you want to do"
                submitLabel="Send application"
                successText="Thank you. We have your application and will be in touch if there is a fit."
              />
            </div>
          </section>
        </Container>
      </Panel>
    </>
  );
}
