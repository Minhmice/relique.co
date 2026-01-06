import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace - Relique",
  description: "Browse authenticated collectibles and memorabilia from verified sellers",
  openGraph: {
    title: "Marketplace - Relique",
    description: "Browse authenticated collectibles and memorabilia",
    type: "website",
  },
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
