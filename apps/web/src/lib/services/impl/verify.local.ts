import type { IVerifyService } from "@relique/shared/domain";
import type { Result } from "@relique/shared/domain";
import { ok, err } from "@relique/shared/domain";
import {
  validationError,
  unknownError,
  quotaExceededError,
} from "@relique/shared/domain";
import type {
  VerifyResult,
  VerifyHistoryEntry,
  VerifyRunInput,
} from "@relique/shared/domain";
import {
  VerifyResultSchema,
  VerifyHistoryEntrySchema,
  VerifyRunInputSchema,
} from "@relique/shared/domain";
import {
  getVerifyHistory,
  addVerifyHistoryEntry,
  clearVerifyHistory,
} from "@relique/shared/domain";

// Default verify mapping rules
const DEFAULT_VERIFY_MAPPING: Record<string, { status: "qualified" | "inconclusive" | "disqualified"; signatures: number }> = {
  "RLQ-QUAL": { status: "qualified", signatures: 2 },
  "RLQ-INCON": { status: "inconclusive", signatures: 1 },
  "RLQ-DISQ": { status: "disqualified", signatures: 0 },
};

// Get verify mapping from storage or use default
function getVerifyMapping(): Record<string, { status: "qualified" | "inconclusive" | "disqualified"; signatures: number }> {
  if (typeof window === "undefined") return DEFAULT_VERIFY_MAPPING;
  try {
    const stored = localStorage.getItem("relique.v1.verify.mapping");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Use default if parse fails
  }
  return DEFAULT_VERIFY_MAPPING;
}

// Match code against mapping patterns
function matchVerifyCode(code: string): { status: "qualified" | "inconclusive" | "disqualified"; signatures: number } | null {
  const mapping = getVerifyMapping();
  
  // Exact match
  if (mapping[code]) {
    return mapping[code];
  }
  
  // Pattern match (e.g., RLQ-QUAL-*)
  for (const [pattern, entry] of Object.entries(mapping)) {
    if (pattern.endsWith("*")) {
      const prefix = pattern.slice(0, -1);
      if (code.startsWith(prefix)) {
        return entry;
      }
    }
  }
  
  return null;
}

// Generate deterministic verify result
function generateVerifyResult(code: string): VerifyResult {
  const matched = matchVerifyCode(code);
  const now = new Date().toISOString();
  
  let status: "qualified" | "inconclusive" | "disqualified";
  let signatures: number;
  let itemName: string;
  let certificate: string;
  
  if (matched) {
    status = matched.status;
    signatures = matched.signatures ?? Math.floor(Math.random() * 3) + 1;
    itemName = `Authenticated Item ${code}`;
    certificate = code.startsWith("REL-") ? code : `REL-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
  } else {
    // Fallback: determine from code pattern
    if (code.toUpperCase().includes("QUAL") || code.toUpperCase().includes("QUALIFIED")) {
      status = "qualified";
      signatures = 2;
    } else if (code.toUpperCase().includes("INCON") || code.toUpperCase().includes("INCONCLUSIVE")) {
      status = "inconclusive";
      signatures = 1;
    } else if (code.toUpperCase().includes("DISQ") || code.toUpperCase().includes("DISQUALIFIED")) {
      status = "disqualified";
      signatures = 0;
    } else {
      // Random fallback (for demo purposes)
      const results: Array<"qualified" | "inconclusive" | "disqualified"> = ["qualified", "inconclusive", "disqualified"];
      status = results[Math.floor(Math.random() * results.length)] as "qualified" | "inconclusive" | "disqualified";
      signatures = Math.floor(Math.random() * 3) + 1;
    }
    itemName = `Authenticated Item ${code}`;
    certificate = code.startsWith("REL-") ? code : `REL-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`;
  }
  
  return {
    productId: code,
    itemName,
    signatures,
    status,
    date: now,
    certificate,
    authenticationResult: `Item verified as ${status}`,
    dateOfAnalysis: now,
  };
}

// Fixed 5s delay for verify
async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const verifyServiceLocal: IVerifyService = {
  async verifyByCode(input: VerifyRunInput): Promise<Result<VerifyResult>> {
    // Validate input
    const inputValidation = VerifyRunInputSchema.safeParse(input);
    if (!inputValidation.success) {
      return err(validationError("Invalid verify input", inputValidation.error));
    }

    try {
      // Fixed 5s delay
      await delay(5000);
      
      const result = generateVerifyResult(input.code);
      
      // Validate result
      const validated = VerifyResultSchema.safeParse(result);
      if (!validated.success) {
        return err(validationError("Invalid verify result", validated.error));
      }
      
      return ok(validated.data);
    } catch (error) {
      return err(unknownError("Verify failed", error));
    }
  },

  async verifyByQr(input: VerifyRunInput): Promise<Result<VerifyResult>> {
    // Mock: alias for verifyByCode
    return verifyServiceLocal.verifyByCode(input);
  },

  async getVerifyHistory(): Promise<Result<VerifyHistoryEntry[]>> {
    try {
      const history = getVerifyHistory();
      // Validate each entry
      const validated = history
        .map((entry) => {
          const result = VerifyHistoryEntrySchema.safeParse(entry);
          if (result.success) {
            return result.data;
          }
          return null;
        })
        .filter((entry): entry is VerifyHistoryEntry => entry !== null);
      
      return ok(validated);
    } catch (error) {
      return err(unknownError("Failed to get verify history", error));
    }
  },

  async saveVerifyHistory(item: VerifyHistoryEntry): Promise<Result<void>> {
    try {
      // Validate entry
      const validation = VerifyHistoryEntrySchema.safeParse(item);
      if (!validation.success) {
        return err(validationError("Invalid verify history entry", validation.error));
      }

      addVerifyHistoryEntry(validation.data);
      return ok(undefined);
    } catch (error) {
      // Check if quota exceeded
      if (error instanceof Error && error.message.includes("quota")) {
        return err(quotaExceededError("Storage quota exceeded", 100));
      }
      return err(unknownError("Failed to save verify history", error));
    }
  },

  async clearVerifyHistory(): Promise<Result<void>> {
    try {
      clearVerifyHistory();
      return ok(undefined);
    } catch (error) {
      return err(unknownError("Failed to clear verify history", error));
    }
  },
};

