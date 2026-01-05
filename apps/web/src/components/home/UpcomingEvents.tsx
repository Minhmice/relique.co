"use client";

import { useState, useEffect } from "react";
import { EventCard } from "@/components/content/EventCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { contentService } from "@/lib/services/contentService";
import type { Event } from "@/lib/schemas/content";

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const allEvents = await contentService.events.list(true);
      setEvents(allEvents.slice(0, 3));
    };
    loadEvents();
  }, []);

  if (events.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Upcoming Events"
        description="Join us at upcoming showcases, auctions, and appearances"
        cta={{
          label: "View All Events",
          href: "/events",
        }}
      />
      <div className="grid md:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

