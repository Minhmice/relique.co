import type { Post, Event } from "@/lib/types";
import postsSeed from "@/mocks/posts.json";
import eventsSeed from "@/mocks/events.json";

const POSTS_STORAGE_KEY = "relique_posts";
const EVENTS_STORAGE_KEY = "relique_events";

function getStoredPosts(): Post[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(POSTS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

function getStoredEvents(): Event[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

function getSeedPosts(): Post[] {
  return postsSeed as Post[];
}

function getSeedEvents(): Event[] {
  return eventsSeed as Event[];
}

function savePosts(posts: Post[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
}

function saveEvents(events: Event[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
}

export const contentService = {
  posts: {
    list: (featured?: boolean, tag?: string): Post[] => {
      let posts = getStoredPosts();
      
      if (posts.length === 0) {
        posts = getSeedPosts();
        if (posts.length > 0) {
          savePosts(posts);
        }
      }

      if (featured) {
        posts = posts.filter((post) => post.featured);
      }

      if (tag) {
        posts = posts.filter((post) => post.tags?.includes(tag));
      }

      return posts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    },

    get: (slug: string): Post | null => {
      const posts = getStoredPosts();
      const post = posts.find((p) => p.slug === slug);
      
      if (post) return post;

      const seedPosts = getSeedPosts();
      return seedPosts.find((p) => p.slug === slug) || null;
    },

    create: (post: Omit<Post, "id" | "slug" | "createdAt" | "updatedAt">): Post => {
      const posts = getStoredPosts();
      const newPost: Post = {
        ...post,
        id: String(Date.now()),
        slug: post.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      posts.push(newPost);
      savePosts(posts);
      return newPost;
    },

    update: (id: string, updates: Partial<Post>): Post | null => {
      const posts = getStoredPosts();
      const index = posts.findIndex((p) => p.id === id);
      
      if (index === -1) return null;
      const existing = posts[index];
      if (!existing) return null;

      posts[index] = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      savePosts(posts);
      return posts[index];
    },

    delete: (id: string): boolean => {
      const posts = getStoredPosts();
      const filtered = posts.filter((p) => p.id !== id);
      
      if (filtered.length === posts.length) return false;
      
      savePosts(filtered);
      return true;
    },
  },

  events: {
    list: (upcoming?: boolean): Event[] => {
      let events = getStoredEvents();
      
      if (events.length === 0) {
        events = getSeedEvents();
        if (events.length > 0) {
          saveEvents(events);
        }
      }

      if (upcoming) {
        const now = new Date();
        events = events.filter((event) => new Date(event.date) >= now);
      }

      return events.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    },

    get: (slug: string): Event | null => {
      const events = getStoredEvents();
      const event = events.find((e) => e.slug === slug);
      
      if (event) return event;

      const seedEvents = getSeedEvents();
      return seedEvents.find((e) => e.slug === slug) || null;
    },

    create: (event: Omit<Event, "id" | "slug" | "createdAt" | "updatedAt">): Event => {
      const events = getStoredEvents();
      const newEvent: Event = {
        ...event,
        id: String(Date.now()),
        slug: event.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      events.push(newEvent);
      saveEvents(events);
      return newEvent;
    },

    update: (id: string, updates: Partial<Event>): Event | null => {
      const events = getStoredEvents();
      const index = events.findIndex((e) => e.id === id);
      
      if (index === -1) return null;
      const existing = events[index];
      if (!existing) return null;

      events[index] = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      saveEvents(events);
      return events[index];
    },

    delete: (id: string): boolean => {
      const events = getStoredEvents();
      const filtered = events.filter((e) => e.id !== id);
      
      if (filtered.length === events.length) return false;
      
      saveEvents(filtered);
      return true;
    },
  },
};

