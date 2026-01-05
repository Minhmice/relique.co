import { storage } from "@/lib/storage";
import { setVerifyMapping, getVerifyMappingForPreset } from "@/lib/services/verifyService";
import { setSimulationConfig } from "@/lib/simulation";
import type { VerifyMappingEntry } from "@/lib/schemas/verify";
import type { MarketplaceListing } from "@/lib/schemas/marketplace";
import type { Post } from "@/lib/schemas/content";
import type { Event } from "@/lib/schemas/content";
import type { ConsignDraft } from "@/lib/schemas/consign";
import type { VerifyHistoryEntry } from "@/lib/storage";

export interface PresetData {
  dataset?: {
    marketplace?: MarketplaceListing[];
    posts?: Post[];
    events?: Event[];
  };
  userState?: {
    favorites?: string[];
    verifyHistory?: VerifyHistoryEntry[];
    drafts?: ConsignDraft[];
  };
  verifyMapping?: Record<string, VerifyMappingEntry>;
  simulation?: {
    latency?: "fast" | "normal" | "slow";
    errors?: "off" | "low" | "medium" | "force";
  };
}

export type PresetName = "collector" | "investor" | "dealer" | "empty" | "error-heavy";

async function loadPreset(name: PresetName): Promise<PresetData> {
  try {
    const preset = await import(`@/presets/${name}.json`);
    return preset.default as PresetData;
  } catch (error) {
    console.error(`Failed to load preset "${name}":`, error);
    throw new Error(`Preset "${name}" not found`);
  }
}

export async function applyPreset(name: PresetName): Promise<void> {
  const preset = await loadPreset(name);
  
  // Apply dataset overrides (if provided)
  if (preset.dataset) {
    if (preset.dataset.marketplace) {
      storage.marketplace.listings.set(preset.dataset.marketplace);
    }
    if (preset.dataset.posts) {
      storage.content.posts.set(preset.dataset.posts);
    }
    if (preset.dataset.events) {
      storage.content.events.set(preset.dataset.events);
    }
  }
  
  // Apply user state
  if (preset.userState) {
    if (preset.userState.favorites) {
      storage.marketplace.favorites.set(preset.userState.favorites);
    }
    if (preset.userState.verifyHistory) {
      storage.verifyHistory.set(preset.userState.verifyHistory);
    }
    if (preset.userState.drafts) {
      // Only one draft supported for now
      const draft = preset.userState.drafts[0] || null;
      storage.consign.drafts.set(draft);
    }
  }
  
  // Apply verify mapping
  if (preset.verifyMapping) {
    setVerifyMapping(preset.verifyMapping);
  }
  
  // Apply simulation config
  if (preset.simulation) {
    setSimulationConfig({
      latency: preset.simulation.latency,
      errors: preset.simulation.errors,
    });
  }
  
  // Store current preset name
  if (typeof window !== "undefined") {
    localStorage.setItem("relique.v1.demo.preset", name);
  }
}

export async function getCurrentPreset(): Promise<PresetName | null> {
  if (typeof window === "undefined") return null;
  const preset = localStorage.getItem("relique.v1.demo.preset");
  return (preset as PresetName) || null;
}

export function resetAllStorage(): void {
  storage.clearAll();
  
  // Reset preset tracking
  if (typeof window !== "undefined") {
    localStorage.removeItem("relique.v1.demo.preset");
    localStorage.removeItem("relique.v1.demo.latency");
    localStorage.removeItem("relique.v1.demo.errors");
  }
}

export async function exportStorageData(): Promise<string> {
  const data = {
    marketplace: {
      listings: storage.marketplace.listings.get(),
      favorites: storage.marketplace.favorites.get(),
    },
    verify: {
      history: storage.verifyHistory.get(),
      mapping: getVerifyMappingForPreset(),
    },
    consign: {
      drafts: storage.consign.drafts.get(),
      submissions: storage.consign.submissions.get(),
    },
    content: {
      posts: storage.content.posts.get(),
      events: storage.content.events.get(),
    },
    simulation: {
      latency: localStorage.getItem("relique.v1.demo.latency"),
      errors: localStorage.getItem("relique.v1.demo.errors"),
    },
  };
  
  return JSON.stringify(data, null, 2);
}

export async function importStorageData(jsonString: string): Promise<void> {
  try {
    const data = JSON.parse(jsonString);
    
    if (data.marketplace) {
      if (data.marketplace.listings) {
        storage.marketplace.listings.set(data.marketplace.listings);
      }
      if (data.marketplace.favorites) {
        storage.marketplace.favorites.set(data.marketplace.favorites);
      }
    }
    
    if (data.verify) {
      if (data.verify.history) {
        storage.verifyHistory.set(data.verify.history);
      }
      if (data.verify.mapping) {
        setVerifyMapping(data.verify.mapping);
      }
    }
    
    if (data.consign) {
      if (data.consign.drafts) {
        storage.consign.drafts.set(data.consign.drafts);
      }
      if (data.consign.submissions) {
        storage.consign.submissions.set(data.consign.submissions);
      }
    }
    
    if (data.content) {
      if (data.content.posts) {
        storage.content.posts.set(data.content.posts);
      }
      if (data.content.events) {
        storage.content.events.set(data.content.events);
      }
    }
    
    if (data.simulation) {
      setSimulationConfig({
        latency: data.simulation.latency,
        errors: data.simulation.errors,
      });
    }
  } catch (error) {
    console.error("Failed to import storage data:", error);
    throw new Error("Invalid JSON data");
  }
}

