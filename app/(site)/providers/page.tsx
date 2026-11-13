import { Container, Panel } from "@/components/ui/Container";
import { Heading } from "@/components/ui/SectionHeading";
import { Eyebrow } from "@/components/ui/Pill";
import { ProviderTable } from "@/components/sections/providers";
import { Waitlist } from "@/components/sections/Waitlist";
import { providersCopy } from "@/content/providers";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Who is behind your money",
  "Clear roles, clear responsibility: the partners and regulators behind Zekured.",
  "/providers",
);

export default function ProvidersPage() {
  return (
    <>
      <section className="bg-black pb-16 pt-12 text-white md:pt-20">
        <Container>
          <Eyebrow className="mb-4 !text-white/70">Who is behind your money</Eyebrow>
          <Heading
            as="h1"
            parts={providersCopy.heading}
            className="max-w-3xl text-[length:var(--text-hero)]"
          />
          <p className="mt-6 max-w-2xl text-white/75">{providersCopy.intro}</p>
        </Container>
      </section>
      <Panel className="py-16 md:py-20">
        <Container>
          <ProviderTable />
          <p className="mt-10 max-w-3xl font-medium">{providersCopy.closing}</p>
        </Container>
      </Panel>
      <Waitlist />
    </>
  );
}
