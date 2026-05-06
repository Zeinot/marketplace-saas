"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowBigUp, MessageSquare, DollarSign, ExternalLink } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUpvote } from "@/lib/actions/launch";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface LaunchCardProps {
  launch: {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    upvoteCount: number;
    commentCount: number;
    isForSale: boolean;
    askingPrice: number | null;
    createdAt: Date | null;
  };
  maker: { id: string; name: string | null; email: string } | null;
  categories: Array<{ id: number; name: string; slug: string; color: string }>;
}

export function LaunchCard({ launch, maker, categories }: LaunchCardProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const upvoteMutation = useMutation({
    mutationFn: async () => {
      if (!session?.user) {
        toast.error("Please sign in to upvote");
        throw new Error("Not authenticated");
      }
      return toggleUpvote(launch.id, session.user.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["launches"] });
    },
  });

  return (
    <Card className="group flex flex-col h-full border-border/50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <Link href={`/launch/${launch.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
              <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors line-clamp-1">
                {launch.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{launch.tagline}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "shrink-0 flex flex-col items-center gap-0 h-auto py-1.5 px-2 rounded-xl border-border/60 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors",
              upvoteMutation.isPending && "opacity-70"
            )}
            onClick={() => upvoteMutation.mutate()}
          >
            <ArrowBigUp className="h-5 w-5" />
            <span className="text-xs font-semibold tabular-nums">{launch.upvoteCount}</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {categories.slice(0, 3).map((cat) => (
            <Badge key={cat.id} variant="secondary" className="text-[11px] font-medium px-2 py-0.5 rounded-md" style={{ backgroundColor: cat.color + "18", color: cat.color, borderColor: cat.color + "25" }}>
              {cat.name}
            </Badge>
          ))}
          {categories.length > 3 && (
            <Badge variant="secondary" className="text-[11px] font-medium px-2 py-0.5 rounded-md">
              +{categories.length - 3}
            </Badge>
          )}
          {launch.isForSale && (
            <Badge variant="default" className="gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-600">
              <DollarSign className="h-3 w-3" />
              For Sale
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 mt-auto">
        <div className="flex items-center justify-between">
          <Link href={`/profile/${maker?.id}`} className="flex items-center gap-2 group/maker">
            <Avatar className="h-6 w-6 ring-1 ring-border">
              <AvatarFallback className="text-[10px] bg-muted font-medium">{maker?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate max-w-[120px] group-hover/maker:text-foreground transition-colors">
              {maker?.name || "Anonymous"}
            </span>
          </Link>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              {launch.commentCount}
            </span>
            {launch.isForSale && launch.askingPrice && (
              <span className="font-semibold text-emerald-600 tabular-nums">
                ${launch.askingPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
