export enum SubmissionStatus {
  NEW = 'new',
  IN_REVIEW = 'in_review',
  CLOSED = 'closed'
}

export enum VerificationStatus {
  QUALIFIED = 'qualified',
  INCONCLUSIVE = 'inconclusive',
  DISQUALIFIED = 'disqualified'
}

export enum MarketplaceStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PUBLISHED = 'published',
  SUSPENDED = 'suspended',
  UNPUBLISHED = 'unpublished',
  ARCHIVED = 'archived'
}

export interface MarketplaceItem {
  id: string;
  title: string;
  athlete: string;
  category: string;
  status: MarketplaceStatus;
  is_featured: boolean;
  price_usd: number;
  updated_at?: string;
  cover_image_url?: string;
  featured_order?: number | null;
}

export interface Submission {
  id: string;
  type: 'authenticate' | 'consign' | 'contact';
  sender: string;
  email: string;
  status: SubmissionStatus;
  created_at: string;
  details: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entity: string;
  timestamp: string;
}

export interface VerifyRecord {
  id: string;
  pid: string;
  name: string;
  signatures: number;
  result: VerificationStatus;
  date: string;
}

