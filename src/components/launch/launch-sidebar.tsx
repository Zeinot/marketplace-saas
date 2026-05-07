"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowBigUp, MessageSquare, Calendar, User, ExternalLink, DollarSign } from "lucide-react";
import { toggleUpvote } from "@/lib/actions/launch";
import { MessageButton } from "@/components/message-button";
import { toast } from "sonner";

interface LaunchSidebarProps {
  launch: {
    id: number;
    upvoteCount: number;
    commentCount: number;
    createdAt: Date | null;
    websiteUrl: string | null;
    demoUrl: string | null;
    isForSale: boolean;
    askingPrice: number | null;
  };
  maker: { id: string; name: string | null; email: string } | null;
}

export function LaunchSidebar({ launch, maker }: LaunchSidebarProps) {
  const { data: session, isPending } = useSession();
  const [upvotes, setUpvotes] = useState(launch.upvoteCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpvote() {
    if (isPending) return;
    if (!session?.user) {
      toast.error("Sign in to upvote");
      return;
    }
    setLoading(true);
    try {
      const result = await toggleUpvote(launch.id, session.user.id);
      setUpvotes((prev) => (result.upvoted ? prev + 1 : prev - 1));
      setHasUpvoted(result.upvoted);
      if (result.upvoted) toast.success("Upvoted!");
    } catch {
      toast.error("Failed to upvote");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5 sticky top-24">
      {/* Actions Card */}
      <Card className="border-border/50">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className={`flex-1 flex-col items-center gap-0.5 h-auto py-3 rounded-xl border-border/60 hover:bg-muted/50 ${
                hasUpvoted ? "bg-primary/10 border-primary/30 text-primary" : ""
              }`}
              onClick={handleUpvote}
              disabled={loading}
            >
              <ArrowBigUp className="h-5 w-5" />
              <span className="text-xs font-semibold tabular-nums">{upvotes}</span>
            </Button>
            <div className="flex-1 flex flex-col items-center gap-0.5 py-3 rounded-xl border border-border/60 bg-muted/50">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <span className="text-xs font-semibold tabular-nums text-muted-foreground">{launch.commentCount}</span>
            </div>
          </div>

          {launch.websiteUrl && (
            <Button asChild className="w-full rounded-xl h-11">
              <a href={launch.websiteUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Website
              </a>
            </Button>
          )}
          {launch.demoUrl && (
            <Button variant="outline" asChild className="w-full rounded-xl h-11">
              <a href={launch.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
          {maker && session?.user?.id !== maker.id && (
            <MessageButton
              userId={maker.id}
              variant="full"
              label={launch.isForSale ? "Contact Seller" : "Message Maker"}
              className="w-full rounded-xl h-11"
            />
          )}
        </CardContent>
      </Card>

      {/* Maker Card */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Maker</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Link href={`/profile/${maker?.id}`} className="flex items-center gap-3 group">
            <Avatar className="h-12 w-12 ring-2 ring-border">
              <AvatarFallback className="text-base bg-muted font-semibold">
                {maker?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm group-hover:text-primary transition-colors">{maker?.name || "Anonymous"}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <User className="h-3 w-3" />
                Indie Maker
              </p>
            </div>
          </Link>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-border/50">
        <CardContent className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Launched</span>
            <span className="text-sm font-medium flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              {launch.createdAt?.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          {launch.isForSale && launch.askingPrice && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Asking Price</span>
              <span className="text-sm font-semibold text-emerald-600">${launch.askingPrice.toLocaleString()}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
