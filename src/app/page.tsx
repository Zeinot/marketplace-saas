"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Rocket,
  MessageSquare,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Check,
  Users,
  Zap,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container relative pt-20 md:pt-32">
          <motion.div
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6">
                Launch your SaaS today
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-5xl font-bold tracking-tight sm:text-7xl"
            >
              The community for{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SaaS builders
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed"
            >
              Discover, launch, and sell SaaS products. Connect with indie hackers, get feedback, and grow your business.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 flex gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/feed">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                  />
                ))}
              </div>
              <span>Join 1,000+ makers</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold">Everything you need to grow</h2>
            <p className="text-muted-foreground mt-2">Tools and community for every stage of your journey</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Rocket,
                title: "Launch",
                description: "Share your SaaS with a community that cares",
              },
              {
                icon: TrendingUp,
                title: "Upvote",
                description: "Get visibility through community upvotes",
              },
              {
                icon: MessageSquare,
                title: "Discuss",
                description: "Collect feedback and iterate faster",
              },
              {
                icon: DollarSign,
                title: "Sell",
                description: "List your SaaS on the marketplace",
              },
              {
                icon: Users,
                title: "Connect",
                description: "DM other makers and collaborate",
              },
              {
                icon: Zap,
                title: "Grow",
                description: "Analytics and featured placements",
              },
            ].map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="container">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold">How it works</h2>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Create", desc: "Sign up and launch your product in minutes" },
              { step: "02", title: "Engage", desc: "Get upvotes, comments, and feedback" },
              { step: "03", title: "Scale", desc: "Upgrade to Pro for marketplace and DMs" },
            ].map((item) => (
              <motion.div key={item.step} variants={fadeInUp} className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing */}
      <section className="container">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold">Simple pricing</h2>
            <p className="text-muted-foreground mt-2">Start free, upgrade when ready</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$0</div>
                  <ul className="mt-4 space-y-2">
                    {["1 launch per month", "Community access", "Basic profile"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="outline" asChild>
                    <Link href="/signup">Get started</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full border-primary relative">
                <Badge className="absolute -top-2 left-6">Popular</Badge>
                <CardHeader>
                  <CardTitle>Pro Monthly</CardTitle>
                  <CardDescription>For serious builders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$19</div>
                  <span className="text-sm text-muted-foreground">/month</span>
                  <ul className="mt-4 space-y-2">
                    {["Unlimited launches", "Marketplace listings", "Direct messaging", "Analytics dashboard"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link href="/signup">Get started</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Pro Yearly</CardTitle>
                  <CardDescription>Save 2 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$190</div>
                  <span className="text-sm text-muted-foreground">/year</span>
                  <ul className="mt-4 space-y-2">
                    {["Everything in Pro Monthly", "Featured placement", "Priority support"].map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="outline" asChild>
                    <Link href="/signup">Get started</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-12 pb-12 px-8">
              <h2 className="text-3xl font-bold">Ready to launch?</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
                Join the community of indie hackers and SaaS builders. Launch your product today.
              </p>
              <Button size="lg" variant="secondary" className="mt-8 rounded-full px-8" asChild>
                <Link href="/signup">
                  Create free account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
