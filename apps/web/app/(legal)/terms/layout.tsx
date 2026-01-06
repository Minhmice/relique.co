import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Relique",
  description: "Terms of service for using Relique's authentication and marketplace services.",
  openGraph: {
    title: "Terms of Service - Relique",
    description: "Terms of service",
    type: "website",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

