import type { IVerifyService } from "./contracts";
import type { VerifyRunInput, VerifyResult, VerifyHistoryEntry } from "@/lib/schemas/verify";
import { VerifyResultSchema, VerifyHistoryEntrySchema } from "@/lib/schemas/verify";
import { storage } from "@/lib/storage";
import type { VerifyMappingEntry } from "@/lib/schemas/verify";

// Default verify mapping rules
const DEFAULT_VERIFY_MAPPING: Record<string, VerifyMappingEntry> = {
  "RLQ-QUAL": { status: "qualified", signatures: 2 },
  "RLQ-INCON": { status: "inconclusive", signatures: 1 },
  "RLQ-DISQ": { status: "disqualified", signatures: 0 },
};

// Get verify mapping from storage or use default
function getVerifyMapping(): Record<string, VerifyMappingEntry> {
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
function matchVerifyCode(code: string): VerifyMappingEntry | null {
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
    itemName = matched.itemName ?? `Authenticated Item ${code}`;
    certificate = matched.certificate ?? (code.startsWith("REL-") ? code : `REL-2024-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`);
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
      status = results[Math.floor(Math.random() * results.length)];
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

export const verifyService: IVerifyService = {
  async run(input: VerifyRunInput): Promise<VerifyResult> {
    // Fixed 5s delay
    await delay(5000);
    
    const result = generateVerifyResult(input.code);
    
    // Validate result
    const validated = VerifyResultSchema.parse(result);
    
    return validated;
  },
  
  history: {
    async list(): Promise<VerifyHistoryEntry[]> {
      const history = storage.verifyHistory.get();
      return history.map((entry) => {
        const validated = VerifyHistoryEntrySchema.safeParse(entry);
        if (validated.success) {
          return validated.data;
        }
        // Skip invalid entries
        return null;
      }).filter((entry): entry is VerifyHistoryEntry => entry !== null);
    },
    
    async add(result: VerifyResult): Promise<void> {
      const entry: VerifyHistoryEntry = {
        productId: result.productId,
        result: result.status,
        timestamp: new Date(result.date).getTime(),
      };
      
      storage.verifyHistory.add(entry);
    },
    
    async clear(): Promise<void> {
      storage.verifyHistory.clear();
    },
  },
};

// Export helper to update verify mapping (for presets)
export function setVerifyMapping(mapping: Record<string, VerifyMappingEntry>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("relique.v1.verify.mapping", JSON.stringify(mapping));
}

export function getVerifyMappingForPreset(): Record<string, VerifyMappingEntry> {
  return getVerifyMapping();
}

