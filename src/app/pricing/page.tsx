import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "/month",
    features: [
      "1 launch per month",
      "Community access",
      "Basic profile",
    ],
    excluded: [
      "Marketplace listings",
      "Direct messaging",
    ],
    cta: "Get started",
    href: "/signup",
    variant: "outline" as const,
    popular: false,
  },
  {
    name: "Pro Monthly",
    description: "For serious builders",
    price: "$19",
    period: "/month",
    features: [
      "Unlimited launches",
      "Marketplace listings",
      "Direct messaging",
      "Analytics dashboard",
      "Priority support",
    ],
    excluded: [],
    cta: "Get started",
    href: "/signup",
    variant: "default" as const,
    popular: true,
  },
  {
    name: "Pro Yearly",
    description: "Save 2 months",
    price: "$190",
    period: "/year",
    features: [
      "Everything in Pro Monthly",
      "Featured placement",
      "Priority support",
    ],
    excluded: [],
    cta: "Get started",
    href: "/signup",
    variant: "outline" as const,
    popular: false,
  },
];

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
        <Badge variant="secondary" className="mb-4 px-3 py-1 text-sm rounded-full">
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          Simple, transparent pricing
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Choose your plan</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          Start for free, upgrade when you&apos;re ready to scale
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`h-full relative ${
              plan.popular
                ? "border-primary shadow-lg shadow-primary/5"
                : "border-border/50"
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-2.5 left-6 px-2.5 py-0.5">
                <Zap className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-base">{plan.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" /> {f}
                  </li>
                ))}
                {plan.excluded.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="h-4 w-4 rounded-full border flex items-center justify-center text-[10px] shrink-0">×</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-8 rounded-lg"
                variant={plan.variant}
                asChild
              >
                <Link href={plan.href}>
                  {plan.cta}
                  {plan.popular && <ArrowRight className="ml-2 h-4 w-4" />}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

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
