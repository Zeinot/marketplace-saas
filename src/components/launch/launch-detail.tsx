import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowBigUp, MessageSquare, ExternalLink, DollarSign, Calendar } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{launch.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{launch.tagline}</p>
          <div className="flex flex-wrap gap-2 mt-3">
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
        </div>
        <div className="flex flex-col items-center gap-1">
          <Button variant="outline" size="sm" className="flex flex-col items-center gap-0.5 h-auto py-2 px-3">
            <ArrowBigUp className="h-6 w-6" />
            <span className="text-sm font-medium">{launch.upvoteCount}</span>
          </Button>
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden border">
              <Image src={img.url} alt={img.alt || launch.title} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="whitespace-pre-wrap">{launch.description}</p>
      </div>

      {launch.isForSale && (
        <div className="rounded-lg border p-4 bg-muted/50">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Acquisition Details
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {launch.askingPrice && (
              <div>
                <span className="text-sm text-muted-foreground">Asking Price</span>
                <p className="text-xl font-bold">${launch.askingPrice.toLocaleString()}</p>
              </div>
            )}
            {launch.monthlyRecurringRevenue && (
              <div>
                <span className="text-sm text-muted-foreground">Monthly Recurring Revenue</span>
                <p className="text-xl font-bold">${launch.monthlyRecurringRevenue.toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {launch.websiteUrl && (
          <Button asChild>
            <a href={launch.websiteUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Website
            </a>
          </Button>
        )}
        {launch.demoUrl && (
          <Button variant="outline" asChild>
            <a href={launch.demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {launch.isForSale && (
          <Button variant="secondary" asChild>
            <Link href={`/messages?to=${maker?.id}`}>Contact Seller</Link>
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <Link href={`/profile/${maker?.id}`} className="flex items-center gap-3 hover:underline">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{maker?.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{maker?.name || "Anonymous"}</p>
            <p className="text-xs text-muted-foreground">Maker</p>
          </div>
        </Link>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {launch.createdAt?.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
