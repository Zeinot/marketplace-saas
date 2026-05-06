import { describe, it, expect } from "vitest";
import * as schema from "./schema";

describe("Database Schema", () => {
  it("exports all required tables", () => {
    expect(schema.user).toBeDefined();
    expect(schema.session).toBeDefined();
    expect(schema.account).toBeDefined();
    expect(schema.verification).toBeDefined();
    expect(schema.profile).toBeDefined();
    expect(schema.category).toBeDefined();
    expect(schema.plan).toBeDefined();
    expect(schema.subscription).toBeDefined();
    expect(schema.launch).toBeDefined();
    expect(schema.launchImage).toBeDefined();
    expect(schema.launchCategory).toBeDefined();
    expect(schema.upvote).toBeDefined();
    expect(schema.comment).toBeDefined();
    expect(schema.conversation).toBeDefined();
    expect(schema.conversationParticipant).toBeDefined();
    expect(schema.message).toBeDefined();
    expect(schema.notification).toBeDefined();
  });

  it("has correct user table columns", () => {
    const columns = Object.keys(schema.user);
    expect(columns).toContain("id");
    expect(columns).toContain("name");
    expect(columns).toContain("email");
    expect(columns).toContain("emailVerified");
    expect(columns).toContain("image");
    expect(columns).toContain("createdAt");
    expect(columns).toContain("updatedAt");
  });

  it("has correct launch table columns", () => {
    const columns = Object.keys(schema.launch);
    expect(columns).toContain("id");
    expect(columns).toContain("slug");
    expect(columns).toContain("title");
    expect(columns).toContain("tagline");
    expect(columns).toContain("description");
    expect(columns).toContain("makerId");
    expect(columns).toContain("isForSale");
    expect(columns).toContain("askingPrice");
    expect(columns).toContain("upvoteCount");
    expect(columns).toContain("commentCount");
  });

  it("has correct subscription table columns", () => {
    const columns = Object.keys(schema.subscription);
    expect(columns).toContain("userId");
    expect(columns).toContain("planId");
    expect(columns).toContain("status");
    expect(columns).toContain("stripeCustomerId");
    expect(columns).toContain("stripeSubscriptionId");
    expect(columns).toContain("currentPeriodStart");
    expect(columns).toContain("currentPeriodEnd");
    expect(columns).toContain("cancelAtPeriodEnd");
  });

  it("has proper enum definitions", () => {
    expect(schema.subscriptionStatusEnum).toBeDefined();
    expect(schema.billingIntervalEnum).toBeDefined();
    expect(schema.notificationTypeEnum).toBeDefined();
  });

  it("has relations defined", () => {
    expect(schema.userRelations).toBeDefined();
    expect(schema.launchRelations).toBeDefined();
    expect(schema.commentRelations).toBeDefined();
    expect(schema.upvoteRelations).toBeDefined();
    expect(schema.conversationRelations).toBeDefined();
    expect(schema.messageRelations).toBeDefined();
    expect(schema.notificationRelations).toBeDefined();
    expect(schema.subscriptionRelations).toBeDefined();
  });
});
