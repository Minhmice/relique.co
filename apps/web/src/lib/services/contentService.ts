import type { IContentService, ContentListParams } from "./contracts";
import { PostSchema, EventSchema } from "@/lib/schemas/content";
import { storage } from "@/lib/storage";
import postsSeed from "@/mocks/posts.json";
import eventsSeed from "@/mocks/events.json";
import type { Post, Event } from "@/lib/schemas/content";

function readSeedPosts(): Post[] {
  return (postsSeed as Post[]).map((item) => {
    const validated = PostSchema.safeParse(item);
    if (validated.success) {
      return validated.data;
    }
    console.warn("Invalid post in seed:", item);
    return item as Post;
  });
}

function readSeedEvents(): Event[] {
  return (eventsSeed as Event[]).map((item) => {
    const validated = EventSchema.safeParse(item);
    if (validated.success) {
      return validated.data;
    }
    console.warn("Invalid event in seed:", item);
    return item as Event;
  });
}

function readStoragePosts(): Post[] {
  return storage.content.posts.get<Post>();
}

function readStorageEvents(): Event[] {
  return storage.content.events.get<Event>();
}

function mergePosts(seed: Post[], mutations: Post[]): Post[] {
  if (mutations.length === 0) {
    return seed;
  }
  
  const seedMap = new Map(seed.map((item) => [item.id, item]));
  mutations.forEach((mutated) => {
    seedMap.set(mutated.id, mutated);
  });
  
  return Array.from(seedMap.values());
}

function mergeEvents(seed: Event[], mutations: Event[]): Event[] {
  if (mutations.length === 0) {
    return seed;
  }
  
  const seedMap = new Map(seed.map((item) => [item.id, item]));
  mutations.forEach((mutated) => {
    seedMap.set(mutated.id, mutated);
  });
  
  return Array.from(seedMap.values());
}

function validatePost(item: Post): Post {
  const validated = PostSchema.safeParse(item);
  if (validated.success) {
    return validated.data;
  }
  console.warn("Invalid post:", item);
  return item;
}

function validateEvent(item: Event): Event {
  const validated = EventSchema.safeParse(item);
  if (validated.success) {
    return validated.data;
  }
  console.warn("Invalid event:", item);
  return item;
}

export const contentService: IContentService = {
  posts: {
    async list(params?: ContentListParams): Promise<Post[]> {
      const seed = readSeedPosts();
      const mutations = readStoragePosts();
      let posts = mergePosts(seed, mutations);
      
      if (params?.featured) {
        posts = posts.filter((post) => post.featured);
      }
      
      if (params?.tag) {
        posts = posts.filter((post) => post.tags?.includes(params.tag!));
      }
      
      return posts
        .map(validatePost)
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
    },
    
    async get(slug: string): Promise<Post | null> {
      const seed = readSeedPosts();
      const mutations = readStoragePosts();
      const posts = mergePosts(seed, mutations);
      
      const post = posts.find((p) => p.slug === slug);
      if (!post) return null;
      
      return validatePost(post);
    },
  },
  
  events: {
    async list(upcoming?: boolean): Promise<Event[]> {
      const seed = readSeedEvents();
      const mutations = readStorageEvents();
      let events = mergeEvents(seed, mutations);
      
      if (upcoming) {
        const now = new Date();
        events = events.filter((event) => new Date(event.date) >= now);
      }
      
      return events
        .map(validateEvent)
        .sort(
          (a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    },
    
    async get(slug: string): Promise<Event | null> {
      const seed = readSeedEvents();
      const mutations = readStorageEvents();
      const events = mergeEvents(seed, mutations);
      
      const event = events.find((e) => e.slug === slug);
      if (!event) return null;
      
      return validateEvent(event);
    },
  },
};
