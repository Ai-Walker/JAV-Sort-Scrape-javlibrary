"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { personalities, Personality } from "@/lib/data";
import {
    SendHorizontal,
    ArrowLeft,
    MoreVertical,
    Image as ImageIcon,
    Mic,
    Sparkles,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  if (!character) return <div className="h-full flex items-center justify-center text-slate-500">載入中...</div>;

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/10 to-violet-900/10 pointer-events-none" />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* Header */}
        <header className="px-6 py-4 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-4">
                <Link
                    href="/discovery"
                    className="md:hidden text-slate-400 hover:text-white transition-colors"
                    aria-label="返回探索頁面"
                >
                    <ArrowLeft size={24} />
                </Link>
                <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-700 relative">
                        <Image src={character.imageUrl} alt={character.name} fill className="object-cover" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-950 rounded-full"></div>
                </div>
                <div>
                    <h2 className="font-bold text-slate-100 flex items-center gap-2">
                        {character.name}
                        {character.verified && <CheckCircle2 size={14} className="text-blue-400" />}
                    </h2>
                    <p className="text-xs text-green-400 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        Online Now
                    </p>
                </div>
            </div>
            <div className="flex gap-4 text-slate-400">
                 {/* Placeholder icons for extra features */}
                 <button className="hover:text-white transition-colors" aria-label="AI 功能"><Sparkles size={20} /></button>
                 <button className="hover:text-white transition-colors" aria-label="更多選項"><MoreVertical size={20} /></button>
            </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                    <div className={cn(
                        "max-w-[85%] md:max-w-[70%] rounded-2xl p-4 shadow-sm",
                        msg.role === "user"
                            ? "bg-pink-600 text-white rounded-br-none"
                            : "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700"
                    )}>
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                 <div className="flex w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-slate-800 rounded-2xl rounded-bl-none p-4 border border-slate-700 flex gap-2 items-center h-12">
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
            <div className="max-w-4xl mx-auto flex items-end gap-3 bg-slate-900 p-2 rounded-2xl border border-slate-800 focus-within:border-pink-500/50 focus-within:ring-1 focus-within:ring-pink-500/20 transition-all shadow-lg">
                <button
                    className="p-3 text-slate-400 hover:text-pink-400 transition-colors rounded-xl hover:bg-slate-800"
                    aria-label="上傳圖片"
                >
                    <ImageIcon size={20} />
                </button>
                <textarea
                    value={input}
                    aria-label="輸入訊息"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e);
                        }
                    }}
                    placeholder={`發送訊息給 ${character.name}...`}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-100 placeholder:text-slate-500 resize-none py-3 max-h-32 min-h-[44px]"
                    rows={1}
                />
                <button
                    className="p-3 text-slate-400 hover:text-pink-400 transition-colors rounded-xl hover:bg-slate-800 md:hidden"
                    aria-label="語音輸入"
                >
                    <Mic size={20} />
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={!input.trim() || isLoading}
                    className="p-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-600/20"
                    aria-label="發送訊息"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
            <p className="text-center text-[10px] text-slate-600 mt-2">
                AI 可能會產生不準確的資訊。所有互動均為模擬。
            </p>
        </div>
      </div>

      {/* Right Sidebar (Info Panel) - Hidden on mobile */}
      <div className="hidden xl:flex w-80 bg-slate-950 border-l border-slate-800 flex-col p-6 overflow-y-auto">
        <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-3xl overflow-hidden mb-4 relative shadow-2xl shadow-pink-900/20 ring-4 ring-slate-900">
                <Image src={character.imageUrl} alt={character.name} fill className="object-cover" />
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
            <span className="text-sm text-slate-400">{character.age} 歲 • {character.tags[0]}</span>
        </div>

        <div className="space-y-6">
            <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">關於</h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    {character.bio}
                </p>
            </div>

            <div>
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">標籤</h4>
                 <div className="flex flex-wrap gap-2">
                    {character.tags.map(tag => (
                        <span key={tag} className="text-xs bg-slate-900 text-slate-300 border border-slate-800 px-3 py-1.5 rounded-lg">
                            {tag}
                        </span>
                    ))}
                 </div>
            </div>

            <div>
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">相冊 (3)</h4>
                 <div className="grid grid-cols-3 gap-2">
                    {/* Simulated Gallery */}
                    <div className="aspect-square bg-slate-900 rounded-lg border border-slate-800 relative overflow-hidden group cursor-pointer">
                         <Image src={character.imageUrl} alt="Gallery" fill className="object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="aspect-square bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-800 transition-colors">
                        <span className="text-xs">🔒</span>
                    </div>
                     <div className="aspect-square bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-slate-800 transition-colors">
                        <span className="text-xs">🔒</span>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
