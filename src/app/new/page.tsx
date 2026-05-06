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

export default function NewLaunchPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isForSale, setIsForSale] = useState(false);

  if (!session?.user) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Sign in required</h1>
        <p className="text-muted-foreground mt-2">Please sign in to launch a product.</p>
        <Button asChild className="mt-4">
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

      toast.success("Product launched!");
      router.push(`/launch/${data.slug}`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="container py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Launch Your Product</CardTitle>
          <CardDescription>Share your SaaS with the community</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Product Name *</Label>
              <Input id="title" name="title" placeholder="My Awesome SaaS" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline *</Label>
              <Input id="tagline" name="tagline" placeholder="One-line description" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea id="description" name="description" placeholder="Tell us about your product..." rows={5} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input id="demoUrl" name="demoUrl" type="url" placeholder="https://demo.example.com" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Switch id="isForSale" name="isForSale" checked={isForSale} onCheckedChange={setIsForSale} />
              <Label htmlFor="isForSale">List on marketplace (Pro required)</Label>
            </div>

            {isForSale && (
              <div className="grid gap-4 sm:grid-cols-2 rounded-lg border p-4 bg-muted/50">
                <div className="space-y-2">
                  <Label htmlFor="askingPrice">Asking Price ($)</Label>
                  <Input id="askingPrice" name="askingPrice" type="number" min="0" placeholder="50000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyRecurringRevenue">Monthly Recurring Revenue ($)</Label>
                  <Input id="monthlyRecurringRevenue" name="monthlyRecurringRevenue" type="number" min="0" placeholder="5000" />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Launching..." : "Launch Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
