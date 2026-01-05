import { z } from "zod";

export const VerifyStatusSchema = z.enum(["qualified", "inconclusive", "disqualified"]);
export type VerifyStatus = z.infer<typeof VerifyStatusSchema>;

export const ItemStatusSchema = z.enum(["draft", "review", "published", "archived"]);
export type ItemStatus = z.infer<typeof ItemStatusSchema>;

export const SellerSchema = z.object({
  name: z.string(),
  rating: z.number().min(0).max(5),
  verified: z.boolean(),
});

export const MarketplaceListingSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  fullDescription: z.string().optional(),
  price: z.number().min(0),
  image: z.string().url(),
  images: z.array(z.string().url()).optional(),
  category: z.string(),
  authenticated: z.boolean(),
  certificate: z.string(),
  authenticatedDate: z.string().optional(),
  condition: z.string().optional(),
  provenance: z.string().optional(),
  signedBy: z.string().optional(),
  coaIssuer: z.string().optional(),
  status: VerifyStatusSchema.optional(),
  seller: SellerSchema.optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const MarketplaceFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  sport: z.string().optional(),
  signedBy: z.string().optional(),
  status: z.string().optional(),
  coaIssuer: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
});

export const PaginationParamsSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
});

export const SortOptionSchema = z.enum([
  "newest",
  "oldest",
  "price-asc",
  "price-desc",
  "featured",
]);
export type SortOption = z.infer<typeof SortOptionSchema>;

export type MarketplaceListing = z.infer<typeof MarketplaceListingSchema>;
export type MarketplaceFilters = z.infer<typeof MarketplaceFiltersSchema>;
export type PaginationParams = z.infer<typeof PaginationParamsSchema>;
export type Seller = z.infer<typeof SellerSchema>;

