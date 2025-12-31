"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { marketplaceService } from "@/lib/services/marketplaceService";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export function FeaturedItems() {
  const [startIndex, setStartIndex] = useState(0);
  const items = marketplaceService.list({}, { page: 1, limit: 10 }).data.slice(0, 6);
  const visibleItems = items.slice(startIndex, startIndex + 3);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + 3 < items.length;

  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Featured Items"
        description="Handpicked authenticated collectibles from our marketplace"
        cta={{
          label: "View All",
          href: "/marketplace",
        }}
      />
      <div className="relative">
        <div className="grid md:grid-cols-3 gap-6">
          {visibleItems.map((item) => (
            <Card key={item.id} className="h-full hover:shadow-lg transition-shadow">
              <Link href={`/marketplace/${item.slug}`}>
                <div className="relative w-full h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.authenticated && (
                    <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                      Verified
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>{item.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <span className="text-xl font-bold">${item.price.toLocaleString()}</span>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
        {items.length > 3 && (
          <>
            {canGoPrev && (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4"
                onClick={() => setStartIndex(Math.max(0, startIndex - 3))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            {canGoNext && (
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4"
                onClick={() => setStartIndex(startIndex + 3)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

