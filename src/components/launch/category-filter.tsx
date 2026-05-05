"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeFilter: string;
  activeCategory?: string;
}

export function CategoryFilter({ categories, activeFilter, activeCategory }: CategoryFilterProps) {
  const searchParams = useSearchParams();

  function buildUrl(filter: string, category?: string) {
    const params = new URLSearchParams();
    if (filter && filter !== "latest") params.set("filter", filter);
    if (category) params.set("category", category);
    return `/feed?${params.toString()}`;
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        <Link href={buildUrl("latest", activeCategory)}>
          <Button variant={activeFilter === "latest" ? "default" : "outline"} size="sm">
            Latest
          </Button>
        </Link>
        <Link href={buildUrl("trending", activeCategory)}>
          <Button variant={activeFilter === "trending" ? "default" : "outline"} size="sm">
            Trending
          </Button>
        </Link>
        <Link href={buildUrl("marketplace", activeCategory)}>
          <Button variant={activeFilter === "marketplace" ? "default" : "outline"} size="sm">
            Marketplace
          </Button>
        </Link>
      </div>
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <Link key={cat.id} href={buildUrl(activeFilter, cat.slug)}>
            <Button
              variant={activeCategory === cat.slug ? "secondary" : "ghost"}
              size="sm"
              className={cn("text-xs", activeCategory === cat.slug && "font-medium")}
            >
              {cat.name}
            </Button>
          </Link>
        ))}
        {activeCategory && (
          <Link href={buildUrl(activeFilter)}>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              Clear filter
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
