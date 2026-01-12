import type { MarketplaceListing } from "@/lib/schemas/marketplace";

export interface MarketplaceListResponse {
  items: MarketplaceListing[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface MarketplaceListParams {
  filters?: {
    category?: string;
  };
  sort?: string;
  page?: number;
  pageSize?: number;
  q?: string;
}

class MarketplaceAPIService {
  private baseUrl = "/api/marketplace";

  async list(params?: MarketplaceListParams): Promise<MarketplaceListResponse> {
    const searchParams = new URLSearchParams();
    if (params?.filters?.category) {
      searchParams.set("category", params.filters.category);
    }
    if (params?.sort) {
      searchParams.set("sort", params.sort);
    }
    if (params?.page) {
      searchParams.set("page", String(params.page));
    }
    if (params?.pageSize) {
      searchParams.set("pageSize", String(params.pageSize));
    }

    const response = await fetch(`${this.baseUrl}?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch marketplace items: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  async getBySlug(slug: string): Promise<MarketplaceListing | null> {
    const response = await fetch(`${this.baseUrl}/${slug}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Failed to fetch marketplace item: ${response.statusText}`);
    }

    return await response.json();
  }
}

export const marketplaceAPIService = new MarketplaceAPIService();

