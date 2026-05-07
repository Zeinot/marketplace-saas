"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { getOrCreateConversation } from "@/lib/actions/message";
import { toast } from "sonner";
import { MessageSquare, Loader2 } from "lucide-react";

interface MessageButtonProps {
  userId: string;
  variant?: "compact" | "full" | "outline";
  label?: string;
  className?: string;
}

export function MessageButton({ userId, variant = "compact", label = "Message", className }: MessageButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!session?.user) {
      toast.error("Sign in to send messages");
      return;
    }

    if (session.user.id === userId) {
      toast.error("You can't message yourself");
      return;
    }

    setLoading(true);
    try {
      const conversationId = await getOrCreateConversation(session.user.id, userId);
      router.push(`/messages/${conversationId}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to start conversation");
      setLoading(false);
    }
  }

  if (variant === "compact") {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={`h-7 w-7 p-0 text-muted-foreground hover:text-foreground ${className || ""}`}
        onClick={handleClick}
        disabled={loading}
        title="Send message"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MessageSquare className="h-3.5 w-3.5" />}
      </Button>
    );
  }

  if (variant === "outline") {
    return (
      <Button
        variant="outline"
        size="sm"
        className={`rounded-lg gap-1.5 ${className || ""}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <MessageSquare className="h-4 w-4" />
        )}
        {label}
      </Button>
    );
  }

  return (
    <Button
      className={`rounded-lg gap-1.5 ${className || ""}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <MessageSquare className="h-4 w-4" />
      )}
      {label}
    </Button>
  );
}
