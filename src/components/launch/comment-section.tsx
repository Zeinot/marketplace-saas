"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addComment, editComment, deleteComment } from "@/lib/actions/launch";
import { toast } from "sonner";
import Link from "next/link";
import { MessageSquare, Send, MoreVertical, Pencil, Trash2 } from "lucide-react";

interface Comment {
  comment: {
    id: number;
    content: string;
    createdAt: Date | null;
    updatedAt: Date | null;
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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editLoading, setEditLoading] = useState(false);

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

  function startEdit(comment: Comment) {
    setEditingId(comment.comment.id);
    setEditContent(comment.comment.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditContent("");
  }

  async function handleEdit(commentId: number) {
    if (!session?.user) return;
    if (!editContent.trim()) return;

    setEditLoading(true);
    try {
      await editComment(commentId, session.user.id, editContent.trim());
      setEditingId(null);
      setEditContent("");
      toast.success("Comment updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to edit comment");
    } finally {
      setEditLoading(false);
    }
  }

  async function handleDelete(commentId: number) {
    if (!session?.user) return;
    if (!confirm("Delete this comment? This cannot be undone.")) return;

    try {
      await deleteComment(commentId, session.user.id);
      toast.success("Comment deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete comment");
    }
  }

  function isEdited(comment: Comment) {
    if (!comment.comment.createdAt || !comment.comment.updatedAt) return false;
    return new Date(comment.comment.updatedAt).getTime() > new Date(comment.comment.createdAt).getTime() + 1000;
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
        {comments.map((item) => {
          const isAuthor = session?.user?.id === item.user?.id;
          const isEditing = editingId === item.comment.id;

          return (
            <div key={item.comment.id} className="flex gap-3 p-4 rounded-xl border border-border/50 bg-muted/20 hover:bg-muted/30 transition-colors">
              <Avatar className="h-9 w-9 shrink-0 ring-1 ring-border">
                <AvatarFallback className="text-xs bg-muted font-medium">
                  {item.user?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{item.user?.name || "Anonymous"}</span>
                    {isEdited(item) && (
                      <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">edited</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground shrink-0">
                      {item.comment.createdAt ? new Date(item.comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
                    </span>
                    {isAuthor && !isEditing && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                            <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          <DropdownMenuItem onClick={() => startEdit(item)} className="text-sm cursor-pointer">
                            <Pencil className="mr-2 h-3.5 w-3.5" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(item.comment.id)} className="text-sm text-destructive cursor-pointer focus:text-destructive">
                            <Trash2 className="mr-2 h-3.5 w-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-2 space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={2}
                      className="rounded-xl resize-none text-sm"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="rounded-lg h-8" onClick={cancelEdit}>
                        Cancel
                      </Button>
                      <Button size="sm" className="rounded-lg h-8" disabled={editLoading || !editContent.trim()} onClick={() => handleEdit(item.comment.id)}>
                        {editLoading ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm mt-1.5 leading-relaxed text-foreground/90">{item.comment.content}</p>
                )}
              </div>
            </div>
          );
        })}
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
