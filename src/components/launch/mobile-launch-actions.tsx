"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowBigUp, MessageSquare, ExternalLink, DollarSign } from "lucide-react";

interface MobileLaunchActionsProps {
  launch: {
    id: number;
    upvoteCount: number;
    commentCount: number;
    websiteUrl: string | null;
    demoUrl: string | null;
    isForSale: boolean;
  };
  maker: { id: string; name: string | null; email: string } | null;
}

export function MobileLaunchActions({ launch, maker }: MobileLaunchActionsProps) {
  return (
    <div className="lg:hidden flex flex-wrap gap-3 mt-8">
      <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-10 rounded-xl">
        <ArrowBigUp className="h-4 w-4" />
        <span className="text-xs font-semibold tabular-nums">{launch.upvoteCount}</span>
      </Button>
      <div className="flex items-center gap-1.5 h-10 px-3 rounded-xl border border-border/60 bg-muted/50 text-sm text-muted-foreground">
        <MessageSquare className="h-4 w-4" />
        <span className="text-xs font-semibold tabular-nums">{launch.commentCount}</span>
      </div>
      {launch.websiteUrl && (
        <Button asChild size="sm" className="rounded-xl h-10">
          <a href={launch.websiteUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Website
          </a>
        </Button>
      )}
      {launch.demoUrl && (
        <Button variant="outline" asChild size="sm" className="rounded-xl h-10">
          <a href={launch.demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-1.5 h-4 w-4" />
            Demo
          </a>
        </Button>
      )}
      {launch.isForSale && (
        <Button variant="secondary" asChild size="sm" className="rounded-xl h-10">
          <Link href={`/messages?to=${maker?.id}`}>
            <DollarSign className="mr-1.5 h-4 w-4" />
            Contact
          </Link>
        </Button>
      )}
    </div>
  );
}
