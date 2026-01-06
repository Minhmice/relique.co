import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Relique",
  description: "Get in touch with Relique. We're here to help with your authentication and consignment needs.",
  openGraph: {
    title: "Contact Us - Relique",
    description: "Get in touch with Relique",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

