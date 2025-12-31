import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { contentService } from "@/lib/services/contentService";
import { EventCard } from "@/components/content/EventCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = contentService.events.get(slug);
  
  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://relique.co";
  
  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.image],
      url: `${baseUrl}/events/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.image],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const event = contentService.events.get(slug);
  
  if (!event) {
    notFound();
  }

  const eventDate = new Date(event.date);
  const isUpcoming = eventDate >= new Date();
  const relatedEvents = contentService.events.list(false)
    .filter((e) => e.id !== event.id && e.type === event.type)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <Button variant="ghost" asChild>
          <Link href="/events">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </Button>

        <div className="relative w-full h-96 mb-8">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          {event.featured && (
            <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-h1 mb-4">{event.title}</h1>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">{eventDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg">{event.time}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{event.location}</span>
              </div>
              {event.type && (
                <Badge variant="outline" className="mt-2">
                  {event.type}
                </Badge>
              )}
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed">{event.description}</p>
          </div>

          {isUpcoming && (
            <div className="pt-8 border-t space-y-4">
              <Button size="lg" asChild>
                <Link href="/consign">Consign an Item</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          )}
        </div>

        {relatedEvents.length > 0 && (
          <div className="space-y-6 pt-12 border-t">
            <h2 className="text-h2">Related Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEvents.map((relatedEvent) => (
                <EventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

