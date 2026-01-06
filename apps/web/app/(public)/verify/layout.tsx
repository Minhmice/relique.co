import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Product - Relique",
  description: "Enter a product ID or certificate code to verify authenticity of your collectibles",
  openGraph: {
    title: "Verify Product - Relique",
    description: "Verify authenticity of your collectibles with Relique",
    type: "website",
  },
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
