import Link from "next/link";
import type { Post } from "@/types/blog";

function formatDate(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export function BlogListRow({ post }: { post: Post }) {
  return (
    <Link
      href={`/blogs/${post.slug.current}`}
      className="group/blog-row flex flex-col items-start justify-between py-4 md:flex-row md:items-center"
    >
      <div>
        <p className="text-lg font-medium text-neutral-600 transition duration-200 dark:text-neutral-300">
          {post.title}
        </p>
        {post.excerpt && (
          <p className="mt-2 max-w-xl text-sm text-neutral-500 transition duration-200 dark:text-neutral-300">
            {post.excerpt}
          </p>
        )}
        <div className="my-4 flex items-center gap-2">
          <p className="max-w-xl text-sm text-neutral-500 transition duration-200 dark:text-neutral-300">
            {post.publishedAt ? formatDate(post.publishedAt) : ""}
          </p>
        </div>
      </div>

      {post.author?.image && (
        <img
          src={post.author.image}
          alt={post.author.name}
          className="mt-4 h-6 w-6 rounded-full object-cover md:mt-0 md:h-10 md:w-10"
        />
      )}
    </Link>
  );
}
