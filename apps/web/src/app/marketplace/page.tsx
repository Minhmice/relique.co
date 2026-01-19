"use client";

import { Suspense } from "react";
import { MarketplaceGrid } from "./components/MarketplaceGrid";
import { LoadingState } from "@/components/shared/LoadingState";

/**
 * Marketplace listing page
 * Refactored from 175 lines to use composable components
 * 
 * Architecture:
 * - Reusable components in src/components/marketplace/
 * - Data wrapper in app/marketplace/components/MarketplaceGrid
 */
function MarketplacePageContent() {
  return (
    <div className="py-24 bg-bgDark min-h-screen">
      <div className="container mx-auto px-6">
        <MarketplaceGrid />
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
