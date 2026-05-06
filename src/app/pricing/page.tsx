import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="container py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold">Simple pricing</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Start for free, upgrade when you&apos;re ready to scale
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Perfect for getting started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$0</div>
            <span className="text-sm text-muted-foreground">/month</span>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> 1 launch per month
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Community access
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Basic profile
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]">×</span>
                Marketplace listings
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]">×</span>
                Direct messaging
              </li>
            </ul>
            <Button className="w-full mt-6" variant="outline" asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary relative">
          <Badge className="absolute -top-2 left-6">Popular</Badge>
          <CardHeader>
            <CardTitle>Pro Monthly</CardTitle>
            <CardDescription>For serious builders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$19</div>
            <span className="text-sm text-muted-foreground">/month</span>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Unlimited launches
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Marketplace listings
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Direct messaging
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Analytics dashboard
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Priority support
              </li>
            </ul>
            <Button className="w-full mt-6" asChild>
              <Link href="/signup">
                Get started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pro Yearly</CardTitle>
            <CardDescription>Save 2 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$190</div>
            <span className="text-sm text-muted-foreground">/year</span>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Everything in Pro Monthly
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Featured placement
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" /> Priority support
              </li>
            </ul>
            <Button className="w-full mt-6" variant="outline" asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Payments powered by Stripe. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
