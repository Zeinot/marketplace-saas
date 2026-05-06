import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { user, profile, launch } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LaunchCard } from "@/components/launch/launch-card";
import Link from "next/link";
import { Globe, Twitter, Github, MessageSquare } from "lucide-react";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

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
    <div className="container py-8 max-w-4xl">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">
                {userData.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.email}</p>
              {userData.profile?.bio && (
                <p className="mt-2 text-sm">{userData.profile.bio}</p>
              )}
              <div className="flex gap-2 mt-3">
                {userData.profile?.website && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={userData.profile.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-1 h-3 w-3" />
                      Website
                    </a>
                  </Button>
                )}
                {userData.profile?.twitter && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://twitter.com/${userData.profile.twitter}`} target="_blank" rel="noopener noreferrer">
                      <Twitter className="mr-1 h-3 w-3" />
                      Twitter
                    </a>
                  </Button>
                )}
                {userData.profile?.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://github.com/${userData.profile.github}`} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-1 h-3 w-3" />
                      GitHub
                    </a>
                  </Button>
                )}
                <Button variant="secondary" size="sm" asChild>
                  <Link href={`/messages?to=${userData.id}`}>
                    <MessageSquare className="mr-1 h-3 w-3" />
                    Message
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Launches ({userLaunches.length})</h2>
        <div className="grid gap-4 md:grid-cols-2">
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
          <p className="text-muted-foreground text-center py-8">No launches yet.</p>
        )}
      </div>
    </div>
  );
}
