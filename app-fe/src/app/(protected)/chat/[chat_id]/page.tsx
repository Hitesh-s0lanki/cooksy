"use client";

import { useEffect, useState, useRef } from "react";

interface ChatEvent {
  event_type:
    | "follow_up"
    | "content_generation"
    | "content_evaluation"
    | string;
  message: string;
}

const ChatPage: React.FC = () => {
  const chat_id = "1234566";
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!chat_id) return;
    const room = Array.isArray(chat_id) ? chat_id[0] : chat_id;
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${protocol}://localhost:8000/ws/${room}`);

    ws.onopen = () => {
      setMessages((prev) => [...prev, "✅ Connected to chat"]);
    };

    ws.onmessage = (e) => {
      // Try to parse your structured event
      try {
        const event: ChatEvent = JSON.parse(e.data);
        let displayText = "";
        switch (event.event_type) {
          case "follow_up":
            displayText = `🤖 ${event.message}`;
            break;
          case "content_generation":
            displayText = event.message
              ? `🤖 ${event.message}`
              : "⌛ Bot is generating content...";
            break;
          case "content_evaluation":
            displayText = "🔍 Bot is evaluating content...";
            break;
          case "content_evaluated":
            displayText = `🔍 ${event.message}`;
            break;
          case "completed":
            displayText = `Completed`;
            break;
          default:
            // any other event types
            displayText = event.message
              ? `🤖 ${event.message}`
              : `[${event.event_type}]`;
        }
        setMessages((prev) => [...prev, displayText]);
      } catch {
        // fallback if not JSON
        setMessages((prev) => [...prev, e.data]);
      }
    };

    ws.onclose = () => {
      setMessages((prev) => [...prev, "⚠️ Disconnected from chat"]);
    };

    wsRef.current = ws;
    return () => {
      ws.close();
    };
  }, [chat_id]);

  const sendMessage = () => {
    if (!wsRef.current || !input.trim()) return;
    wsRef.current.send(input.trim());
    setMessages((prev) => [...prev, `🧑 You: ${input.trim()}`]);
    setInput("");
  };

  return (
    <div
      style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>
        Chat Room: <code>{chat_id}</code>
      </h2>
      <div
        style={{
          border: "1px solid #ccc",
          height: 300,
          overflowY: "auto",
          padding: 10,
          marginBottom: 10,
        }}>
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        style={{ width: "80%", padding: "0.5rem" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message…"
      />
      <button
        style={{ width: "18%", padding: "0.5rem", marginLeft: "2%" }}
        onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;
