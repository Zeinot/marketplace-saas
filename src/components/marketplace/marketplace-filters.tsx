"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowUpDown, X, SlidersHorizontal } from "lucide-react";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface MarketplaceFiltersProps {
  categories: Category[];
  activeSort: string;
  activeCategory?: string;
  activeMrrRange?: string;
  activePriceRange?: string;
  activeFiltersCount: number;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "most_upvoted", label: "Most Upvoted" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "mrr_desc", label: "MRR: High to Low" },
];

const mrrRanges = [
  { value: "", label: "Any MRR" },
  { value: "0-1000", label: "$0 - $1K" },
  { value: "1000-5000", label: "$1K - $5K" },
  { value: "5000-10000", label: "$5K - $10K" },
  { value: "10000-999999999", label: "$10K+" },
];

const priceRanges = [
  { value: "", label: "Any Price" },
  { value: "0-10000", label: "$0 - $10K" },
  { value: "10000-50000", label: "$10K - $50K" },
  { value: "50000-100000", label: "$50K - $100K" },
  { value: "100000-999999999", label: "$100K+" },
];

export function MarketplaceFilters({
  categories,
  activeSort,
  activeCategory,
  activeMrrRange,
  activePriceRange,
  activeFiltersCount,
}: MarketplaceFiltersProps) {
  const searchParams = useSearchParams();

  function buildUrl(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    return `/marketplace?${params.toString()}`;
  }

  return (
    <div className="space-y-3">
      {/* Sort + Range Filters Row */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          <Select
            value={activeSort}
            onValueChange={(value) => {
              if (value) {
                window.location.href = buildUrl({ sort: value });
              }
            }}
          >
            <SelectTrigger className="w-[180px] h-9 rounded-lg text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-6 w-px bg-border" />

        {/* MRR Range */}
        <Select
          value={activeMrrRange || ""}
          onValueChange={(value) => {
            window.location.href = buildUrl({ mrr: value || undefined });
          }}
        >
          <SelectTrigger className="w-[140px] h-9 rounded-lg text-sm">
            <SelectValue placeholder="MRR Range" />
          </SelectTrigger>
          <SelectContent>
            {mrrRanges.map((range) => (
              <SelectItem key={range.value || "any"} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Price Range */}
        <Select
          value={activePriceRange || ""}
          onValueChange={(value) => {
            window.location.href = buildUrl({ price: value || undefined });
          }}
        >
          <SelectTrigger className="w-[140px] h-9 rounded-lg text-sm">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value || "any"} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 text-muted-foreground hover:text-foreground gap-1.5"
            asChild
          >
            <Link href="/marketplace">
              <X className="h-3.5 w-3.5" />
              Clear ({activeFiltersCount})
            </Link>
          </Button>
        )}
      </div>

      {/* Category Pills */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={buildUrl({
                category: activeCategory === cat.slug ? undefined : cat.slug,
              })}
            >
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
            <Link href={buildUrl({ category: undefined })} className="text-xs h-8 flex items-center text-muted-foreground hover:text-foreground">
              Clear category
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
