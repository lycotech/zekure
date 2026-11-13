import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <Container className="py-32 text-center">
          <Heading
            as="h1"
            className="text-[length:var(--text-hero)]"
            parts={[{ t: "That page " }, { t: "wandered off", em: true }]}
          />
          <p className="mx-auto mt-6 max-w-md text-white/75">
            We could not find what you were looking for.
          </p>
          <div className="mt-8">
            <Button href="/">Back to home</Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
