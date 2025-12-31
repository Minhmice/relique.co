import Link from "next/link";
import { SplitHero } from "@/components/sections/SplitHero";

export function HeroSection() {
  return (
    <SplitHero
      image="https://picsum.photos/1200/800?random=1"
      imageAlt="Relique Collectibles"
      title="Authenticate Your Collectibles"
      description="Probabilistic authentication for memorabilia and collectibles. Trusted by collectors worldwide."
      cta={{
        label: "Get Started",
        href: "/verify",
      }}
    />
  );
}
