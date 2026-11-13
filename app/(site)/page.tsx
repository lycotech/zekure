import { Hero } from "@/components/sections/Hero";
import { GoalSection } from "@/components/sections/GoalSection";
import { SimplifySection } from "@/components/sections/SimplifySection";
import { BuildingSection } from "@/components/sections/BuildingSection";
import { TourSection } from "@/components/sections/TourSection";
import { Marquee } from "@/components/motion/Marquee";
import { ProvidersStrip } from "@/components/sections/providers";
import { FaqSection, CareersBlogCards } from "@/components/sections/HomeExtras";
import { FaqJsonLd } from "@/components/sections/JsonLd";
import { Waitlist } from "@/components/sections/Waitlist";
import { marqueeItems } from "@/content/products";

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <Hero />
      <GoalSection />
      <SimplifySection />
      <Marquee items={marqueeItems} />
      <BuildingSection />
      <TourSection />
      <ProvidersStrip />
      <FaqSection />
      <CareersBlogCards />
      <Waitlist />
    </>
  );
}
