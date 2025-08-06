"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import Image from "next/image";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const loadingStates = [
  { text: "Handpicking your perfect recipe…" },
  { text: "Analyzing flavor & nutrition…" },
  { text: "Putting the final touches on your dish…" },
  { text: "Rendering mouthwatering visuals…" },
  { text: "Curating top video inspirations…" },
];

interface ChatEvent {
  event_type:
    | "follow_up"
    | "content_generation"
    | "content_evaluation"
    | string;
  message: string;
  content_generated_state: {
    dish_name: string;
    dish_description: string;
    ingredients: string[];
    recipe: string[];
  };
}

type Props = {
  chatId: string;
  initialText: string;
};

export default function Chat({ chatId, initialText }: Props) {
  const router = useRouter();

  const trpc = useTRPC();
  const dishCreation = useMutation(
    trpc.dish.create.mutationOptions({
      onSuccess: async (res) => {
        toast.success("Dish generated Successfully");
        setLoading(false);
        router.push(`/${res.id}`);
      },
      onError: (err) => {
        toast.error(err.message);
        setLoading(false);
      },
    })
  );

  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_API_HOST}/ws/${chatId}`
    );
    wsRef.current = ws;

    ws.onopen = () => {
      // if there's an initial text param, send it
      if (initialText) {
        sendUserMessage(initialText);
      }
    };

    ws.onmessage = async (e) => {
      setIsTyping(false);

      let display: string;
      try {
        const event: ChatEvent = JSON.parse(e.data);
        switch (event.event_type) {
          case "follow_up":
            display = event.message;
            break;
          case "content_generation":
            setLoading(true);
            display = event.message || "⌛ Generating content…";
            break;
          case "content_evaluation":
            display = "🔍 Evaluating content…";
            break;
          case "completed":
            await dishCreation.mutateAsync({
              ...event.content_generated_state,
            });
            break;
          default:
            display = event.message || `[${event.event_type}]`;
        }
      } catch {
        // fallback if not JSON
        display = e.data;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          content: display,
          isBot: true,
          timestamp: new Date(),
        },
      ]);
    };

    return () => {
      ws.close();
    };
  }, [chatId, initialText]);

  function sendUserMessage(text: string) {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: trimmed,
        isBot: false,
        timestamp: new Date(),
      },
    ]);

    setIsTyping(true);
    wsRef.current.send(trimmed);
  }

  const handleSendClick = () => {
    sendUserMessage(currentInput);
    setCurrentInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div className="min-h-full w-full px-4 py-5">
      <Loader loadingStates={loadingStates} loading={loading} duration={5000} />
      <div className="bg-white rounded-2xl shadow-lg flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-2 border-b border-border">
          <div className="flex items-center space-x-3">
            <Image src="/loading.gif" alt="Assistant" height={48} width={48} />
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Assistant
              </h2>
              <p className="text-sm text-muted-foreground">
                What to make today?
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${"bg-muted text-foreground"}`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={handleSendClick}
              disabled={!currentInput.trim()}
              className="border-0">
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
