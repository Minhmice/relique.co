import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Post } from "@/lib/types";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow flex flex-col">
      <Link href={`/posts/${post.slug}`} className="flex-1 flex flex-col">
        <div className="relative w-full h-40 sm:h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          {post.featured && (
            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs">
              Featured
            </Badge>
          )}
        </div>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="line-clamp-2 text-base sm:text-lg">{post.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs sm:text-sm">{post.excerpt}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-4 sm:p-6 pt-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            {post.author && <span>By {post.author}</span>}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] sm:text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 sm:p-6">
          <span className="text-xs sm:text-sm text-primary hover:underline">Read more →</span>
        </CardFooter>
      </Link>
    </Card>
  );
}

