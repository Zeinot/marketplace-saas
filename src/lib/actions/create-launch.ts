"use server";

import { db } from "@/lib/db";
import { launch, launchCategory, launchImage } from "@/lib/db/schema";
import { canCreateLaunch, checkFeatureAccess } from "@/lib/subscription";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createLaunch(formData: FormData, userId: string) {
  const canCreate = await canCreateLaunch(userId);
  if (!canCreate) {
    throw new Error("Free tier: 1 launch per month. Upgrade to Pro for unlimited launches.");
  }

  const title = formData.get("title") as string;
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const demoUrl = formData.get("demoUrl") as string;
  const categoryIds = formData.getAll("categories") as string[];
  const isForSale = formData.get("isForSale") === "on";
  const askingPrice = formData.get("askingPrice") as string;
  const mrr = formData.get("monthlyRecurringRevenue") as string;

  if (!title || !tagline || !description) {
    throw new Error("Title, tagline, and description are required");
  }

  if (isForSale) {
    const canMarketplace = await checkFeatureAccess(userId, "marketplace");
    if (!canMarketplace) {
      throw new Error("Marketplace listings require a Pro subscription");
    }
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 60);

  // Check slug uniqueness
  const existing = await db.select().from(launch).where(eq(launch.slug, slug)).limit(1);
  const finalSlug = existing.length > 0 ? `${slug}-${Date.now()}` : slug;

  const [newLaunch] = await db
    .insert(launch)
    .values({
      title,
      tagline,
      description,
      slug: finalSlug,
      websiteUrl: websiteUrl || null,
      demoUrl: demoUrl || null,
      makerId: userId,
      isForSale,
      askingPrice: askingPrice ? parseInt(askingPrice) : null,
      monthlyRecurringRevenue: mrr ? parseInt(mrr) : null,
    })
    .returning();

  if (categoryIds.length > 0) {
    await db.insert(launchCategory).values(
      categoryIds.map((id) => ({
        launchId: newLaunch.id,
        categoryId: parseInt(id),
      }))
    );
  }

  revalidatePath("/feed");
  redirect(`/launch/${finalSlug}`);
}
