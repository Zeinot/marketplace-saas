"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { MessageSquare, ArrowRight, Inbox } from "lucide-react";

export default function MessagesPage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <div className="container py-20 text-center max-w-md mx-auto">
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Sign in required</h1>
        <p className="text-muted-foreground text-sm mb-5">Please sign in to view and send messages.</p>
        <Button asChild className="rounded-lg h-11">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-10 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Conversations with other makers</p>
        </div>
      </div>

      <Card className="border-border/50">
        <CardContent className="pt-10 pb-10 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Inbox className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No conversations yet</h3>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-5">
            Start messaging other makers from their profiles to collaborate and connect.
          </p>
          <Button variant="outline" asChild className="rounded-lg">
            <Link href="/feed">
              Explore makers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
