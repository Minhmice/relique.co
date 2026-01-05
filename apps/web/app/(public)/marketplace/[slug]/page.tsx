import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ItemGallery } from "@/components/marketplace/ItemGallery";
import { FavoriteButton } from "@/components/marketplace/FavoriteButton";
import { TrustPanel } from "@/components/marketplace/TrustPanel";
import { RelatedItems } from "@/components/marketplace/RelatedItems";
import { marketplaceService } from "@/lib/services/marketplaceService";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = await marketplaceService.getBySlug(slug);
  
  if (!listing) {
    return {
      title: "Listing Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://relique.co";
  
  return {
    title: listing.title,
    description: listing.description,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.image],
      url: `${baseUrl}/marketplace/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description: listing.description,
      images: [listing.image],
    },
  };
}

export default async function MarketplaceDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const listing = await marketplaceService.getBySlug(slug);
  
  if (!listing) {
    notFound();
  }

  const images = listing.images || [listing.image];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ItemGallery images={images} alt={listing.title} />
            <div className="flex items-center gap-2">
              <FavoriteButton itemId={listing.id} />
              <span className="text-sm text-muted-foreground">Add to favorites</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-h1">{listing.title}</h1>
              <p className="text-2xl font-semibold text-muted-foreground mt-2">
                ${listing.price.toLocaleString()}
              </p>
            </div>

            <TrustPanel listing={listing} />

            <Card>
              <CardHeader>
                <CardTitle>Item Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product ID:</span>
                  <span className="font-mono text-sm">{listing.certificate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <Badge variant="outline">{listing.category}</Badge>
                </div>
                {listing.signedBy && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signed By:</span>
                    <span>{listing.signedBy}</span>
                  </div>
                )}
                {listing.coaIssuer && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">COA Issuer:</span>
                    <span>{listing.coaIssuer}</span>
                  </div>
                )}
                {listing.condition && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Condition:</span>
                    <span>{listing.condition}</span>
                  </div>
                )}
                {listing.authenticatedDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Authenticated:</span>
                    <span>{new Date(listing.authenticatedDate).toLocaleDateString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {listing.fullDescription && (
              <div className="space-y-4">
                <h2 className="text-h3">Description</h2>
                <p className="text-body text-muted-foreground">{listing.fullDescription}</p>
              </div>
            )}

            {listing.provenance && (
              <div className="space-y-4">
                <h2 className="text-h3">Provenance</h2>
                <p className="text-body text-muted-foreground">{listing.provenance}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button size="lg" className="w-full" asChild>
                <a href={`mailto:contact@relique.co?subject=Inquiry about ${listing.title}`}>
                  Contact Seller
                </a>
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href={`/verify?productId=${listing.certificate}`}>
                  Request Verification
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/consign">
                  Consign Similar Item
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <RelatedItems currentListing={listing} />
      </div>
    </div>
  );
}
