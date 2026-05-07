import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Zap } from "lucide-react";

export const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "$0",
    period: "/month",
    features: ["1 launch per month", "Community access", "Basic profile"],
    excluded: ["Marketplace listings", "Direct messaging"],
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
    features: ["Unlimited launches", "Marketplace listings", "Direct messaging", "Analytics dashboard", "Priority support"],
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
    features: ["Everything in Pro Monthly", "Featured placement", "Priority support"],
    excluded: [],
    cta: "Get started",
    href: "/signup",
    variant: "outline" as const,
    popular: false,
  },
];

export function PricingCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`h-full relative ${
            plan.popular
              ? "border-primary shadow-lg shadow-primary/5 overflow-visible"
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
          <CardContent className="flex flex-col flex-1">
            <div className="flex-1">
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
            </div>
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
  );
}
