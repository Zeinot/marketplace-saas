import { describe, it, expect, beforeAll } from "vitest";
import { db } from "@/lib/db";
import { user, post, postUpvote, postComment } from "@/lib/db/schema";
import { getPosts, createPost, updatePost, deletePost, togglePostUpvote, hasUpvotedPost, getPostComments, createPostComment, deletePostComment } from "@/lib/actions/post";
import { eq } from "drizzle-orm";
import { isDatabaseAvailable } from "@/test/db-helper";

let testUserId: string;
let testUserId2: string;
let dbAvailable = false;

describe("Post Actions", () => {
  beforeAll(async () => {
    dbAvailable = await isDatabaseAvailable();
    if (!dbAvailable) return;

    // Create test user 1
    const existing1 = await db.query.user.findFirst({
      where: eq(user.email, "test-posts@example.com"),
    });

    if (existing1) {
      testUserId = existing1.id;
      await db.delete(post).where(eq(post.userId, testUserId));
    } else {
      const [newUser] = await db.insert(user).values({
        id: crypto.randomUUID(),
        name: "Test User",
        email: "test-posts@example.com",
        emailVerified: true,
      }).returning();
      testUserId = newUser.id;
    }

    // Create test user 2
    const existing2 = await db.query.user.findFirst({
      where: eq(user.email, "test-posts2@example.com"),
    });

    if (existing2) {
      testUserId2 = existing2.id;
      await db.delete(post).where(eq(post.userId, testUserId2));
    } else {
      const [newUser] = await db.insert(user).values({
        id: crypto.randomUUID(),
        name: "Test User 2",
        email: "test-posts2@example.com",
        emailVerified: true,
      }).returning();
      testUserId2 = newUser.id;
    }
  });

  describe("getPosts", () => {
    it("returns empty array when no posts exist", async () => {
      if (!dbAvailable) return;
      await db.delete(post).where(eq(post.userId, testUserId));
      const posts = await getPosts();
      const userPosts = posts.filter((p) => p.post.userId === testUserId);
      expect(userPosts).toHaveLength(0);
    });

    it("returns posts with user data", async () => {
      if (!dbAvailable) return;
      await db.delete(post).where(eq(post.userId, testUserId));
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Test post content",
      }).returning();

      const posts = await getPosts();
      const userPosts = posts.filter((p) => p.post.userId === testUserId);
      
      expect(userPosts).toHaveLength(1);
      expect(userPosts[0].post.content).toBe("Test post content");
      expect(userPosts[0].user?.name).toBe("Test User");

      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });

  describe("createPost", () => {
    it("creates a new post", async () => {
      if (!dbAvailable) return;
      
      const newPost = await createPost({
        userId: testUserId,
        content: "New test post",
      });

      expect(newPost.content).toBe("New test post");
      expect(newPost.userId).toBe(testUserId);

      await db.delete(post).where(eq(post.id, newPost.id));
    });

    it("creates a post with optional launchId", async () => {
      if (!dbAvailable) return;
      
      const newPost = await createPost({
        userId: testUserId,
        content: "Post with launch",
        launchId: 1,
      });

      expect(newPost.launchId).toBe(1);

      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });

  describe("updatePost", () => {
    it("updates post content", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Original content",
      }).returning();

      const updated = await updatePost(newPost.id, testUserId, "Updated content");
      expect(updated.content).toBe("Updated content");

      await db.delete(post).where(eq(post.id, newPost.id));
    });

    it("throws error for non-existent post", async () => {
      if (!dbAvailable) return;
      
      await expect(updatePost(99999, testUserId, "Content")).rejects.toThrow("Post not found");
    });

    it("throws error for unauthorized user", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Original content",
      }).returning();

      await expect(updatePost(newPost.id, testUserId2, "Content")).rejects.toThrow("Unauthorized");

      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });

  describe("deletePost", () => {
    it("deletes user's own post", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "To be deleted",
      }).returning();

      await deletePost(newPost.id, testUserId);

      const remaining = await db.select().from(post).where(eq(post.id, newPost.id));
      expect(remaining).toHaveLength(0);
    });

    it("throws error for unauthorized deletion", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Protected post",
      }).returning();

      await expect(deletePost(newPost.id, testUserId2)).rejects.toThrow("Unauthorized");

      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });

  describe("togglePostUpvote", () => {
    it("upvotes a post", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Upvote test",
      }).returning();

      const result = await togglePostUpvote(newPost.id, testUserId2);
      expect(result.upvoted).toBe(true);

      const upvotes = await db.select().from(postUpvote).where(eq(postUpvote.postId, newPost.id));
      expect(upvotes).toHaveLength(1);

      // Cleanup
      await db.delete(postUpvote).where(eq(postUpvote.postId, newPost.id));
      await db.delete(post).where(eq(post.id, newPost.id));
    });

    it("removes upvote when toggled again", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Upvote toggle test",
      }).returning();

      await togglePostUpvote(newPost.id, testUserId2);
      const result = await togglePostUpvote(newPost.id, testUserId2);
      expect(result.upvoted).toBe(false);

      const upvotes = await db.select().from(postUpvote).where(eq(postUpvote.postId, newPost.id));
      expect(upvotes).toHaveLength(0);

      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });

  describe("hasUpvotedPost", () => {
    it("returns true when user has upvoted", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Has upvoted test",
      }).returning();

      await togglePostUpvote(newPost.id, testUserId2);
      const hasUpvoted = await hasUpvotedPost(newPost.id, testUserId2);
      expect(hasUpvoted).toBe(true);

      await db.delete(postUpvote).where(eq(postUpvote.postId, newPost.id));
      await db.delete(post).where(eq(post.id, newPost.id));
    });

    it("returns false when user has not upvoted", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Has not upvoted test",
      }).returning();

      const hasUpvoted = await hasUpvotedPost(newPost.id, testUserId2);
      expect(hasUpvoted).toBe(false);

      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });

  describe("createPostComment", () => {
    it("creates a comment on a post", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Comment test post",
      }).returning();

      const comment = await createPostComment(newPost.id, testUserId2, "Great post!");
      expect(comment.content).toBe("Great post!");
      expect(comment.postId).toBe(newPost.id);

      await db.delete(postComment).where(eq(postComment.id, comment.id));
      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });

  describe("getPostComments", () => {
    it("returns comments for a post", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Get comments test",
      }).returning();

      const comment1 = await createPostComment(newPost.id, testUserId, "First comment");
      const comment2 = await createPostComment(newPost.id, testUserId2, "Second comment");

      const comments = await getPostComments(newPost.id);
      expect(comments).toHaveLength(2);

      await db.delete(postComment).where(eq(postComment.postId, newPost.id));
      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });

  describe("deletePostComment", () => {
    it("deletes user's own comment", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Delete comment test",
      }).returning();

      const comment = await createPostComment(newPost.id, testUserId, "To delete");
      await deletePostComment(comment.id, testUserId);

      const remaining = await db.select().from(postComment).where(eq(postComment.id, comment.id));
      expect(remaining).toHaveLength(0);

      await db.delete(post).where(eq(post.id, newPost.id));
    });

    it("throws error for unauthorized deletion", async () => {
      if (!dbAvailable) return;
      
      const [newPost] = await db.insert(post).values({
        userId: testUserId,
        content: "Unauthorized delete test",
      }).returning();

      const comment = await createPostComment(newPost.id, testUserId, "Protected comment");
      await expect(deletePostComment(comment.id, testUserId2)).rejects.toThrow("Unauthorized");

      await db.delete(postComment).where(eq(postComment.id, comment.id));
      await db.delete(post).where(eq(post.id, newPost.id));
    });
  });
});
