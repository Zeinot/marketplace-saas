"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { DollarSign, ArrowRight, Loader2, Upload, X } from "lucide-react";

export function NewLaunchForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isForSale, setIsForSale] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeLogo() {
    setLogoFile(null);
    setLogoPreview(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    // Append logo file if selected
    if (logoFile) {
      formData.append("logo", logoFile);
    }

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

          <div className="space-y-2">
            <Label htmlFor="logo">Product Logo</Label>
            <div className="flex items-center gap-4">
              {logoPreview ? (
                <div className="relative group">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-16 w-16 rounded-xl object-cover border"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1">
                <Input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleLogoChange}
                  className="h-11 rounded-lg cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 128x128px or larger. PNG, JPG, or WebP.
                </p>
              </div>
            </div>
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
              <p className="text-xs text-muted-foreground">Available with your Pro subscription</p>
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
  );
}
