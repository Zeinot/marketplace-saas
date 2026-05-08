"use server";

import { db } from "@/lib/db";
import { post, user, postUpvote, postComment, launch } from "@/lib/db/schema";
import { desc, eq, and, sql, ilike, isNull, isNotNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function safeRevalidate(path: string) {
  try {
    revalidatePath(path);
  } catch {
    // Ignore revalidate errors in test environment
  }
}

export async function getPosts({
  search,
  sort,
  type,
}: {
  search?: string;
  sort?: "newest" | "most_upvoted" | "most_discussed";
  type?: "all" | "launches" | "posts";
} = {}) {
  let conditions = [];

  if (search) {
    conditions.push(ilike(post.content, `%${search}%`));
  }

  if (type === "launches") {
    conditions.push(isNotNull(post.launchId));
  } else if (type === "posts") {
    conditions.push(isNull(post.launchId));
  }

  let query = db
    .select({
      post,
      user: { id: user.id, name: user.name, email: user.email, image: user.image },
      launch: {
        id: launch.id,
        slug: launch.slug,
        title: launch.title,
        tagline: launch.tagline,
        logoUrl: launch.logoUrl,
        upvoteCount: launch.upvoteCount,
        commentCount: launch.commentCount,
      },
    })
    .from(post)
    .leftJoin(user, eq(post.userId, user.id))
    .leftJoin(launch, eq(post.launchId, launch.id));

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }

  let orderBy;
  switch (sort) {
    case "most_upvoted":
      orderBy = desc(post.upvoteCount);
      break;
    case "most_discussed":
      orderBy = desc(post.commentCount);
      break;
    case "newest":
    default:
      orderBy = desc(post.createdAt);
  }

  const results = await query.orderBy(orderBy);
  return results;
}

export async function createPost({
  userId,
  content,
  launchId,
}: {
  userId: string;
  content: string;
  launchId?: number;
}) {
  const [newPost] = await db
    .insert(post)
    .values({
      userId,
      content,
      launchId: launchId || null,
    })
    .returning();

  safeRevalidate("/feed");
  return newPost;
}

export async function updatePost(postId: number, userId: string, content: string) {
  const existing = await db.select().from(post).where(eq(post.id, postId)).limit(1);
  if (existing.length === 0) throw new Error("Post not found");
  if (existing[0].userId !== userId) throw new Error("Unauthorized");

  const [updated] = await db
    .update(post)
    .set({ content, updatedAt: new Date() })
    .where(eq(post.id, postId))
    .returning();

  safeRevalidate("/feed");
  return updated;
}

export async function deletePost(postId: number, userId: string) {
  const existing = await db.select().from(post).where(eq(post.id, postId)).limit(1);
  if (existing.length === 0) throw new Error("Post not found");
  if (existing[0].userId !== userId) throw new Error("Unauthorized");

  await db.delete(post).where(eq(post.id, postId));
  safeRevalidate("/feed");
}

// Post upvotes
export async function togglePostUpvote(postId: number, userId: string) {
  const existing = await db
    .select()
    .from(postUpvote)
    .where(and(eq(postUpvote.postId, postId), eq(postUpvote.userId, userId)))
    .limit(1);

  if (existing.length > 0) {
    await db.delete(postUpvote).where(and(eq(postUpvote.postId, postId), eq(postUpvote.userId, userId)));
    await db
      .update(post)
      .set({ upvoteCount: sql`${post.upvoteCount} - 1` })
      .where(eq(post.id, postId));
    return { upvoted: false };
  } else {
    await db.insert(postUpvote).values({ postId, userId });
    await db
      .update(post)
      .set({ upvoteCount: sql`${post.upvoteCount} + 1` })
      .where(eq(post.id, postId));
    return { upvoted: true };
  }
}

export async function hasUpvotedPost(postId: number, userId: string) {
  const existing = await db
    .select()
    .from(postUpvote)
    .where(and(eq(postUpvote.postId, postId), eq(postUpvote.userId, userId)))
    .limit(1);
  return existing.length > 0;
}

// Post comments
export async function getPostComments(postId: number) {
  const results = await db
    .select({
      comment: postComment,
      user: { id: user.id, name: user.name, image: user.image },
    })
    .from(postComment)
    .leftJoin(user, eq(postComment.userId, user.id))
    .where(eq(postComment.postId, postId))
    .orderBy(desc(postComment.createdAt));

  return results;
}

export async function createPostComment(postId: number, userId: string, content: string) {
  const [comment] = await db
    .insert(postComment)
    .values({ postId, userId, content })
    .returning();

  await db
    .update(post)
    .set({ commentCount: sql`${post.commentCount} + 1` })
    .where(eq(post.id, postId));

  safeRevalidate("/feed");
  return comment;
}

export async function deletePostComment(commentId: number, userId: string) {
  const existing = await db.select().from(postComment).where(eq(postComment.id, commentId)).limit(1);
  if (existing.length === 0) throw new Error("Comment not found");
  if (existing[0].userId !== userId) throw new Error("Unauthorized");

  await db.delete(postComment).where(eq(postComment.id, commentId));
  
  await db
    .update(post)
    .set({ commentCount: sql`${post.commentCount} - 1` })
    .where(eq(post.id, existing[0].postId));

  safeRevalidate("/feed");
}

export async function updatePostComment(commentId: number, userId: string, content: string) {
  const existing = await db.select().from(postComment).where(eq(postComment.id, commentId)).limit(1);
  if (existing.length === 0) throw new Error("Comment not found");
  if (existing[0].userId !== userId) throw new Error("Unauthorized");

  const [updated] = await db
    .update(postComment)
    .set({ content, updatedAt: new Date() })
    .where(eq(postComment.id, commentId))
    .returning();

  safeRevalidate("/feed");
  return updated;
}
