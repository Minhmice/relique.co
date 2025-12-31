"use client";

import { Suspense, useEffect, useMemo, useState } from "react";

export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/marketplace/FavoriteButton";
import { MarketplaceSort, type SortOption } from "@/components/marketplace/MarketplaceSort";
import { MarketplaceSearch } from "@/components/marketplace/MarketplaceSearch";
import { AdvancedFilters } from "@/components/marketplace/AdvancedFilters";
import { Pagination } from "@/components/marketplace/Pagination";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { marketplaceService } from "@/lib/services/marketplaceService";
import type { MarketplaceFilters } from "@/lib/types";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

function MarketplacePageContent() {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filters, setFilters] = useState<MarketplaceFilters>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  
  // Memoize searchParams values to prevent infinite loops
  const searchParamsString = useMemo(() => searchParams.toString(), [searchParams]);

  useEffect(() => {
    const params: MarketplaceFilters = {};
    if (search) params.search = search;
    if (searchParams.get("category")) params.category = searchParams.get("category")!;
    if (searchParams.get("sport")) params.sport = searchParams.get("sport")!;
    if (searchParams.get("signedBy")) params.signedBy = searchParams.get("signedBy")!;
    if (searchParams.get("status")) params.status = searchParams.get("status") as any;
    if (searchParams.get("coaIssuer")) params.coaIssuer = searchParams.get("coaIssuer")!;
    if (searchParams.get("priceMin")) params.priceMin = parseInt(searchParams.get("priceMin")!);
    if (searchParams.get("priceMax")) params.priceMax = parseInt(searchParams.get("priceMax")!);
    setFilters(params);
    setLoading(false);
  }, [searchParamsString, search]);

  const result = useMemo(() => {
    const combinedFilters = { ...filters, search };
    return marketplaceService.list(combinedFilters, { page, limit: 12 });
  }, [filters, search, page]);

  const availableOptions = useMemo(() => {
    const allListings = marketplaceService.list({}, { page: 1, limit: 1000 }).data;
    return {
      sports: Array.from(new Set(allListings.filter(l => l.category.toLowerCase().includes("sports")).map(l => "Sports"))),
      categories: Array.from(new Set(allListings.map(l => l.category))),
      signedBy: Array.from(new Set(allListings.map(l => l.signedBy).filter((v): v is string => Boolean(v)))),
      statuses: Array.from(new Set(allListings.map(l => l.status).filter((v): v is NonNullable<typeof v> => Boolean(v)))),
      coaIssuers: Array.from(new Set(allListings.map(l => l.coaIssuer).filter((v): v is string => Boolean(v)))),
    };
  }, []); // Empty deps - only compute once on mount

  const sortedItems = useMemo(() => {
    let items = [...result.data];
    switch (sortBy) {
      case "newest":
        items.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
        break;
      case "highest-bids":
        items.sort((a, b) => b.price - a.price);
        break;
      case "price-low":
        items.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        items.sort((a, b) => b.price - a.price);
        break;
    }
    return items;
  }, [result.data, sortBy]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-h1">Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Browse authenticated collectibles and memorabilia
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <MarketplaceSearch />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <AdvancedFilters
                filters={filters}
                onFiltersChange={setFilters}
                availableOptions={availableOptions}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 border rounded-none">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <MarketplaceSort value={sortBy} onValueChange={setSortBy} />
            </div>
          </div>
        </div>

        {sortedItems.length === 0 ? (
          <EmptyState
            title="No items found"
            description="Try adjusting your filters or search terms"
          />
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item) => (
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
            ) : (
              <div className="space-y-4">
                {sortedItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <Link href={`/marketplace/${item.slug}`} className="flex gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground mb-2">{item.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{item.category}</span>
                              {item.signedBy && <span>Signed by {item.signedBy}</span>}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold mb-2">${item.price.toLocaleString()}</div>
                            {item.authenticated && (
                              <Badge variant="outline" className="bg-green-100 dark:bg-green-900 border-green-500">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            )}
            <Pagination currentPage={page} totalPages={result.totalPages} />
          </>
        )}
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <MarketplacePageContent />
    </Suspense>
  );
}
