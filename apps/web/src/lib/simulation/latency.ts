export type LatencyProfile = "fast" | "normal" | "slow" | "verify";

export interface LatencyConfig {
  min: number;
  max: number;
}

const LATENCY_PROFILES: Record<LatencyProfile, LatencyConfig> = {
  fast: { min: 0, max: 150 },
  normal: { min: 200, max: 600 },
  slow: { min: 1200, max: 2500 },
  verify: { min: 5000, max: 5000 }, // Fixed 5s for verify
};

export function getLatencyDelay(profile: LatencyProfile = "normal"): number {
  const config = LATENCY_PROFILES[profile];
  if (config.min === config.max) {
    return config.min;
  }
  return Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
}

export async function withLatency<T>(
  fn: () => Promise<T>,
  profile: LatencyProfile = "normal"
): Promise<T> {
  const delay = getLatencyDelay(profile);
  await new Promise((resolve) => setTimeout(resolve, delay));
  return fn();
}

