import { pgTable, text, timestamp, boolean, integer, json, serial, uuid, pgEnum, index, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "canceled",
  "past_due",
  "incomplete",
  "trialing",
]);

export const billingIntervalEnum = pgEnum("billing_interval", ["month", "year"]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "upvote",
  "comment",
  "message",
  "follow",
  "mention",
]);

// Better Auth tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// App tables
export const profile = pgTable("profile", {
  id: text("id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  bio: text("bio"),
  website: text("website"),
  twitter: text("twitter"),
  github: text("github"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  color: text("color"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const plan = pgTable("plan", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  stripeProductId: text("stripe_product_id"),
  stripeMonthlyPriceId: text("stripe_monthly_price_id"),
  stripeYearlyPriceId: text("stripe_yearly_price_id"),
  features: json("features").$type<string[]>().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscription = pgTable("subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  planId: integer("plan_id").references(() => plan.id, { onDelete: "set null" }),
  billingInterval: billingIntervalEnum("billing_interval"),
  status: subscriptionStatusEnum("status").notNull().default("incomplete"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  currentPeriodStart: timestamp("current_period_start", { withTimezone: true }),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const launch = pgTable(
  "launch",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    tagline: text("tagline").notNull(),
    description: text("description").notNull(),
    websiteUrl: text("website_url"),
    demoUrl: text("demo_url"),
    makerId: text("maker_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    isForSale: boolean("is_for_sale").notNull().default(false),
    askingPrice: integer("asking_price"),
    monthlyRecurringRevenue: integer("monthly_recurring_revenue"),
    isFeatured: boolean("is_featured").notNull().default(false),
    upvoteCount: integer("upvote_count").notNull().default(0),
    commentCount: integer("comment_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("launch_maker_idx").on(table.makerId),
    index("launch_slug_idx").on(table.slug),
    index("launch_for_sale_idx").on(table.isForSale),
    index("launch_featured_idx").on(table.isFeatured),
  ]
);

export const launchImage = pgTable("launch_image", {
  id: serial("id").primaryKey(),
  launchId: integer("launch_id")
    .notNull()
    .references(() => launch.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: text("alt"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const launchCategory = pgTable(
  "launch_category",
  {
    launchId: integer("launch_id")
      .notNull()
      .references(() => launch.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => category.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.launchId, table.categoryId] })]
);

export const upvote = pgTable(
  "upvote",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    launchId: integer("launch_id")
      .notNull()
      .references(() => launch.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.launchId] })]
);

export const comment = pgTable("comment", {
  id: serial("id").primaryKey(),
  launchId: integer("launch_id")
    .notNull()
    .references(() => launch.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const conversation = pgTable("conversation", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const conversationParticipant = pgTable(
  "conversation_participant",
  {
    conversationId: integer("conversation_id")
      .notNull()
      .references(() => conversation.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    lastReadAt: timestamp("last_read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.conversationId, table.userId] })]
);

export const message = pgTable("message", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id")
    .notNull()
    .references(() => conversation.id, { onDelete: "cascade" }),
  senderId: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const notification = pgTable("notification", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  actorId: text("actor_id").references(() => user.id, { onDelete: "set null" }),
  launchId: integer("launch_id").references(() => launch.id, { onDelete: "cascade" }),
  commentId: integer("comment_id").references(() => comment.id, { onDelete: "cascade" }),
  messageId: integer("message_id").references(() => message.id, { onDelete: "cascade" }),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Relations
export const userRelations = relations(user, ({ one, many }) => ({
  profile: one(profile, { fields: [user.id], references: [profile.id] }),
  launches: many(launch),
  upvotes: many(upvote),
  comments: many(comment),
  messages: many(message),
  notifications: many(notification),
  subscriptions: one(subscription, { fields: [user.id], references: [subscription.userId] }),
  conversationParticipants: many(conversationParticipant),
}));

export const launchRelations = relations(launch, ({ one, many }) => ({
  maker: one(user, { fields: [launch.makerId], references: [user.id] }),
  images: many(launchImage),
  categories: many(launchCategory),
  upvotes: many(upvote),
  comments: many(comment),
}));

export const commentRelations = relations(comment, ({ one }) => ({
  user: one(user, { fields: [comment.userId], references: [user.id] }),
  launch: one(launch, { fields: [comment.launchId], references: [launch.id] }),
}));

export const upvoteRelations = relations(upvote, ({ one }) => ({
  user: one(user, { fields: [upvote.userId], references: [user.id] }),
  launch: one(launch, { fields: [upvote.launchId], references: [launch.id] }),
}));

export const conversationRelations = relations(conversation, ({ many }) => ({
  participants: many(conversationParticipant),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, { fields: [message.conversationId], references: [conversation.id] }),
  sender: one(user, { fields: [message.senderId], references: [user.id] }),
}));

export const notificationRelations = relations(notification, ({ one }) => ({
  user: one(user, { fields: [notification.userId], references: [user.id] }),
  actor: one(user, { fields: [notification.actorId], references: [user.id] }),
  launch: one(launch, { fields: [notification.launchId], references: [launch.id] }),
}));

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(user, { fields: [subscription.userId], references: [user.id] }),
  plan: one(plan, { fields: [subscription.planId], references: [plan.id] }),
}));
