"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowBigUp, MessageSquare, DollarSign } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleUpvote } from "@/lib/actions/launch";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

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
    <Card className="group flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <Link href={`/launch/${launch.slug}`} className="block">
              <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors truncate">
                {launch.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{launch.tagline}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 flex flex-col items-center gap-0.5 h-auto py-1.5 px-2"
            onClick={() => upvoteMutation.mutate()}
          >
            <ArrowBigUp className="h-5 w-5" />
            <span className="text-xs font-medium">{launch.upvoteCount}</span>
          </Button>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {categories.map((cat) => (
            <Badge key={cat.id} variant="secondary" style={{ backgroundColor: cat.color + "20", color: cat.color }}>
              {cat.name}
            </Badge>
          ))}
          {launch.isForSale && (
            <Badge variant="default" className="gap-1">
              <DollarSign className="h-3 w-3" />
              For Sale
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px]">{maker?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate max-w-[120px]">
              {maker?.name || "Anonymous"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3.5 w-3.5" />
              {launch.commentCount}
            </span>
            {launch.isForSale && launch.askingPrice && (
              <span className="font-medium text-foreground">
                ${launch.askingPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
