export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      marketplace_items: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          full_description: string | null;
          price_usd: number;
          currency: string;
          image: string;
          images: Json | null;
          category: string;
          status: string;
          authenticated: boolean;
          certificate: string | null;
          authenticated_date: string | null;
          coa_issuer: string | null;
          signed_by: string | null;
          condition: string | null;
          provenance: string | null;
          seller_name: string | null;
          seller_rating: number | null;
          seller_verified: boolean | null;
          is_featured: boolean;
          featured_order: number | null;
          commission_rate: number | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description: string;
          full_description?: string | null;
          price_usd: number;
          currency?: string;
          image: string;
          images?: Json | null;
          category: string;
          status?: string;
          authenticated?: boolean;
          certificate?: string | null;
          authenticated_date?: string | null;
          coa_issuer?: string | null;
          signed_by?: string | null;
          condition?: string | null;
          provenance?: string | null;
          seller_name?: string | null;
          seller_rating?: number | null;
          seller_verified?: boolean | null;
          is_featured?: boolean;
          featured_order?: number | null;
          commission_rate?: number | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          full_description?: string | null;
          price_usd?: number;
          currency?: string;
          image?: string;
          images?: Json | null;
          category?: string;
          status?: string;
          authenticated?: boolean;
          certificate?: string | null;
          authenticated_date?: string | null;
          coa_issuer?: string | null;
          signed_by?: string | null;
          condition?: string | null;
          provenance?: string | null;
          seller_name?: string | null;
          seller_rating?: number | null;
          seller_verified?: boolean | null;
          is_featured?: boolean;
          featured_order?: number | null;
          commission_rate?: number | null;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
      };
      consigned_items: {
        Row: {
          id: string;
          marketplace_item_id: string | null;
          contact_name: string;
          contact_email: string;
          contact_phone: string | null;
          contact_address: string | null;
          item_description: string;
          category: string | null;
          estimated_value: number | null;
          appraisal_date: string | null;
          coa_issuer: string | null;
          verification_status: string | null;
          commission_rate: number | null;
          listing_fee: number | null;
          contract_date: string | null;
          status: string;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          marketplace_item_id?: string | null;
          contact_name: string;
          contact_email: string;
          contact_phone?: string | null;
          contact_address?: string | null;
          item_description: string;
          category?: string | null;
          estimated_value?: number | null;
          appraisal_date?: string | null;
          coa_issuer?: string | null;
          verification_status?: string | null;
          commission_rate?: number | null;
          listing_fee?: number | null;
          contract_date?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          marketplace_item_id?: string | null;
          contact_name?: string;
          contact_email?: string;
          contact_phone?: string | null;
          contact_address?: string | null;
          item_description?: string;
          category?: string | null;
          estimated_value?: number | null;
          appraisal_date?: string | null;
          coa_issuer?: string | null;
          verification_status?: string | null;
          commission_rate?: number | null;
          listing_fee?: number | null;
          contract_date?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
          created_by?: string | null;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          actor_id: string | null;
          action: string;
          entity_type: string | null;
          entity_id: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          actor_id?: string | null;
          action: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          actor_id?: string | null;
          action?: string;
          entity_type?: string | null;
          entity_id?: string | null;
          metadata?: Json | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

