import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger } from "@/components/motion/Stagger";
import { Reveal } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";
import { providers, providersCopy, type Provider } from "@/content/providers";

/** Status wording switches automatically when a partner is set to "confirmed" in content/providers.ts. */
export function ProviderStatus({
  p,
  linkClass = "underline underline-offset-2",
}: {
  p: Provider;
  linkClass?: string;
}) {
  if (p.status === "confirmed" && p.confirmed) {
    return (
      <>
        Licence number {p.confirmed.licenceNumber}.{" "}
        <a
          href={p.confirmed.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          Check the {p.regulator} register
        </a>
      </>
    );
  }
  return <>{p.proposedText}</>;
}

/** Full table on md+, stacked cards on small screens (only one is in the accessibility tree). */
export function ProviderTable() {
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">Zekured partners, their regulators and status</caption>
          <thead>
            <tr className="text-xs uppercase tracking-[0.14em] text-muted">
              {["Role", "Partner", "Regulator", "Status"].map((h) => (
                <th key={h} scope="col" className="border-b border-ink/15 px-4 pb-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {providers.map((p) => (
              <tr key={p.id} className="align-top">
                <th
                  scope="row"
                  className="border-b border-ink/10 px-4 py-5 font-display font-semibold"
                >
                  {p.role}
                </th>
                <td className="border-b border-ink/10 px-4 py-5">{p.partner}</td>
                <td className="border-b border-ink/10 px-4 py-5 font-medium">{p.regulator}</td>
                <td className="border-b border-ink/10 px-4 py-5 text-muted">
                  <ProviderStatus p={p} linkClass="text-link-blue underline underline-offset-2" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="space-y-4 md:hidden">
        {providers.map((p) => (
          <li key={p.id} className="rounded-[24px] bg-cyan-tint p-5">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{p.role}</p>
            <p className="mt-1 font-display text-lg font-semibold">{p.partner}</p>
            <p className="mt-1 text-sm font-medium">Regulator: {p.regulator}</p>
            <p className="mt-2 text-sm text-muted">
              <ProviderStatus p={p} linkClass="text-link-blue underline underline-offset-2" />
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

/** "Who provides this" box on product pages. */
export function ProviderBox({ ids }: { ids: Provider["id"][] }) {
  const list = providers.filter((p) => ids.includes(p.id));
  return (
    <div className="rounded-[24px] border-[1.5px] border-ink p-6">
      <h2 className="font-display text-xl font-bold">Who provides this</h2>
      <ul className="mt-4 space-y-5">
        {list.map((p) => (
          <li key={p.id}>
            <p className="font-display font-semibold">{p.partner}</p>
            <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
              <dt className="text-muted">Regulator</dt>
              <dd className="font-medium">{p.regulator}</dd>
              <dt className="text-muted">Status</dt>
              <dd>
                {p.badge && (
                  <span className="mb-1 inline-block rounded-full bg-ink px-2.5 py-0.5 text-xs text-white">
                    {p.badge}
                  </span>
                )}
                <span className="block text-muted">
                  <ProviderStatus p={p} linkClass="text-link-blue underline underline-offset-2" />
                </span>
              </dd>
            </dl>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm text-muted">
        Zekured is the interface. Licensed partners hold the licences and your money.
      </p>
    </div>
  );
}

/** Home section 8: five partner cards linking to /providers. */
export function ProvidersStrip() {
  return (
    <section
      id="providers"
      aria-labelledby="providers-h"
      className="bg-black py-20 text-white md:py-28"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="providers-h"
            eyebrow="Who is behind your money"
            parts={[{ t: "Clear roles. " }, { t: "Clear responsibility.", em: true }]}
            sub={providersCopy.intro}
            className="[&_p]:text-white/70"
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" itemClassName="h-full">
          {providers.map((p) => (
            <Link
              key={p.id}
              href="/providers"
              className="flex h-full flex-col rounded-[24px] bg-card-dark p-5 transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
            >
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-cyan">
                {p.role}
              </span>
              <span className="mt-2 flex-1 font-display font-semibold leading-snug">
                {p.partner}
              </span>
              <Pill className="mt-4 self-start">{p.regulator}</Pill>
            </Link>
          ))}
        </Stagger>
        <p className="mt-8 text-center">
          <Link
            href="/providers"
            className="inline-flex min-h-11 items-center gap-2 font-medium text-cyan"
          >
            See who does what <span aria-hidden>→</span>
          </Link>
        </p>
      </Container>
    </section>
  );
}
