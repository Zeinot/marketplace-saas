"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { addComment } from "@/lib/actions/launch";
import { toast } from "sonner";
import Link from "next/link";

interface Comment {
  comment: {
    id: number;
    content: string;
    createdAt: Date | null;
  };
  user: {
    id: string;
    name: string | null;
    image: string | null;
  } | null;
}

interface CommentSectionProps {
  launchId: number;
  comments: Comment[];
}

export function CommentSection({ launchId, comments }: CommentSectionProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session?.user) {
      toast.error("Please sign in to comment");
      return;
    }
    if (!content.trim()) return;

    setLoading(true);
    await addComment(launchId, session.user.id, content.trim());
    setContent("");
    setLoading(false);
    toast.success("Comment posted!");
  }

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        Comments ({comments.length})
      </h2>

      {session?.user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="What do you think about this product?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          <Button type="submit" disabled={loading || !content.trim()} size="sm">
            {loading ? "Posting..." : "Post comment"}
          </Button>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link href="/login" className="underline">Sign in</Link> to leave a comment.
        </p>
      )}

      <div className="space-y-4">
        {comments.map((item) => (
          <div key={item.comment.id} className="flex gap-3 p-4 rounded-lg border">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="text-xs">
                {item.user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{item.user?.name || "Anonymous"}</span>
                <span className="text-xs text-muted-foreground">
                  {item.comment.createdAt?.toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm mt-1">{item.comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
