/**
 * Service to fetch content from Payload CMS API
 */

const PAYLOAD_API_URL =
  process.env.NEXT_PUBLIC_PAYLOAD_API_URL || 'http://localhost:3001';

export interface PayloadPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any;
  author?: string;
  tags?: Array<{ tag: string }>;
  featuredImage?: any;
  featured?: boolean;
  status: 'draft' | 'published';
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PayloadTestimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  verified: boolean;
  order?: number;
}

export interface PayloadTeamMember {
  id: string;
  name: string;
  role: string;
  subtitle?: string;
  description: string;
  image?: any;
  order?: number;
}

export interface PayloadGlobal {
  [key: string]: any;
}

class PayloadContentService {
  private async fetchAPI(endpoint: string) {
    try {
      const response = await fetch(`${PAYLOAD_API_URL}${endpoint}`, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      return null;
    }
  }

  /**
   * Fetch posts collection
   */
  async getPosts(params?: {
    featured?: boolean;
    status?: 'draft' | 'published';
    limit?: number;
  }): Promise<PayloadPost[]> {
    const where: any = {};
    if (params?.featured !== undefined) {
      where.featured = { equals: params.featured };
    }
    if (params?.status) {
      where.status = { equals: params.status };
    } else {
      where.status = { equals: 'published' };
    }

    const queryParams = new URLSearchParams({
      where: JSON.stringify(where),
      limit: String(params?.limit || 100),
      sort: '-publishedAt',
    });

    const result = await this.fetchAPI(
      `/api/payload/collections/posts?${queryParams.toString()}`
    );

    if (!result || !result.docs) {
      return [];
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      content: doc.content,
      author: doc.author,
      tags: doc.tags?.map((t: any) => t.tag) || [],
      featuredImage: doc.featuredImage,
      featured: doc.featured,
      status: doc.status,
      publishedAt: doc.publishedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }

  /**
   * Fetch single post by slug
   */
  async getPostBySlug(slug: string): Promise<PayloadPost | null> {
    const result = await this.fetchAPI(
      `/api/payload/collections/posts?where=${encodeURIComponent(
        JSON.stringify({ slug: { equals: slug } })
      )}&limit=1`
    );

    if (!result || !result.docs || result.docs.length === 0) {
      return null;
    }

    const doc = result.docs[0];
    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      excerpt: doc.excerpt,
      content: doc.content,
      author: doc.author,
      tags: doc.tags?.map((t: any) => t.tag) || [],
      featuredImage: doc.featuredImage,
      featured: doc.featured,
      status: doc.status,
      publishedAt: doc.publishedAt,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }

  /**
   * Fetch testimonials
   */
  async getTestimonials(): Promise<PayloadTestimonial[]> {
    const result = await this.fetchAPI(
      '/api/payload/collections/testimonials?sort=order&limit=100'
    );

    if (!result || !result.docs) {
      return [];
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      role: doc.role,
      quote: doc.quote,
      rating: doc.rating,
      verified: doc.verified,
      order: doc.order,
    }));
  }

  /**
   * Fetch team members
   */
  async getTeamMembers(): Promise<PayloadTeamMember[]> {
    const result = await this.fetchAPI(
      '/api/payload/collections/team?sort=order&limit=100'
    );

    if (!result || !result.docs) {
      return [];
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      name: doc.name,
      role: doc.role,
      subtitle: doc.subtitle,
      description: doc.description,
      image: doc.image,
      order: doc.order,
    }));
  }

  /**
   * Fetch global content
   */
  async getGlobal(slug: string): Promise<PayloadGlobal | null> {
    return await this.fetchAPI(`/api/payload/globals/${slug}`);
  }
}

export const payloadContentService = new PayloadContentService();
