export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-20 max-w-2xl">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to home
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-6">Terms of Service</h1>

      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4">
        <p>
          By using SaaS Directory, you agree to these terms. If you do not agree, please do not use the platform.
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">Your account</h2>
        <p>
          You are responsible for maintaining the security of your account. Do not share your login credentials.
          We reserve the right to suspend accounts that violate these terms.
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">Content</h2>
        <p>
          You retain ownership of the content you post. By posting, you grant us a license to display it on the platform.
          Do not post illegal, harmful, or misleading content.
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">Marketplace</h2>
        <p>
          Listings must be accurate. We are not a party to transactions between buyers and sellers.
          Use due diligence before making any purchase.
        </p>

        <h2 className="text-lg font-semibold text-foreground mt-8 mb-2">Changes</h2>
        <p>
          We may update these terms at any time. Continued use of the platform after changes constitutes acceptance.
        </p>
      </div>
    </div>
  );
}
