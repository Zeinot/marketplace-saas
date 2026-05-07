import Link from "next/link";
import { Rocket } from "lucide-react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Rocket className="h-4 w-4 text-primary-foreground" />
              </div>
              SaaS Directory
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Discover, launch, and sell SaaS products. The community for indie hackers and SaaS builders.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Product</h4>
            <ul className="space-y-2">
              {[
                { label: "Feed", href: "/feed" },
                { label: "Marketplace", href: "/marketplace" },
                { label: "Pricing", href: "/pricing" },
                { label: "Launch", href: "/new" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/" },
                { label: "Terms", href: "/" },
                { label: "Privacy", href: "/" },
                { label: "Contact", href: "/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SaaS Directory. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              <FaXTwitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
