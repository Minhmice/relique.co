import { withLatency, type LatencyProfile } from "./latency";
import { withErrorInjection, type ErrorMode } from "./errors";

export type { LatencyProfile, ErrorMode };
export { withLatency, withErrorInjection };

export interface SimulationConfig {
  latency?: LatencyProfile;
  errors?: ErrorMode;
}

export async function withSimulation<T>(
  fn: () => Promise<T>,
  config: SimulationConfig = {}
): Promise<T> {
  const { latency = "normal", errors = "off" } = config;
  
  // Apply error injection first (before latency)
  const fnWithErrors = () => withErrorInjection(fn, errors);
  
  // Then apply latency
  return withLatency(fnWithErrors, latency);
}

// Get current simulation config from env or localStorage
export function getSimulationConfig(): SimulationConfig {
  if (typeof window === "undefined") {
    return { latency: "normal", errors: "off" };
  }
  
  const latency = (localStorage.getItem("relique.v1.demo.latency") as LatencyProfile) || 
    (process.env.NEXT_PUBLIC_DEMO_LATENCY as LatencyProfile) || 
    "normal";
  
  const errors = (localStorage.getItem("relique.v1.demo.errors") as ErrorMode) || 
    (process.env.NEXT_PUBLIC_DEMO_ERRORS as ErrorMode) || 
    "off";
  
  return { latency, errors };
}

// Set simulation config
export function setSimulationConfig(config: SimulationConfig): void {
  if (typeof window === "undefined") return;
  
  if (config.latency) {
    localStorage.setItem("relique.v1.demo.latency", config.latency);
  }
  
  if (config.errors) {
    localStorage.setItem("relique.v1.demo.errors", config.errors);
  }
}

