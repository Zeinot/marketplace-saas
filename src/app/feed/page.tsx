export const dynamic = "force-dynamic";

import { getPosts } from "@/lib/actions/post";
import { PostCard } from "@/components/feed/post-card";
import { PostForm } from "@/components/feed/post-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, MessageSquare } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function FeedPage() {
  const posts = await getPosts();
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="container py-8 md:py-10 max-w-2xl">
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

      {session?.user && <PostForm userId={session.user.id} />}

      <div className="space-y-4">
        {posts.map((item) => (
          <PostCard
            key={item.post.id}
            post={item.post}
            user={item.user}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No posts yet</h3>
          <p className="text-muted-foreground text-sm mb-4">Be the first to share something!</p>
        </div>
      )}
    </div>
  );
}
