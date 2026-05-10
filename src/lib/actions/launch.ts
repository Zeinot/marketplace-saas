"use server";

import { db } from "@/lib/db";
import { launch, upvote, comment, launchCategory, category, launchImage, user } from "@/lib/db/schema";
import { eq, desc, asc, and, sql, ilike, or, gte, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { createNotification } from "./notification";
import {
  cacheGet,
  cacheSet,
  cacheDel,
  cacheInvalidatePattern,
  CACHE_TTL,
  buildLaunchesKey,
  buildLaunchKey,
  buildCategoriesKey,
  buildLaunchCommentsKey,
} from "@/lib/cache";

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
  const cacheKey = buildLaunchesKey(
    filter,
    sort || "newest",
    categorySlug,
    search,
    mrrMin !== undefined && mrrMax !== undefined ? `${mrrMin}-${mrrMax}` : undefined,
    priceMin !== undefined && priceMax !== undefined ? `${priceMin}-${priceMax}` : undefined
  );

  const cached = await cacheGet<
    Array<{
      launch: typeof launch.$inferSelect;
      maker: { id: string; name: string; email: string };
      categories: string;
    }>
  >(cacheKey);

  if (cached) {
    return cached;
  }

  const conditions = [];

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
      const filtered = allResults.filter((r) => {
        let cats = [];
        try {
          cats = JSON.parse(r.categories || "[]");
        } catch {
          cats = [];
        }
        return cats.some((c: { slug?: string }) => c.slug === categorySlug);
      });
      await cacheSet(cacheKey, filtered, CACHE_TTL.LAUNCHES_LIST);
      return filtered;
    }
  }

  const results = await query.orderBy(orderBy);
  await cacheSet(cacheKey, results, CACHE_TTL.LAUNCHES_LIST);
  return results;
}

export async function getLaunchBySlug(slug: string) {
  const cacheKey = buildLaunchKey(slug);

  const cached = await cacheGet<
    {
      launch: typeof launch.$inferSelect;
      maker: { id: string; name: string; email: string };
      categories: string;
      images: (typeof launchImage.$inferSelect)[];
    } | null
  >(cacheKey);

  if (cached) {
    return cached;
  }

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

  const data = { ...result[0], images };
  await cacheSet(cacheKey, data, CACHE_TTL.LAUNCH_DETAIL);
  return data;
}

export async function getLaunchComments(launchId: number) {
  const cacheKey = buildLaunchCommentsKey(launchId);

  const cached = await cacheGet<
    Array<{
      comment: typeof comment.$inferSelect;
      user: { id: string; name: string; image: string | null };
    }>
  >(cacheKey);

  if (cached) {
    return cached;
  }

  const results = await db
    .select({
      comment,
      user: { id: user.id, name: user.name, image: user.image },
    })
    .from(comment)
    .leftJoin(user, eq(comment.userId, user.id))
    .where(eq(comment.launchId, launchId))
    .orderBy(desc(comment.createdAt));

  await cacheSet(cacheKey, results, CACHE_TTL.COMMENTS);
  return results;
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

    // Invalidate cache
    const launchData = await db.select({ slug: launch.slug }).from(launch).where(eq(launch.id, launchId)).limit(1);
    if (launchData[0]?.slug) {
      await cacheDel(buildLaunchKey(launchData[0].slug));
    }
    await cacheInvalidatePattern("launches:*");

    return { upvoted: false };
  } else {
    await db.insert(upvote).values({ launchId, userId });
    await db
      .update(launch)
      .set({ upvoteCount: sql`${launch.upvoteCount} + 1` })
      .where(eq(launch.id, launchId));

    // Create notification for launch maker
    const launchData = await db.select({ makerId: launch.makerId, slug: launch.slug }).from(launch).where(eq(launch.id, launchId)).limit(1);
    if (launchData[0]?.makerId && launchData[0].makerId !== userId) {
      await createNotification({
        userId: launchData[0].makerId,
        type: "upvote",
        actorId: userId,
        launchId,
      });
    }

    // Invalidate cache
    if (launchData[0]?.slug) {
      await cacheDel(buildLaunchKey(launchData[0].slug));
    }
    await cacheInvalidatePattern("launches:*");

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
  const launchData = await db.select({ makerId: launch.makerId, slug: launch.slug }).from(launch).where(eq(launch.id, launchId)).limit(1);
  if (launchData[0]?.makerId && launchData[0].makerId !== userId) {
    await createNotification({
      userId: launchData[0].makerId,
      type: "comment",
      actorId: userId,
      launchId,
      commentId: newComment.id,
    });
  }

  // Invalidate cache
  await cacheDel(buildLaunchCommentsKey(launchId));
  if (launchData[0]?.slug) {
    await cacheDel(buildLaunchKey(launchData[0].slug));
  }
  await cacheInvalidatePattern("launches:*");

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

  // Invalidate cache
  await cacheDel(buildLaunchCommentsKey(existing[0].launchId));
  const launchData = await db.select({ slug: launch.slug }).from(launch).where(eq(launch.id, existing[0].launchId)).limit(1);
  if (launchData[0]?.slug) {
    await cacheDel(buildLaunchKey(launchData[0].slug));
  }

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

  // Invalidate cache
  await cacheDel(buildLaunchCommentsKey(existing[0].launchId));
  const launchData = await db.select({ slug: launch.slug }).from(launch).where(eq(launch.id, existing[0].launchId)).limit(1);
  if (launchData[0]?.slug) {
    await cacheDel(buildLaunchKey(launchData[0].slug));
  }
  await cacheInvalidatePattern("launches:*");

  revalidatePath(`/launch/${existing[0].launchId}`);
}

export async function getCategories() {
  const cacheKey = buildCategoriesKey();

  const cached = await cacheGet<(typeof category.$inferSelect)[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const results = await db.select().from(category).orderBy(category.name);
  await cacheSet(cacheKey, results, CACHE_TTL.CATEGORIES);
  return results;
}
