/**
 * @deprecated Use services from impl/ instead
 * This file is kept for backward compatibility during Phase 4 migration.
 */
import { marketplaceService as marketplaceServiceImpl } from "./impl";
import type {
  IMarketplaceService,
  MarketplaceListParams,
  MarketplaceListResponse,
} from "./contracts";

export const marketplaceService: IMarketplaceService = {
  async list(params?: MarketplaceListParams): Promise<MarketplaceListResponse> {
    const result = await marketplaceServiceImpl.listListings({
      q: params?.q,
      filters: params?.filters,
      sort: params?.sort,
      page: params?.page,
      pageSize: params?.pageSize,
    });
    
    if (result.ok) {
      return {
        items: result.data.items,
        pageInfo: {
          data: result.data.items,
          total: result.data.total,
          page: result.data.page,
          limit: result.data.limit,
          totalPages: result.data.totalPages,
        },
      };
    }
    
    throw new Error(result.error.message);
  },
  
  async getBySlug(slug: string) {
    const result = await marketplaceServiceImpl.getListingBySlug(slug);
    if (result.ok) {
      return result.data;
    }
    return null;
  },
  
  async toggleFavorite(id: string): Promise<string[]> {
    const result = await marketplaceServiceImpl.toggleFavorite(id);
    if (result.ok) {
      const favoritesResult = await marketplaceServiceImpl.getFavorites();
      return favoritesResult.ok ? favoritesResult.data : [];
    }
    throw new Error(result.error.message);
  },
  
  async getFavorites(): Promise<string[]> {
    const result = await marketplaceServiceImpl.getFavorites();
    if (result.ok) {
      return result.data;
    }
    console.error("Failed to get favorites:", result.error);
    return [];
  },
};
