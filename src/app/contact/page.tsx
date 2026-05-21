"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Message sent! We will get back to you soon.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="container py-12 md:py-20 max-w-xl">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-2">Contact us</h1>
      <p className="text-muted-foreground mb-8">Have a question or feedback? We would love to hear from you.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" required className="h-11 rounded-lg" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required className="h-11 rounded-lg" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="How can we help?" rows={5} required className="rounded-xl resize-none" />
        </div>
        <Button type="submit" disabled={loading} className="rounded-lg h-11">
          <Send className="mr-2 h-4 w-4" />
          {loading ? "Sending..." : "Send message"}
        </Button>
      </form>

      <div className="mt-10 pt-8 border-t">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Or reach us at <a href="mailto:hello@saasdirectory.dev" className="text-foreground hover:underline">hello@saasdirectory.dev</a>
        </p>
      </div>
    </div>
  );
}
