import type { Metadata } from "next";
import { AnchorSection } from "@/components/content/AnchorSection";
import { PartnerBlock } from "@/components/content/PartnerBlock";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { AnchorNav } from "@/components/content/AnchorNav";
import teamData from "@/mocks/team.json";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Relique's mission, approach, and team. Probabilistic authentication for collectibles and memorabilia.",
  openGraph: {
    title: "About Relique",
    description: "Learn about Relique's mission, approach, and team.",
    type: "website",
  },
};

const anchorItems = [
  { id: "who-we-are", label: "Who We Are" },
  { id: "one-to-appreciate", label: "One to Appreciate" },
  { id: "question-of-trust", label: "Question of Trust" },
  { id: "artificial-intelligence", label: "Artificial Intelligence" },
];

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-h1">About Relique</h1>
        <p className="text-xl text-muted-foreground">
          Probabilistic authentication for collectibles and memorabilia
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-16">
          <AnchorSection id="who-we-are" heading="Who We Are">
            <p>
              Relique is dedicated to providing transparent, evidence-based authentication services
              for collectibles and memorabilia. We combine expert analysis with advanced technology
              to deliver probabilistic authentication results that collectors can trust.
            </p>
            <p>
              Our mission is to bring clarity and confidence to the collectibles market by providing
              accessible, reliable authentication services that help collectors make informed decisions.
            </p>
          </AnchorSection>

          <AnchorSection id="one-to-appreciate" heading="One to Appreciate">
            <p>
              At Relique, we believe that every collectible has a story worth preserving. Our approach
              goes beyond simple authentication—we help you understand the history, provenance, and
              significance of your items.
            </p>
            <p>
              We work with collectors, dealers, and institutions to ensure that authentic pieces are
              properly recognized and valued, while protecting the market from counterfeits and misrepresentations.
            </p>
          </AnchorSection>

          <AnchorSection id="question-of-trust" heading="Question of Trust">
            <p>
              Trust is the foundation of the collectibles market. We understand that authentication
              decisions can have significant financial and emotional implications, which is why we
              provide transparent, evidence-based results with clear explanations.
            </p>
            <p>
              Our probabilistic model acknowledges that authentication is not always black and white.
              We provide detailed reports that explain our reasoning, the evidence we considered, and
              the confidence level of our assessment.
            </p>
            <PartnerBlock />
          </AnchorSection>

          <AnchorSection id="artificial-intelligence" heading="Artificial Intelligence">
            <p>
              We leverage cutting-edge AI and machine learning technologies to enhance our authentication
              capabilities. Our systems analyze patterns, compare against verified databases, and provide
              detailed reports on authenticity probability.
            </p>
            <p>
              Our AI models are trained on extensive datasets of authenticated items, allowing us to
              identify subtle patterns and anomalies that might be missed by human analysis alone.
              However, we always combine AI insights with expert human review to ensure the highest
              quality results.
            </p>
          </AnchorSection>

          <div id="team" className="space-y-6">
            <h2 className="text-h2">Our Team</h2>
            <TeamGrid people={teamData} />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <AnchorNav items={anchorItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
