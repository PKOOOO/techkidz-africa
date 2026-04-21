import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/queries";
import type { Post } from "@/types/blog";

function formatDate(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

async function getPost(slug: string): Promise<Post | null> {
  return client.fetch(postBySlugQuery, { slug });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Blog | TechKidz Africa" };
  }

  const title = `${post.title} | TechKidz Africa`;
  const description = post.excerpt || "Read this post on TechKidz Africa.";

  return {
    title,
    description,
    alternates: {
      canonical: `https://techkidzafrica.co.ke/blogs/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://techkidzafrica.co.ke/blogs/${slug}`,
      siteName: "TechKidz Africa",
      type: "article",
      ...(post.mainImage?.asset?.url && {
        images: [{ url: post.mainImage.asset.url }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <div className="mb-8">
        <Link
          href="/blogs"
          className="text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          ← Back to Blogs
        </Link>
      </div>

      {post.mainImage?.asset?.url && (
        <img
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || post.title}
          className="mb-8 max-h-96 w-full rounded-2xl object-cover"
        />
      )}

      <h1 className="mb-4 text-3xl font-bold text-neutral-900 md:text-5xl dark:text-white">
        {post.title}
      </h1>

      <div className="mb-10 flex items-center space-x-2">
        {post.author?.image && (
          <img
            src={post.author.image}
            alt={post.author.name}
            className="h-8 w-8 rounded-full object-cover"
          />
        )}
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.author?.name}
        </p>
        {post.publishedAt && (
          <>
            <div className="h-1 w-1 rounded-full bg-neutral-300" />
            <p className="text-sm text-neutral-500">
              {formatDate(post.publishedAt)}
            </p>
          </>
        )}
      </div>

      {post.body && post.body.length > 0 && (
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <PortableText value={post.body} />
        </div>
      )}
    </article>
  );
}
