import { describe, it, expect, beforeAll } from "vitest";
import { db } from "@/lib/db";
import { user, launch, upvote, comment } from "@/lib/db/schema";
import { getLaunches, getLaunchBySlug, toggleUpvote, getLaunchComments } from "@/lib/actions/launch";
import { eq } from "drizzle-orm";
import { isDatabaseAvailable } from "@/test/db-helper";

let testUserId: string;
let testUserId2: string;
let dbAvailable = false;

describe("Launch Actions", () => {
  beforeAll(async () => {
    dbAvailable = await isDatabaseAvailable();
    if (!dbAvailable) return;

    // Create test user 1
    const existing1 = await db.query.user.findFirst({
      where: eq(user.email, "test-launch@example.com"),
    });

    if (existing1) {
      testUserId = existing1.id;
    } else {
      const [newUser] = await db.insert(user).values({
        id: crypto.randomUUID(),
        name: "Test User",
        email: "test-launch@example.com",
        emailVerified: true,
      }).returning();
      testUserId = newUser.id;
    }

    // Create test user 2
    const existing2 = await db.query.user.findFirst({
      where: eq(user.email, "test-launch2@example.com"),
    });

    if (existing2) {
      testUserId2 = existing2.id;
    } else {
      const [newUser] = await db.insert(user).values({
        id: crypto.randomUUID(),
        name: "Test User 2",
        email: "test-launch2@example.com",
        emailVerified: true,
      }).returning();
      testUserId2 = newUser.id;
    }
  });

  describe("getLaunches", () => {
    it("returns launches with filter", async () => {
      if (!dbAvailable) return;
      
      const [newLaunch] = await db.insert(launch).values({
        slug: `test-launch-${Date.now()}`,
        title: "Test Launch",
        tagline: "Test tagline",
        description: "Test description",
        makerId: testUserId,
        isForSale: false,
      }).returning();

      const launches = await getLaunches({ filter: "latest" });
      expect(launches.length).toBeGreaterThan(0);

      await db.delete(launch).where(eq(launch.id, newLaunch.id));
    });

    it("returns launches filtered by search", async () => {
      if (!dbAvailable) return;
      
      const uniqueSlug = `search-test-${Date.now()}`;
      const [newLaunch] = await db.insert(launch).values({
        slug: uniqueSlug,
        title: "Searchable Launch Title",
        tagline: "Searchable tagline",
        description: "Searchable description",
        makerId: testUserId,
        isForSale: false,
      }).returning();

      const launches = await getLaunches({ filter: "latest", search: "Searchable" });
      const found = launches.some((l) => l.launch.id === newLaunch.id);
      expect(found).toBe(true);

      await db.delete(launch).where(eq(launch.id, newLaunch.id));
    });
  });

  describe("getLaunchBySlug", () => {
    it("returns launch by slug", async () => {
      if (!dbAvailable) return;
      
      const uniqueSlug = `slug-test-${Date.now()}`;
      const [newLaunch] = await db.insert(launch).values({
        slug: uniqueSlug,
        title: "Slug Test Launch",
        tagline: "Test tagline",
        description: "Test description",
        makerId: testUserId,
        isForSale: false,
      }).returning();

      const result = await getLaunchBySlug(uniqueSlug);
      expect(result).not.toBeNull();
      expect(result?.launch.title).toBe("Slug Test Launch");

      await db.delete(launch).where(eq(launch.id, newLaunch.id));
    });

    it("returns null for non-existent slug", async () => {
      if (!dbAvailable) return;
      
      const result = await getLaunchBySlug("non-existent-slug-12345");
      expect(result).toBeNull();
    });
  });

  describe("toggleUpvote", () => {
    it("upvotes a launch", async () => {
      if (!dbAvailable) return;
      
      const [newLaunch] = await db.insert(launch).values({
        slug: `upvote-test-${Date.now()}`,
        title: "Upvote Test",
        tagline: "Test tagline",
        description: "Test description",
        makerId: testUserId,
        isForSale: false,
      }).returning();

      const result = await toggleUpvote(newLaunch.id, testUserId2);
      expect(result.upvoted).toBe(true);

      const upvotes = await db.select().from(upvote).where(eq(upvote.launchId, newLaunch.id));
      expect(upvotes).toHaveLength(1);

      // Cleanup
      await db.delete(upvote).where(eq(upvote.launchId, newLaunch.id));
      await db.delete(launch).where(eq(launch.id, newLaunch.id));
    });

    it("removes upvote when toggled again", async () => {
      if (!dbAvailable) return;
      
      const [newLaunch] = await db.insert(launch).values({
        slug: `upvote-toggle-${Date.now()}`,
        title: "Upvote Toggle Test",
        tagline: "Test tagline",
        description: "Test description",
        makerId: testUserId,
        isForSale: false,
      }).returning();

      await toggleUpvote(newLaunch.id, testUserId2);
      const result = await toggleUpvote(newLaunch.id, testUserId2);
      expect(result.upvoted).toBe(false);

      const upvotes = await db.select().from(upvote).where(eq(upvote.launchId, newLaunch.id));
      expect(upvotes).toHaveLength(0);

      await db.delete(launch).where(eq(launch.id, newLaunch.id));
    });
  });

  describe("getLaunchComments", () => {
    it("returns comments for a launch", async () => {
      if (!dbAvailable) return;
      
      const [newLaunch] = await db.insert(launch).values({
        slug: `comments-test-${Date.now()}`,
        title: "Comments Test",
        tagline: "Test tagline",
        description: "Test description",
        makerId: testUserId,
        isForSale: false,
      }).returning();

      await db.insert(comment).values({
        launchId: newLaunch.id,
        userId: testUserId2,
        content: "Test comment",
      });

      const comments = await getLaunchComments(newLaunch.id);
      expect(comments.length).toBeGreaterThan(0);
      expect(comments[0].comment.content).toBe("Test comment");

      // Cleanup
      await db.delete(comment).where(eq(comment.launchId, newLaunch.id));
      await db.delete(launch).where(eq(launch.id, newLaunch.id));
    });

    it("returns empty array when no comments exist", async () => {
      if (!dbAvailable) return;
      
      const [newLaunch] = await db.insert(launch).values({
        slug: `no-comments-${Date.now()}`,
        title: "No Comments Test",
        tagline: "Test tagline",
        description: "Test description",
        makerId: testUserId,
        isForSale: false,
      }).returning();

      const comments = await getLaunchComments(newLaunch.id);
      expect(comments).toHaveLength(0);

      await db.delete(launch).where(eq(launch.id, newLaunch.id));
    });
  });
});
