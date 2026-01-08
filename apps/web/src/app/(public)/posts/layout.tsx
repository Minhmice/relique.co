import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts - Relique",
  description: "Stay updated with news, insights, and stories from Relique about collectibles authentication and memorabilia.",
  openGraph: {
    title: "Posts - Relique",
    description: "News and insights from Relique",
    type: "website",
  },
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
