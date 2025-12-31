import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Read articles about collectibles, authentication, and the memorabilia market.",
  openGraph: {
    title: "Blog Posts - Relique",
    description: "Read articles about collectibles, authentication, and the memorabilia market.",
    type: "website",
  },
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

