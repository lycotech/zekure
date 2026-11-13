import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaitlistForm } from "./WaitlistForm";

export function Waitlist() {
  return (
    <section
      id="waitlist"
      aria-labelledby="waitlist-h"
      className="scroll-mt-24 bg-black py-24 text-white"
    >
      <Container className="text-center">
        <Reveal>
          <Heading
            id="waitlist-h"
            className="text-[length:var(--text-section)]"
            parts={[{ t: "Our Mobile app is " }, { t: "coming soon", em: true }]}
          />
          <p className="mx-auto mt-4 mb-10 max-w-xl text-white/75">
            So what are you waiting for? Join our waitlist to know when we launch our mobile app.
          </p>
        </Reveal>
        <WaitlistForm />
      </Container>
    </section>
  );
}
