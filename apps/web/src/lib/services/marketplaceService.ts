import type {
  MarketplaceListing,
  MarketplaceFilters,
  PaginationParams,
  PaginatedResponse,
} from "@/lib/types";
import marketplaceListingsSeed from "@/mocks/marketplace_listings.json";
import marketplaceDetailSeed from "@/mocks/marketplace_detail.json";

const STORAGE_KEY = "relique_marketplace_listings";

function getStoredListings(): MarketplaceListing[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

function getSeedListings(): MarketplaceListing[] {
  return marketplaceListingsSeed as MarketplaceListing[];
}

function getAllListings(): MarketplaceListing[] {
  const stored = getStoredListings();
  if (stored.length > 0) return stored;
  return getSeedListings();
}

function saveListings(listings: MarketplaceListing[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
}

export const marketplaceService = {
  list: (
    filters?: MarketplaceFilters,
    pagination?: PaginationParams
  ): PaginatedResponse<MarketplaceListing> => {
    let items = getAllListings();

    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        items = items.filter(
          (item) =>
            item.title.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower) ||
            item.signedBy?.toLowerCase().includes(searchLower)
        );
      }

      if (filters.category && filters.category !== "all") {
        items = items.filter((item) =>
          item.category.toLowerCase().includes(filters.category!.toLowerCase())
        );
      }

      if (filters.sport) {
        items = items.filter((item) =>
          item.category.toLowerCase().includes("sports")
        );
      }

      if (filters.signedBy) {
        items = items.filter(
          (item) =>
            item.signedBy?.toLowerCase() === filters.signedBy!.toLowerCase()
        );
      }

      if (filters.status) {
        items = items.filter((item) => item.status === filters.status);
      }

      if (filters.coaIssuer) {
        items = items.filter(
          (item) =>
            item.coaIssuer?.toLowerCase() === filters.coaIssuer!.toLowerCase()
        );
      }

      if (filters.priceMin !== undefined) {
        items = items.filter((item) => item.price >= filters.priceMin!);
      }

      if (filters.priceMax !== undefined) {
        items = items.filter((item) => item.price <= filters.priceMax!);
      }
    }

    const total = items.length;
    const limit = pagination?.limit || 12;
    const page = pagination?.page || 1;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedItems = items.slice(start, end);

    return {
      data: paginatedItems,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  get: (slug: string): MarketplaceListing | null => {
    const allListings = getAllListings();
    const listing = allListings.find((item) => item.slug === slug);
    
    if (listing) {
      return listing;
    }

    if (slug === marketplaceDetailSeed.slug) {
      return marketplaceDetailSeed as MarketplaceListing;
    }

    return null;
  },

  create: (listing: Omit<MarketplaceListing, "id" | "slug" | "createdAt" | "updatedAt">): MarketplaceListing => {
    const allListings = getAllListings();
    const newListing: MarketplaceListing = {
      ...listing,
      id: String(Date.now()),
      slug: listing.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    allListings.push(newListing);
    saveListings(allListings);
    return newListing;
  },

  update: (id: string, updates: Partial<MarketplaceListing>): MarketplaceListing | null => {
    const allListings = getAllListings();
    const index = allListings.findIndex((item) => item.id === id);
    
    if (index === -1) return null;
    const existing = allListings[index];
    if (!existing) return null;

    allListings[index] = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    saveListings(allListings);
    return allListings[index];
  },

  delete: (id: string): boolean => {
    const allListings = getAllListings();
    const filtered = allListings.filter((item) => item.id !== id);
    
    if (filtered.length === allListings.length) return false;
    
    saveListings(filtered);
    return true;
  },
};

