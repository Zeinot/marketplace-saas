import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { launch, launchCategory } from "@/lib/db/schema";
import { canCreateLaunch, checkFeatureAccess } from "@/lib/subscription";
import { eq } from "drizzle-orm";
import { saveFile } from "@/lib/upload";
import { resolveFavicon } from "@/lib/favicon";

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string;
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const websiteUrl = formData.get("websiteUrl") as string;
  const demoUrl = formData.get("demoUrl") as string;
  const isForSale = formData.get("isForSale") === "on";
  const askingPrice = formData.get("askingPrice") as string;
  const mrr = formData.get("monthlyRecurringRevenue") as string;
  const logoFile = formData.get("logo") as File | null;

  if (!title || !tagline || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Handle logo upload
  let logoUrl: string | null = null;
  if (logoFile && logoFile.size > 0) {
    try {
      const result = await saveFile(logoFile, "launches", `temp-${Date.now()}`);
      logoUrl = result.url;
    } catch (error) {
      console.error("Failed to upload logo:", error);
    }
  }

  // If no logo uploaded but website URL exists, try to resolve favicon
  if (!logoUrl && websiteUrl) {
    const faviconResult = await resolveFavicon(websiteUrl);
    if (faviconResult.url) {
      logoUrl = faviconResult.url;
    }
  }

  const canCreate = await canCreateLaunch(session.user.id);
  if (!canCreate) {
    return NextResponse.json(
      { error: "Free tier: 1 launch per month. Upgrade to Pro for unlimited launches." },
      { status: 403 }
    );
  }

  if (isForSale) {
    const canMarketplace = await checkFeatureAccess(session.user.id, "marketplace");
    if (!canMarketplace) {
      return NextResponse.json(
        { error: "Marketplace listings require a Pro subscription" },
        { status: 403 }
      );
    }
  }

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .substring(0, 60);

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
      makerId: session.user.id,
      isForSale,
      askingPrice: askingPrice ? parseInt(askingPrice) : null,
      monthlyRecurringRevenue: mrr ? parseInt(mrr) : null,
      logoUrl,
    })
    .returning();

  return NextResponse.json({ success: true, slug: finalSlug, launch: newLaunch });
}
