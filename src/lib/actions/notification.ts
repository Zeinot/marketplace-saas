"use server";

import { db } from "@/lib/db";
import { notification, user, launch, profile } from "@/lib/db/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getNotifications(userId: string) {
  return db
    .select({
      notification,
      actor: { id: user.id, name: user.name },
      launch: { id: launch.id, title: launch.title, slug: launch.slug },
    })
    .from(notification)
    .leftJoin(user, eq(notification.actorId, user.id))
    .leftJoin(launch, eq(notification.launchId, launch.id))
    .where(eq(notification.userId, userId))
    .orderBy(desc(notification.createdAt))
    .limit(50);
}

export async function getUnreadCount(userId: string) {
  const result = await db
    .select({ count: sql<number>`count(*)` })
    .from(notification)
    .where(and(eq(notification.userId, userId), eq(notification.read, false)));

  return Number(result[0]?.count || 0);
}

export async function markNotificationAsRead(notificationId: number, userId: string) {
  const existing = await db
    .select()
    .from(notification)
    .where(eq(notification.id, notificationId))
    .limit(1);

  if (existing.length === 0) throw new Error("Notification not found");
  if (existing[0].userId !== userId) throw new Error("Unauthorized");

  await db
    .update(notification)
    .set({ read: true })
    .where(eq(notification.id, notificationId));

  revalidatePath("/notifications");
}

export async function markAllNotificationsAsRead(userId: string) {
  await db
    .update(notification)
    .set({ read: true })
    .where(and(eq(notification.userId, userId), eq(notification.read, false)));

  revalidatePath("/notifications");
}

export async function getNotificationPreferences(userId: string) {
  const result = await db
    .select({ prefs: profile.notificationPreferences })
    .from(profile)
    .where(eq(profile.id, userId))
    .limit(1);

  return result[0]?.prefs || {
    comments: true,
    upvotes: true,
    messages: true,
    productUpdates: true,
  };
}

export async function updateNotificationPreferences(
  userId: string,
  prefs: {
    comments: boolean;
    upvotes: boolean;
    messages: boolean;
    productUpdates: boolean;
  }
) {
  await db
    .update(profile)
    .set({ notificationPreferences: prefs })
    .where(eq(profile.id, userId));

  revalidatePath("/settings");
}

export async function createNotification({
  userId,
  type,
  actorId,
  launchId,
  commentId,
  messageId,
}: {
  userId: string;
  type: "upvote" | "comment" | "message" | "follow" | "mention";
  actorId?: string;
  launchId?: number;
  commentId?: number;
  messageId?: number;
}) {
  // Don't create self-notifications
  if (actorId && actorId === userId) {
    return;
  }

  // Check user preferences before creating
  const prefs = await getNotificationPreferences(userId);

  const typeMap: Record<string, keyof typeof prefs> = {
    comment: "comments",
    upvote: "upvotes",
    message: "messages",
    follow: "productUpdates",
    mention: "productUpdates",
  };

  const prefKey = typeMap[type];
  if (prefKey && prefs[prefKey] === false) {
    return;
  }

  await db.insert(notification).values({
    userId,
    type,
    actorId: actorId || null,
    launchId: launchId || null,
    commentId: commentId || null,
    messageId: messageId || null,
  });
}
