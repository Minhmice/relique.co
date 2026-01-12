import { storage } from "./storage";
import type { MockSession } from "./storage";

export function generateDisplayName(email: string, provider?: string): string {
  if (provider) {
    return provider.charAt(0).toUpperCase() + provider.slice(1) + " User";
  }
  const username = email.split("@")[0] || "User";
  return username.charAt(0).toUpperCase() + username.slice(1);
}

export function createSession(
  email: string,
  loginMethod: "email" | "magic-link" | "social",
  provider?: string
): MockSession {
  return {
    displayName: generateDisplayName(email, provider),
    createdAt: Date.now(),
  };
}

export function login(email: string, loginMethod: "email" | "magic-link" | "social", provider?: string): MockSession {
  const session = createSession(email, loginMethod, provider);
  storage.sessionMock.set(session);
  return session;
}

export function logout(): void {
  storage.sessionMock.remove();
}

export function isAuthenticated(): boolean {
  return storage.sessionMock.get() !== null;
}

