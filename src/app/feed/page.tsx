import { getLaunches, getCategories } from "@/lib/actions/launch";
import { LaunchCard } from "@/components/launch/launch-card";
import { CategoryFilter } from "@/components/launch/category-filter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; category?: string }>;
}) {
  const params = await searchParams;
  const filter = (params.filter as "latest" | "trending" | "marketplace") || "latest";
  const categorySlug = params.category;

  const [launches, categories] = await Promise.all([
    getLaunches({ filter, categorySlug }),
    getCategories(),
  ]);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          {filter === "marketplace" ? "SaaS Marketplace" : "Discover SaaS Products"}
        </h1>
        <Button asChild>
          <Link href="/new">
            <Plus className="mr-2 h-4 w-4" />
            Launch Product
          </Link>
        </Button>
      </div>

      <CategoryFilter categories={categories} activeFilter={filter} activeCategory={categorySlug} />

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {launches.map((item) => (
          <LaunchCard
            key={item.launch.id}
            launch={item.launch}
            maker={item.maker}
            categories={JSON.parse(item.categories || "[]")}
          />
        ))}
      </div>

      {launches.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          No products found. Be the first to launch!
        </div>
      )}
    </div>
  );
}
