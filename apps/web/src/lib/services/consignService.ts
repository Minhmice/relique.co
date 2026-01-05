import type { IConsignService } from "./contracts";
import {
  ConsignSubmissionSchema,
  ConsignDraftSchema,
  SubmissionStatusSchema,
} from "@/lib/schemas/consign";
import { storage } from "@/lib/storage";
import type { ConsignSubmission, ConsignDraft, SubmissionStatus } from "@/lib/schemas/consign";

function readStorageSubmissions(): ConsignSubmission[] {
  return storage.consign.submissions.get<ConsignSubmission>();
}

function saveSubmissions(submissions: ConsignSubmission[]): void {
  storage.consign.submissions.set(submissions);
}

function validateSubmission(item: ConsignSubmission): ConsignSubmission {
  const validated = ConsignSubmissionSchema.safeParse(item);
  if (validated.success) {
    return validated.data;
  }
  console.warn("Invalid consign submission:", item);
  return item;
}

function validateDraft(item: ConsignDraft): ConsignDraft {
  const validated = ConsignDraftSchema.safeParse(item);
  if (validated.success) {
    return validated.data;
  }
  console.warn("Invalid consign draft:", item);
  return item;
}

export const consignService: IConsignService = {
  drafts: {
    async list(): Promise<ConsignDraft[]> {
      const draft = storage.consign.drafts.get<ConsignDraft>();
      if (!draft) return [];
      
      const validated = validateDraft(draft);
      return [validated];
    },
    
    async save(draftData: Partial<ConsignDraft>): Promise<ConsignDraft> {
      const existing = storage.consign.drafts.get<ConsignDraft>();
      const now = Date.now();
      
      const draft: ConsignDraft = {
        name: draftData.name ?? existing?.name,
        email: draftData.email ?? existing?.email,
        phone: draftData.phone ?? existing?.phone,
        country: draftData.country ?? existing?.country,
        itemDescription: draftData.itemDescription ?? existing?.itemDescription,
        category: draftData.category ?? existing?.category,
        estimatedValue: draftData.estimatedValue ?? existing?.estimatedValue,
        coaIssuer: draftData.coaIssuer ?? existing?.coaIssuer,
        howDidYouHear: draftData.howDidYouHear ?? existing?.howDidYouHear,
        files: draftData.files ?? existing?.files,
        status: "draft",
        timestamp: existing?.timestamp ?? now,
      };
      
      const validated = validateDraft(draft);
      storage.consign.drafts.set(validated);
      
      return validated;
    },
    
    async remove(id: string): Promise<void> {
      // For now, we only have one draft, so clear it
      storage.consign.drafts.set(null);
    },
    
    async get(id: string): Promise<ConsignDraft | null> {
      const draft = storage.consign.drafts.get<ConsignDraft>();
      if (!draft) return null;
      
      return validateDraft(draft);
    },
  },
  
  async submitMock(draftId?: string): Promise<{ submissionId: string; status: SubmissionStatus }> {
    let draft: ConsignDraft | null = null;
    
    if (draftId) {
      draft = await consignService.drafts.get(draftId);
    } else {
      const drafts = await consignService.drafts.list();
      draft = drafts[0] ?? null;
    }
    
    if (!draft || !draft.name || !draft.email || !draft.itemDescription) {
      throw new Error("Draft is incomplete. Please fill in required fields.");
    }
    
    const now = new Date().toISOString();
    const submission: ConsignSubmission = {
      id: `submission-${Date.now()}`,
      name: draft.name,
      email: draft.email,
      phone: draft.phone,
      country: draft.country,
      itemDescription: draft.itemDescription,
      category: draft.category,
      estimatedValue: draft.estimatedValue,
      coaIssuer: draft.coaIssuer,
      howDidYouHear: draft.howDidYouHear,
      files: draft.files,
      status: "submitted",
      createdAt: now,
      updatedAt: now,
    };
    
    const validated = validateSubmission(submission);
    const submissions = readStorageSubmissions();
    submissions.push(validated);
    saveSubmissions(submissions);
    
    // Clear draft after submission
    storage.consign.drafts.set(null);
    
    return {
      submissionId: validated.id,
      status: validated.status,
    };
  },
  
  async list(status?: SubmissionStatus): Promise<ConsignSubmission[]> {
    let submissions = readStorageSubmissions();
    
    if (status) {
      submissions = submissions.filter((s) => s.status === status);
    }
    
    return submissions
      .map(validateSubmission)
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  },
  
  async get(id: string): Promise<ConsignSubmission | null> {
    const submissions = readStorageSubmissions();
    const submission = submissions.find((s) => s.id === id);
    
    if (!submission) return null;
    
    return validateSubmission(submission);
  },
};
