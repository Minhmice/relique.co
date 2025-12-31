export interface Session {
  userEmail: string;
  userName: string;
  loginMethod: "email" | "magic-link" | "social";
  createdAt: string;
}

export interface VerifyHistoryEntry {
  productId: string;
  result: "qualified" | "inconclusive" | "disqualified";
  timestamp: number;
}

const STORAGE_KEYS = {
  SESSION: "relique_session",
  THEME: "relique_theme",
  VERIFY_HISTORY: "relique_verifyHistory",
  UPLOADS_DRAFT: "relique_uploadsDraft",
} as const;

export const storage = {
  session: {
    get: (): Session | null => {
      if (typeof window === "undefined") return null;
      const data = localStorage.getItem(STORAGE_KEYS.SESSION);
      return data ? JSON.parse(data) : null;
    },
    set: (session: Session): void => {
      if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
    },
    remove: (): void => {
      if (typeof window === "undefined") return;
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    },
  },
  theme: {
    get: (): "light" | "dark" => {
      if (typeof window === "undefined") return "light";
      const theme = localStorage.getItem(STORAGE_KEYS.THEME);
      return (theme === "dark" ? "dark" : "light") as "light" | "dark";
    },
    set: (theme: "light" | "dark"): void => {
      if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    },
  },
  verifyHistory: {
    get: (): unknown[] => {
      if (typeof window === "undefined") return [];
      const data = localStorage.getItem(STORAGE_KEYS.VERIFY_HISTORY);
      return data ? JSON.parse(data) : [];
    },
    set: (history: unknown[]): void => {
      if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEYS.VERIFY_HISTORY, JSON.stringify(history));
    },
    clear: (): void => {
      if (typeof window === "undefined") return;
      localStorage.removeItem(STORAGE_KEYS.VERIFY_HISTORY);
    },
  },
  uploadsDraft: {
    get: (): unknown => {
      if (typeof window === "undefined") return null;
      const data = localStorage.getItem(STORAGE_KEYS.UPLOADS_DRAFT);
      return data ? JSON.parse(data) : null;
    },
    set: (draft: unknown): void => {
      if (typeof window === "undefined") return;
      localStorage.setItem(STORAGE_KEYS.UPLOADS_DRAFT, JSON.stringify(draft));
    },
  },
};

