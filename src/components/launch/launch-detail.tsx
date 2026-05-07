import { Badge } from "@/components/ui/badge";
import { DollarSign } from "lucide-react";
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

export function LaunchDetail({ launch, categories, images }: LaunchDetailProps) {
  return (
    <article className="space-y-8">
      {/* Header */}
      <header>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant="secondary"
              className="text-xs font-medium rounded-md px-2.5 py-0.5"
              style={{ backgroundColor: cat.color + "18", color: cat.color }}
            >
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
        <p className="text-lg text-muted-foreground mt-3 leading-relaxed">{launch.tagline}</p>
      </header>

      {/* Images */}
      {images.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {images.map((img) => (
            <div key={img.id} className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 bg-muted">
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
        <div className="rounded-2xl border border-border/50 p-6 bg-gradient-to-br from-emerald-500/5 to-transparent">
          <h3 className="font-semibold mb-5 flex items-center gap-2 text-base">
            <DollarSign className="h-4 w-4 text-emerald-600" />
            Acquisition Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {launch.askingPrice !== null && (
              <div className="rounded-xl bg-background border border-border/50 p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Asking Price</span>
                <p className="text-2xl font-bold text-emerald-600 mt-1">${launch.askingPrice.toLocaleString()}</p>
              </div>
            )}
            {launch.monthlyRecurringRevenue !== null && (
              <div className="rounded-xl bg-background border border-border/50 p-4">
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">MRR</span>
                <p className="text-2xl font-bold mt-1">${launch.monthlyRecurringRevenue.toLocaleString()}</p>
              </div>
            )}
            <div className="rounded-xl bg-background border border-border/50 p-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Status</span>
              <p className="text-sm font-medium mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Available
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
