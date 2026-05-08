"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigUp, MessageSquare, Trash2, Pencil, X, Check, Send, Rocket, ArrowUpRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  togglePostUpvote,
  hasUpvotedPost,
  deletePost,
  updatePost,
  getPostComments,
  createPostComment,
  deletePostComment,
  updatePostComment,
} from "@/lib/actions/post";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { MessageButton } from "@/components/message-button";

interface PostCardProps {
  post: {
    id: number;
    content: string;
    launchId: number | null;
    upvoteCount: number;
    commentCount: number;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
  user: { id: string; name: string | null; email: string; image: string | null } | null;
  launch?: {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    logoUrl: string | null;
    upvoteCount: number;
    commentCount: number;
  } | null;
}

export function PostCard({ post: postData, user: postUser, launch: launchData }: PostCardProps) {
  const { data: session } = useSession();
  const [deleted, setDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(postData.content);
  const [upvotes, setUpvotes] = useState(postData.upvoteCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Array<{
    comment: { id: number; postId: number; userId: string; content: string; createdAt: Date; updatedAt: Date };
    user: { id: string; name: string | null; image: string | null } | null;
  }>>([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  
  // Confirmation dialogs
  const [showDeletePostDialog, setShowDeletePostDialog] = useState(false);
  const [showDeleteCommentDialog, setShowDeleteCommentDialog] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  const isOwner = session?.user?.id === postUser?.id;

  // Check if user has upvoted
  useEffect(() => {
    if (session?.user) {
      hasUpvotedPost(postData.id, session.user.id).then(setHasUpvoted);
    }
  }, [session?.user, postData.id]);

  // Load comments when expanded
  useEffect(() => {
    if (showComments) {
      getPostComments(postData.id).then(setComments);
    }
  }, [showComments, postData.id]);

  async function handleUpvote() {
    if (!session?.user) {
      toast.error("Sign in to upvote");
      return;
    }

    if (session.user.id === postUser?.id) {
      toast.error("You can't upvote your own post");
      return;
    }

    // Optimistic update
    const newUpvoted = !hasUpvoted;
    setHasUpvoted(newUpvoted);
    setUpvotes((prev) => (newUpvoted ? prev + 1 : prev - 1));

    try {
      const result = await togglePostUpvote(postData.id, session.user.id);
      // Sync with server response
      setHasUpvoted(result.upvoted);
      if (result.upvoted !== newUpvoted) {
        setUpvotes((prev) => (result.upvoted ? prev + 1 : prev - 1));
      }
    } catch {
      // Rollback on error
      setHasUpvoted(!newUpvoted);
      setUpvotes((prev) => (!newUpvoted ? prev + 1 : prev - 1));
      toast.error("Failed to upvote");
    }
  }

  async function handleEdit() {
    if (!editContent.trim()) return;
    try {
      await updatePost(postData.id, session!.user.id, editContent.trim());
      setIsEditing(false);
      toast.success("Post updated");
    } catch {
      toast.error("Failed to update post");
    }
  }

  async function handleDelete() {
    if (!session?.user) return;
    try {
      await deletePost(postData.id, session.user.id);
      setDeleted(true);
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  }

  async function handleAddComment() {
    if (!session?.user || !newComment.trim()) return;
    setLoadingComment(true);
    try {
      const comment = await createPostComment(postData.id, session.user.id, newComment.trim());
      setNewComment("");
      setComments((prev) => [
        { comment: comment as any, user: { id: session.user.id, name: session.user.name || null, image: session.user.image || null } },
        ...prev,
      ]);
      toast.success("Comment added");
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setLoadingComment(false);
    }
  }

  async function handleDeleteComment(commentId: number) {
    if (!session?.user) return;
    try {
      await deletePostComment(commentId, session.user.id);
      setComments((prev) => prev.filter((c) => c.comment.id !== commentId));
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    }
  }

  async function handleEditComment(commentId: number) {
    if (!editCommentContent.trim()) return;
    try {
      await updatePostComment(commentId, session!.user.id, editCommentContent.trim());
      setEditingCommentId(null);
      setComments((prev) =>
        prev.map((c) =>
          c.comment.id === commentId
            ? { ...c, comment: { ...c.comment, content: editCommentContent.trim() } }
            : c
        )
      );
      toast.success("Comment updated");
    } catch {
      toast.error("Failed to update comment");
    }
  }

  if (deleted) return null;

  return (
    <>
      <Card className="border-border/50 hover:border-border transition-colors">
        <CardContent className="p-4 sm:p-5">
          <div className="flex gap-3">
            <Link href={`/profile/${postUser?.id}`}>
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="text-sm bg-muted font-medium">
                  {postUser?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Link href={`/profile/${postUser?.id}`} className="font-semibold text-sm hover:underline">
                  {postUser?.name || "Anonymous"}
                </Link>
                {postUser?.id && session?.user?.id !== postUser.id && (
                  <MessageButton userId={postUser.id} variant="compact" className="h-5 w-5" />
                )}
                <span className="text-xs text-muted-foreground">
                  {postData.createdAt && formatDistanceToNow(new Date(postData.createdAt), { addSuffix: true })}
                </span>
                {postData.updatedAt && postData.createdAt && postData.updatedAt.getTime() !== postData.createdAt.getTime() && (
                  <span className="text-xs text-muted-foreground">(edited)</span>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleEdit} className="rounded-lg">
                      <Check className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => { setIsEditing(false); setEditContent(postData.content); }} className="rounded-lg">
                      <X className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{postData.content}</p>
              )}

              {/* Launch Preview Card */}
              {launchData && (
                <Link href={`/launch/${launchData.slug}`} className="block mt-3">
                  <div className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/30 transition-colors group">
                    {launchData.logoUrl ? (
                      <img
                        src={launchData.logoUrl}
                        alt={launchData.title}
                        className="h-10 w-10 rounded-lg object-cover shrink-0"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Rocket className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm truncate">{launchData.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{launchData.tagline}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                          <ArrowBigUp className="h-3 w-3" />
                          {launchData.upvoteCount}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                          <MessageSquare className="h-3 w-3" />
                          {launchData.commentCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              <div className="flex items-center gap-1 mt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 gap-1.5",
                    hasUpvoted ? "text-primary dark:bg-indigo-600/20 dark:text-indigo-400" : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={handleUpvote}
                >
                  <ArrowBigUp className={cn("h-4 w-4", hasUpvoted && "fill-current")} />
                  <span className="text-xs">{upvotes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowComments(!showComments)}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-xs">{postData.commentCount}</span>
                </Button>
                {isOwner && !isEditing && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
                      onClick={() => { setIsEditing(true); setEditContent(postData.content); }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 text-muted-foreground hover:text-destructive ml-auto"
                      onClick={() => setShowDeletePostDialog(true)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      {showComments && (
        <div className="ml-4 sm:ml-12 space-y-3 mt-2">
          {/* Add Comment */}
          {session?.user && (
            <div className="flex gap-2">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[60px] resize-none flex-1"
                disabled={loadingComment}
              />
              <Button
                size="sm"
                className="self-end h-9 rounded-lg"
                disabled={loadingComment || !newComment.trim()}
                onClick={handleAddComment}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Comment List */}
          <div className="space-y-2">
            {comments.map(({ comment, user: commentUser }) => (
              <div key={comment.id} className="flex gap-2 p-3 rounded-lg bg-muted/30">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-xs bg-muted font-medium">
                    {commentUser?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium">{commentUser?.name || "Anonymous"}</span>
                    {commentUser?.id && session?.user?.id !== commentUser.id && (
                      <MessageButton userId={commentUser.id} variant="compact" className="h-5 w-5" />
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {comment.createdAt && formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>

                  {editingCommentId === comment.id ? (
                    <div className="space-y-1">
                      <Textarea
                        value={editCommentContent}
                        onChange={(e) => setEditCommentContent(e.target.value)}
                        className="min-h-[50px] resize-none text-xs"
                      />
                      <div className="flex gap-1">
                        <Button size="sm" className="h-6 text-xs rounded-md" onClick={() => handleEditComment(comment.id)}>
                          <Check className="h-3 w-3 mr-1" /> Save
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 text-xs rounded-md" onClick={() => setEditingCommentId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs leading-relaxed">{comment.content}</p>
                  )}
                </div>

                {session?.user?.id === comment.userId && editingCommentId !== comment.id && (
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => { setEditingCommentId(comment.id); setEditCommentContent(comment.content); }}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      onClick={() => { setCommentToDelete(comment.id); setShowDeleteCommentDialog(true); }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Dialogs */}
      <ConfirmDialog
        open={showDeletePostDialog}
        onOpenChange={setShowDeletePostDialog}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        destructive
      />

      <ConfirmDialog
        open={showDeleteCommentDialog}
        onOpenChange={setShowDeleteCommentDialog}
        title="Delete Comment"
        description="Are you sure you want to delete this comment? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => {
          if (commentToDelete) handleDeleteComment(commentToDelete);
          setShowDeleteCommentDialog(false);
        }}
        destructive
      />
    </>
  );
}
