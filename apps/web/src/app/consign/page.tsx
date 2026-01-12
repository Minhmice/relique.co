import type { Metadata } from "next";
import { ConsignPageContent } from "./ConsignPageContent";

export const metadata: Metadata = {
  title: "Consign Your Items",
  description: "Partner with Relique to sell your authenticated collectibles. Submit your items for authentication and consignment.",
  openGraph: {
    title: "Consign Your Items - Relique",
    description: "Partner with Relique to sell your authenticated collectibles.",
    type: "website",
  },
};

export default function ConsignPage() {
  return <ConsignPageContent />;
}
