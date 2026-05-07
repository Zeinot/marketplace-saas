export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserSubscription } from "@/lib/subscription";
import { NewLaunchForm } from "@/components/launch/new-launch-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Rocket, Crown } from "lucide-react";

export default async function NewLaunchPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/login");
  }

  const sub = await getUserSubscription(session.user.id);
  const isPro = sub.tier === "pro" && sub.status === "active";

  if (!isPro) {
    return (
      <div className="container py-8 md:py-10 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Launch Your Product</h1>
          <p className="text-muted-foreground text-sm mt-1">Upgrade to Pro to launch and sell your SaaS</p>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Crown className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <CardTitle>Pro Required</CardTitle>
                <CardDescription>Upgrade to unlock launching and marketplace features</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {[
                "Unlimited product launches",
                "List on the marketplace",
                "Direct messaging with buyers",
                "Featured placement",
                "Analytics dashboard",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            <Button asChild className="w-full h-11 rounded-lg">
              <Link href="/pricing">
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-10 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Launch Your Product</h1>
        <p className="text-muted-foreground text-sm mt-1">Share your SaaS with the community and get feedback</p>
      </div>

      <NewLaunchForm />
    </div>
  );
}
