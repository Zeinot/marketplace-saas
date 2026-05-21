"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowUpDown, X, Rocket, FileText, LayoutGrid } from "lucide-react";

interface FeedFiltersProps {
  activeSort: string;
  activeType: string;
  activeFiltersCount: number;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "most_upvoted", label: "Most Upvoted" },
  { value: "most_discussed", label: "Most Discussed" },
];

const typeOptions = [
  { value: "all", label: "All", icon: LayoutGrid },
  { value: "launches", label: "Launches", icon: Rocket },
  { value: "posts", label: "Posts", icon: FileText },
];

export function FeedFilters({
  activeSort,
  activeType,
  activeFiltersCount,
}: FeedFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  function buildUrl(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === "all" || value === "newest") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    return `/feed?${params.toString()}`;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <Select
          value={activeSort}
          onValueChange={(value) => {
            if (value) {
              router.push(buildUrl({ sort: value }));
            }
          }}
        >
          <SelectTrigger className="w-[160px] h-9 rounded-lg text-sm">
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

      {/* Type Filter Pills */}
      <div className="flex gap-1">
        {typeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <Link
              key={option.value}
              href={buildUrl({
                type: activeType === option.value ? undefined : option.value,
              })}
            >
              <Button
                variant={activeType === option.value ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-lg text-xs h-8 gap-1.5",
                  activeType === option.value && "font-medium"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {option.label}
              </Button>
            </Link>
          );
        })}
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 text-muted-foreground hover:text-foreground gap-1.5"
          asChild
        >
          <Link href="/feed">
            <X className="h-3.5 w-3.5" />
            Clear ({activeFiltersCount})
          </Link>
        </Button>
      )}
    </div>
  );
}
