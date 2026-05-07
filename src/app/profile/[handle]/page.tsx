export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { user, profile, launch } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LaunchCard } from "@/components/launch/launch-card";
import Link from "next/link";
import { Globe, ExternalLink, Rocket, Mail, Calendar } from "lucide-react";
import { MessageButton } from "@/components/message-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  const userData = await db.query.user.findFirst({
    where: eq(user.id, handle),
    with: {
      profile: true,
      launches: true,
    },
  });

  if (!userData) {
    notFound();
  }

  const userLaunches = await db
    .select()
    .from(launch)
    .where(eq(launch.makerId, userData.id))
    .orderBy(launch.createdAt);

  return (
    <div className="container py-8 md:py-10 max-w-4xl">
      {/* Profile Header */}
      <Card className="border-border/50 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-muted" />
        <CardContent className="pt-0 pb-6 px-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 mb-4">
            <Avatar className="h-24 w-24 ring-4 ring-background">
              <AvatarFallback className="text-3xl bg-muted font-bold">
                {userData.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-1">
              <h1 className="text-2xl font-bold tracking-tight">{userData.name}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Mail className="h-3.5 w-3.5" />
                {userData.email}
              </p>
            </div>
            {session?.user?.id !== userData.id && (
              <MessageButton userId={userData.id} variant="outline" label="Message" />
            )}
          </div>

          {userData.profile?.bio && (
            <p className="text-sm text-foreground/80 leading-relaxed max-w-2xl mb-4">
              {userData.profile.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {userData.profile?.website && (
              <Button variant="outline" size="sm" asChild className="rounded-lg h-8 text-xs">
                <a href={userData.profile.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-1.5 h-3 w-3" />
                  Website
                </a>
              </Button>
            )}
            {userData.profile?.twitter && (
              <Button variant="outline" size="sm" asChild className="rounded-lg h-8 text-xs">
                <a href={`https://twitter.com/${userData.profile.twitter}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  Twitter
                </a>
              </Button>
            )}
            {userData.profile?.github && (
              <Button variant="outline" size="sm" asChild className="rounded-lg h-8 text-xs">
                <a href={`https://github.com/${userData.profile.github}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  GitHub
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card className="border-border/50">
          <CardContent className="pt-5 pb-4 text-center">
            <div className="text-2xl font-bold">{userLaunches.length}</div>
            <div className="text-xs text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
              <Rocket className="h-3 w-3" />
              Launches
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-5 pb-4 text-center">
            <div className="text-2xl font-bold">{userLaunches.reduce((acc, l) => acc + (l.upvoteCount || 0), 0)}</div>
            <div className="text-xs text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
              <ExternalLink className="h-3 w-3" />
              Upvotes
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="pt-5 pb-4 text-center">
            <div className="text-2xl font-bold">
              {userData.createdAt ? new Date(userData.createdAt).getFullYear() : "—"}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5 flex items-center justify-center gap-1">
              <Calendar className="h-3 w-3" />
              Member since
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Launches */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
          <Rocket className="h-5 w-5 text-muted-foreground" />
          Launches
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {userLaunches.map((l) => (
            <LaunchCard
              key={l.id}
              launch={l}
              maker={{ id: userData.id, name: userData.name, email: userData.email }}
              categories={[]}
            />
          ))}
        </div>
        {userLaunches.length === 0 && (
          <div className="text-center py-16 rounded-xl border border-border/50 bg-muted/20">
            <Rocket className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-muted-foreground text-sm">No launches yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
