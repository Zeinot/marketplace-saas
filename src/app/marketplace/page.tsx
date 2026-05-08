export const dynamic = "force-dynamic";

import { getLaunches, getCategories } from "@/lib/actions/launch";
import { LaunchCard } from "@/components/launch/launch-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus, Store, Search, SlidersHorizontal, X } from "lucide-react";
import { Suspense } from "react";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { cn } from "@/lib/utils";

interface MarketplacePageProps {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    category?: string;
    mrr?: string;
    price?: string;
  }>;
}

export default async function MarketplacePage({ searchParams }: MarketplacePageProps) {
  const params = await searchParams;
  
  // Parse filters
  const search = params.search;
  const sort = (params.sort as any) || "newest";
  const categorySlug = params.category;
  
  // Parse MRR range
  let mrrMin: number | undefined;
  let mrrMax: number | undefined;
  if (params.mrr) {
    const [min, max] = params.mrr.split("-").map(Number);
    if (!isNaN(min)) mrrMin = min;
    if (!isNaN(max)) mrrMax = max;
  }
  
  // Parse price range
  let priceMin: number | undefined;
  let priceMax: number | undefined;
  if (params.price) {
    const [min, max] = params.price.split("-").map(Number);
    if (!isNaN(min)) priceMin = min;
    if (!isNaN(max)) priceMax = max;
  }

  const [launches, categories] = await Promise.all([
    getLaunches({
      filter: "marketplace",
      search,
      sort,
      categorySlug,
      mrrMin,
      mrrMax,
      priceMin,
      priceMax,
    }),
    getCategories(),
  ]);

  const activeFiltersCount = [
    search,
    categorySlug,
    params.mrr,
    params.price,
  ].filter(Boolean).length;

  return (
    <div className="container py-8 md:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Store className="h-4 w-4 text-emerald-600" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">SaaS Marketplace</h1>
          </div>
          <p className="text-muted-foreground text-sm">Buy and sell SaaS businesses</p>
        </div>
        <Button asChild className="shrink-0 rounded-lg h-10">
          <Link href="/new">
            <Plus className="mr-2 h-4 w-4" />
            List for Sale
          </Link>
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        <div className="flex gap-3">
          <form className="flex-1 flex gap-3" action="/marketplace" method="GET">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                name="search"
                placeholder="Search products..."
                defaultValue={search}
                className="pl-9 h-11 rounded-lg"
              />
              {search && (
                <Link
                  href="/marketplace"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </Link>
              )}
            </div>
            {/* Preserve other params */}
            {sort !== "newest" && <input type="hidden" name="sort" value={sort} />}
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            {params.mrr && <input type="hidden" name="mrr" value={params.mrr} />}
            {params.price && <input type="hidden" name="price" value={params.price} />}
          </form>
        </div>

        <MarketplaceFilters
          categories={categories}
          activeSort={sort}
          activeCategory={categorySlug}
          activeMrrRange={params.mrr}
          activePriceRange={params.price}
          activeFiltersCount={activeFiltersCount}
        />
      </div>

      {/* Results */}
      {launches.length === 0 ? (
        <div className="text-center py-20">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Store className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No listings found</h3>
          <p className="text-muted-foreground text-sm mb-4">
            {activeFiltersCount > 0
              ? "Try adjusting your filters"
              : "Be the first to list your SaaS for sale!"}
          </p>
          {activeFiltersCount > 0 ? (
            <Button asChild variant="outline">
              <Link href="/marketplace">Clear all filters</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/new">List for Sale</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {launches.map((item) => (
            <LaunchCard
              key={item.launch.id}
              launch={{
                id: item.launch.id,
                slug: item.launch.slug,
                title: item.launch.title,
                tagline: item.launch.tagline,
                upvoteCount: item.launch.upvoteCount,
                commentCount: item.launch.commentCount,
                isForSale: item.launch.isForSale,
                askingPrice: item.launch.askingPrice,
                createdAt: item.launch.createdAt,
                logoUrl: item.launch.logoUrl,
              }}
              maker={item.maker}
              categories={(() => { try { return JSON.parse(item.categories || "[]"); } catch { return []; } })()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
