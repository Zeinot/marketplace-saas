"use client";

import { useSession } from "@/lib/auth-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Bell, ArrowRight, Inbox, Check, ArrowBigUp, MessageSquare } from "lucide-react";
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/actions/notification";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications", session?.user?.id],
    queryFn: () => (session?.user ? getNotifications(session.user.id) : []),
    enabled: !!session?.user,
    refetchInterval: 3000,
  });

  const markReadMutation = useMutation({
    mutationFn: async (notificationId: number) => {
      if (!session?.user) return;
      await markNotificationAsRead(notificationId, session.user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", session?.user?.id] });
      queryClient.invalidateQueries({ queryKey: ["unread-notifications", session?.user?.id] });
    },
  });

  const markAllReadMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user) return;
      await markAllNotificationsAsRead(session.user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", session?.user?.id] });
      queryClient.invalidateQueries({ queryKey: ["unread-notifications", session?.user?.id] });
      toast.success("All notifications marked as read");
    },
  });

  const unreadCount = notifications.filter((n) => !n.notification.read).length;

  if (!session?.user) {
    return (
      <div className="container py-20 text-center max-w-md mx-auto">
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-1">Sign in required</h1>
        <p className="text-muted-foreground text-sm mb-5">Please sign in to view your notifications.</p>
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Activity on your launches and profile</p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg text-muted-foreground hover:text-foreground"
            onClick={() => markAllReadMutation.mutate()}
            disabled={markAllReadMutation.isPending}
          >
            <Check className="mr-1.5 h-3.5 w-3.5" />
            Mark all read
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="pt-10 pb-10 text-center">
            <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No notifications yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-5">
              Activity on your launches, comments, and upvotes will appear here.
            </p>
            <Button variant="outline" asChild className="rounded-lg">
              <Link href="/feed">
                Explore products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {notifications.map((item) => {
            const isUnread = !item.notification.read;
            const icon =
              item.notification.type === "upvote" ? (
                <ArrowBigUp className="h-4 w-4" />
              ) : item.notification.type === "comment" ? (
                <MessageSquare className="h-4 w-4" />
              ) : (
                <Bell className="h-4 w-4" />
              );

            return (
              <div
                key={item.notification.id}
                className={`flex items-start gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                  isUnread
                    ? "border-primary/20 bg-primary/5 hover:bg-primary/10"
                    : "border-border/50 bg-card hover:bg-muted/30"
                }`}
                onClick={() => {
                  if (isUnread) {
                    markReadMutation.mutate(item.notification.id);
                  }
                }}
              >
                <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  isUnread ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium">{item.actor?.name || "Someone"}</span>{" "}
                    {item.notification.type === "upvote" && "upvoted your launch"}
                    {item.notification.type === "comment" && "commented on your launch"}
                    {item.notification.type === "message" && "sent you a message"}
                    {item.notification.type === "follow" && "started following you"}
                    {item.notification.type === "mention" && "mentioned you"}
                    {item.launch && (
                      <Link
                        href={`/launch/${item.launch.slug}`}
                        className="text-primary hover:underline ml-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.launch.title}
                      </Link>
                    )}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    {item.notification.createdAt
                      ? formatDistanceToNow(new Date(item.notification.createdAt), { addSuffix: true })
                      : ""}
                  </span>
                </div>
                {isUnread && (
                  <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
