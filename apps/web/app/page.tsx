import { HeroSection } from "@/components/home/HeroSection";
import { QuickActions } from "@/components/home/QuickActions";
import { FeaturedItems } from "@/components/home/FeaturedItems";
import { FeaturedPosts } from "@/components/home/FeaturedPosts";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { Ticker } from "@/components/sections/Ticker";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import teamData from "@/mocks/team.json";

const partners = [
  { name: "PSA", logo: "/brand/logo_1.svg" },
  { name: "JSA", logo: "/brand/logo_2.svg" },
  { name: "ST.B", logo: "/brand/logo_1.svg" },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      <HeroSection />
      
      <div className="container mx-auto px-4 space-y-24">
        <QuickActions />
        
        <FeaturedItems />
        
        <FeaturedPosts />
        
        <UpcomingEvents />
        
        <div className="space-y-6">
          <SectionHeader
            title="Trusted Partners"
            description="Working with leading authentication services"
          />
          <Ticker items={partners} />
        </div>
        
        <div className="space-y-6">
          <SectionHeader
            title="Meet Our Team"
            description="The experts behind Relique"
          />
          <TeamGrid people={teamData} />
        </div>
      </div>
    </div>
  );
}
