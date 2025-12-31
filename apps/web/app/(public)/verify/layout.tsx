import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Product",
  description: "Verify the authenticity of your collectibles using RLQ certification codes. Get probabilistic authentication results in seconds.",
  robots: {
    index: true,
    follow: true,
    // Note: Result pages with query params should have noindex
    // This is handled client-side in the verify page component
  },
  openGraph: {
    title: "Verify Product - Relique",
    description: "Verify the authenticity of your collectibles using RLQ certification codes.",
    type: "website",
  },
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

