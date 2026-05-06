import { describe, it, expect, beforeAll } from "vitest";
import { db } from "@/lib/db";
import { user, subscription } from "@/lib/db/schema";
import { getUserSubscription, checkFeatureAccess, canCreateLaunch, grantProSubscription, revokeProSubscription } from "@/lib/subscription";
import { eq } from "drizzle-orm";
import { isDatabaseAvailable } from "@/test/db-helper";

let testUserId: string;
let dbAvailable = false;

describe("Subscription Utilities", () => {
  beforeAll(async () => {
    dbAvailable = await isDatabaseAvailable();
    if (!dbAvailable) return;

    const existing = await db.query.user.findFirst({
      where: eq(user.email, "test-sub@example.com"),
    });

    if (existing) {
      testUserId = existing.id;
      await db.delete(subscription).where(eq(subscription.userId, testUserId));
    } else {
      const [newUser] = await db.insert(user).values({
        id: crypto.randomUUID(),
        name: "Test User",
        email: "test-sub@example.com",
        emailVerified: true,
      }).returning();
      testUserId = newUser.id;
    }
  });

  it("returns free tier for user without subscription", async () => {
    if (!dbAvailable) return;
    await revokeProSubscription(testUserId);
    const sub = await getUserSubscription(testUserId);
    expect(sub.tier).toBe("free");
    expect(sub.status).toBe("inactive");
    expect(sub.plan).toBeNull();
  });

  it("grants pro subscription in dev mode", async () => {
    if (!dbAvailable) return;
    await grantProSubscription(testUserId);
    const sub = await getUserSubscription(testUserId);
    expect(sub.tier).toBe("pro");
    expect(sub.status).toBe("active");
  });

  it("revokes pro subscription", async () => {
    if (!dbAvailable) return;
    await grantProSubscription(testUserId);
    await revokeProSubscription(testUserId);
    const sub = await getUserSubscription(testUserId);
    expect(sub.tier).toBe("free");
  });

  it("allows pro users to access marketplace", async () => {
    if (!dbAvailable) return;
    await grantProSubscription(testUserId);
    const canAccess = await checkFeatureAccess(testUserId, "marketplace");
    expect(canAccess).toBe(true);
  });

  it("denies marketplace access to free users", async () => {
    if (!dbAvailable) return;
    await revokeProSubscription(testUserId);
    const canAccess = await checkFeatureAccess(testUserId, "marketplace");
    expect(canAccess).toBe(false);
  });

  it("allows pro users unlimited launches", async () => {
    if (!dbAvailable) return;
    await grantProSubscription(testUserId);
    const canCreate = await canCreateLaunch(testUserId);
    expect(canCreate).toBe(true);
  });
});
