import type { Metadata } from "next";
import { HeroSection } from "./components/HeroSection";
import { WhySection } from "./components/WhySection";
import { MarketplaceSection } from "./components/MarketplaceSection";
import { DualBlocks } from "./components/DualBlocks";
import { TheWaySection } from "./components/TheWaySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { StrategicPartnerSection } from "./components/StrategicPartnerSection";
import { TeamSection } from "./components/TeamSection";

export const metadata: Metadata = {
  title: "Relique - Probabilistic Authentication for Collectibles",
  description: "Trusted authentication for memorabilia and collectibles. Verify, browse, and consign authenticated items.",
  openGraph: {
    title: "Relique - Probabilistic Authentication for Collectibles",
    description: "Trusted authentication for memorabilia and collectibles",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <MarketplaceSection />
      <DualBlocks />
      <TheWaySection />
      <StrategicPartnerSection />
      <TeamSection />
    </>
  );
}
