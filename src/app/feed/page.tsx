export const dynamic = "force-dynamic";

import { getPosts } from "@/lib/actions/post";
import { PostCard } from "@/components/feed/post-card";
import { PostForm } from "@/components/feed/post-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, MessageSquare } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { FeedFilters } from "@/components/feed/feed-filters";
import { ClientSearchForm } from "@/components/client-search-form";

interface FeedPageProps {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    type?: string;
  }>;
}

export default async function FeedPage({ searchParams }: FeedPageProps) {
  const params = await searchParams;
  
  const search = params.search;
  const sort = (params.sort as "newest" | "most_upvoted" | "most_discussed" | undefined) || "newest";
  const type = (params.type as "all" | "launches" | "posts" | undefined) || "all";

  const posts = await getPosts({ search, sort, type });
  const session = await auth.api.getSession({ headers: await headers() });

  const activeFiltersCount = [search, sort !== "newest" ? sort : undefined, type !== "all" ? type : undefined].filter(Boolean).length;

  return (
    <div className="container py-8 md:py-10 max-w-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Community Feed</h1>
          </div>
          <p className="text-muted-foreground text-sm ml-11">Share updates, ask questions, discuss products</p>
        </div>
        <Button asChild className="shrink-0 rounded-lg h-10">
          <Link href="/new">
            <Plus className="mr-2 h-4 w-4" />
            Launch Product
          </Link>
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-3">
          <ClientSearchForm
            defaultValue={search}
            placeholder="Search posts..."
          />
        </div>

        <FeedFilters
          activeSort={sort}
          activeType={type}
          activeFiltersCount={activeFiltersCount}
        />
      </div>

      {session?.user && <PostForm userId={session.user.id} />}

      <div className="space-y-4">
        {posts.map((item) => (
          <PostCard
            key={item.post.id}
            post={item.post}
            user={item.user}
            launch={item.launch?.id ? item.launch : null}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No posts found</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {activeFiltersCount > 0
              ? "Try adjusting your filters"
              : "Be the first to share something!"}
          </p>
          {activeFiltersCount > 0 && (
            <Button asChild variant="outline">
              <Link href="/feed">Clear all filters</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
