/**
 * @deprecated Use @relique/shared/domain fixtures/seed instead
 * This file is kept for backward compatibility during Phase 6 migration.
 * All new code should use applyPreset from @relique/shared/domain
 */
import {
  applyPreset as applyPresetShared,
  getCurrentPreset as getCurrentPresetShared,
  resetAllStorage as resetAllStorageShared,
  type PresetId,
} from "@relique/shared/domain";
import { storage } from "@/lib/storage";
import { setVerifyMapping, getVerifyMappingForPreset } from "@/lib/services/verifyService";
import { setSimulationConfig, getSimulationConfig } from "@/lib/simulation";
import {
  getVerifyHistory,
  getMarketplaceFavorites,
  getConsignDrafts,
  getConsignSubmissions,
  getSavedSearches,
  getContentBookmarks,
} from "@relique/shared/domain";

export type PresetName = "collector" | "investor" | "dealer" | "empty";

export async function applyPreset(name: PresetName): Promise<void> {
  // Use shared preset system
  await applyPresetShared(name);
  
  // Also set demo mode (fixed latency, zero errors)
  setSimulationConfig({
    latency: "verify", // Fixed 5s for verify
    errors: "off", // Zero errors in demo mode
  });
}

export async function getCurrentPreset(): Promise<PresetName | null> {
  return getCurrentPresetShared();
}

export function resetAllStorage(): void {
  resetAllStorageShared();
  // Also clear portal-specific storage (if needed)
  storage.clearAll(); // This still clears portal-specific keys
}

export async function exportStorageData(): Promise<string> {
  const data = {
    marketplace: {
      favorites: getMarketplaceFavorites(),
      savedSearches: getSavedSearches(),
    },
    verify: {
      history: getVerifyHistory(),
      mapping: getVerifyMappingForPreset(),
    },
    consign: {
      drafts: getConsignDrafts(),
      submissions: getConsignSubmissions(),
    },
    content: {
      bookmarks: getContentBookmarks(),
    },
    simulation: getSimulationConfig(),
    preset: await getCurrentPreset(),
  };
  
  return JSON.stringify(data, null, 2);
}

export async function importStorageData(jsonString: string): Promise<void> {
  try {
    const data = JSON.parse(jsonString);
    
    // Import using shared storage helpers
    if (data.marketplace) {
      if (data.marketplace.favorites) {
        const { setMarketplaceFavorites } = await import("@relique/shared/domain");
        setMarketplaceFavorites(data.marketplace.favorites);
      }
      if (data.marketplace.savedSearches) {
        const { setSavedSearches } = await import("@relique/shared/domain");
        setSavedSearches(data.marketplace.savedSearches);
      }
    }
    
    if (data.verify) {
      if (data.verify.history) {
        const { setVerifyHistory } = await import("@relique/shared/domain");
        setVerifyHistory(data.verify.history);
      }
      if (data.verify.mapping) {
        setVerifyMapping(data.verify.mapping);
      }
    }
    
    if (data.consign) {
      if (data.consign.drafts) {
        const { setConsignDrafts } = await import("@relique/shared/domain");
        setConsignDrafts(data.consign.drafts);
      }
      if (data.consign.submissions) {
        const { setConsignSubmissions } = await import("@relique/shared/domain");
        setConsignSubmissions(data.consign.submissions);
      }
    }
    
    if (data.content) {
      if (data.content.bookmarks) {
        const { setContentBookmarks } = await import("@relique/shared/domain");
        setContentBookmarks(data.content.bookmarks);
      }
    }
    
    if (data.simulation) {
      setSimulationConfig(data.simulation);
    }
    
    if (data.preset) {
      await applyPreset(data.preset);
    }
  } catch (error) {
    console.error("Failed to import storage data:", error);
    throw new Error("Invalid JSON data");
  }
}
