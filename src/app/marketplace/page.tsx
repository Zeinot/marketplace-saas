import { getLaunches } from "@/lib/actions/launch";
import { LaunchCard } from "@/components/launch/launch-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function MarketplacePage() {
  const launches = await getLaunches({ filter: "marketplace" });

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">SaaS Marketplace</h1>
          <p className="text-muted-foreground">Buy and sell SaaS businesses</p>
        </div>
        <Button asChild>
          <Link href="/new">
            <Plus className="mr-2 h-4 w-4" />
            List for Sale
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          No SaaS businesses for sale yet. Be the first to list!
        </div>
      )}
    </div>
  );
}
