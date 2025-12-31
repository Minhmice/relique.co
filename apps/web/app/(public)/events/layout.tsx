import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Appearances",
  description: "Upcoming events, appearances, and shows featuring Relique authentication services.",
  openGraph: {
    title: "Events & Appearances - Relique",
    description: "Upcoming events, appearances, and shows featuring Relique authentication services.",
    type: "website",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

