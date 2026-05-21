"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PricingCards } from "@/components/pricing-cards";
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
  Sparkles,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
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
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />
        
        <div className="container relative pt-16 pb-24 md:pt-28 md:pb-32">
          <motion.div
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <Badge className="mb-6 px-3 py-1 text-sm rounded-full bg-primary/15 text-primary border-primary/20 hover:bg-primary/20">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Launch your SaaS today!
              </Badge>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              The community for{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                SaaS builders
              </span>
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Discover, launch, and sell SaaS products. Connect with indie hackers, get feedback, and grow your business.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button asChild size="lg" className="rounded-full px-8 h-12 text-base">
                <Link href="/feed">
                  Explore Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-background bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center text-[10px] font-medium text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>Trusted by 1,000+ makers</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container pb-24 md:pb-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything you need to grow</h2>
            <p className="text-muted-foreground mt-3 text-lg max-w-lg mx-auto">Tools and community for every stage of your journey</p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Rocket,
                title: "Launch",
                description: "Share your SaaS with a community that cares",
                color: "bg-blue-500/10 text-blue-600",
              },
              {
                icon: TrendingUp,
                title: "Upvote",
                description: "Get visibility through community upvotes",
                color: "bg-emerald-500/10 text-emerald-600",
              },
              {
                icon: MessageSquare,
                title: "Discuss",
                description: "Collect feedback and iterate faster",
                color: "bg-violet-500/10 text-violet-600",
              },
              {
                icon: DollarSign,
                title: "Sell",
                description: "List your SaaS on the marketplace",
                color: "bg-amber-500/10 text-amber-600",
              },
              {
                icon: Users,
                title: "Connect",
                description: "DM other makers and collaborate",
                color: "bg-rose-500/10 text-rose-600",
              },
              {
                icon: Zap,
                title: "Grow",
                description: "Analytics and featured placements",
                color: "bg-cyan-500/10 text-cyan-600",
              },
            ].map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50">
                  <CardHeader>
                    <div className={`w-11 h-11 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30">
        <div className="container py-24 md:py-32">
          <motion.div
            className="mx-auto max-w-4xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
              <p className="text-muted-foreground mt-3 text-lg">From idea to acquisition in three steps</p>
            </motion.div>
            {/* Steps — self-contained columns so zoom never breaks alignment */}
            <div className="grid gap-10 md:gap-6 md:grid-cols-3">
              {[
                { step: "01", title: "Create", desc: "Sign up and launch your product in minutes" },
                { step: "02", title: "Engage", desc: "Get upvotes, comments, and feedback" },
                { step: "03", title: "Scale", desc: "Upgrade to Pro for marketplace and DMs" },
              ].map((item, index, arr) => (
                <motion.div
                  key={item.step}
                  variants={fadeInUp}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Number badge */}
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-lg font-bold shrink-0 mb-5">
                    {item.step}
                  </div>
                  {/* Title + desc stay with the number */}
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">{item.desc}</p>
                  {/* Mobile vertical connector */}
                  {index < arr.length - 1 && (
                    <div className="md:hidden w-px h-8 bg-border mt-6" />
                  )}
                  {/* Desktop horizontal connector */}
                  {index < arr.length - 1 && (
                    <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple pricing</h2>
            <p className="text-muted-foreground mt-3 text-lg">Start free, upgrade when ready</p>
          </motion.div>
          <PricingCards />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container pb-24 md:pb-32">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-10 md:p-14">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to launch?</h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto text-lg leading-relaxed">
                Join the community of indie hackers and SaaS builders. Launch your product today.
              </p>
              <Button size="lg" variant="secondary" className="mt-8 rounded-full px-8 h-12 text-base" asChild>
                <Link href="/signup">
                  Create free account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
 
