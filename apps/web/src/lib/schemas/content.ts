import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  featured: z.boolean(),
  image: z.string().url(),
  tags: z.array(z.string()),
  author: z.string().optional(),
  publishedAt: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const EventTypeSchema = z.enum([
  "appearance",
  "auction",
  "exhibition",
  "other",
]);
export type EventType = z.infer<typeof EventTypeSchema>;

export const EventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().url(),
  date: z.string(),
  time: z.string().optional(),
  location: z.string(),
  type: EventTypeSchema.optional(),
  featured: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Post = z.infer<typeof PostSchema>;
export type Event = z.infer<typeof EventSchema>;

