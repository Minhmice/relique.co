import { getPayload } from 'payload';
import config from '../../../payload.config';

const PAYLOAD_API_URL = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001';

export interface PayloadQuery {
  where?: Record<string, any>;
  limit?: number;
  page?: number;
  sort?: string;
  depth?: number;
}

export interface PayloadResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page?: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

class PayloadService {
  private async getPayloadInstance() {
    return await getPayload({ config });
  }

  /**
   * Fetch collection documents
   */
  async getCollection<T = any>(
    collection: string,
    query?: PayloadQuery
  ): Promise<PayloadResponse<T>> {
    try {
      const payload = await this.getPayloadInstance();
      const result = await payload.find({
        collection: collection as any,
        where: query?.where || {},
        limit: query?.limit || 10,
        page: query?.page || 1,
        sort: query?.sort || '-createdAt',
        depth: query?.depth || 1,
      });
      return result as PayloadResponse<T>;
    } catch (error) {
      console.error(`Error fetching collection ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Get single document by ID
   */
  async getDocumentById<T = any>(
    collection: string,
    id: string,
    depth?: number
  ): Promise<T> {
    try {
      const payload = await this.getPayloadInstance();
      const result = await payload.findByID({
        collection: collection as any,
        id,
        depth: depth || 1,
      });
      return result as T;
    } catch (error) {
      console.error(`Error fetching document ${id} from ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Get global document
   */
  async getGlobal<T = any>(slug: string, depth?: number): Promise<T> {
    try {
      const payload = await this.getPayloadInstance();
      const result = await payload.findGlobal({
        slug: slug as any,
        depth: depth || 1,
      });
      return result as T;
    } catch (error) {
      console.error(`Error fetching global ${slug}:`, error);
      throw error;
    }
  }

  /**
   * Create new document
   */
  async createDocument<T = any>(
    collection: string,
    data: Partial<T>
  ): Promise<T> {
    try {
      const payload = await this.getPayloadInstance();
      const result = await payload.create({
        collection: collection as any,
        data: data as any,
      });
      return result as T;
    } catch (error) {
      console.error(`Error creating document in ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Update document
   */
  async updateDocument<T = any>(
    collection: string,
    id: string,
    data: Partial<T>
  ): Promise<T> {
    try {
      const payload = await this.getPayloadInstance();
      const result = await payload.update({
        collection: collection as any,
        id,
        data: data as any,
      });
      return result as T;
    } catch (error) {
      console.error(`Error updating document ${id} in ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Delete document
   */
  async deleteDocument(collection: string, id: string): Promise<void> {
    try {
      const payload = await this.getPayloadInstance();
      await payload.delete({
        collection: collection as any,
        id,
      });
    } catch (error) {
      console.error(`Error deleting document ${id} from ${collection}:`, error);
      throw error;
    }
  }

  /**
   * Update global document
   */
  async updateGlobal<T = any>(slug: string, data: Partial<T>): Promise<T> {
    try {
      const payload = await this.getPayloadInstance();
      const result = await payload.updateGlobal({
        slug: slug as any,
        data: data as any,
      });
      return result as T;
    } catch (error) {
      console.error(`Error updating global ${slug}:`, error);
      throw error;
    }
  }
}

export const payloadService = new PayloadService();
