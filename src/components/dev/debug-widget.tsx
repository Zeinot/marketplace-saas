"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "@/lib/auth-client";
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
  LogIn,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface SeededUser {
  email: string;
  password: string;
  userId: string;
  createdAt: string;
}

const STORAGE_KEY = "dev-seeded-users";

export function DevDebugWidget() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [seededUsers, setSeededUsers] = useState<SeededUser[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSeededUsers(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seededUsers));
  }, [seededUsers]);

  async function seedUser() {
    setLoading("seed");
    try {
      const res = await fetch("/api/dev/seed-user", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        const newUser: SeededUser = {
          email: data.email,
          password: data.password,
          userId: data.userId,
          createdAt: new Date().toISOString(),
        };
        setSeededUsers((prev) => [...prev, newUser]);
        toast.success(`Dev user ${data.email} created!`);
      } else {
        toast.error(data.error || "Failed to seed user");
      }
    } catch {
      toast.error("Error seeding user");
    } finally {
      setLoading(null);
    }
  }

  async function autoLogin(email: string, password: string) {
    setLoading(`login-${email}`);
    try {
      await signOut();
      const result = await signIn.email({
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error.message || "Login failed");
      } else {
        toast.success(`Logged in as ${email}`);
        window.location.reload();
      }
    } catch {
      toast.error("Auto-login failed");
    } finally {
      setLoading(null);
    }
  }

  async function grantProToUser(userId: string, email: string) {
    setLoading(`grant-${userId}`);
    try {
      const res = await fetch("/api/dev/grant-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Pro granted to ${email}!`);
      } else {
        toast.error(data.error || "Failed to grant Pro");
      }
    } catch {
      toast.error("Error granting Pro");
    } finally {
      setLoading(null);
    }
  }

  async function revokeProFromUser(userId: string, email: string) {
    setLoading(`revoke-${userId}`);
    try {
      const res = await fetch("/api/dev/revoke-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Pro revoked from ${email}`);
      } else {
        toast.error(data.error || "Failed to revoke Pro");
      }
    } catch {
      toast.error("Error revoking Pro");
    } finally {
      setLoading(null);
    }
  }

  function removeUser(index: number) {
    setSeededUsers((prev) => prev.filter((_, i) => i !== index));
    toast.success("Removed from list");
  }

  function copy(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Copied!");
  }

  function clearAll() {
    setSeededUsers([]);
    toast.success("Cleared all seeded users");
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-xl bg-primary hover:bg-primary/90"
        >
          <Bug className="h-5 w-5 text-primary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bug className="h-5 w-5 text-primary" />
            Dev Tools
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-5 px-4">
          {/* Current User */}
          {session?.user ? (
            <div className="rounded-xl border border-border/50 p-4 space-y-3 bg-card">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => session.user.id && grantProToUser(session.user.id, session.user.email || "")}
                  disabled={!!loading}
                  className="flex-1 rounded-lg"
                  variant="default"
                  size="sm"
                >
                  {loading === `grant-${session.user.id}` ? (
                    <RefreshCcw className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  ) : (
                    <Crown className="h-3.5 w-3.5 mr-1.5" />
                  )}
                  Grant Pro
                </Button>
                <Button
                  onClick={() => session.user.id && revokeProFromUser(session.user.id, session.user.email || "")}
                  disabled={!!loading}
                  className="flex-1 rounded-lg"
                  variant="destructive"
                  size="sm"
                >
                  {loading === `revoke-${session.user.id}` ? (
                    <RefreshCcw className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  ) : (
                    <Crown className="h-3.5 w-3.5 mr-1.5" />
                  )}
                  Revoke Pro
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border/50 p-4 text-center text-sm text-muted-foreground bg-card">
              Not logged in
            </div>
          )}

          {/* Seed Users */}
          <div className="rounded-xl border border-border/50 p-4 space-y-3 bg-card">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-primary" />
                Seeded Accounts ({seededUsers.length})
              </h3>
              {seededUsers.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-destructive"
                  onClick={clearAll}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear
                </Button>
              )}
            </div>
            <Button
              onClick={seedUser}
              disabled={!!loading}
              className="w-full rounded-lg"
              variant="outline"
              size="sm"
            >
              {loading === "seed" ? (
                <RefreshCcw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <UserPlus className="h-4 w-4 mr-2" />
              )}
              Create Dev Account
            </Button>

            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {seededUsers.map((user, index) => (
                <div
                  key={user.email}
                  className="rounded-lg border border-border/50 p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium truncate">{user.email}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeUser(index)}
                    >
                      <Trash2 className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Input
                        value={user.password}
                        readOnly
                        type="text"
                        className="h-7 text-xs font-mono bg-muted/50 border-0"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="shrink-0 h-7 w-7 rounded-lg"
                        onClick={() => copy(user.password, `pass-${user.email}`)}
                      >
                        {copiedId === `pass-${user.email}` ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1 h-7 text-xs rounded-md"
                      onClick={() => autoLogin(user.email, user.password)}
                      disabled={!!loading && loading.startsWith("login-")}
                    >
                      {loading === `login-${user.email}` ? (
                        <RefreshCcw className="h-3 w-3 animate-spin mr-1" />
                      ) : (
                        <LogIn className="h-3 w-3 mr-1" />
                      )}
                      Login
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-7 text-xs rounded-md"
                      onClick={() => grantProToUser(user.userId, user.email)}
                      disabled={!!loading}
                    >
                      {loading === `grant-${user.userId}` ? (
                        <RefreshCcw className="h-3 w-3 animate-spin mr-1" />
                      ) : (
                        <Crown className="h-3 w-3 mr-1" />
                      )}
                      Pro
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
