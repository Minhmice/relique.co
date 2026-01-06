/**
 * @deprecated Use @relique/shared/domain fixtures/seed instead
 * This file is kept for backward compatibility during Phase 3 migration.
 * All new code should use applyPreset from @relique/shared/domain
 */
import {
  applyPreset as applyPresetShared,
  getCurrentPreset as getCurrentPresetShared,
  resetAllStorage as resetAllStorageShared,
  type PresetId,
} from "@relique/shared/domain";
import { storage } from "@/lib/storage";

export type PresetName = PresetId;

/**
 * @deprecated Use applyPreset from @relique/shared/domain
 */
export async function applyPreset(name: PresetName): Promise<void> {
  return applyPresetShared(name);
}

/**
 * @deprecated Use getCurrentPreset from @relique/shared/domain
 */
export async function getCurrentPreset(): Promise<PresetName | null> {
  return getCurrentPresetShared();
}

/**
 * @deprecated Use resetAllStorage from @relique/shared/domain
 */
export function resetAllStorage(): void {
  resetAllStorageShared();
  // Also clear portal-specific storage (if needed)
  storage.clearAll();
}

