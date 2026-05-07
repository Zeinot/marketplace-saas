import { getLaunches, getCategories } from "@/lib/actions/launch";
import { LaunchCard } from "@/components/launch/launch-card";
import { CategoryFilter } from "@/components/launch/category-filter";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, TrendingUp, Clock, Store } from "lucide-react";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const filter = (params.filter as "latest" | "trending" | "marketplace") || "latest";
  const categorySlug = params.category;
  const search = params.search;

  const [launches, categories] = await Promise.all([
    getLaunches({ filter, categorySlug, search }),
    getCategories(),
  ]);

  const filterInfo = {
    latest: { label: "Discover SaaS Products", icon: Clock, desc: "The newest launches from the community" },
    trending: { label: "Trending Products", icon: TrendingUp, desc: "Most upvoted this week" },
    marketplace: { label: "SaaS Marketplace", icon: Store, desc: "Buy and sell SaaS businesses" },
  };

  const info = filterInfo[filter];
  const FilterIcon = info.icon;

  return (
    <div className="container py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FilterIcon className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{info.label}</h1>
          </div>
          <p className="text-muted-foreground text-sm ml-10.5">{info.desc}</p>
        </div>
        <Button asChild className="shrink-0 rounded-lg h-10">
          <Link href="/new">
            <Plus className="mr-2 h-4 w-4" />
            Launch Product
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchBar defaultValue={search} />
      </div>

      <CategoryFilter categories={categories} activeFilter={filter} activeCategory={categorySlug} />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {launches.map((item) => (
          <LaunchCard
            key={item.launch.id}
            launch={item.launch}
            maker={item.maker}
            categories={(() => { try { return JSON.parse(item.categories || "[]"); } catch { return []; } })()}
          />
        ))}
      </div>

      {launches.length === 0 && (
        <div className="text-center py-20">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No products found</h3>
          <p className="text-muted-foreground text-sm mb-4">Be the first to launch in this category!</p>
          <Button asChild>
            <Link href="/new">Launch Product</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
