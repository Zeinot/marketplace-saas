import { getLaunches } from "@/lib/actions/launch";
import { LaunchCard } from "@/components/launch/launch-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Store, ArrowRight } from "lucide-react";

export default async function MarketplacePage() {
  const launches = await getLaunches({ filter: "marketplace" });

  return (
    <div className="container py-8 md:py-10">
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

      {launches.length === 0 ? (
        <div className="text-center py-20">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Store className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No listings yet</h3>
          <p className="text-muted-foreground text-sm mb-4">Be the first to list your SaaS for sale!</p>
          <Button asChild>
            <Link href="/new">List for Sale</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {launches.map((item) => (
            <LaunchCard
              key={item.launch.id}
              launch={item.launch}
              maker={item.maker}
              categories={(() => { try { return JSON.parse(item.categories || "[]"); } catch { return []; } })()}
            />
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Button variant="outline" asChild className="rounded-lg">
          <Link href="/feed?filter=marketplace">
            View all marketplace listings
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
