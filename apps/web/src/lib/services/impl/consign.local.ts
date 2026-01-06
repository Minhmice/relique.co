import type { IConsignService } from "@relique/shared/domain";
import type { Result } from "@relique/shared/domain";
import { ok, err } from "@relique/shared/domain";
import {
  validationError,
  notFoundError,
  unknownError,
} from "@relique/shared/domain";
import type {
  ConsignDraft,
  ConsignSubmission,
  SubmissionStatus,
  ConsignFile,
} from "@relique/shared/domain";
import {
  ConsignDraftSchema,
  ConsignSubmissionSchema,
} from "@relique/shared/domain";
import {
  getConsignDrafts,
  setConsignDrafts,
  addConsignDraft,
  getConsignSubmissions,
  addConsignSubmission,
} from "@relique/shared/domain";

function validateDraft(item: ConsignDraft): ConsignDraft {
  const validated = ConsignDraftSchema.safeParse(item);
  if (validated.success) {
    return validated.data;
  }
  console.warn("Invalid consign draft:", item);
  return item;
}

function validateSubmission(item: ConsignSubmission): ConsignSubmission {
  const validated = ConsignSubmissionSchema.safeParse(item);
  if (validated.success) {
    return validated.data;
  }
  console.warn("Invalid consign submission:", item);
  return item;
}

export const consignServiceLocal: IConsignService = {
  async createDraft(initial: Partial<ConsignDraft>): Promise<Result<ConsignDraft>> {
    try {
      const now = Date.now();
      const draft: ConsignDraft = {
        ...initial,
        status: "draft",
        timestamp: now,
      } as ConsignDraft;
      
      const validated = ConsignDraftSchema.safeParse(draft);
      if (!validated.success) {
        return err(validationError("Invalid draft data", validated.error));
      }
      
      addConsignDraft(validated.data);
      return ok(validated.data);
    } catch (error) {
      return err(unknownError("Failed to create draft", error));
    }
  },

  async updateDraft(draftId: string, patch: Partial<ConsignDraft>): Promise<Result<ConsignDraft>> {
    try {
      const drafts = getConsignDrafts();
      const timestamp = parseInt(draftId, 10);
      const existing = drafts.find((d) => d.timestamp === timestamp);
      
      if (!existing) {
        return err(notFoundError(`Draft not found: ${draftId}`, "draft"));
      }
      
      const updated: ConsignDraft = {
        ...existing,
        ...patch,
        status: "draft",
        timestamp: existing.timestamp,
      };
      
      const validated = ConsignDraftSchema.safeParse(updated);
      if (!validated.success) {
        return err(validationError("Invalid draft data", validated.error));
      }
      
      const filtered = drafts.filter((d) => d.timestamp !== timestamp);
      setConsignDrafts([...filtered, validated.data]);
      
      return ok(validated.data);
    } catch (error) {
      return err(unknownError("Failed to update draft", error));
    }
  },

  async getDraft(draftId: string): Promise<Result<ConsignDraft>> {
    try {
      const drafts = getConsignDrafts();
      const timestamp = parseInt(draftId, 10);
      const draft = drafts.find((d) => d.timestamp === timestamp);
      
      if (!draft) {
        return err(notFoundError(`Draft not found: ${draftId}`, "draft"));
      }
      
      return ok(validateDraft(draft));
    } catch (error) {
      return err(unknownError("Failed to get draft", error));
    }
  },

  async listDrafts(): Promise<Result<ConsignDraft[]>> {
    try {
      const drafts = getConsignDrafts();
      const validated = drafts.map(validateDraft);
      return ok(validated);
    } catch (error) {
      return err(unknownError("Failed to list drafts", error));
    }
  },

  async deleteDraft(draftId: string): Promise<Result<void>> {
    try {
      const drafts = getConsignDrafts();
      const timestamp = parseInt(draftId, 10);
      const updated = drafts.filter((d) => d.timestamp !== timestamp);
      setConsignDrafts(updated);
      return ok(undefined);
    } catch (error) {
      return err(unknownError("Failed to delete draft", error));
    }
  },

  async addDraftFiles(draftId: string, filesMeta: ConsignFile[]): Promise<Result<ConsignDraft>> {
    try {
      const drafts = getConsignDrafts();
      const timestamp = parseInt(draftId, 10);
      const existing = drafts.find((d) => d.timestamp === timestamp);
      
      if (!existing) {
        return err(notFoundError(`Draft not found: ${draftId}`, "draft"));
      }
      
      const updated: ConsignDraft = {
        ...existing,
        files: [...(existing.files || []), ...filesMeta],
      };
      
      const validated = ConsignDraftSchema.safeParse(updated);
      if (!validated.success) {
        return err(validationError("Invalid draft data", validated.error));
      }
      
      const filtered = drafts.filter((d) => d.timestamp !== timestamp);
      setConsignDrafts([...filtered, validated.data]);
      
      return ok(validated.data);
    } catch (error) {
      return err(unknownError("Failed to add files", error));
    }
  },

  async removeDraftFile(draftId: string, fileId: string): Promise<Result<ConsignDraft>> {
    try {
      const drafts = getConsignDrafts();
      const timestamp = parseInt(draftId, 10);
      const existing = drafts.find((d) => d.timestamp === timestamp);
      
      if (!existing) {
        return err(notFoundError(`Draft not found: ${draftId}`, "draft"));
      }
      
      const updated: ConsignDraft = {
        ...existing,
        files: (existing.files || []).filter((f) => f.name !== fileId),
      };
      
      const validated = ConsignDraftSchema.safeParse(updated);
      if (!validated.success) {
        return err(validationError("Invalid draft data", validated.error));
      }
      
      const filtered = drafts.filter((d) => d.timestamp !== timestamp);
      setConsignDrafts([...filtered, validated.data]);
      
      return ok(validated.data);
    } catch (error) {
      return err(unknownError("Failed to remove file", error));
    }
  },

  async submitDraft(draftId?: string): Promise<Result<{ submissionId: string; status: SubmissionStatus }>> {
    try {
      let draft: ConsignDraft | null = null;
      
      if (draftId) {
        const draftResult = await consignServiceLocal.getDraft(draftId);
        if (!draftResult.ok) {
          return draftResult;
        }
        draft = draftResult.data;
      } else {
        const draftsResult = await consignServiceLocal.listDrafts();
        if (!draftsResult.ok) {
          return err(notFoundError("No draft found to submit", "draft"));
        }
        draft = draftsResult.data[0] ?? null;
      }
      
      if (!draft || !draft.name || !draft.email || !draft.itemDescription) {
        return err(validationError("Draft is incomplete. Please fill in required fields."));
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
      addConsignSubmission(validated);
      
      // Remove draft after submission
      if (draft.timestamp) {
        const deleteResult = await consignServiceLocal.deleteDraft(String(draft.timestamp));
        if (!deleteResult.ok) {
          // Log but don't fail submission
          console.warn("Failed to delete draft after submission:", deleteResult.error);
        }
      }
      
      return ok({
        submissionId: validated.id,
        status: validated.status,
      });
    } catch (error) {
      return err(unknownError("Failed to submit draft", error));
    }
  },

  async listSubmissions(status?: SubmissionStatus): Promise<Result<ConsignSubmission[]>> {
    try {
      let submissions = getConsignSubmissions();
      
      if (status) {
        submissions = submissions.filter((s) => s.status === status);
      }
      
      const validated = submissions
        .map(validateSubmission)
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      
      return ok(validated);
    } catch (error) {
      return err(unknownError("Failed to list submissions", error));
    }
  },

  async getSubmission(id: string): Promise<Result<ConsignSubmission>> {
    try {
      const submissions = getConsignSubmissions();
      const submission = submissions.find((s) => s.id === id);
      
      if (!submission) {
        return err(notFoundError(`Submission not found: ${id}`, "submission"));
      }
      
      return ok(validateSubmission(submission));
    } catch (error) {
      return err(unknownError("Failed to get submission", error));
    }
  },
};

