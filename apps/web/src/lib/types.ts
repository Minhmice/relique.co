export interface MarketplaceListing {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  authenticated: boolean;
  certificate: string;
  authenticatedDate?: string;
  condition?: string;
  provenance?: string;
  signedBy?: string;
  coaIssuer?: string;
  status?: "qualified" | "inconclusive" | "disqualified";
  seller?: {
    name: string;
    rating: number;
    verified: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured: boolean;
  image: string;
  tags: string[];
  author?: string;
  publishedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time?: string;
  location: string;
  type?: "appearance" | "auction" | "exhibition" | "other";
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ConsignSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  itemDescription: string;
  category?: string;
  estimatedValue?: number;
  coaIssuer?: string;
  howDidYouHear?: string;
  files?: Array<{
    name: string;
    size: number;
    type: string;
  }>;
  status: "draft" | "submitted";
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceFilters {
  search?: string;
  category?: string;
  sport?: string;
  signedBy?: string;
  status?: string;
  coaIssuer?: string;
  priceMin?: number;
  priceMax?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

