import type { ServiceError } from "@/lib/services/contracts";

export type ErrorMode = "off" | "low" | "medium" | "force";

const ERROR_RATES: Record<ErrorMode, number> = {
  off: 0,
  low: 0.02, // 2%
  medium: 0.06, // 6%
  force: 1, // 100%
};

// Track forced errors
let forcedError: ServiceError | null = null;

export function setForcedError(error: ServiceError | null): void {
  forcedError = error;
}

export function getForcedError(): ServiceError | null {
  return forcedError;
}

export function shouldInjectError(mode: ErrorMode): boolean {
  if (mode === "force") {
    return forcedError !== null;
  }
  
  if (mode === "off") {
    return false;
  }
  
  const rate = ERROR_RATES[mode];
  return Math.random() < rate;
}

export function generateError(code: string = "SERVICE_ERROR"): ServiceError {
  if (forcedError) {
    const error = forcedError;
    forcedError = null; // Reset after use
    return error;
  }
  
  const errorMessages: Record<string, string> = {
    SERVICE_ERROR: "An unexpected error occurred. Please try again.",
    NETWORK_ERROR: "Network request failed. Please check your connection.",
    VALIDATION_ERROR: "Invalid request data. Please check your input.",
    NOT_FOUND: "The requested resource was not found.",
    UNAUTHORIZED: "You are not authorized to perform this action.",
    RATE_LIMIT: "Too many requests. Please try again later.",
  };
  
  const retryableCodes = ["NETWORK_ERROR", "RATE_LIMIT", "SERVICE_ERROR"];
  
  return {
    code,
    message: errorMessages[code] ?? errorMessages.SERVICE_ERROR ?? "An unexpected error occurred. Please try again.",
    retryable: retryableCodes.includes(code),
  };
}

export async function withErrorInjection<T>(
  fn: () => Promise<T>,
  mode: ErrorMode = "off"
): Promise<T> {
  if (shouldInjectError(mode)) {
    const error = generateError();
    throw error;
  }
  
  return fn();
}

