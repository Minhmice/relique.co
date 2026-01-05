"use client";

import { useState, useEffect } from "react";
import { PostCard } from "@/components/content/PostCard";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { contentService } from "@/lib/services/contentService";
import type { Post } from "@/lib/schemas/content";

export function FeaturedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await contentService.posts.list({ featured: true });
      setPosts(allPosts.slice(0, 3));
    };
    loadPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Latest Posts"
        description="Stay updated with news and insights from Relique"
        cta={{
          label: "View All Posts",
          href: "/posts",
        }}
      />
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

