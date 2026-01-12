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
import { CompareButton } from "@/components/marketplace/CompareDrawer";
import { WatchlistButton } from "@/components/marketplace/WatchlistButton";
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
  const url = `${baseUrl}/marketplace/${slug}`;
  const ogImage = listing.image || `${baseUrl}/og-default.jpg`;
  
  return {
    title: `${listing.title} | Relique Marketplace`,
    description: listing.description || `Authenticated ${listing.category.toLowerCase()} - ${listing.title}. Verified by ${listing.coaIssuer || "Relique"}.`,
    keywords: [
      listing.category,
      listing.signedBy,
      listing.coaIssuer,
      "authenticated collectibles",
      "memorabilia",
      "verified",
    ].filter((k): k is string => Boolean(k)),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: listing.title,
      description: listing.description || `Authenticated ${listing.category.toLowerCase()} - ${listing.title}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: listing.title,
        },
      ],
      url,
      type: "website",
      siteName: "Relique",
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description: listing.description || `Authenticated ${listing.category.toLowerCase()} - ${listing.title}`,
      images: [ogImage],
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
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ItemGallery images={images} alt={listing.title} />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FavoriteButton itemId={listing.id} />
                <span className="text-sm text-muted-foreground">Favorite</span>
              </div>
              <div className="flex items-center gap-2">
                <CompareButton item={listing} />
                <span className="text-sm text-muted-foreground">Compare</span>
              </div>
              <div className="flex items-center gap-2">
                <WatchlistButton itemId={listing.id} itemTitle={listing.title} />
                <span className="text-sm text-muted-foreground">Watch</span>
              </div>
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
              {listing.certificate && (
                <Button size="lg" className="w-full" asChild>
                  <Link href={`/verify?code=${encodeURIComponent(listing.certificate)}`}>
                    Verify this item
                  </Link>
                </Button>
              )}
              <Button variant="outline" size="lg" className="w-full" asChild>
                <a href={`mailto:contact@relique.co?subject=Inquiry about ${listing.title}`}>
                  Inquire
                </a>
              </Button>
              <div className="flex items-center gap-4 pt-2">
                <FavoriteButton itemId={listing.id} />
                <WatchlistButton itemId={listing.id} itemTitle={listing.title} variant="button" />
                <CompareButton item={listing} variant="button" />
              </div>
            </div>
          </div>
        </div>

        <RelatedItems currentListing={listing} />
      </div>
    </div>
  );
}
