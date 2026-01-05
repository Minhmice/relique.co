import type {
  IMarketplaceService,
  MarketplaceListParams,
  MarketplaceListResponse,
} from "./contracts";
import { MarketplaceListingSchema, SortOptionSchema } from "@/lib/schemas/marketplace";
import { storage } from "@/lib/storage";
import marketplaceListingsSeed from "@/mocks/marketplace_listings.json";
import marketplaceDetailSeed from "@/mocks/marketplace_detail.json";
import type { MarketplaceListing } from "@/lib/schemas/marketplace";

function readSeed(): MarketplaceListing[] {
  return (marketplaceListingsSeed as MarketplaceListing[]).map((item) => {
    const validated = MarketplaceListingSchema.safeParse(item);
    if (validated.success) {
      return validated.data;
    }
    console.warn("Invalid marketplace item in seed:", item);
    return item as MarketplaceListing;
  });
}

function readStorageMutations(): MarketplaceListing[] {
  return storage.marketplace.listings.get<MarketplaceListing>();
}

function merge(seed: MarketplaceListing[], mutations: MarketplaceListing[]): MarketplaceListing[] {
  if (mutations.length === 0) {
    return seed;
  }
  
  // Merge: mutations override seed items with same id
  const seedMap = new Map(seed.map((item) => [item.id, item]));
  mutations.forEach((mutated) => {
    seedMap.set(mutated.id, mutated);
  });
  
  return Array.from(seedMap.values());
}

function applySearch(items: MarketplaceListing[], q?: string): MarketplaceListing[] {
  if (!q) return items;
  
  const searchLower = q.toLowerCase();
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.signedBy?.toLowerCase().includes(searchLower) ||
      item.category.toLowerCase().includes(searchLower)
  );
}

function applyFilters(
  items: MarketplaceListing[],
  filters?: MarketplaceListParams["filters"]
): MarketplaceListing[] {
  if (!filters) return items;
  
  let filtered = items;
  
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((item) =>
      item.category.toLowerCase().includes(filters.category!.toLowerCase())
    );
  }
  
  if (filters.sport) {
    filtered = filtered.filter((item) =>
      item.category.toLowerCase().includes("sports")
    );
  }
  
  if (filters.signedBy) {
    filtered = filtered.filter(
      (item) =>
        item.signedBy?.toLowerCase() === filters.signedBy!.toLowerCase()
    );
  }
  
  if (filters.status) {
    filtered = filtered.filter((item) => item.status === filters.status);
  }
  
  if (filters.coaIssuer) {
    filtered = filtered.filter(
      (item) =>
        item.coaIssuer?.toLowerCase() === filters.coaIssuer!.toLowerCase()
    );
  }
  
  if (filters.priceMin !== undefined) {
    filtered = filtered.filter((item) => item.price >= filters.priceMin!);
  }
  
  if (filters.priceMax !== undefined) {
    filtered = filtered.filter((item) => item.price <= filters.priceMax!);
  }
  
  return filtered;
}

function applySort(items: MarketplaceListing[], sort?: string): MarketplaceListing[] {
  if (!sort) {
    return items.sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate; // newest first
    });
  }
  
  const validatedSort = SortOptionSchema.safeParse(sort);
  if (!validatedSort.success) {
    return items;
  }
  
  switch (validatedSort.data) {
    case "newest":
      return items.sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bDate - aDate;
      });
    case "oldest":
      return items.sort((a, b) => {
        const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return aDate - bDate;
      });
    case "price-asc":
      return items.sort((a, b) => a.price - b.price);
    case "price-desc":
      return items.sort((a, b) => b.price - a.price);
    case "featured":
      // For now, just return as-is (can add featured flag later)
      return items;
    default:
      return items;
  }
}

function applyPagination<T>(
  items: T[],
  page: number,
  pageSize: number
): { items: T[]; total: number; page: number; limit: number; totalPages: number } {
  const total = items.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedItems = items.slice(start, end);
  
  return {
    items: paginatedItems,
    total,
    page,
    limit: pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

function validateOutput(items: MarketplaceListing[]): MarketplaceListing[] {
  return items.map((item) => {
    const validated = MarketplaceListingSchema.safeParse(item);
    if (validated.success) {
      return validated.data;
    }
    console.warn("Invalid marketplace item:", item);
    return item;
  });
}

export const marketplaceService: IMarketplaceService = {
  async list(params?: MarketplaceListParams): Promise<MarketplaceListResponse> {
    const seed = readSeed();
    const mutations = readStorageMutations();
    let items = merge(seed, mutations);
    
    // Filter by published status (for web marketplace)
    items = items.filter((item) => {
      // If item has status field, only show published
      // For now, show all items (admin can set status later)
      return true;
    });
    
    // Apply query pipeline
    if (params?.q) {
      items = applySearch(items, params.q);
    }
    
    if (params?.filters) {
      items = applyFilters(items, params.filters);
    }
    
    if (params?.sort) {
      items = applySort(items, params.sort);
    } else {
      items = applySort(items, "newest");
    }
    
    // Pagination
    const page = params?.page ?? 1;
    const pageSize = params?.pageSize ?? 12;
    const paginated = applyPagination(items, page, pageSize);
    
    // Validate output
    const validatedItems = validateOutput(paginated.items);
    
    return {
      items: validatedItems,
      pageInfo: {
        data: validatedItems,
        total: paginated.total,
        page: paginated.page,
        limit: paginated.limit,
        totalPages: paginated.totalPages,
      },
    };
  },
  
  async getBySlug(slug: string): Promise<MarketplaceListing | null> {
    const seed = readSeed();
    const mutations = readStorageMutations();
    const items = merge(seed, mutations);
    
    let item = items.find((item) => item.slug === slug);
    
    // Fallback to detail seed
    if (!item && slug === (marketplaceDetailSeed as MarketplaceListing).slug) {
      item = marketplaceDetailSeed as MarketplaceListing;
    }
    
    if (!item) return null;
    
    const validated = MarketplaceListingSchema.safeParse(item);
    if (validated.success) {
      return validated.data;
    }
    
    return item;
  },
  
  async toggleFavorite(id: string): Promise<string[]> {
    storage.marketplace.favorites.toggle(id);
    return storage.marketplace.favorites.get();
  },
  
  async getFavorites(): Promise<string[]> {
    return storage.marketplace.favorites.get();
  },
};
