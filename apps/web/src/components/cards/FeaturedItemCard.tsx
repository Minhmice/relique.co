import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/interactive/FavoriteButton";
import { cn } from "@/lib/utils";
import type { MarketplaceListing } from "@/lib/schemas/marketplace";

interface FeaturedItemCardProps {
  item: MarketplaceListing;
  className?: string;
}

/**
 * Featured item card - uses shadcn Card components
 * Used in featured items section on home page
 */
export function FeaturedItemCard({ item, className }: FeaturedItemCardProps) {
  const getStatusBadge = () => {
    if (item.status === "qualified") {
      return <Badge className="bg-green-600 text-white border-0">Qualified</Badge>;
    }
    if (item.status === "inconclusive") {
      return <Badge className="bg-yellow-600 text-white border-0">Inconclusive</Badge>;
    }
    if (item.status === "disqualified") {
      return <Badge className="bg-red-600 text-white border-0">Disqualified</Badge>;
    }
    if (item.authenticated) {
      return <Badge className="bg-green-600 text-white border-0">Verified</Badge>;
    }
    return null;
  };

  return (
    <Card
      className={cn(
        "h-full flex flex-col transition-all duration-200",
        "hover:border-accent hover:ring-2 hover:ring-accent hover:ring-offset-2",
        "rounded-none border-border",
        className
      )}
    >
      <Link href={`/marketplace/${item.slug}`} className="flex-1 flex flex-col">
        <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-none overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2" onClick={(e) => e.preventDefault()}>
            <FavoriteButton itemId={item.id} />
          </div>
          {getStatusBadge() && (
            <div className="absolute top-2 left-2">
              {getStatusBadge()}
            </div>
          )}
        </div>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="line-clamp-2 text-base sm:text-lg">{item.title}</CardTitle>
          <CardDescription className="text-xs sm:text-sm">{item.category}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-4 sm:p-6 pt-0">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
          {item.signedBy && (
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-2">
              Signed by: {item.signedBy}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 sm:p-6">
          <span className="text-lg sm:text-xl font-bold">${item.price.toLocaleString()}</span>
        </CardFooter>
      </Link>
    </Card>
  );
}

