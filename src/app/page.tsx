import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, MessageSquare, TrendingUp, DollarSign, ArrowRight, Check } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero */}
      <section className="container pt-16 md:pt-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="secondary" className="mb-4">
            Launch your SaaS today
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            The community for{" "}
            <span className="text-primary">SaaS builders</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Discover, launch, and sell SaaS products. Connect with indie hackers, get feedback, and grow your business.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg">
              <Link href="/feed">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to grow</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Rocket className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Launch</CardTitle>
                <CardDescription>Share your SaaS with a community that cares</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Upvote</CardTitle>
                <CardDescription>Get visibility through community upvotes</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Discuss</CardTitle>
                <CardDescription>Collect feedback and iterate faster</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Sell</CardTitle>
                <CardDescription>List your SaaS on the marketplace</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Connect</CardTitle>
                <CardDescription>DM other makers and collaborate</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Grow</CardTitle>
                <CardDescription>Analytics and featured placements</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="container">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Simple pricing</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$0</div>
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
                </ul>
                <Button className="w-full mt-6" variant="outline" asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardHeader>
                <Badge className="w-fit mb-2">Popular</Badge>
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
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/signup">Get started</Link>
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
        </div>
      </section>
    </div>
  );
}
