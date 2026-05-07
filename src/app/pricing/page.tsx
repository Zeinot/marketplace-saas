import { Badge } from "@/components/ui/badge";
import { PricingCards } from "@/components/pricing-cards";
import { Sparkles, Shield } from "lucide-react";

const faqs = [
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes, you can change your plan at any time. Prorated charges apply.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "We offer a 14-day free trial for Pro Monthly. No credit card required.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards via Stripe.",
  },
];

export default function PricingPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <Badge className="mb-4 px-3 py-1 text-sm rounded-full bg-primary/15 text-primary border-primary/20 hover:bg-primary/20">
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          Simple, transparent pricing
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Choose your plan</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          Start for free, upgrade when you&apos;re ready to scale
        </p>
      </div>

      <PricingCards />

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground inline-flex items-center gap-1.5">
          <Shield className="h-3.5 w-3.5" />
          Payments powered by Stripe. Cancel anytime.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-24">
        <h2 className="text-2xl font-bold text-center mb-10">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-border/50 p-5">
              <h3 className="font-medium text-sm mb-1">{faq.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
