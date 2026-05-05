import { eq } from "drizzle-orm";
import { db } from "./db";
import { subscription, plan } from "./db/schema";

export type SubscriptionTier = "free" | "pro";

export async function getUserSubscription(userId: string) {
  const result = await db.query.subscription.findFirst({
    where: eq(subscription.userId, userId),
    with: {
      plan: true,
    },
  });

  if (!result) {
    return {
      tier: "free" as SubscriptionTier,
      status: "inactive",
      plan: null,
    };
  }

  const tier = result.plan?.slug === "pro" ? "pro" : "free";

  return {
    tier,
    status: result.status,
    plan: result.plan,
    subscription: result,
  };
}

export async function checkFeatureAccess(
  userId: string,
  feature: "marketplace" | "unlimited_launches" | "dms" | "analytics" | "featured"
) {
  const sub = await getUserSubscription(userId);

  if (sub.tier === "pro" && sub.status === "active") {
    return true;
  }

  // Free tier allowances
  switch (feature) {
    case "unlimited_launches":
      return false;
    case "marketplace":
      return false;
    case "dms":
      return false;
    case "analytics":
      return false;
    case "featured":
      return false;
    default:
      return true;
  }
}

export async function canCreateLaunch(userId: string) {
  const sub = await getUserSubscription(userId);
  if (sub.tier === "pro" && sub.status === "active") {
    return true;
  }

  // Free tier: 1 launch per month
  const { db } = await import("./db");
  const { launch } = await import("./db/schema");
  const { gte, and } = await import("drizzle-orm");

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  const recentLaunches = await db
    .select()
    .from(launch)
    .where(and(gte(launch.createdAt, oneMonthAgo), eq(launch.makerId, userId)));

  return recentLaunches.length === 0;
}

// Dev-only helpers
export async function grantProSubscription(userId: string) {
  const proPlan = await db.query.plan.findFirst({
    where: eq(plan.slug, "pro"),
  });

  if (!proPlan) {
    throw new Error("Pro plan not found. Run seed first.");
  }

  const existing = await db.query.subscription.findFirst({
    where: eq(subscription.userId, userId),
  });

  if (existing) {
    await db
      .update(subscription)
      .set({
        planId: proPlan.id,
        status: "active",
        billingInterval: "month",
        updatedAt: new Date(),
      })
      .where(eq(subscription.id, existing.id));
  } else {
    await db.insert(subscription).values({
      userId,
      planId: proPlan.id,
      status: "active",
      billingInterval: "month",
    });
  }

  return { success: true };
}

export async function revokeProSubscription(userId: string) {
  await db.delete(subscription).where(eq(subscription.userId, userId));
  return { success: true };
}
