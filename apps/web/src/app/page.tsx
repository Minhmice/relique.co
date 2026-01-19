import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { WhySection } from "@/components/home/WhySection";
import { MarketplaceSection } from "@/components/home/MarketplaceSection";
import { DualBlocks } from "@/components/home/DualBlocks";
import { TheWaySection } from "@/components/home/TheWaySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { StrategicPartnerSection } from "@/components/home/StrategicPartnerSection";
import { TeamSection } from "@/components/home/TeamSection";

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
