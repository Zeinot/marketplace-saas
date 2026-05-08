"use server";

import { db } from "@/lib/db";
import { launch, upvote, comment, launchCategory, category, launchImage, user, profile } from "@/lib/db/schema";
import { eq, desc, asc, and, sql, ilike, or, gte, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notification";

export async function getLaunches({
  filter = "latest",
  categorySlug,
  search,
  sort,
  mrrMin,
  mrrMax,
  priceMin,
  priceMax,
}: {
  filter?: "latest" | "trending" | "marketplace";
  categorySlug?: string;
  search?: string;
  sort?: "newest" | "most_upvoted" | "price_asc" | "price_desc" | "mrr_desc";
  mrrMin?: number;
  mrrMax?: number;
  priceMin?: number;
  priceMax?: number;
} = {}) {
  let conditions = [];

  if (filter === "marketplace") {
    conditions.push(eq(launch.isForSale, true));
  }

  if (search) {
    conditions.push(or(
      ilike(launch.title, `%${search}%`),
      ilike(launch.tagline, `%${search}%`)
    ));
  }

  if (mrrMin !== undefined) {
    conditions.push(gte(launch.monthlyRecurringRevenue, mrrMin));
  }
  if (mrrMax !== undefined) {
    conditions.push(lte(launch.monthlyRecurringRevenue, mrrMax));
  }
  if (priceMin !== undefined) {
    conditions.push(gte(launch.askingPrice, priceMin));
  }
  if (priceMax !== undefined) {
    conditions.push(lte(launch.askingPrice, priceMax));
  }

  let query = db
    .select({
      launch,
      maker: { id: user.id, name: user.name, email: user.email },
      categories: sql<string>`COALESCE(json_agg(json_build_object('id', ${category.id}, 'name', ${category.name}, 'slug', ${category.slug}, 'color', ${category.color})) FILTER (WHERE ${category.id} IS NOT NULL), '[]')`,
    })
    .from(launch)
    .leftJoin(user, eq(launch.makerId, user.id))
    .leftJoin(launchCategory, eq(launch.id, launchCategory.launchId))
    .leftJoin(category, eq(launchCategory.categoryId, category.id))
    .groupBy(launch.id, user.id, user.name, user.email);

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }

  let orderBy;
  switch (sort) {
    case "most_upvoted":
      orderBy = desc(launch.upvoteCount);
      break;
    case "price_asc":
      orderBy = asc(launch.askingPrice);
      break;
    case "price_desc":
      orderBy = desc(launch.askingPrice);
      break;
    case "mrr_desc":
      orderBy = desc(launch.monthlyRecurringRevenue);
      break;
    case "newest":
    default:
      orderBy = desc(launch.createdAt);
  }

  if (categorySlug) {
    const cat = await db.select().from(category).where(eq(category.slug, categorySlug)).limit(1);
    if (cat.length > 0) {
      const allResults = await query.orderBy(orderBy);
      return allResults.filter((r) => {
        let cats = [];
        try {
          cats = JSON.parse(r.categories || "[]");
        } catch {
          cats = [];
        }
        return cats.some((c: any) => c.slug === categorySlug);
      });
    }
  }

  const results = await query.orderBy(orderBy);
  return results;
}

export async function getLaunchBySlug(slug: string) {
  const result = await db
    .select({
      launch,
      maker: { id: user.id, name: user.name, email: user.email },
      categories: sql<string>`COALESCE(json_agg(json_build_object('id', ${category.id}, 'name', ${category.name}, 'slug', ${category.slug}, 'color', ${category.color})) FILTER (WHERE ${category.id} IS NOT NULL), '[]')`,
    })
    .from(launch)
    .leftJoin(user, eq(launch.makerId, user.id))
    .leftJoin(launchCategory, eq(launch.id, launchCategory.launchId))
    .leftJoin(category, eq(launchCategory.categoryId, category.id))
    .where(eq(launch.slug, slug))
    .groupBy(launch.id, user.id, user.name, user.email)
    .limit(1);

  if (result.length === 0) return null;

  const images = await db
    .select()
    .from(launchImage)
    .where(eq(launchImage.launchId, result[0].launch.id))
    .orderBy(launchImage.sortOrder);

  return { ...result[0], images };
}

export async function getLaunchComments(launchId: number) {
  return db
    .select({
      comment,
      user: { id: user.id, name: user.name, image: user.image },
    })
    .from(comment)
    .leftJoin(user, eq(comment.userId, user.id))
    .where(eq(comment.launchId, launchId))
    .orderBy(desc(comment.createdAt));
}

export async function toggleUpvote(launchId: number, userId: string) {
  const existing = await db
    .select()
    .from(upvote)
    .where(and(eq(upvote.launchId, launchId), eq(upvote.userId, userId)))
    .limit(1);

  if (existing.length > 0) {
    await db.delete(upvote).where(and(eq(upvote.launchId, launchId), eq(upvote.userId, userId)));
    await db
      .update(launch)
      .set({ upvoteCount: sql`${launch.upvoteCount} - 1` })
      .where(eq(launch.id, launchId));
    return { upvoted: false };
  } else {
    await db.insert(upvote).values({ launchId, userId });
    await db
      .update(launch)
      .set({ upvoteCount: sql`${launch.upvoteCount} + 1` })
      .where(eq(launch.id, launchId));

    // Create notification for launch maker
    const launchData = await db.select({ makerId: launch.makerId }).from(launch).where(eq(launch.id, launchId)).limit(1);
    if (launchData[0]?.makerId && launchData[0].makerId !== userId) {
      await createNotification({
        userId: launchData[0].makerId,
        type: "upvote",
        actorId: userId,
        launchId,
      });
    }

    return { upvoted: true };
  }
}

export async function addComment(launchId: number, userId: string, content: string) {
  const [newComment] = await db.insert(comment).values({ launchId, userId, content }).returning();
  await db
    .update(launch)
    .set({ commentCount: sql`${launch.commentCount} + 1` })
    .where(eq(launch.id, launchId));

  // Create notification for launch maker
  const launchData = await db.select({ makerId: launch.makerId }).from(launch).where(eq(launch.id, launchId)).limit(1);
  if (launchData[0]?.makerId && launchData[0].makerId !== userId) {
    await createNotification({
      userId: launchData[0].makerId,
      type: "comment",
      actorId: userId,
      launchId,
      commentId: newComment.id,
    });
  }

  revalidatePath(`/launch/${launchId}`);
}

export async function editComment(commentId: number, userId: string, content: string) {
  const existing = await db
    .select()
    .from(comment)
    .where(eq(comment.id, commentId))
    .limit(1);

  if (existing.length === 0) throw new Error("Comment not found");
  if (existing[0].userId !== userId) throw new Error("Unauthorized");

  await db
    .update(comment)
    .set({ content, updatedAt: new Date() })
    .where(eq(comment.id, commentId));

  revalidatePath(`/launch/${existing[0].launchId}`);
}

export async function deleteComment(commentId: number, userId: string) {
  const existing = await db
    .select()
    .from(comment)
    .where(eq(comment.id, commentId))
    .limit(1);

  if (existing.length === 0) throw new Error("Comment not found");
  if (existing[0].userId !== userId) throw new Error("Unauthorized");

  await db.delete(comment).where(eq(comment.id, commentId));
  await db
    .update(launch)
    .set({ commentCount: sql`${launch.commentCount} - 1` })
    .where(eq(launch.id, existing[0].launchId));

  revalidatePath(`/launch/${existing[0].launchId}`);
}

export async function getCategories() {
  return db.select().from(category).orderBy(category.name);
}
