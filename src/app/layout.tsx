import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";
import { DevSubscriptionWidget } from "@/components/dev/subscription-grant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaaS Directory — Launch & Sell Your SaaS",
  description: "Discover, launch, and sell SaaS products. The community for indie hackers and SaaS builders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        <QueryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Toaster />
          {process.env.NODE_ENV === "development" && <DevSubscriptionWidget />}
        </QueryProvider>
      </body>
    </html>
  );
}
