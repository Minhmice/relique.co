"use client";

import { useState } from "react";
import { EventCard } from "@/components/content/EventCard";
import { EventTimeline } from "@/components/content/EventTimeline";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Button } from "@/components/ui/button";
import { contentService } from "@/lib/services/contentService";

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"cards" | "timeline">("cards");
  const allEvents = contentService.events.list();
  const upcomingEvents = contentService.events.list(true);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-12">
        <div className="flex items-center justify-between">
          <SectionHeader
            title="Events & Appearances"
            description="Join us at upcoming events, auctions, and showcases"
          />
          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              onClick={() => setViewMode("cards")}
            >
              Cards
            </Button>
            <Button
              variant={viewMode === "timeline" ? "default" : "outline"}
              onClick={() => setViewMode("timeline")}
            >
              Timeline
            </Button>
          </div>
        </div>

        {viewMode === "cards" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <EventTimeline events={allEvents} />
        )}

        {allEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events scheduled at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}

