// Types imported from schemas
import {
  collectorPreset,
  investorPreset,
  dealerPreset,
  emptyPreset,
} from "./index";
import {
  setVerifyHistory,
  setMarketplaceFavorites,
  setConsignDrafts,
  setSavedSearches,
  setContentBookmarks,
  setConsignSubmissions,
} from "../storage";
import { VerifyHistoryEntrySchema } from "../schemas/verify";
import type { VerifyHistoryEntry } from "../schemas/verify";
import type { ConsignDraft, ConsignSubmission } from "../schemas/consign";
import type { SavedSearch } from "../contracts/marketplace.contract";
import { STORAGE_KEYS } from "../storage/keys";
import { setJson } from "../storage/json";
import type { VerifyResult } from "../schemas/verify";

export type PresetId = "collector" | "investor" | "dealer" | "empty";

interface PresetData {
  userState?: {
    favorites?: string[];
    verifyHistory?: VerifyHistoryEntry[];
    drafts?: ConsignDraft[];
    savedSearches?: SavedSearch[];
    bookmarks?: string[];
    submissions?: ConsignSubmission[];
    lastResult?: VerifyResult;
  };
}

const PRESET_MAP: Record<PresetId, PresetData> = {
  collector: collectorPreset as PresetData,
  investor: investorPreset as PresetData,
  dealer: dealerPreset as PresetData,
  empty: emptyPreset as PresetData,
};

interface ApplyPresetOptions {
  validate?: boolean; // Validate fixtures against schemas before applying
}

/**
 * Apply a preset by ID or preset object
 */
export async function applyPreset(
  presetIdOrData: PresetId | PresetData,
  options: ApplyPresetOptions = { validate: true }
): Promise<void> {
  const preset =
    typeof presetIdOrData === "string"
      ? PRESET_MAP[presetIdOrData]
      : presetIdOrData;

  if (!preset) {
    throw new Error(`Preset not found: ${presetIdOrData}`);
  }

  // Validate preset data if requested
  if (options.validate && preset.userState) {
    if (preset.userState.verifyHistory) {
      // Validate verify history entries
      for (const entry of preset.userState.verifyHistory) {
        const result = VerifyHistoryEntrySchema.safeParse(entry);
        if (!result.success) {
          throw new Error(
            `Invalid verify history entry: ${result.error.message}`
          );
        }
      }
    }
    // Add more validations as needed
  }

  // Apply user state
  if (preset.userState) {
    if (preset.userState.favorites) {
      setMarketplaceFavorites(preset.userState.favorites);
    }

    if (preset.userState.verifyHistory) {
      setVerifyHistory(preset.userState.verifyHistory);
    }

    if (preset.userState.drafts) {
      const drafts = preset.userState.drafts;
      if (drafts.length > 0) {
        setConsignDrafts(drafts);
      }
    }

    if (preset.userState.savedSearches) {
      setSavedSearches(preset.userState.savedSearches);
    }

    if (preset.userState.bookmarks) {
      setContentBookmarks(preset.userState.bookmarks);
    }

    if (preset.userState.submissions) {
      setConsignSubmissions(preset.userState.submissions);
    }

    if (preset.userState.lastResult) {
      // Store last verify result for quick display
      setJson(STORAGE_KEYS.VERIFY_LAST_RESULT, preset.userState.lastResult);
    }
  }

  // Store current preset name
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "relique.v1.demo.preset",
      typeof presetIdOrData === "string" ? presetIdOrData : "custom"
    );
  }
}

/**
 * Get current preset ID
 */
export function getCurrentPreset(): PresetId | null {
  if (typeof window === "undefined") return null;
  const preset = localStorage.getItem("relique.v1.demo.preset");
  return (preset as PresetId) || null;
}

/**
 * Reset all storage (clear preset data)
 */
export function resetAllStorage(): void {
  if (typeof window === "undefined") return;

  // Clear all domain storage keys
  const keys = [
    "relique.v1.verify.history",
    "relique.v1.verify.lastResult",
    "relique.v1.marketplace.favorites",
    "relique.v1.marketplace.savedSearches",
    "relique.v1.consign.drafts",
    "relique.v1.consign.lastDraftId",
    "relique.v1.consign.submissions",
    "relique.v1.content.bookmarks",
    "relique.v1.portal.views.submissions",
    "relique.v1.portal.savedFilters.submissions",
    "relique.v1.portal.notifications",
    "relique.v1.portal.activityLog",
  ];

  keys.forEach((key) => {
    localStorage.removeItem(key);
  });

  // Clear preset tracking
  localStorage.removeItem("relique.v1.demo.preset");
}

