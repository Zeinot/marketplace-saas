"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { addComment } from "@/lib/actions/launch";
import { toast } from "sonner";
import Link from "next/link";
import { MessageSquare, Send } from "lucide-react";

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
    <div className="mt-12 space-y-8">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Discussion</h2>
        <span className="text-sm text-muted-foreground">({comments.length})</span>
      </div>

      {session?.user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            placeholder="What do you think about this product?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="rounded-xl resize-none"
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !content.trim()} size="sm" className="rounded-lg">
              <Send className="mr-1.5 h-3.5 w-3.5" />
              {loading ? "Posting..." : "Post comment"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="rounded-xl border border-border/50 p-6 text-center bg-muted/30">
          <p className="text-sm text-muted-foreground">
            <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link> to join the discussion
          </p>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((item) => (
          <div key={item.comment.id} className="flex gap-3 p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
            <Avatar className="h-9 w-9 shrink-0 ring-1 ring-border">
              <AvatarFallback className="text-xs bg-muted font-medium">
                {item.user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-sm">{item.user?.name || "Anonymous"}</span>
                <span className="text-xs text-muted-foreground shrink-0">
                  {item.comment.createdAt?.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <p className="text-sm mt-1.5 leading-relaxed text-foreground/90">{item.comment.content}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}
