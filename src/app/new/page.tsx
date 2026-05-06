"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { Rocket, DollarSign, ArrowRight, Loader2 } from "lucide-react";

export default function NewLaunchPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isForSale, setIsForSale] = useState(false);

  if (!session?.user) {
    return (
      <div className="container py-20 text-center">
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Rocket className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Sign in required</h1>
        <p className="text-muted-foreground text-sm mb-4">Please sign in to launch a product.</p>
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/launches", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create launch");
        setLoading(false);
        return;
      }

      toast.success("Product launched successfully!");
      router.push(`/launch/${data.slug}`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="container py-8 md:py-10 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Launch Your Product</h1>
        <p className="text-muted-foreground text-sm mt-1">Share your SaaS with the community and get feedback</p>
      </div>

      <Card className="border-border/50">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Product Name *</Label>
              <Input id="title" name="title" placeholder="My Awesome SaaS" required className="h-11 rounded-lg" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline *</Label>
              <Input id="tagline" name="tagline" placeholder="One-line description that grabs attention" required className="h-11 rounded-lg" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" name="description" placeholder="Tell us about your product, what problem it solves, and who it's for..." rows={5} required className="rounded-xl resize-none" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://example.com" className="h-11 rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input id="demoUrl" name="demoUrl" type="url" placeholder="https://demo.example.com" className="h-11 rounded-lg" />
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border/50 p-4 bg-muted/20">
              <Switch id="isForSale" name="isForSale" checked={isForSale} onCheckedChange={setIsForSale} />
              <div>
                <Label htmlFor="isForSale" className="cursor-pointer">List on marketplace</Label>
                <p className="text-xs text-muted-foreground">Pro required to list for sale</p>
              </div>
              <DollarSign className="h-5 w-5 text-emerald-600 ml-auto shrink-0" />
            </div>

            {isForSale && (
              <div className="grid gap-5 sm:grid-cols-2 rounded-xl border border-border/50 p-5 bg-emerald-500/[0.03]">
                <div className="space-y-2">
                  <Label htmlFor="askingPrice">Asking Price ($)</Label>
                  <Input id="askingPrice" name="askingPrice" type="number" min="0" placeholder="50000" className="h-11 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyRecurringRevenue">Monthly Recurring Revenue ($)</Label>
                  <Input id="monthlyRecurringRevenue" name="monthlyRecurringRevenue" type="number" min="0" placeholder="5000" className="h-11 rounded-lg" />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full h-11 rounded-lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Launching...
                </>
              ) : (
                <>
                  Launch Product
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
