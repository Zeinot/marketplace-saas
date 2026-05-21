export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-20 max-w-2xl">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-6">Privacy Policy</h1>

      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
        <p>
          We take your privacy seriously. This policy explains what data we collect and how we use it.
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">What we collect</h2>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Account information: name, email, and profile details you provide</li>
          <li>Usage data: interactions with launches, posts, and the marketplace</li>
          <li>Device and browser information for security and analytics</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">How we use it</h2>
        <p>
          We use your data to operate the platform, personalize your experience, send notifications you opt into,
          and improve our services. We do not sell your personal data.
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">Cookies</h2>
        <p>
          We use cookies to keep you signed in and remember your preferences. You can disable cookies in your browser,
          but some features may not work properly.
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">Your rights</h2>
        <p>
          You can request deletion of your account and associated data at any time by contacting us.
        </p>
      </div>
    </div>
  );
}
