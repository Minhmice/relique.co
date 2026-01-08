import type { Metadata } from "next";
import { ConsignForm } from "@/components/consign/ConsignForm";

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
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-h1">Consign Your Items</h1>
          <p className="text-xl text-muted-foreground">
            Partner with us to sell your authenticated collectibles
          </p>
        </div>

        <ConsignForm />
      </div>
    </div>
  );
}
