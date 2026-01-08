import type { z } from "zod";

export interface MockSession {
  displayName: string;
  createdAt: number;
}

export interface VerifyHistoryEntry {
  productId: string;
  result: "qualified" | "inconclusive" | "disqualified";
  timestamp: number;
}

const STORAGE_KEYS = {
  SESSION_MOCK: "relique.v1.session.mock",
  THEME: "relique.v1.theme",
  MARKETPLACE_LISTINGS: "relique.v1.marketplace.listings",
  MARKETPLACE_FAVORITES: "relique.v1.marketplace.favorites",
  VERIFY_HISTORY: "relique.v1.verify.history",
  CONSIGN_DRAFTS: "relique.v1.consign.drafts",
  CONSIGN_SUBMISSIONS: "relique.v1.consign.submissions",
  CONTENT_POSTS: "relique.v1.content.posts",
  CONTENT_EVENTS: "relique.v1.content.events",
  ADMIN_VIEWS_COLUMNS: "relique.v1.admin.views.submissions.columns",
  ADMIN_VIEWS_SAVED: "relique.v1.admin.views.submissions.saved",
  ADMIN_RECENT_SEARCHES: "relique.v1.admin.recentSearches.submissions",
  ADMIN_SAVED_FILTERS: "relique.v1.admin.savedFilters.submissions",
  ADMIN_NOTIFICATIONS: "relique.v1.admin.notifications",
  ADMIN_ALERT_RULES: "relique.v1.admin.alertRules",
  ADMIN_ACTIVITY_LOG: "relique.v1.admin.activityLog",
} as const;

function getItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    }
  } catch {
    // Invalid JSON, return default
  }
  return defaultValue;
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch storage event for multi-tab sync
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue: JSON.stringify(value),
    }));
  } catch (error) {
    console.error(`Failed to save to localStorage key "${key}":`, error);
  }
}

function removeItem(key: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
  window.dispatchEvent(new StorageEvent('storage', {
    key,
    newValue: null,
  }));
}

export const storage = {
  sessionMock: {
    get: (): MockSession | null => {
      return getItem<MockSession | null>(STORAGE_KEYS.SESSION_MOCK, null);
    },
    set: (session: MockSession): void => {
      setItem(STORAGE_KEYS.SESSION_MOCK, session);
    },
    remove: (): void => {
      removeItem(STORAGE_KEYS.SESSION_MOCK);
    },
  },
  marketplace: {
    favorites: {
      get: (): string[] => {
        return getItem<string[]>(STORAGE_KEYS.MARKETPLACE_FAVORITES, []);
      },
      set: (favorites: string[]): void => {
        setItem(STORAGE_KEYS.MARKETPLACE_FAVORITES, favorites);
      },
      add: (id: string): void => {
        const favorites = storage.marketplace.favorites.get();
        if (!favorites.includes(id)) {
          storage.marketplace.favorites.set([...favorites, id]);
        }
      },
      remove: (id: string): void => {
        const favorites = storage.marketplace.favorites.get();
        storage.marketplace.favorites.set(favorites.filter((f) => f !== id));
      },
    },
  },
  verifyHistory: {
    get: (): VerifyHistoryEntry[] => {
      return getItem<VerifyHistoryEntry[]>(STORAGE_KEYS.VERIFY_HISTORY, []);
    },
    set: (history: VerifyHistoryEntry[]): void => {
      setItem(STORAGE_KEYS.VERIFY_HISTORY, history);
    },
    add: (entry: VerifyHistoryEntry): void => {
      const history = storage.verifyHistory.get();
      const exists = history.some((h) => h.productId === entry.productId);
      if (exists) {
        const updated = history.map((h) =>
          h.productId === entry.productId ? entry : h
        );
        storage.verifyHistory.set(updated);
      } else {
        storage.verifyHistory.set([...history, entry]);
      }
    },
    clear: (): void => {
      removeItem(STORAGE_KEYS.VERIFY_HISTORY);
    },
  },
  consign: {
    drafts: {
      get: <T = unknown>(): T | null => {
        return getItem<T | null>(STORAGE_KEYS.CONSIGN_DRAFTS, null);
      },
      set: <T>(draft: T | null): void => {
        setItem(STORAGE_KEYS.CONSIGN_DRAFTS, draft);
      },
    },
    submissions: {
      get: <T = unknown>(): T[] => {
        return getItem<T[]>(STORAGE_KEYS.CONSIGN_SUBMISSIONS, []);
      },
      set: <T>(submissions: T[]): void => {
        setItem(STORAGE_KEYS.CONSIGN_SUBMISSIONS, submissions);
      },
    },
  },
  admin: {
    views: {
      columns: {
        get: (): Record<string, boolean> => {
          return getItem<Record<string, boolean>>(STORAGE_KEYS.ADMIN_VIEWS_COLUMNS, {});
        },
        set: (columns: Record<string, boolean>): void => {
          setItem(STORAGE_KEYS.ADMIN_VIEWS_COLUMNS, columns);
        },
      },
      saved: {
        get: (): Array<{ id: string; name: string; filters?: unknown; sort?: unknown; columnVisibility?: Record<string, boolean>; pageSize?: number; createdAt: number }> => {
          return getItem(STORAGE_KEYS.ADMIN_VIEWS_SAVED, []);
        },
        set: (views: Array<{ id: string; name: string; filters?: unknown; sort?: unknown; columnVisibility?: Record<string, boolean>; pageSize?: number; createdAt: number }>): void => {
          setItem(STORAGE_KEYS.ADMIN_VIEWS_SAVED, views);
        },
      },
    },
    recentSearches: {
      get: (): string[] => {
        return getItem<string[]>(STORAGE_KEYS.ADMIN_RECENT_SEARCHES, []);
      },
      set: (searches: string[]): void => {
        setItem(STORAGE_KEYS.ADMIN_RECENT_SEARCHES, searches);
      },
    },
    savedFilters: {
      get: (): Array<{ id: string; name: string; query?: string; filters?: unknown; createdAt: number }> => {
        return getItem(STORAGE_KEYS.ADMIN_SAVED_FILTERS, []);
      },
      set: (filters: Array<{ id: string; name: string; query?: string; filters?: unknown; createdAt: number }>): void => {
        setItem(STORAGE_KEYS.ADMIN_SAVED_FILTERS, filters);
      },
    },
    notifications: {
      get: (): Array<{ id: string; type: string; message: string; read: boolean; timestamp: number }> => {
        return getItem(STORAGE_KEYS.ADMIN_NOTIFICATIONS, []);
      },
      set: (notifications: Array<{ id: string; type: string; message: string; read: boolean; timestamp: number }>): void => {
        setItem(STORAGE_KEYS.ADMIN_NOTIFICATIONS, notifications);
      },
    },
    alertRules: {
      get: (): Array<{ id: string; name: string; condition: unknown; action: unknown; enabled: boolean }> => {
        return getItem(STORAGE_KEYS.ADMIN_ALERT_RULES, []);
      },
      set: (rules: Array<{ id: string; name: string; condition: unknown; action: unknown; enabled: boolean }>): void => {
        setItem(STORAGE_KEYS.ADMIN_ALERT_RULES, rules);
      },
    },
    activityLog: {
      get: (): Array<{ id: string; type: string; message: string; timestamp: number; metadata?: unknown }> => {
        return getItem(STORAGE_KEYS.ADMIN_ACTIVITY_LOG, []);
      },
      set: (log: Array<{ id: string; type: string; message: string; timestamp: number; metadata?: unknown }>): void => {
        setItem(STORAGE_KEYS.ADMIN_ACTIVITY_LOG, log);
      },
    },
  },
  // Clear all storage (for reset/demo)
  clearAll: (): void => {
    if (typeof window === "undefined") return;
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    // Also clear admin-specific keys (migrate from old portal keys)
    const adminKeys = [
      "relique.v1.admin.views.submissions.columns",
      "relique.v1.admin.views.submissions.saved",
      "relique.v1.admin.recentSearches.submissions",
      "relique.v1.admin.savedFilters.submissions",
      "relique.v1.admin.notifications",
      "relique.v1.admin.alertRules",
      "relique.v1.admin.activityLog",
      // Legacy portal keys (for migration cleanup)
      "relique.v1.portal.views.submissions.columns",
      "relique.v1.portal.views.submissions.saved",
      "relique.v1.portal.recentSearches.submissions",
      "relique.v1.portal.savedFilters.submissions",
      "relique.v1.portal.notifications",
      "relique.v1.portal.alertRules",
      "relique.v1.portal.activityLog",
    ];
    adminKeys.forEach((key) => {
      localStorage.removeItem(key);
    });
  },
};

