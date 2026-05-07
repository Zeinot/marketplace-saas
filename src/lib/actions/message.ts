"use server";

import { db } from "@/lib/db";
import { conversation, conversationParticipant, message, user } from "@/lib/db/schema";
import { eq, and, desc, sql, lt } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function safeRevalidate(path: string) {
  try {
    revalidatePath(path);
  } catch {
    // Ignore revalidate errors in test environment
  }
}

export async function getConversations(userId: string) {
  // Get all conversation IDs this user participates in
  const participants = await db
    .select()
    .from(conversationParticipant)
    .where(eq(conversationParticipant.userId, userId));

  const conversationIds = participants.map((p) => p.conversationId);
  if (conversationIds.length === 0) return [];

  // For each conversation, get the other participant and last message
  const results = await Promise.all(
    conversationIds.map(async (convId) => {
      // Get other participant
      const otherParticipant = await db
        .select({
          userId: conversationParticipant.userId,
          name: user.name,
        })
        .from(conversationParticipant)
        .leftJoin(user, eq(conversationParticipant.userId, user.id))
        .where(
          and(
            eq(conversationParticipant.conversationId, convId),
            sql`${conversationParticipant.userId} != ${userId}`
          )
        )
        .limit(1);

      // Get last message
      const lastMessage = await db
        .select()
        .from(message)
        .where(eq(message.conversationId, convId))
        .orderBy(desc(message.createdAt))
        .limit(1);

      // Get unread count
      const participantRow = participants.find((p) => p.conversationId === convId);
      const unreadCount = participantRow?.lastReadAt
        ? await db
            .select({ count: sql<number>`count(*)` })
            .from(message)
            .where(
              and(
                eq(message.conversationId, convId),
                sql`${message.createdAt} > ${participantRow.lastReadAt}`,
                sql`${message.senderId} != ${userId}`
              )
            )
        : [{ count: lastMessage.filter((m) => m.senderId !== userId).length }];

      return {
        id: convId,
        otherUser: otherParticipant[0] || null,
        lastMessage: lastMessage[0] || null,
        unreadCount: Number(unreadCount[0]?.count || 0),
      };
    })
  );

  return results.sort((a, b) => {
    const aTime = a.lastMessage?.createdAt?.getTime() || 0;
    const bTime = b.lastMessage?.createdAt?.getTime() || 0;
    return bTime - aTime;
  });
}

export async function getMessages(conversationId: number) {
  return db
    .select({
      message,
      sender: { id: user.id, name: user.name },
    })
    .from(message)
    .leftJoin(user, eq(message.senderId, user.id))
    .where(eq(message.conversationId, conversationId))
    .orderBy(message.createdAt);
}

export async function getMessagePage(
  conversationId: number,
  cursor?: number,
  limit = 30
) {
  const rows = await db
    .select({
      message,
      sender: { id: user.id, name: user.name },
    })
    .from(message)
    .leftJoin(user, eq(message.senderId, user.id))
    .where(
      cursor
        ? and(eq(message.conversationId, conversationId), lt(message.id, cursor))
        : eq(message.conversationId, conversationId)
    )
    .orderBy(desc(message.id))
    .limit(limit);

  // Reverse so messages are in chronological order (oldest first)
  const messages = rows.reverse();

  // nextCursor is the ID of the oldest message in this page; null means no more history
  const nextCursor = rows.length === limit ? messages[0]?.message?.id ?? null : null;

  return { messages, nextCursor };
}

export async function sendMessage(conversationId: number, senderId: string, content: string) {
  // Verify sender is a participant
  const participant = await db
    .select()
    .from(conversationParticipant)
    .where(
      and(
        eq(conversationParticipant.conversationId, conversationId),
        eq(conversationParticipant.userId, senderId)
      )
    )
    .limit(1);

  if (participant.length === 0) {
    throw new Error("Not a participant in this conversation");
  }

  const [newMessage] = await db
    .insert(message)
    .values({ conversationId, senderId, content })
    .returning();

  // Update conversation updatedAt
  await db
    .update(conversation)
    .set({ updatedAt: new Date() })
    .where(eq(conversation.id, conversationId));

  safeRevalidate(`/messages`);
  safeRevalidate(`/messages/${conversationId}`);

  return newMessage;
}

export async function getOrCreateConversation(userId1: string, userId2: string) {
  if (userId1 === userId2) throw new Error("Cannot message yourself");

  // Verify both users exist
  const userExists = await db.select({ id: user.id }).from(user).where(eq(user.id, userId2)).limit(1);
  if (userExists.length === 0) throw new Error("User not found");

  // Find existing conversation between these two users
  const user1Convs = await db
    .select({ conversationId: conversationParticipant.conversationId })
    .from(conversationParticipant)
    .where(eq(conversationParticipant.userId, userId1));

  for (const { conversationId } of user1Convs) {
    const other = await db
      .select()
      .from(conversationParticipant)
      .where(
        and(
          eq(conversationParticipant.conversationId, conversationId),
          eq(conversationParticipant.userId, userId2)
        )
      )
      .limit(1);

    if (other.length > 0) {
      return conversationId;
    }
  }

  // Create new conversation
  const [newConv] = await db.insert(conversation).values({}).returning();

  // Add both participants
  await db.insert(conversationParticipant).values([
    { conversationId: newConv.id, userId: userId1 },
    { conversationId: newConv.id, userId: userId2 },
  ]);

  return newConv.id;
}

export async function editMessage(messageId: number, userId: string, newContent: string) {
  const existing = await db
    .select()
    .from(message)
    .where(eq(message.id, messageId))
    .limit(1);

  if (existing.length === 0) throw new Error("Message not found");
  if (existing[0].senderId !== userId) throw new Error("Unauthorized");
  if (existing[0].isDeleted) throw new Error("Cannot edit deleted message");

  const [updated] = await db
    .update(message)
    .set({ content: newContent, updatedAt: new Date() })
    .where(eq(message.id, messageId))
    .returning();

  safeRevalidate(`/messages/${existing[0].conversationId}`);
  return updated;
}

export async function deleteMessage(messageId: number, userId: string) {
  const existing = await db
    .select()
    .from(message)
    .where(eq(message.id, messageId))
    .limit(1);

  if (existing.length === 0) throw new Error("Message not found");
  if (existing[0].senderId !== userId) throw new Error("Unauthorized");

  await db
    .update(message)
    .set({ isDeleted: true, content: "(deleted)" })
    .where(eq(message.id, messageId));

  safeRevalidate(`/messages/${existing[0].conversationId}`);
}

export async function markConversationAsRead(conversationId: number, userId: string) {
  await db
    .update(conversationParticipant)
    .set({ lastReadAt: new Date() })
    .where(
      and(
        eq(conversationParticipant.conversationId, conversationId),
        eq(conversationParticipant.userId, userId)
      )
    );
}
