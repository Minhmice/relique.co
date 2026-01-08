import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Relique",
  description: "Relique's privacy policy and data protection practices.",
  openGraph: {
    title: "Privacy Policy - Relique",
    description: "Privacy policy and data protection",
    type: "website",
  },
};

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

