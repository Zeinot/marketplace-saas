"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Crown } from "lucide-react";
import { toast } from "sonner";

export function DevSubscriptionWidget() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!session?.user) return null;

  const userId = session.user.id;

  async function grantPro() {
    setLoading(true);
    try {
      const res = await fetch("/api/dev/grant-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
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
      setLoading(false);
    }
  }

  async function revokePro() {
    setLoading(true);
    try {
      const res = await fetch("/api/dev/revoke-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
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
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg"
          variant="outline"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Dev Subscription Tools
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            You are logged in as: <strong>{session.user.email}</strong>
          </p>
          <div className="flex gap-2">
            <Button onClick={grantPro} disabled={loading} className="flex-1">
              Grant Pro
            </Button>
            <Button onClick={revokePro} disabled={loading} variant="destructive" className="flex-1">
              Revoke Pro
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
