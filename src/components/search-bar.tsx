"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  defaultValue?: string;
}

export function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateSearch(value);
  }

  function updateSearch(query: string) {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set("search", query);
    else url.searchParams.delete("search");
    window.location.href = url.toString();
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search products..."
        className="pl-10 pr-10 h-11 rounded-lg border-border/60 focus-visible:ring-primary/20"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          updateSearch(e.target.value);
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            updateSearch("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
