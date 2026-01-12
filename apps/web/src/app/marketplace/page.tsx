"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { marketplaceService } from "@/lib/services/marketplaceService";
import type { MarketplaceListing } from "@/lib/schemas/marketplace";
import { LoadingState } from "@/components/shared/LoadingState";

function MarketplacePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MarketplaceListing[]>([]);
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "ALL SPORTS");
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

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}k`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getStatusLabel = (status?: string) => {
    if (!status) return "QUALIFIED";
    return status.toUpperCase();
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="py-24 bg-bgDark min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-6xl font-bold tracking-tight mb-4">
              Consigned <span className="text-primaryBlue">Marketplace</span>
            </h1>
            <p className="text-textSec">Exclusive access to certified institutional-grade sports relics.</p>
          </motion.div>
          <div className="flex gap-4">
            <select
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="bg-cardDark border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest focus:border-highlightIce outline-none text-white"
            >
              <option>ALL SPORTS</option>
              <option>Basketball</option>
              <option>Football</option>
              <option>Baseball</option>
              <option>Tennis</option>
              <option>F1</option>
              <option>Cricket</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cardDark border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest focus:border-highlightIce outline-none text-white"
            >
              <option>PRICE: HIGH TO LOW</option>
              <option>PRICE: LOW TO HIGH</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-cardDark border border-white/5 overflow-hidden group"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primaryBlue px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                  {getStatusLabel(item.status)}
                </div>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-primaryBlue mb-2">
                  {item.signedBy || item.category}
                </p>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-highlightIce transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-lg font-black">{formatPrice(item.price)}</span>
                  <Link
                    href={`/marketplace/${item.slug}`}
                    className="text-[10px] font-black uppercase tracking-widest text-highlightIce border-b border-highlightIce hover:border-highlightIce/50 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-20 text-textSec">
            <p className="text-xl font-bold uppercase">No items found</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
          </div>
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
