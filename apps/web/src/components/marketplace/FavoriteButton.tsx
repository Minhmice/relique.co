"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  itemId: string;
  className?: string;
}

export function FavoriteButton({ itemId, className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(itemId));
  }, [itemId]);

  const getFavorites = (): string[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem("relique_favorites");
    return data ? JSON.parse(data) : [];
  };

  const toggleFavorite = () => {
    const favorites = getFavorites();
    const newFavorites = isFavorite
      ? favorites.filter((id) => id !== itemId)
      : [...favorites, itemId];
    
    localStorage.setItem("relique_favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      className={cn("h-8 w-8", className)}
    >
      <Heart
        className={cn(
          "h-4 w-4",
          isFavorite && "fill-red-500 text-red-500"
        )}
      />
    </Button>
  );
}

