"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Link from "next/link";
import { User, Lock, Globe, Bell, Palette } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [loading, setLoading] = useState(false);

  if (sessionLoading) {
    return (
      <div className="container py-8 md:py-10 max-w-3xl">
        <Skeleton className="h-8 w-32 mb-2" />
        <Skeleton className="h-4 w-56 mb-8" />
        <Skeleton className="h-10 w-80 mb-6" />
        <div className="space-y-6">
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="container py-20 text-center">
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Sign in required</h1>
        <p className="text-muted-foreground text-sm mb-4">Please sign in to manage your settings.</p>
        <Button asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    toast.success("Profile updated (demo)");
    setLoading(false);
  }

  return (
    <div className="container py-8 md:py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="rounded-lg h-10">
          <TabsTrigger value="profile" className="rounded-md text-sm gap-1.5">
            <User className="h-3.5 w-3.5" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="socials" className="rounded-md text-sm gap-1.5">
            <Globe className="h-3.5 w-3.5" />
            Socials
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-md text-sm gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Public Profile</CardTitle>
              <CardDescription>Update your public profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input id="displayName" defaultValue={session.user.name || ""} className="h-11 rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us about yourself..." rows={4} className="rounded-xl resize-none" />
                </div>
                <Button type="submit" disabled={loading} className="rounded-lg">
                  {loading ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="socials">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Social Links</CardTitle>
              <CardDescription>Connect your online presence</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" type="url" placeholder="https://example.com" className="h-11 rounded-lg" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input id="twitter" placeholder="@username" className="h-11 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input id="github" placeholder="username" className="h-11 rounded-lg" />
                  </div>
                </div>
                <Button type="submit" disabled={loading} className="rounded-lg">
                  {loading ? "Saving..." : "Save changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Notification Preferences</CardTitle>
              <CardDescription>Choose what you want to be notified about</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "New comments on my launches", desc: "Get notified when someone comments" },
                  { label: "Upvotes", desc: "Get notified when someone upvotes your product" },
                  { label: "Direct messages", desc: "Get notified for new messages" },
                  { label: "Product updates", desc: "News about features and improvements" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 py-3 border-b border-border/40 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                    <div className="h-5 w-9 rounded-full bg-primary shrink-0 relative mt-0.5">
                      <div className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-primary-foreground shadow-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
