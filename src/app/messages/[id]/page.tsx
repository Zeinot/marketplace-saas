"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { getMessages, sendMessage, markConversationAsRead } from "@/lib/actions/message";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [messageContent, setMessageContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationId, setConversationId] = useState<number | null>(null);

  useEffect(() => {
    params.then((p) => setConversationId(Number(p.id)));
  }, [params]);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => (conversationId ? getMessages(conversationId) : []),
    enabled: !!conversationId && !!session?.user,
    refetchInterval: 3000,
  });

  // Mark as read when opened
  useEffect(() => {
    if (conversationId && session?.user) {
      markConversationAsRead(conversationId, session.user.id);
    }
  }, [conversationId, session?.user]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMutation = useMutation({
    mutationFn: async () => {
      if (!conversationId || !session?.user || !messageContent.trim()) return;
      await sendMessage(conversationId, session.user.id, messageContent.trim());
    },
    onSuccess: () => {
      setMessageContent("");
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      queryClient.invalidateQueries({ queryKey: ["conversations", session?.user?.id] });
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!messageContent.trim()) return;
    sendMutation.mutate();
  }

  if (!session?.user) {
    return (
      <div className="container py-20 text-center max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-1">Sign in required</h1>
        <p className="text-muted-foreground text-sm mb-5">Please sign in to view messages.</p>
        <Button asChild className="rounded-lg h-11">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    );
  }

  const otherUser = messages.find((m) => m.sender?.id !== session.user.id)?.sender;

  return (
    <div className="container py-4 md:py-8 max-w-2xl h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b">
        <Button variant="ghost" size="icon" className="rounded-lg" asChild>
          <Link href="/messages">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="text-sm bg-muted font-medium">
            {otherUser?.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold text-sm">{otherUser?.name || "Unknown"}</h1>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <div className="h-12 w-48 rounded-2xl bg-muted/50 animate-pulse" />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((item, index) => {
            const isMe = item.sender?.id === session.user.id;
            const showDate =
              index === 0 ||
              new Date(item.message.createdAt!).getDate() !==
                new Date(messages[index - 1].message.createdAt!).getDate();

            return (
              <div key={item.message.id}>
                {showDate && item.message.createdAt && (
                  <div className="flex justify-center my-4">
                    <span className="text-[10px] text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                      {new Date(item.message.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
                <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      isMe
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted rounded-bl-md"
                    }`}
                  >
                    <p>{item.message.content}</p>
                    <span
                      className={`text-[10px] mt-1 block ${
                        isMe ? "text-primary-foreground/60" : "text-muted-foreground"
                      }`}
                    >
                      {item.message.createdAt
                        ? formatDistanceToNow(new Date(item.message.createdAt), { addSuffix: false })
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="pt-4 border-t">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type a message..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            rows={1}
            className="rounded-xl resize-none min-h-[44px] max-h-[120px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={sendMutation.isPending || !messageContent.trim()}
            size="icon"
            className="rounded-xl h-11 w-11 shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
