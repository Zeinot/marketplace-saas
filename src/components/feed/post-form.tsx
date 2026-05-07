"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createPost } from "@/lib/actions/post";
import { toast } from "sonner";

export function PostForm({ userId, onSuccess }: { userId: string; onSuccess?: () => void }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createPost({
        userId,
        content: content.trim(),
      });
      setContent("");
      toast.success("Post created!");
      onSuccess?.();
    } catch {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="text-sm bg-muted font-medium">
            U
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[80px] resize-none"
            disabled={loading}
          />
          <div className="flex justify-end mt-2">
            <Button type="submit" disabled={loading || !content.trim()} className="rounded-lg">
              {loading ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
