import type { ConsignSubmission } from "@/lib/types";
import { storage } from "@/lib/storage";

const STORAGE_KEY = "relique_consign_submissions";

function getStoredSubmissions(): ConsignSubmission[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

function saveSubmissions(submissions: ConsignSubmission[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}

export const consignService = {
  list: (status?: "draft" | "submitted"): ConsignSubmission[] => {
    let submissions = getStoredSubmissions();

    if (status) {
      submissions = submissions.filter((s) => s.status === status);
    }

    return submissions.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  },

  get: (id: string): ConsignSubmission | null => {
    const submissions = getStoredSubmissions();
    return submissions.find((s) => s.id === id) || null;
  },

  getDraft: (): ConsignSubmission | null => {
    const draft = storage.uploadsDraft.get() as ConsignSubmission | null;
    return draft;
  },

  saveDraft: (data: Partial<ConsignSubmission>): ConsignSubmission => {
    const existing = consignService.getDraft();
    const now = new Date().toISOString();

    const draft: ConsignSubmission = {
      id: existing?.id || `draft-${Date.now()}`,
      name: data.name || existing?.name || "",
      email: data.email || existing?.email || "",
      phone: data.phone || existing?.phone,
      country: data.country || existing?.country,
      itemDescription: data.itemDescription || existing?.itemDescription || "",
      category: data.category || existing?.category,
      estimatedValue: data.estimatedValue || existing?.estimatedValue,
      coaIssuer: data.coaIssuer || existing?.coaIssuer,
      howDidYouHear: data.howDidYouHear || existing?.howDidYouHear,
      files: data.files || existing?.files,
      status: "draft",
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    storage.uploadsDraft.set(draft);
    return draft;
  },

  submit: (draftId?: string): ConsignSubmission | null => {
    const draft = draftId
      ? consignService.get(draftId)
      : consignService.getDraft();

    if (!draft) return null;

    const submission: ConsignSubmission = {
      ...draft,
      id: `submission-${Date.now()}`,
      status: "submitted",
      updatedAt: new Date().toISOString(),
    };

    const submissions = getStoredSubmissions();
    submissions.push(submission);
    saveSubmissions(submissions);

    storage.uploadsDraft.set(null);
    return submission;
  },

  deleteDraft: (): void => {
    storage.uploadsDraft.set(null);
  },
};

