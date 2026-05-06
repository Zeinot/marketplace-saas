import Link from "next/link";
import { Rocket, ArrowRight, Zap, Users, Globe } from "lucide-react";

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left side - branding */}
        <div className="hidden lg:flex flex-col justify-between h-full min-h-[500px] rounded-2xl bg-primary p-10 text-primary-foreground relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
              <div className="h-8 w-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
                <Rocket className="h-4 w-4 text-primary-foreground" />
              </div>
              <span>SaaS Directory</span>
            </Link>
          </div>

          <div className="relative space-y-6">
            <h2 className="text-3xl font-bold tracking-tight leading-tight">{title}</h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">{subtitle}</p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Launch in minutes</p>
                  <p className="text-xs text-primary-foreground/70">Get your product in front of the community</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">1,000+ makers</p>
                  <p className="text-xs text-primary-foreground/70">Connect with indie hackers worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0">
                  <Globe className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Global reach</p>
                  <p className="text-xs text-primary-foreground/70">Sell your SaaS to buyers everywhere</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <p className="text-xs text-primary-foreground/60">© 2026 SaaS Directory. All rights reserved.</p>
          </div>
        </div>

        {/* Right side - form */}
        <div className="flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
