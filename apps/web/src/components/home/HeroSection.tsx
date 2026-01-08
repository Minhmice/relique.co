import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroCentered } from "@relique/ui";

export function HeroSection() {
  return (
    <HeroCentered
      title="Relics you can rely on"
      description="Probabilistic authentication for memorabilia and collectibles. Trusted by collectors worldwide."
      actions={
        <>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/verify">Authenticate now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        </>
      }
      media={{
        src: "https://picsum.photos/1200/800?random=1",
        alt: "Relique Collectibles",
        ratio: "16:9",
        fit: "cover",
        priority: true,
        overlay: (
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
        ),
      }}
    />
  );
}
