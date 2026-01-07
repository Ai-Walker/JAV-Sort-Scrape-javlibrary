"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { personalities, Personality } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState<Personality | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load character data
  useEffect(() => {
    if (params.id) {
      const found = personalities.find((p) => p.id === params.id);
      if (found) {
        setCharacter(found);
        // Set initial greeting if no messages yet
        if (messages.length === 0) {
            setMessages([{ role: "assistant", content: found.greeting }]);
        }
      } else {
        router.push("/discovery");
      }
    }
  }, [params.id, router]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !character) return;

    const userMsg = input;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          characterId: character.id,
          history: newMessages
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "assistant", content: "抱歉，我現在連接有點問題。😔" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!character) return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">載入中...</div>;

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <Link href="/discovery" className="mr-4 text-slate-400 hover:text-white">
          ←
        </Link>
        <div className={`w-10 h-10 rounded-full ${character.avatarColor} flex items-center justify-center text-lg mr-3`}>
          {character.name[0]}
        </div>
        <div>
          <h1 className="font-bold">{character.name}</h1>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-slate-400">在線</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-pink-600 text-white rounded-br-none"
                  : "bg-slate-800 text-slate-200 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-slate-800 rounded-2xl px-4 py-3 rounded-bl-none flex gap-1 items-center">
               <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
               <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
               <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`發送訊息給 ${character.name}...`}
            className="flex-1 bg-slate-800 border-slate-700 border text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 font-medium transition-colors"
          >
            發送
          </button>
        </form>
      </div>
    </div>
  );
}
