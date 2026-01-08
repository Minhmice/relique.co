import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import teamData from "@/mocks/team.json";
import { Container, PartnerStrip, QuickActions, Section, TeamGrid } from "@relique/ui";

export const metadata: Metadata = {
  title: "Relique - Probabilistic Authentication for Collectibles",
  description: "Trusted authentication for memorabilia and collectibles. Verify, browse, and consign authenticated items.",
  openGraph: {
    title: "Relique - Probabilistic Authentication for Collectibles",
    description: "Trusted authentication for memorabilia and collectibles",
    type: "website",
  },
};

const partners = [
  { name: "PSA", logo: "/brand/logo_1.svg" },
  { name: "JSA", logo: "/brand/logo_2.svg" },
  { name: "ST.B", logo: "/brand/logo_1.svg" },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      
      <Container className="space-y-24">
        <FeatureSection />
        
        <Section size="md">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-h2">Quick Actions</h2>
              <p className="text-muted-foreground">Get started with Relique</p>
            </div>
            <QuickActions
              items={[
                {
                  title: "Verify",
                  description: "Authenticate your collectibles with our verification flow",
                  href: "/verify",
                },
                {
                  title: "Marketplace",
                  description: "Browse authenticated collectibles and memorabilia",
                  href: "/marketplace",
                },
                {
                  title: "Consign",
                  description: "Submit your items for authentication and consignment",
                  href: "/consign",
                },
                {
                  title: "Learn More",
                  description: "Discover how our authentication process works",
                  href: "/about",
                },
              ]}
            />
          </div>
        </Section>
        
        <Section size="md">
          <PartnerStrip
            title="Trusted Partners"
            partners={partners.map((p) => ({ name: p.name, logoSrc: p.logo, href: p.logo }))}
          />
        </Section>
        
        <Section size="md">
          <TeamGrid
            title="Meet Our Team"
            members={(teamData as any[]).map((p) => ({
              name: p.name,
              role: p.role,
              bio: p.bio,
              imageSrc: p.image,
            }))}
          />
        </Section>
        
        <FeaturedItems />
        
        <FeaturedPosts />
        
        <UpcomingEvents />
      </Container>
    </div>
  );
}
