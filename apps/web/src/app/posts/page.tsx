"use client";

import { useState, useMemo, useEffect } from "react";
import { PostCard } from "@/components/cards/PostCard";
import { FeaturedPost } from "@/components/cards/FeaturedPost";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { contentService } from "@/lib/services/contentService";
import type { Post } from "@/lib/types";

export default function PostsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const posts = await contentService.posts.list();
      // Ensure posts have required fields with defaults
      const postsWithDefaults = posts.map((p) => ({
        ...p,
        excerpt: p.excerpt ?? "",
        content: p.content ?? "",
        image: p.image ?? "",
        featured: (p as any).featured ?? false,
        tags: (p as any).tags ?? [],
        publishedAt: p.publishedAt ?? new Date().toISOString(),
      })) as Post[];
      setAllPosts(postsWithDefaults);
    };
    loadPosts();
  }, []);

  const featuredPost = useMemo(() => {
    return allPosts.find((p) => p.featured) || allPosts[0];
  }, [allPosts]);

  const otherPosts = useMemo(() => {
    return allPosts.filter((p) => p.id !== featuredPost?.id);
  }, [allPosts, featuredPost]);

  const tags = useMemo(() => {
    const allTags = new Set<string>();
    allPosts.forEach((post) => {
      post.tags?.forEach((tag) => allTags.add(tag));
    });
    return Array.from(allTags);
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (!selectedTag) return otherPosts;
    return otherPosts.filter((post) => post.tags?.includes(selectedTag));
  }, [otherPosts, selectedTag]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="space-y-12">
        <SectionHeader
          title="Latest Posts"
          description="Stay updated with the latest news, insights, and stories from Relique"
        />

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedTag === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Badge>
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {featuredPost && (
          <div>
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found matching your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

