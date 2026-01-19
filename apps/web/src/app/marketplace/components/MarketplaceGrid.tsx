"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { marketplaceService } from "@/lib/services/marketplaceService";
import type { MarketplaceListing } from "@/lib/schemas/marketplace";
import { MarketplaceCard } from "@/components/cards/MarketplaceCard";
import { listingToCardItem } from "@/lib/utils/marketplace";
import { ListingPageHeader } from "@/components/primitives/ListingPageHeader";
import { LoadingState } from "@/components/shared/LoadingState";

/**
 * Marketplace grid wrapper component
 * Handles data fetching, filtering, and rendering
 * Wraps reusable components from src/components/marketplace
 */
export function MarketplaceGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MarketplaceListing[]>([]);
  const [categoryFilter, setCategoryFilter] = useState(
    searchParams.get("category") || "ALL SPORTS"
  );
  const [sortBy, setSortBy] = useState("PRICE: HIGH TO LOW");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const filters: any = {};
        if (categoryFilter !== "ALL SPORTS") {
          filters.category = categoryFilter;
        }

        const sortMap: Record<string, string> = {
          "PRICE: HIGH TO LOW": "price-desc",
          "PRICE: LOW TO HIGH": "price-asc",
        };

        const result = await marketplaceService.list({
          filters,
          sort: sortMap[sortBy] as any,
          page: 1,
          pageSize: 100,
        });
        setItems(result.items);
      } catch (error) {
        console.error("Failed to load marketplace items:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [categoryFilter, sortBy]);

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL SPORTS") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`/marketplace?${params.toString()}`);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <ListingPageHeader
        categoryFilter={categoryFilter}
        sortBy={sortBy}
        onCategoryChange={handleCategoryChange}
        onSortChange={setSortBy}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {items.map((item, idx) => (
          <MarketplaceCard
            key={item.id}
            item={listingToCardItem(item)}
            index={idx}
            variant="grid"
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 sm:py-16 md:py-20 text-textSec">
          <p className="text-lg sm:text-xl font-bold uppercase">No items found</p>
          <p className="text-xs sm:text-sm mt-2">Try adjusting your filters</p>
        </div>
      )}
    </>
  );
}
