export const dynamic = "force-dynamic";

import { getLaunches } from "@/lib/actions/launch";
import { LaunchCard } from "@/components/launch/launch-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function MyLaunchesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const allLaunches = await getLaunches();
  const myLaunches = allLaunches.filter((item) => item.maker?.id === session.user.id);

  return (
    <div className="container py-8 md:py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-4 w-4 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Launches</h1>
          </div>
          <p className="text-muted-foreground text-sm">Manage your SaaS products</p>
        </div>
        <Button asChild className="shrink-0 rounded-lg h-10">
          <Link href="/new">
            <Plus className="mr-2 h-4 w-4" />
            New Launch
          </Link>
        </Button>
      </div>

      {myLaunches.length === 0 ? (
        <div className="text-center py-20">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No launches yet</h3>
          <p className="text-muted-foreground text-sm mb-4">Launch your first SaaS product!</p>
          <Button asChild>
            <Link href="/new">Create Launch</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {myLaunches.map((item) => (
            <LaunchCard
              key={item.launch.id}
              launch={{
                id: item.launch.id,
                slug: item.launch.slug,
                title: item.launch.title,
                tagline: item.launch.tagline,
                upvoteCount: item.launch.upvoteCount,
                commentCount: item.launch.commentCount,
                isForSale: item.launch.isForSale,
                askingPrice: item.launch.askingPrice,
                createdAt: item.launch.createdAt,
                logoUrl: item.launch.logoUrl,
              }}
              maker={item.maker}
              categories={(() => { try { return JSON.parse(item.categories || "[]"); } catch { return []; } })()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
