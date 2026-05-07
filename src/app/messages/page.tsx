"use client";

import { useSession } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { MessageSquare, ArrowRight, Inbox } from "lucide-react";
import { getConversations } from "@/lib/actions/message";
import { formatDistanceToNow } from "date-fns";

export default function MessagesPage() {
  const { data: session } = useSession();

  const { data: conversations = [], isLoading } = useQuery({
    queryKey: ["conversations", session?.user?.id],
    queryFn: () => (session?.user ? getConversations(session.user.id) : []),
    enabled: !!session?.user,
    refetchInterval: 3000, // Real-time polling every 3s
  });

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

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : conversations.length === 0 ? (
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
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Link
              key={conv.id}
              href={`/messages/${conv.id}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/30 transition-colors"
            >
              <Avatar className="h-11 w-11 shrink-0">
                <AvatarFallback className="text-sm bg-muted font-medium">
                  {conv.otherUser?.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm truncate">{conv.otherUser?.name || "Unknown"}</span>
                  {conv.lastMessage?.createdAt && (
                    <span className="text-xs text-muted-foreground shrink-0">
                      {formatDistanceToNow(new Date(conv.lastMessage.createdAt), { addSuffix: false })}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2 mt-0.5">
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.lastMessage?.content || "No messages yet"}
                  </p>
                  {conv.unreadCount > 0 && (
                    <span className="shrink-0 h-5 min-w-[20px] rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center px-1.5">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
