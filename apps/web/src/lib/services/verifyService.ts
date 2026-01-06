/**
 * @deprecated Use services from impl/ instead
 * This file is kept for backward compatibility during Phase 4 migration.
 * All new code should import from impl/
 */
import { verifyService as verifyServiceImpl } from "./impl";
import type { VerifyRunInput, VerifyResult, VerifyHistoryEntry } from "@relique/shared/domain";
import { unwrapOr } from "@relique/shared/domain";

// Legacy interface for backward compatibility
export interface IVerifyService {
  run(input: VerifyRunInput): Promise<VerifyResult>;
  history: {
    list(): Promise<VerifyHistoryEntry[]>;
    add(result: VerifyResult): Promise<void>;
    clear(): Promise<void>;
  };
}

export const verifyService: IVerifyService = {
  async run(input: VerifyRunInput): Promise<VerifyResult> {
    const result = await verifyServiceImpl.verifyByCode(input);
    if (result.ok) {
      return result.data;
    }
    throw new Error(result.error.message);
  },
  
  history: {
    async list(): Promise<VerifyHistoryEntry[]> {
      const result = await verifyServiceImpl.getVerifyHistory();
      if (result.ok) {
        return result.data;
      }
      console.error("Failed to get verify history:", result.error);
      return [];
    },
    
    async add(result: VerifyResult): Promise<void> {
      const entry: VerifyHistoryEntry = {
        productId: result.productId,
        result: result.status,
        timestamp: new Date(result.date).getTime(),
      };
      const saveResult = await verifyServiceImpl.saveVerifyHistory(entry);
      if (!saveResult.ok) {
        throw new Error(saveResult.error.message);
      }
    },
    
    async clear(): Promise<void> {
      const result = await verifyServiceImpl.clearVerifyHistory();
      if (!result.ok) {
        throw new Error(result.error.message);
      }
    },
  },
};

// Export helper to update verify mapping (for presets)
export function setVerifyMapping(mapping: Record<string, { status: "qualified" | "inconclusive" | "disqualified"; signatures?: number }>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("relique.v1.verify.mapping", JSON.stringify(mapping));
}

export function getVerifyMappingForPreset(): Record<string, { status: "qualified" | "inconclusive" | "disqualified"; signatures?: number }> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem("relique.v1.verify.mapping");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Use default if parse fails
  }
  return {
    "RLQ-QUAL": { status: "qualified", signatures: 2 },
    "RLQ-INCON": { status: "inconclusive", signatures: 1 },
    "RLQ-DISQ": { status: "disqualified", signatures: 0 },
  };
}
