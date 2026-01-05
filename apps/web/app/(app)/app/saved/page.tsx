"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@repo/ui";
import { marketplaceService } from "@/lib/services/marketplaceService";
import type { MarketplaceListing } from "@/lib/schemas/marketplace";
import { Media } from "@repo/ui";

export default function SavedPage() {
  const [favorites, setFavorites] = useState<MarketplaceListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteIds = await marketplaceService.getFavorites();
        
        if (favoriteIds.length === 0) {
          setFavorites([]);
          return;
        }
        
        // Load all items and filter by favorites
        const result = await marketplaceService.list();
        const favoriteItems = result.items.filter((item) =>
          favoriteIds.includes(item.id)
        );
        
        setFavorites(favoriteItems);
      } catch (error) {
        console.error("Failed to load favorites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFavorites();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-h1">Saved Items</h1>
          <p className="text-muted-foreground mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h1">Saved Items</h1>
        <p className="text-muted-foreground mt-2">
          Your favorite items from the marketplace
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="No saved items"
          description="Start saving items from the marketplace to see them here."
          action={
            <Link href="/marketplace">
              <button className="inline-flex items-center justify-center rounded-none bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                Browse Marketplace
              </button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <Link key={item.id} href={`/marketplace/${item.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <Media src={item.image} alt={item.title} ratio="1:1" fit="cover" />
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${item.price.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
