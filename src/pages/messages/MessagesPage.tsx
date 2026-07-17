import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Search, MessageSquare, Phone, Video } from "lucide-react";

import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface ChatMessage {
  id: string;
  senderId: string;
  body: string;
  time: string;
  outgoing: boolean;
}

const CONVERSATIONS: Conversation[] = [
  { id: "c1", name: "Dr. Rajesh Sharma", role: "Physics Teacher", lastMessage: "Great improvement in your last test!", time: "3 hrs ago", unread: 2, online: true },
  { id: "c2", name: "Class Teacher", role: "Mentor", lastMessage: "Regarding your attendance...", time: "1 day ago", unread: 0, online: false },
  { id: "c3", name: "Arjun's Parent", role: "Parent", lastMessage: "Thank you for the update.", time: "2 days ago", unread: 0, online: false },
  { id: "c4", name: "Math Faculty", role: "Math Teacher", lastMessage: "Homework deadline extended.", time: "3 days ago", unread: 0, online: true },
];

const SAMPLE_MESSAGES: Record<string, ChatMessage[]> = {
  c1: [
    { id: "m1", senderId: "c1", body: "Hi, I wanted to talk about your recent Physics test performance.", time: "10:30 AM", outgoing: false },
    { id: "m2", senderId: "me", body: "Yes sir, I was a bit nervous during the test.", time: "10:32 AM", outgoing: true },
    { id: "m3", senderId: "c1", body: "Don't worry, you scored 88/100 — that's excellent! Keep it up.", time: "10:33 AM", outgoing: false },
    { id: "m4", senderId: "c1", body: "Great improvement in your last test!", time: "10:34 AM", outgoing: false },
  ],
  c2: [
    { id: "m5", senderId: "c2", body: "Your attendance has been below 75% this month.", time: "Yesterday", outgoing: false },
    { id: "m6", senderId: "me", body: "I was unwell, I'll submit a medical certificate.", time: "Yesterday", outgoing: true },
  ],
};

export function MessagesPage() {
  const [activeConv, setActiveConv] = useState<string>("c1");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(SAMPLE_MESSAGES);

  const conv = CONVERSATIONS.find((c) => c.id === activeConv);
  const chat = messages[activeConv] ?? [];

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: "me",
      body: message.trim(),
      time: "Now",
      outgoing: true,
    };
    setMessages((prev) => ({ ...prev, [activeConv]: [...(prev[activeConv] ?? []), newMsg] }));
    setMessage("");
  };

  return (
    <div>
      <PageHeader title="Messages" description="Communicate with teachers and parents." />

      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[320px_1fr] h-[600px]">
          {/* Conversation list */}
          <div className="border-r border-border/60 flex flex-col">
            <div className="p-3 border-b border-border/60">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search conversations..."
                  className="w-full h-9 rounded-md border border-input bg-background/50 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {CONVERSATIONS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveConv(c.id)}
                  className={cn(
                    "w-full text-left p-3 border-b border-border/40 transition-colors hover:bg-accent/40",
                    activeConv === c.id && "bg-accent/60",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="size-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-semibold">
                        {c.name[0]}
                      </div>
                      {c.online && (
                        <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-success border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{c.name}</p>
                        <span className="text-xs text-muted-foreground shrink-0">{c.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                        {c.unread > 0 && (
                          <Badge className="text-xs ml-2 shrink-0">{c.unread}</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.role}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex flex-col">
            {conv ? (
              <>
                {/* Chat header */}
                <div className="p-3 border-b border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-semibold">
                      {conv.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{conv.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {conv.online ? "Online" : "Offline"} · {conv.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm"><Phone className="size-4" /></Button>
                    <Button variant="ghost" size="sm"><Video className="size-4" /></Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
                  <AnimatePresence initial={false}>
                    {chat.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("flex", msg.outgoing ? "justify-end" : "justify-start")}
                      >
                        <div className={cn(
                          "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                          msg.outgoing
                            ? "gradient-brand text-white rounded-br-sm"
                            : "bg-card border border-border/60 rounded-bl-sm",
                        )}>
                          <p>{msg.body}</p>
                          <p className={cn("text-xs mt-1", msg.outgoing ? "text-white/70" : "text-muted-foreground")}>
                            {msg.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Input */}
                <div className="p-3 border-t border-border/60">
                  <form
                    onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 h-10 rounded-lg border border-input bg-background/50 px-4 text-sm outline-none focus:ring-2 focus:ring-ring/40"
                    />
                    <Button type="submit" size="icon" disabled={!message.trim()}>
                      <Send className="size-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageSquare className="size-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
