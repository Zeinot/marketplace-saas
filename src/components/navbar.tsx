"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Rocket, MessageSquare, Bell, Menu, User, Settings, LogOut, TrendingUp, DollarSign, Zap, Package } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { getUnreadCount } from "@/lib/actions/notification";
import { getConversations } from "@/lib/actions/message";
import { useNotificationSound } from "@/components/notification-sound";

const navLinks = [
  { href: "/feed", label: "Feed" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { data: unreadNotifications = 0 } = useQuery({
    queryKey: ["unread-notifications", session?.user?.id],
    queryFn: () => (session?.user ? getUnreadCount(session.user.id) : 0),
    enabled: !!session?.user,
    refetchInterval: 5000,
  });

  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations", session?.user?.id],
    queryFn: () => (session?.user ? getConversations(session.user.id) : []),
    enabled: !!session?.user,
    refetchInterval: 5000,
  });

  const unreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const { playNotificationSound } = useNotificationSound();
  const prevUnreadRef = useRef({ notifications: 0, messages: 0 });

  // Play sound on new notifications/messages
  useEffect(() => {
    if (unreadNotifications > prevUnreadRef.current.notifications) {
      playNotificationSound();
    }
    if (unreadMessages > prevUnreadRef.current.messages) {
      playNotificationSound();
    }
    prevUnreadRef.current = { notifications: unreadNotifications, messages: unreadMessages };
  }, [unreadNotifications, unreadMessages, playNotificationSound]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight shrink-0">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Rocket className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline">SaaS Directory</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === link.href
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {session?.user ? (
            <>
              <Link href="/messages" className="hidden md:flex relative">
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <MessageSquare className="h-[18px] w-[18px]" />
                  {unreadMessages > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4.5 min-w-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center px-1">
                      {unreadMessages > 99 ? "99+" : unreadMessages}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/notifications" className="hidden md:flex relative">
                <Button variant="ghost" size="icon" className="rounded-lg">
                  <Bell className="h-[18px] w-[18px]" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4.5 min-w-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center px-1">
                      {unreadNotifications > 99 ? "99+" : unreadNotifications}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="rounded-full h-9 w-9 p-0 ml-1">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-primary text-primary-foreground font-medium">
                        {session.user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium truncate">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${session.user.id}`} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my-launches" className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      My Launches
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/messages" className="cursor-pointer">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/notifications" className="cursor-pointer">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut().then(() => window.location.href = "/")} className="text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-lg">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 px-0">
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <div className="flex flex-col h-full">
                {/* User header */}
                {session?.user ? (
                  <div className="px-5 py-5 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="text-sm bg-primary text-primary-foreground font-medium">
                          {session.user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-5 py-5 border-b">
                    <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
                      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                        <Rocket className="h-4 w-4 text-primary-foreground" />
                      </div>
                      SaaS Directory
                    </Link>
                  </div>
                )}

                <div className="flex-1 overflow-y-auto py-3">
                  {/* Main nav */}
                  <div className="px-3 space-y-0.5">
                    <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Menu</p>
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                            isActive
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          {link.href === "/feed" && <TrendingUp className="h-4 w-4 shrink-0" />}
                          {link.href === "/marketplace" && <DollarSign className="h-4 w-4 shrink-0" />}
                          {link.href === "/pricing" && <Zap className="h-4 w-4 shrink-0" />}
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>

                  {session?.user && (
                    <>
                      <div className="mx-5 my-3 h-px bg-border" />
                      <div className="px-3 space-y-0.5">
                        <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Account</p>
                        <Link
                          href={`/profile/${session.user.id}`}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                            pathname === `/profile/${session.user.id}`
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <User className="h-4 w-4 shrink-0" />
                          Profile
                        </Link>
                        <Link
                          href="/my-launches"
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                            pathname === "/my-launches"
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Package className="h-4 w-4 shrink-0" />
                          My Launches
                        </Link>
                        <Link
                          href="/messages"
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                            pathname === "/messages"
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <div className="relative">
                            <MessageSquare className="h-4 w-4 shrink-0" />
                            {unreadMessages > 0 && (
                              <span className="absolute -top-1.5 -right-1.5 h-3.5 min-w-[14px] rounded-full bg-primary text-primary-foreground text-[8px] font-semibold flex items-center justify-center px-1">
                                {unreadMessages > 99 ? "99+" : unreadMessages}
                              </span>
                            )}
                          </div>
                          Messages
                        </Link>
                        <Link
                          href="/notifications"
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                            pathname === "/notifications"
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <div className="relative">
                            <Bell className="h-4 w-4 shrink-0" />
                            {unreadNotifications > 0 && (
                              <span className="absolute -top-1.5 -right-1.5 h-3.5 min-w-[14px] rounded-full bg-primary text-primary-foreground text-[8px] font-semibold flex items-center justify-center px-1">
                                {unreadNotifications > 99 ? "99+" : unreadNotifications}
                              </span>
                            )}
                          </div>
                          Notifications
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                            pathname === "/settings"
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                        >
                          <Settings className="h-4 w-4 shrink-0" />
                          Settings
                        </Link>
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom actions */}
                <div className="px-5 py-4 border-t">
                  {session?.user ? (
                    <Button
                      onClick={() => { signOut().then(() => window.location.href = "/"); setOpen(false); }}
                      variant="outline"
                      className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button asChild variant="outline" className="w-full" onClick={() => setOpen(false)}>
                        <Link href="/login">Log in</Link>
                      </Button>
                      <Button asChild className="w-full" onClick={() => setOpen(false)}>
                        <Link href="/signup">Sign up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
