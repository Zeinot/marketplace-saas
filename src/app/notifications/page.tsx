"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold">Sign in required</h1>
        <p className="text-muted-foreground mt-2">Please sign in to view notifications.</p>
        <Button asChild className="mt-4">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notifications yet.</p>
            <p className="text-sm mt-1">Activity on your launches will appear here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
