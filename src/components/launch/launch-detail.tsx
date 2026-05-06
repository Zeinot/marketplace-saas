import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowBigUp, MessageSquare, ExternalLink, DollarSign, Calendar, User } from "lucide-react";
import Image from "next/image";

interface LaunchDetailProps {
  launch: {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    websiteUrl: string | null;
    demoUrl: string | null;
    isForSale: boolean;
    askingPrice: number | null;
    monthlyRecurringRevenue: number | null;
    upvoteCount: number;
    commentCount: number;
    createdAt: Date | null;
  };
  maker: { id: string; name: string | null; email: string } | null;
  categories: Array<{ id: number; name: string; slug: string; color: string }>;
  images: Array<{ id: number; url: string; alt: string | null }>;
}

export function LaunchDetail({ launch, maker, categories, images }: LaunchDetailProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat) => (
              <Badge key={cat.id} variant="secondary" className="text-xs font-medium rounded-md px-2.5 py-0.5" style={{ backgroundColor: cat.color + "18", color: cat.color }}>
                {cat.name}
              </Badge>
            ))}
            {launch.isForSale && (
              <Badge className="gap-1 text-xs font-medium rounded-md px-2.5 py-0.5 bg-emerald-600 hover:bg-emerald-600">
                <DollarSign className="h-3 w-3" />
                For Sale
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{launch.title}</h1>
          <p className="text-lg text-muted-foreground mt-2 leading-relaxed">{launch.tagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="flex flex-col items-center gap-0 h-auto py-2 px-3 rounded-xl border-border/60">
            <ArrowBigUp className="h-5 w-5" />
            <span className="text-xs font-semibold tabular-nums">{launch.upvoteCount}</span>
          </Button>
          <div className="flex flex-col items-center gap-0 h-auto py-2 px-3 rounded-xl border border-border/60 bg-muted/50">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <span className="text-xs font-semibold tabular-nums text-muted-foreground">{launch.commentCount}</span>
          </div>
        </div>
      </div>

      {/* Images */}
      {images.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden border border-border/50 bg-muted">
              <Image src={img.url} alt={img.alt || launch.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">{launch.description}</p>
      </div>

      {/* Acquisition details */}
      {launch.isForSale && (
        <div className="rounded-xl border border-border/50 p-6 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-base">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            Acquisition Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {launch.askingPrice && (
              <div className="rounded-lg bg-background border border-border/50 p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Asking Price</span>
                <p className="text-2xl font-bold text-emerald-600 mt-1">${launch.askingPrice.toLocaleString()}</p>
              </div>
            )}
            {launch.monthlyRecurringRevenue && (
              <div className="rounded-lg bg-background border border-border/50 p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">MRR</span>
                <p className="text-2xl font-bold mt-1">${launch.monthlyRecurringRevenue.toLocaleString()}</p>
              </div>
            )}
            <div className="rounded-lg bg-background border border-border/50 p-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Status</span>
              <p className="text-sm font-medium mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Available
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        {launch.websiteUrl && (
          <Button asChild className="rounded-lg h-11">
            <a href={launch.websiteUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </a>
          </Button>
        )}
        {launch.demoUrl && (
          <Button variant="outline" asChild className="rounded-lg h-11">
            <a href={launch.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {launch.isForSale && (
          <Button variant="secondary" asChild className="rounded-lg h-11">
            <Link href={`/messages?to=${maker?.id}`}>Contact Seller</Link>
          </Button>
        )}
      </div>

      {/* Maker info */}
      <div className="flex items-center justify-between pt-6 border-t border-border/50">
        <Link href={`/profile/${maker?.id}`} className="flex items-center gap-3 group">
          <Avatar className="h-11 w-11 ring-1 ring-border">
            <AvatarFallback className="text-sm bg-muted font-medium">{maker?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm group-hover:text-primary transition-colors">{maker?.name || "Anonymous"}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <User className="h-3 w-3" />
              Maker
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{launch.createdAt?.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
