"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import Link from "next/link";

interface ClientSearchFormProps {
  defaultValue?: string;
  placeholder?: string;
}

export function ClientSearchForm({
  defaultValue = "",
  placeholder = "Search...",
}: ClientSearchFormProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("search", value);
    else params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        className="pl-9 h-11 rounded-lg"
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <Link
          href={pathname}
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </Link>
      )}
    </form>
  );
}
