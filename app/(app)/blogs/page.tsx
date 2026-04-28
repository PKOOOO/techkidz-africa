import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/queries";
import type { Post } from "@/types/blog";
import { BlogsClientWrapper } from "@/components/blog/BlogsClientWrapper";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | TechKidz Africa",
  description:
    "Latest news, stories and updates from TechKidz Africa — empowering youth through technology in Mombasa, Kenya.",
  alternates: {
    canonical: "https://techkidzafrica.co.ke/blogs",
  },
  openGraph: {
    title: "Blog | TechKidz Africa",
    description:
      "Latest news, stories and updates from TechKidz Africa — empowering youth through technology in Mombasa, Kenya.",
    url: "https://techkidzafrica.co.ke/blogs",
    siteName: "TechKidz Africa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | TechKidz Africa",
    description:
      "Latest news, stories and updates from TechKidz Africa — empowering youth through technology in Mombasa, Kenya.",
  },
};

export default async function BlogsPage() {
  const posts: Post[] = await client.fetch(allPostsQuery);

  return <BlogsClientWrapper posts={posts} />;
}
