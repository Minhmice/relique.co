import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Info } from "lucide-react";
import type { MarketplaceListing } from "@/lib/types";

interface TrustPanelProps {
  listing: MarketplaceListing;
}

export function TrustPanel({ listing }: TrustPanelProps) {
  const getStatusBadge = () => {
    switch (listing.status) {
      case "qualified":
        return (
          <Badge className="bg-green-600 text-white">
            Qualified
          </Badge>
        );
      case "inconclusive":
        return (
          <Badge className="bg-yellow-600 text-white">
            Inconclusive
          </Badge>
        );
      case "disqualified":
        return (
          <Badge className="bg-red-600 text-white">
            Disqualified
          </Badge>
        );
      default:
        return listing.authenticated ? (
          <Badge className="bg-green-600 text-white">
            Authenticated
          </Badge>
        ) : null;
    }
  };

  const getStatusExplanation = () => {
    switch (listing.status) {
      case "qualified":
        return "This item has been verified with high confidence. Our AI analysis indicates strong authenticity markers.";
      case "inconclusive":
        return "This item requires additional verification. Some authenticity markers are present but more information is needed.";
      case "disqualified":
        return "This item did not pass our authentication process. Authenticity markers were not sufficient.";
      default:
        return listing.authenticated
          ? "This item has been authenticated through our verification process."
          : "This item has not yet been authenticated.";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <CardTitle>Authentication Status</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          {listing.certificate && (
            <span className="text-sm text-muted-foreground">
              Certificate: {listing.certificate}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground">
          {getStatusExplanation()}
        </p>

        {listing.authenticatedDate && (
          <div className="text-sm">
            <span className="text-muted-foreground">Verified on: </span>
            <span>{new Date(listing.authenticatedDate).toLocaleDateString()}</span>
          </div>
        )}

        {listing.coaIssuer && (
          <div className="text-sm">
            <span className="text-muted-foreground">COA Issuer: </span>
            <span>{listing.coaIssuer}</span>
          </div>
        )}

        {listing.certificate && (
          <div className="pt-4 border-t">
            <Button variant="outline" asChild className="w-full">
              <Link href={`/verify?code=${encodeURIComponent(listing.certificate)}`}>
                <Shield className="w-4 h-4 mr-2" />
                Verify this item
              </Link>
            </Button>
          </div>
        )}
        <div className="pt-4 border-t">
          <Button variant="outline" asChild className="w-full">
            <Link href="/about#artificial-intelligence">
              <Info className="w-4 h-4 mr-2" />
              Learn about our AI authentication
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

