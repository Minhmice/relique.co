"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MarketplaceForm } from "@/components/marketplace/MarketplaceForm";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MarketplaceFormData } from "@/components/marketplace/MarketplaceForm";

export default function NewMarketplacePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (data: MarketplaceFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare data for API - matching the API route schema
      // Convert undefined to null for optional fields
      const apiData = {
        slug: data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        title: data.title,
        description: data.description,
        full_description: data.full_description ?? null,
        price_usd: data.price_usd,
        currency: "USD",
        image: data.image,
        images: data.images ?? null,
        category: data.category,
        status: data.status,
        authenticated: data.authenticated ?? false,
        certificate: data.certificate ?? null,
        authenticated_date: data.authenticated_date ?? null,
        coa_issuer: data.coa_issuer ?? null,
        signed_by: data.signed_by ?? null,
        condition: data.condition ?? null,
        provenance: data.provenance ?? null,
        seller_name: data.seller_name ?? null,
        seller_rating: data.seller_rating ?? null,
        seller_verified: data.seller_verified ?? null,
        is_featured: data.is_featured ?? false,
        featured_order: data.featured_order ?? null,
        commission_rate: data.commission_rate ?? null,
      };

      // Call API directly to send all fields
      const response = await fetch("/api/marketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create marketplace item");
      }

      toast.success("Marketplace item created successfully!");
      router.push("/admin/items");
    } catch (error) {
      console.error("Failed to create marketplace item:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create marketplace item. Please try again."
      );
      throw error; // Re-throw to let form handle it
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/admin/items")}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Create New Marketplace Item</h1>
          <p className="text-gray-400 mt-1">Fill in the details below to add a new item to the marketplace.</p>
        </div>
      </div>
      <MarketplaceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
