"use client";

import { useState } from "react";
import type { Post } from "@/types/blog";
import { BlogFeaturedCard } from "./BlogFeaturedCard";
import { BlogListRow } from "./BlogListRow";

export function BlogsClientWrapper({ posts }: { posts: Post[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = posts[0];
  const morePosts = posts.slice(1);

  const filteredPosts = morePosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <div className="w-full">
        <div className="flex min-h-full w-full items-center justify-center">
          <div className="relative overflow-hidden w-full px-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-between pb-20">
              {/* Page heading */}
              <p className="mt-4 text-xl font-bold tracking-tight text-black md:text-3xl lg:text-5xl dark:text-white">
                Blogs
              </p>

              {/* Featured hero card */}
              {featuredPost && (
                <div className="mt-10 w-full">
                  <BlogFeaturedCard post={featuredPost} />
                </div>
              )}

              {/* More Posts section */}
              <div className="w-full py-20">
                <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
                  <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                    More Posts
                  </p>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search blogs"
                    className="w-full max-w-xl rounded-md border border-neutral-200 bg-white p-2 text-sm text-neutral-700 shadow-sm outline-none placeholder:text-neutral-400 focus:border-neutral-200 focus:outline-none focus:ring-0 sm:min-w-96 dark:border-transparent dark:bg-neutral-800 dark:text-neutral-200 dark:placeholder-neutral-400"
                  />
                </div>

                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <BlogListRow key={post._id} post={post} />
                    ))
                  ) : (
                    <p className="py-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
                      {searchQuery ? "No posts match your search." : "No posts yet."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
