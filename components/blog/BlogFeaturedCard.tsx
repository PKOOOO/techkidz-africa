import Link from "next/link";
import type { Post } from "@/types/blog";

function formatDate(publishedAt: string) {
  return new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

export function BlogFeaturedCard({ post }: { post: Post }) {
  return (
    <Link href={`/blogs/${post.slug.current}`}>
      <div className="shadow-derek group/blog grid w-full grid-cols-1 overflow-hidden rounded-3xl border border-transparent transition duration-200 hover:scale-[1.02] hover:border-neutral-200 hover:bg-neutral-100 md:grid-cols-2 dark:hover:border-neutral-800 dark:hover:bg-neutral-900">
        {/* Left: Cover Image */}
        {post.mainImage?.asset?.url ? (
          <img
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title}
            className="h-full max-h-96 w-full rounded-3xl object-cover object-top"
          />
        ) : (
          <div className="h-full max-h-96 w-full rounded-3xl bg-neutral-200 dark:bg-neutral-700" />
        )}

        {/* Right: Content */}
        <div className="flex flex-col justify-between p-4 group-hover/blog:bg-neutral-100 md:p-8 dark:group-hover/blog:bg-neutral-900">
          <div>
            <p className="mb-4 text-lg font-bold text-neutral-800 md:text-4xl dark:text-neutral-100">
              {post.title}
            </p>
            {post.excerpt && (
              <p className="mt-2 text-left text-base text-neutral-600 md:text-xl dark:text-neutral-400">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center space-x-2">
            {post.author?.image && (
              <img
                src={post.author.image}
                alt={post.author.name}
                className="h-5 w-5 rounded-full object-cover"
              />
            )}
            <p className="text-sm font-normal text-black dark:text-white">
              {post.author?.name}
            </p>
            <div className="h-1 w-1 rounded-full bg-neutral-300" />
            <p className="text-sm font-normal text-neutral-500">
              {post.publishedAt ? formatDate(post.publishedAt) : ""}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
