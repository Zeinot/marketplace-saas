"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, TrendingUp, Store, X } from "lucide-react";

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

const filters = [
  { key: "latest", label: "Latest", icon: Clock },
  { key: "trending", label: "Trending", icon: TrendingUp },
  { key: "marketplace", label: "Marketplace", icon: Store },
];

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
        {filters.map((f) => {
          const Icon = f.icon;
          return (
            <Link key={f.key} href={buildUrl(f.key, activeCategory)}>
              <Button
                variant={activeFilter === f.key ? "default" : "outline"}
                size="sm"
                className={cn(
                  "rounded-lg h-9 gap-1.5 text-sm",
                  activeFilter === f.key && "shadow-sm"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {f.label}
              </Button>
            </Link>
          );
        })}
      </div>
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Link key={cat.id} href={buildUrl(activeFilter, cat.slug)}>
              <Button
                variant={activeCategory === cat.slug ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-lg text-xs h-8 px-2.5",
                  activeCategory === cat.slug && "font-medium"
                )}
              >
                {cat.name}
              </Button>
            </Link>
          ))}
          {activeCategory && (
            <Link href={buildUrl(activeFilter)}>
              <Button variant="ghost" size="sm" className="rounded-lg text-xs h-8 px-2.5 text-muted-foreground gap-1">
                <X className="h-3 w-3" />
                Clear
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
