"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/marketplace/FavoriteButton";
import { EmptyState } from "@/components/shared/EmptyState";
import { marketplaceService } from "@/lib/services/marketplaceService";
import { storage } from "@/lib/storage";

const FAVORITES_KEY = "relique_favorites";

function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
}

export default function SavedPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const ids = getFavorites();
    setFavoriteIds(ids);
    
    const allListings = marketplaceService.list({}, { page: 1, limit: 1000 }).data;
    const favoriteItems = allListings.filter(item => ids.includes(item.id));
    setFavorites(favoriteItems);
  }, []);

  const handleRemoveFavorite = (itemId: string) => {
    const newFavorites = favoriteIds.filter(id => id !== itemId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    setFavoriteIds(newFavorites);
    setFavorites(favorites.filter(item => item.id !== itemId));
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-h1 mb-4">Saved Items</h1>
          <EmptyState
            title="No saved items"
            description="Items you save will appear here"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        <div>
          <h1 className="text-h1">Saved Items</h1>
          <p className="text-muted-foreground mt-2">
            Your favorite collectibles and memorabilia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <Card key={item.id} className="h-full hover:shadow-lg transition-shadow flex flex-col">
              <Link href={`/marketplace/${item.slug}`} className="flex-1 flex flex-col">
                <div className="relative w-full h-64">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2" onClick={(e) => e.preventDefault()}>
                    <FavoriteButton itemId={item.id} />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-2xl font-bold">${item.price.toLocaleString()}</span>
                  {item.authenticated && (
                    <Badge variant="outline" className="bg-green-100 dark:bg-green-900 border-green-500">
                      Verified
                    </Badge>
                  )}
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

