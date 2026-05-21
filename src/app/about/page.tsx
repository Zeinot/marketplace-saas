export const dynamic = "force-dynamic";

import Link from "next/link";
import { Rocket, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20 max-w-2xl">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
          <Rocket className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">About SaaS Directory</h1>
      </div>

      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
        <p>
          SaaS Directory is a community platform built for indie hackers, SaaS builders, and product enthusiasts.
          We believe great products deserve to be discovered.
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">What we do</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Help makers launch their products and get real feedback</li>
          <li>Let the community upvote, comment, and engage with new SaaS tools</li>
          <li>Provide a marketplace for buying and selling SaaS businesses</li>
          <li>Connect builders through direct messaging and discussions</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">Built for makers</h2>
        <p>
          Whether you are shipping your first side project or scaling a revenue-generating product,
          SaaS Directory gives you the visibility and tools to grow.
        </p>
      </div>
    </div>
  );
}
