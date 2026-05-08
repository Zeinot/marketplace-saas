"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client";
import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ArrowLeft, Send, MoreVertical, Pencil, Trash2, ChevronDown, Loader2 } from "lucide-react";
import {
  getMessagePage,
  sendMessage,
  markConversationAsRead,
  editMessage,
  deleteMessage,
  getConversations,
} from "@/lib/actions/message";
import { toast } from "sonner";
import { formatDistanceToNow, format } from "date-fns";
import { cn } from "@/lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session, isPending: sessionLoading } = useSession();
  const queryClient = useQueryClient();
  const [messageContent, setMessageContent] = useState("");
  const [conversationId, setConversationId] = useState<number | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  // Tracks whether the user is near the bottom. Using a ref (not state) so the
  // auto-scroll effect always reads the current value, never a stale render snapshot.
  const isAtBottomRef = useRef(true);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);
  const [menuOpenMessageId, setMenuOpenMessageId] = useState<number | null>(null);
  const lastMessageIdRef = useRef<number | null>(null);
  const justSentMessageRef = useRef(false);
  const isUserScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const initialScrollDoneRef = useRef(false);
  // True only after initial scroll-to-bottom; gates the IntersectionObserver
  const [observerEnabled, setObserverEnabled] = useState(false);
  const isFetchingOlderRef = useRef(false);

  useEffect(() => {
    params.then((p) => {
      setConversationId(Number(p.id));
      // Reset per-conversation state when switching conversations
      initialScrollDoneRef.current = false;
      setObserverEnabled(false);
    });
  }, [params]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const {
    data,
    isLoading: messagesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["messages", conversationId],
    queryFn: ({ pageParam }) =>
      conversationId
        ? getMessagePage(conversationId, pageParam as number | undefined, 30)
        : { messages: [], nextCursor: null },
    // pages[0] = newest batch; getNextPageParam receives the LAST page added,
    // which grows toward older messages as user scrolls up.
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as number | undefined,
    enabled: !!conversationId && !!session?.user,
    refetchInterval: 3000,
    refetchIntervalInBackground: false,
  });

  // Pages are appended newest→oldest as user scrolls up.
  // Reverse so flatMap produces chronological (oldest→newest) order.
  const messages = data
    ? [...data.pages].reverse().flatMap((p) => p.messages)
    : [];

  const { data: conversations = [] } = useQuery({
    queryKey: ["conversations", session?.user?.id],
    queryFn: () => (session?.user ? getConversations(session.user.id) : []),
    enabled: !!session?.user,
    refetchInterval: 3000,
  });

  // Mark as read when opened
  useEffect(() => {
    if (conversationId && session?.user) {
      markConversationAsRead(conversationId, session.user.id);
    }
  }, [conversationId, session?.user]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior });
  }, []);

  // On first page load: scroll to bottom instantly, then enable the sentinel observer.
  // Using rAF ensures the DOM has painted before we read scrollHeight and enable the observer.
  useEffect(() => {
    if (messages.length > 0 && !initialScrollDoneRef.current) {
      initialScrollDoneRef.current = true;
      requestAnimationFrame(() => {
        scrollToBottom("instant");
        // Another rAF so the observer only starts after the scroll has settled
        requestAnimationFrame(() => {
          setObserverEnabled(true);
        });
      });
    }
  }, [messages, scrollToBottom]);

  // Restore scroll position after older messages are prepended (prevent viewport jump)
  useEffect(() => {
    if (isFetchingOlderRef.current && !isFetchingNextPage) {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight - prevScrollHeightRef.current;
      }
      isFetchingOlderRef.current = false;
    }
  }, [isFetchingNextPage]);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    isUserScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 150);

    const threshold = 100;
    const isBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
    isAtBottomRef.current = isBottom;
    if (isBottom) setHasNewMessages(false);
  }, []);

  // Auto-scroll when new messages arrive at the bottom (polling / send)
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    const lastId = lastMessage?.message?.id ?? null;
    const isNewMessage = lastId !== null && lastId !== lastMessageIdRef.current;
    const userJustSent = justSentMessageRef.current;

    lastMessageIdRef.current = lastId;
    if (userJustSent) justSentMessageRef.current = false;

    // Only auto-scroll for new bottom messages, not when prepending older ones.
    // Use the ref (not state) so we read the current scroll position even if
    // the React state update from the scroll event hasn't flushed yet.
    if (isNewMessage && !isFetchingOlderRef.current) {
      if (isAtBottomRef.current || userJustSent) {
        scrollToBottom("smooth");
      } else {
        setHasNewMessages(true);
      }
    }
  }, [messages, scrollToBottom]);

  // IntersectionObserver — watches the top sentinel to load older messages.
  // Only active after the initial scroll-to-bottom has completed.
  useEffect(() => {
    if (!observerEnabled) return;
    const sentinel = topSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          const container = messagesContainerRef.current;
          if (container) prevScrollHeightRef.current = container.scrollHeight;
          isFetchingOlderRef.current = true;
          fetchNextPage();
        }
      },
      { root: messagesContainerRef.current, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [observerEnabled, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const sendMutation = useMutation({
    mutationFn: async () => {
      if (!conversationId || !session?.user || !messageContent.trim()) return;
      await sendMessage(conversationId, session.user.id, messageContent.trim());
    },
    onSuccess: () => {
      setMessageContent("");
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      queryClient.invalidateQueries({ queryKey: ["conversations", session?.user?.id] });
      isAtBottomRef.current = true;
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });

  const editMutation = useMutation({
    mutationFn: async () => {
      if (!editingMessageId || !session?.user || !editContent.trim()) return;
      return editMessage(editingMessageId, session.user.id, editContent.trim());
    },
    onSuccess: (updatedMessage) => {
      setEditingMessageId(null);
      setEditContent("");
      if (!updatedMessage) return;
      // Patch the cache directly instead of invalidating — avoids a full refetch
      // that would reset the infinite query page count and disrupt scroll position.
      queryClient.setQueryData(
        ["messages", conversationId],
        (old: { pages: Array<{ messages: Array<{ message: typeof updatedMessage; sender: { id: string; name: string | null } | null }> }> } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              messages: page.messages.map((m) =>
                m.message.id === updatedMessage.id
                  ? { ...m, message: updatedMessage }
                  : m
              ),
            })),
          };
        }
      );
    },
    onError: () => {
      toast.error("Failed to edit message");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (!messageToDelete || !session?.user) return;
      await deleteMessage(messageToDelete, session.user.id);
    },
    onSuccess: () => {
      setShowDeleteDialog(false);
      setMessageToDelete(null);
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
    },
    onError: () => {
      toast.error("Failed to delete message");
    },
  });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!messageContent.trim()) return;
    justSentMessageRef.current = true;
    sendMutation.mutate();
  }

  function startEdit(msg: { id: number; content: string }) {
    setEditingMessageId(msg.id);
    setEditContent(msg.content);
    setMenuOpenMessageId(null);
  }

  function startDelete(messageId: number) {
    setMessageToDelete(messageId);
    setShowDeleteDialog(true);
    setMenuOpenMessageId(null);
  }

  if (sessionLoading) {
    return (
      <div className="h-full flex">
        <div className="hidden lg:flex w-80 border-r flex-col bg-muted/30 p-4 gap-3">
          <Skeleton className="h-6 w-24" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col p-4 gap-3">
          <Skeleton className="h-9 w-40" />
          <div className="flex-1 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
                <Skeleton className="h-12 w-48 rounded-2xl" />
              </div>
            ))}
          </div>
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    );
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
  const activeConversation = conversations.find((c) => c.id === conversationId);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:flex w-80 border-r flex-col bg-muted/30">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No conversations yet
            </div>
          ) : (
            conversations.map((conv) => (
              <Link
                key={conv.id}
                href={`/messages/${conv.id}`}
                className={cn(
                  "flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b",
                  conv.id === conversationId
                    ? "bg-muted/50 border-l-2 border-l-primary"
                    : "border-l-2 border-l-transparent"
                )}
              >
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="text-sm bg-muted font-medium">
                    {conv.otherUser?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm truncate">
                      {conv.otherUser?.name || "Unknown"}
                    </span>
                    {conv.lastMessage?.createdAt && (
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conv.lastMessage.createdAt), {
                          addSuffix: false,
                        })}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage?.content || "No messages yet"}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="shrink-0 h-5 min-w-[20px] rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center px-1.5">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b shrink-0">
          <Button variant="ghost" size="icon" className="rounded-lg lg:hidden" asChild>
            <Link href="/messages">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-sm bg-muted font-medium">
              {otherUser?.name?.charAt(0).toUpperCase() ||
                activeConversation?.otherUser?.name?.charAt(0).toUpperCase() ||
                "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-sm">
              {otherUser?.name || activeConversation?.otherUser?.name || "Unknown"}
            </h1>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>

        {/* Messages — this div must be the scrollable container */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4"
          onScroll={handleScroll}
        >
          {/* Top sentinel — observed to trigger loading older messages */}
          <div ref={topSentinelRef} className="h-px" />

          {/* Older-messages loading spinner */}
          {isFetchingNextPage && (
            <div className="flex justify-center py-3">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Start of history */}
          {!hasNextPage && messages.length > 0 && (
            <div className="flex justify-center py-3">
              <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full">
                Beginning of conversation
              </span>
            </div>
          )}

          {messagesLoading ? (
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
            <div className="space-y-1">
              {messages.map((item, index) => {
                const isMe = item.sender?.id === session.user.id;
                const isDeleted = item.message.isDeleted;

                const prevMessage = messages[index - 1];
                const isGrouped =
                  prevMessage &&
                  prevMessage.sender?.id === item.sender?.id &&
                  prevMessage.message.createdAt &&
                  item.message.createdAt &&
                  new Date(item.message.createdAt).getTime() -
                    new Date(prevMessage.message.createdAt).getTime() <
                    120000;

                const showDate =
                  index === 0 ||
                  (prevMessage?.message.createdAt &&
                    item.message.createdAt &&
                    new Date(prevMessage.message.createdAt).toDateString() !==
                      new Date(item.message.createdAt).toDateString());

                return (
                  <div key={item.message.id}>
                    {showDate && item.message.createdAt && (
                      <div className="flex justify-center my-4">
                        <span className="text-[10px] text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {format(new Date(item.message.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                    )}

                    <div className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
                      <div className="relative max-w-[75%]">
                        <div
                          className={cn(
                            "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                            isDeleted
                              ? "bg-muted/50 text-muted-foreground italic"
                              : isMe
                              ? "bg-primary text-primary-foreground rounded-br-md"
                              : "bg-muted rounded-bl-md",
                            isGrouped && isMe ? "rounded-tr-md" : "",
                            isGrouped && !isMe ? "rounded-tl-md" : ""
                          )}
                        >
                          {editingMessageId === item.message.id ? (
                            <div className="space-y-3 w-full min-w-[240px]">
                              <Textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    if (editContent.trim()) {
                                      editMutation.mutate();
                                    }
                                  }
                                  if (e.key === "Escape") {
                                    setEditingMessageId(null);
                                    setEditContent("");
                                  }
                                }}
                                className="min-h-[80px] resize-none text-sm bg-white dark:bg-zinc-950 text-foreground border-border focus:ring-2 focus:ring-primary/20"
                                autoFocus
                                placeholder="Edit your message..."
                              />
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-muted-foreground">
                                  Press Enter to save, Escape to cancel
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 px-3 text-xs"
                                    onClick={() => {
                                      setEditingMessageId(null);
                                      setEditContent("");
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="h-8 px-3 text-xs"
                                    onClick={() => editMutation.mutate()}
                                    disabled={!editContent.trim()}
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p>{item.message.content}</p>
                              <span
                                className={cn(
                                  "text-[10px] mt-1 block text-right",
                                  isMe ? "text-primary-foreground/60" : "text-muted-foreground"
                                )}
                              >
                                {item.message.createdAt &&
                                  format(new Date(item.message.createdAt), "h:mm a")}
                                {item.message.updatedAt &&
                                  item.message.createdAt &&
                                  new Date(item.message.updatedAt).getTime() !==
                                    new Date(item.message.createdAt).getTime() &&
                                  !isDeleted && <span className="ml-1">(edited)</span>}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Message actions menu */}
                        {isMe && !isDeleted && editingMessageId !== item.message.id && (
                          <div className="absolute -top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full bg-background shadow-sm"
                              onClick={() =>
                                setMenuOpenMessageId(
                                  menuOpenMessageId === item.message.id ? null : item.message.id
                                )
                              }
                            >
                              <MoreVertical className="h-3 w-3" />
                            </Button>

                            {menuOpenMessageId === item.message.id && (
                              <div className="absolute right-0 top-7 bg-background border rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                                <button
                                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted flex items-center gap-2"
                                  onClick={() =>
                                    startEdit({
                                      id: item.message.id,
                                      content: item.message.content,
                                    })
                                  }
                                >
                                  <Pencil className="h-3 w-3" /> Edit
                                </button>
                                <button
                                  className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted text-destructive flex items-center gap-2"
                                  onClick={() => startDelete(item.message.id)}
                                >
                                  <Trash2 className="h-3 w-3" /> Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* New messages indicator */}
        {hasNewMessages && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full shadow-lg gap-1"
              onClick={() => {
                scrollToBottom("smooth");
                setHasNewMessages(false);
                isAtBottomRef.current = true;
              }}
            >
              <ChevronDown className="h-4 w-4" />
              New messages
            </Button>
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t bg-background shrink-0">
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

      {/* Delete confirmation */}
      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => deleteMutation.mutate()}
        destructive
      />
    </div>
  );
}
