import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events - Relique",
  description: "Join us at upcoming showcases, auctions, and appearances related to collectibles authentication.",
  openGraph: {
    title: "Events - Relique",
    description: "Upcoming events and showcases",
    type: "website",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
