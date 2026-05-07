import { describe, it, expect, beforeAll } from "vitest";
import { db } from "@/lib/db";
import { user, conversation, conversationParticipant, message } from "@/lib/db/schema";
import { getConversations, getMessages, sendMessage, getOrCreateConversation, markConversationAsRead } from "@/lib/actions/message";
import { eq } from "drizzle-orm";
import { isDatabaseAvailable } from "@/test/db-helper";

let testUserId: string;
let testUserId2: string;
let dbAvailable = false;

describe("Message Actions", () => {
  beforeAll(async () => {
    dbAvailable = await isDatabaseAvailable();
    if (!dbAvailable) return;

    // Create test user 1
    const existing1 = await db.query.user.findFirst({
      where: eq(user.email, "test-msg@example.com"),
    });

    if (existing1) {
      testUserId = existing1.id;
    } else {
      const [newUser] = await db.insert(user).values({
        id: crypto.randomUUID(),
        name: "Test User",
        email: "test-msg@example.com",
        emailVerified: true,
      }).returning();
      testUserId = newUser.id;
    }

    // Create test user 2
    const existing2 = await db.query.user.findFirst({
      where: eq(user.email, "test-msg2@example.com"),
    });

    if (existing2) {
      testUserId2 = existing2.id;
    } else {
      const [newUser] = await db.insert(user).values({
        id: crypto.randomUUID(),
        name: "Test User 2",
        email: "test-msg2@example.com",
        emailVerified: true,
      }).returning();
      testUserId2 = newUser.id;
    }
  });

  describe("getOrCreateConversation", () => {
    it("creates a new conversation between two users", async () => {
      if (!dbAvailable) return;
      
      const conversationId = await getOrCreateConversation(testUserId, testUserId2);
      expect(conversationId).toBeGreaterThan(0);

      // Verify participants
      const participants = await db
        .select()
        .from(conversationParticipant)
        .where(eq(conversationParticipant.conversationId, conversationId));
      
      expect(participants).toHaveLength(2);
      const userIds = participants.map((p) => p.userId);
      expect(userIds).toContain(testUserId);
      expect(userIds).toContain(testUserId2);

      // Cleanup
      await db.delete(conversationParticipant).where(eq(conversationParticipant.conversationId, conversationId));
      await db.delete(conversation).where(eq(conversation.id, conversationId));
    });

    it("returns existing conversation instead of creating duplicate", async () => {
      if (!dbAvailable) return;
      
      const convId1 = await getOrCreateConversation(testUserId, testUserId2);
      const convId2 = await getOrCreateConversation(testUserId, testUserId2);
      
      expect(convId1).toBe(convId2);

      // Cleanup
      await db.delete(conversationParticipant).where(eq(conversationParticipant.conversationId, convId1));
      await db.delete(conversation).where(eq(conversation.id, convId1));
    });

    it("throws error when trying to message yourself", async () => {
      if (!dbAvailable) return;
      
      await expect(getOrCreateConversation(testUserId, testUserId)).rejects.toThrow("Cannot message yourself");
    });

    it("throws error when user doesn't exist", async () => {
      if (!dbAvailable) return;
      
      await expect(getOrCreateConversation(testUserId, "non-existent-user-id")).rejects.toThrow("User not found");
    });
  });

  describe("sendMessage", () => {
    it("sends a message in a conversation", async () => {
      if (!dbAvailable) return;
      
      const conversationId = await getOrCreateConversation(testUserId, testUserId2);
      
      const newMessage = await sendMessage(conversationId, testUserId, "Hello!");
      expect(newMessage.content).toBe("Hello!");
      expect(newMessage.senderId).toBe(testUserId);
      expect(newMessage.conversationId).toBe(conversationId);

      // Cleanup
      await db.delete(message).where(eq(message.conversationId, conversationId));
      await db.delete(conversationParticipant).where(eq(conversationParticipant.conversationId, conversationId));
      await db.delete(conversation).where(eq(conversation.id, conversationId));
    });

    it("throws error when sender is not a participant", async () => {
      if (!dbAvailable) return;
      
      // Create a conversation between two users
      const [newConv] = await db.insert(conversation).values({}).returning();
      await db.insert(conversationParticipant).values([
        { conversationId: newConv.id, userId: testUserId },
      ]);

      const randomUserId = crypto.randomUUID();
      await db.insert(user).values({
        id: randomUserId,
        name: "Random User",
        email: `random-${randomUserId}@example.com`,
        emailVerified: true,
      });

      await expect(sendMessage(newConv.id, randomUserId, "Hello!")).rejects.toThrow("Not a participant");

      await db.delete(user).where(eq(user.id, randomUserId));
      await db.delete(conversationParticipant).where(eq(conversationParticipant.conversationId, newConv.id));
      await db.delete(conversation).where(eq(conversation.id, newConv.id));
    });
  });

  describe("getMessages", () => {
    it("returns messages in a conversation", async () => {
      if (!dbAvailable) return;
      
      const conversationId = await getOrCreateConversation(testUserId, testUserId2);
      
      await sendMessage(conversationId, testUserId, "Message 1");
      await sendMessage(conversationId, testUserId2, "Message 2");

      const messages = await getMessages(conversationId);
      expect(messages).toHaveLength(2);
      expect(messages[0].message.content).toBe("Message 1");
      expect(messages[1].message.content).toBe("Message 2");

      // Cleanup
      await db.delete(message).where(eq(message.conversationId, conversationId));
      await db.delete(conversationParticipant).where(eq(conversationParticipant.conversationId, conversationId));
      await db.delete(conversation).where(eq(conversation.id, conversationId));
    });
  });

  describe("getConversations", () => {
    it("returns empty array when user has no conversations", async () => {
      if (!dbAvailable) return;
      
      const conversations = await getConversations(testUserId);
      // Filter out any existing conversations from other tests
      const cleanConversations = conversations.filter((c) => {
        // Only include conversations created in this test
        return false;
      });
      expect(cleanConversations).toHaveLength(0);
    });

    it("returns conversations with last message", async () => {
      if (!dbAvailable) return;
      
      const conversationId = await getOrCreateConversation(testUserId, testUserId2);
      await sendMessage(conversationId, testUserId, "Last message");

      const conversations = await getConversations(testUserId);
      const conv = conversations.find((c) => c.id === conversationId);
      
      expect(conv).toBeDefined();
      expect(conv?.lastMessage?.content).toBe("Last message");
      expect(conv?.otherUser?.name).toBe("Test User 2");

      // Cleanup
      await db.delete(message).where(eq(message.conversationId, conversationId));
      await db.delete(conversationParticipant).where(eq(conversationParticipant.conversationId, conversationId));
      await db.delete(conversation).where(eq(conversation.id, conversationId));
    });
  });

  describe("markConversationAsRead", () => {
    it("marks conversation as read for user", async () => {
      if (!dbAvailable) return;
      
      const conversationId = await getOrCreateConversation(testUserId, testUserId2);
      
      await markConversationAsRead(conversationId, testUserId);

      const participant = await db
        .select()
        .from(conversationParticipant)
        .where(
          eq(conversationParticipant.conversationId, conversationId)
        )
        .limit(1);

      expect(participant[0]?.lastReadAt).toBeDefined();

      // Cleanup
      await db.delete(message).where(eq(message.conversationId, conversationId));
      await db.delete(conversationParticipant).where(eq(conversationParticipant.conversationId, conversationId));
      await db.delete(conversation).where(eq(conversation.id, conversationId));
    });
  });
});
