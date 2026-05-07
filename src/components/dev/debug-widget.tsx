"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Bug,
  UserPlus,
  Crown,
  Copy,
  Check,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";

export function DevDebugWidget() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [seededUser, setSeededUser] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  async function seedUser() {
    setLoading("seed");
    try {
      const res = await fetch("/api/dev/seed-user", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSeededUser({ email: data.email, password: data.password });
        toast.success("Dev user created!");
      } else {
        toast.error(data.error || "Failed to seed user");
      }
    } catch {
      toast.error("Error seeding user");
    } finally {
      setLoading(null);
    }
  }

  async function grantPro() {
    if (!session?.user) {
      toast.error("Log in first to grant pro");
      return;
    }
    setLoading("grant");
    try {
      const res = await fetch("/api/dev/grant-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Pro granted! Refresh to see changes.");
      } else {
        toast.error(data.error || "Failed to grant Pro");
      }
    } catch {
      toast.error("Error granting Pro");
    } finally {
      setLoading(null);
    }
  }

  async function revokePro() {
    if (!session?.user) {
      toast.error("Log in first to revoke pro");
      return;
    }
    setLoading("revoke");
    try {
      const res = await fetch("/api/dev/revoke-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Pro revoked. Refresh to see changes.");
      } else {
        toast.error(data.error || "Failed to revoke Pro");
      }
    } catch {
      toast.error("Error revoking Pro");
    } finally {
      setLoading(null);
    }
  }

  function copyCredentials() {
    if (!seededUser) return;
    navigator.clipboard.writeText(
      `Email: ${seededUser.email}\nPassword: ${seededUser.password}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard!");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-14 right-6 z-50 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90"
        >
          <Bug className="h-6 w-6 text-primary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-primary" />
            Dev Tools
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Current User */}
          {session?.user ? (
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Logged in as</span>
              </div>
              <p className="text-sm text-muted-foreground">{session.user.email}</p>
              <div className="flex gap-2">
                <Button
                  onClick={grantPro}
                  disabled={!!loading}
                  className="flex-1"
                  variant="default"
                >
                  {loading === "grant" ? (
                    <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Crown className="h-4 w-4 mr-2" />
                  )}
                  Grant Pro
                </Button>
                <Button
                  onClick={revokePro}
                  disabled={!!loading}
                  className="flex-1"
                  variant="destructive"
                >
                  {loading === "revoke" ? (
                    <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Crown className="h-4 w-4 mr-2" />
                  )}
                  Revoke Pro
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border p-4 text-center text-sm text-muted-foreground">
              Not logged in
            </div>
          )}

          {/* Seed User */}
          <div className="rounded-lg border p-4 space-y-3">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Seed Dev User
            </h3>
            <Button
              onClick={seedUser}
              disabled={!!loading}
              className="w-full"
              variant="outline"
            >
              {loading === "seed" ? (
                <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <UserPlus className="h-4 w-4 mr-2" />
              )}
              Create Dev Account
            </Button>

            {seededUser && (
              <div className="space-y-2 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">Email</Label>
                  <div className="flex gap-2">
                    <Input value={seededUser.email} readOnly className="text-sm" />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(seededUser.email);
                        toast.success("Email copied!");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Password</Label>
                  <div className="flex gap-2">
                    <Input
                      value={seededUser.password}
                      readOnly
                      type="text"
                      className="text-sm font-mono"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={copyCredentials}
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
