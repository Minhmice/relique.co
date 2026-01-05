import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import teamData from "@/mocks/team.json";
import { Container, PartnerStrip, QuickActions, Section, TeamGrid } from "@repo/ui";

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
        
        <FeaturedItems />
        
        <FeaturedPosts />
        
        <UpcomingEvents />
        
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
      </Container>
    </div>
  );
}
