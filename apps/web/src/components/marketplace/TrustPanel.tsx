"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Shield, Info, ChevronDown, Check, Clock, Package, FileCheck, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MarketplaceListing } from "@relique/shared/domain";

interface TrustPanelProps {
  listing: MarketplaceListing;
}

interface TraceabilityEvent {
  id: string;
  type: "created" | "authenticated" | "listed" | "verified" | "updated";
  title: string;
  description: string;
  date: Date;
  icon: React.ReactNode;
}

function generateMockTraceability(listing: MarketplaceListing): TraceabilityEvent[] {
  const events: TraceabilityEvent[] = [];
  const baseDate = listing.authenticatedDate
    ? new Date(listing.authenticatedDate)
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  // Item submission
  events.push({
    id: "1",
    type: "created",
    title: "Item Submitted",
    description: "Item was submitted for authentication review",
    date: new Date(baseDate.getTime() - 14 * 24 * 60 * 60 * 1000),
    icon: <Package className="w-4 h-4" />,
  });

  // Photos taken
  events.push({
    id: "2",
    type: "verified",
    title: "High-Resolution Photos Captured",
    description: "Professional photography of signatures and materials",
    date: new Date(baseDate.getTime() - 10 * 24 * 60 * 60 * 1000),
    icon: <Camera className="w-4 h-4" />,
  });

  // AI analysis
  events.push({
    id: "3",
    type: "verified",
    title: "AI Analysis Completed",
    description: "Probabilistic authentication analysis performed",
    date: new Date(baseDate.getTime() - 7 * 24 * 60 * 60 * 1000),
    icon: <FileCheck className="w-4 h-4" />,
  });

  // Authentication complete
  if (listing.authenticated) {
    events.push({
      id: "4",
      type: "authenticated",
      title: "Authentication Verified",
      description: `Status: ${listing.status || "Qualified"}. ${listing.coaIssuer ? `COA issued by ${listing.coaIssuer}` : ""}`,
      date: baseDate,
      icon: <Shield className="w-4 h-4" />,
    });
  }

  // Listed on marketplace
  events.push({
    id: "5",
    type: "listed",
    title: "Listed on Marketplace",
    description: `Listed at $${listing.price.toLocaleString()}`,
    date: new Date(baseDate.getTime() + 2 * 24 * 60 * 60 * 1000),
    icon: <Check className="w-4 h-4" />,
  });

  return events.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function TrustPanel({ listing }: TrustPanelProps) {
  const [timelineOpen, setTimelineOpen] = useState(false);
  const traceability = generateMockTraceability(listing);

  const getStatusBadge = () => {
    switch (listing.status) {
      case "qualified":
        return (
          <Badge className="bg-green-600 text-white border-0">
            Qualified
          </Badge>
        );
      case "inconclusive":
        return (
          <Badge className="bg-yellow-600 text-white border-0">
            Inconclusive
          </Badge>
        );
      case "disqualified":
        return (
          <Badge className="bg-red-600 text-white border-0">
            Disqualified
          </Badge>
        );
      default:
        return listing.authenticated ? (
          <Badge className="bg-green-600 text-white border-0">
            Authenticated
          </Badge>
        ) : null;
    }
  };

  const getStatusExplanation = () => {
    switch (listing.status) {
      case "qualified":
        return "This item has been verified with high confidence. Our AI analysis indicates strong authenticity markers.";
      case "inconclusive":
        return "This item requires additional verification. Some authenticity markers are present but more information is needed.";
      case "disqualified":
        return "This item did not pass our authentication process. Authenticity markers were not sufficient.";
      default:
        return listing.authenticated
          ? "This item has been authenticated through our verification process."
          : "This item has not yet been authenticated.";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle>Authentication Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          {listing.certificate && (
            <Badge variant="outline" className="font-mono text-xs">
              ID: {listing.certificate}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {getStatusExplanation()}
        </p>

        {listing.authenticatedDate && (
          <div className="text-sm">
            <span className="text-muted-foreground">Verified on: </span>
            <span>{new Date(listing.authenticatedDate).toLocaleDateString()}</span>
          </div>
        )}

        {listing.coaIssuer && (
          <div className="text-sm">
            <span className="text-muted-foreground">COA Issuer: </span>
            <span>{listing.coaIssuer}</span>
          </div>
        )}

        {/* Traceability Timeline */}
        <Collapsible open={timelineOpen} onOpenChange={setTimelineOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto py-2">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Clock className="w-4 h-4" />
                Traceability Timeline
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  timelineOpen && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="pt-4 pl-2 space-y-4">
              {traceability.map((event, index) => (
                <div key={event.id} className="relative pl-6">
                  {index < traceability.length - 1 && (
                    <div className="absolute left-2 top-6 bottom-0 w-px bg-border" />
                  )}
                  <div
                    className={cn(
                      "absolute left-0 top-1 w-4 h-4 rounded-full border-2 bg-background flex items-center justify-center",
                      event.type === "authenticated" && "border-green-500",
                      event.type === "verified" && "border-blue-500",
                      event.type === "listed" && "border-primary",
                      event.type === "created" && "border-muted-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        event.type === "authenticated" && "bg-green-500",
                        event.type === "verified" && "bg-blue-500",
                        event.type === "listed" && "bg-primary",
                        event.type === "created" && "bg-muted-foreground"
                      )}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {event.icon}
                      <span className="font-medium text-sm">{event.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {listing.certificate && (
          <div className="pt-4 border-t">
            <Button variant="outline" asChild className="w-full">
              <Link href={`/verify?code=${encodeURIComponent(listing.certificate)}`}>
                <Shield className="w-4 h-4 mr-2" />
                Verify this item
              </Link>
            </Button>
          </div>
        )}
        <div className="pt-2">
          <Button variant="ghost" asChild className="w-full text-muted-foreground">
            <Link href="/about#artificial-intelligence">
              <Info className="w-4 h-4 mr-2" />
              Learn about our AI authentication
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
