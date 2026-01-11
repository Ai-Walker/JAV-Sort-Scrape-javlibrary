"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  MessageCircleHeart,
  Image as ImageIcon,
  User,
  Settings,
  LogOut,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "首頁", href: "/", icon: Home },
  { name: "探索", href: "/discovery", icon: Compass },
  { name: "聊天", href: "/chat", icon: MessageCircleHeart }, // We might need a chat list page
  { name: "相冊", href: "#", icon: ImageIcon, disabled: true },
  { name: "我的 AI", href: "#", icon: User, disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-slate-950 border-r border-slate-800 text-slate-300">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          A
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          AI Soulmate
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-900/20"
                  : "hover:bg-slate-900 hover:text-white text-slate-400",
                item.disabled && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-slate-400"
              )}
            >
              <item.icon size={20} className={cn(isActive ? "text-white" : "text-slate-400 group-hover:text-pink-400")} />
              <span className="font-medium">{item.name}</span>
              {item.disabled && (
                <span className="ml-auto text-[10px] uppercase bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded">
                  Coming Soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-900">
        <div className="bg-gradient-to-r from-pink-600/10 to-violet-600/10 border border-pink-500/20 rounded-2xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-2 text-pink-400">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Premium</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">升級以解鎖無限聊天和圖片生成。</p>
            <button className="w-full bg-gradient-to-r from-pink-600 to-violet-600 text-white text-xs font-bold py-2 rounded-lg hover:opacity-90 transition-opacity">
                立即升級
            </button>
        </div>

        <button className="flex items-center gap-3 px-4 py-2 text-sm text-slate-500 hover:text-white transition-colors w-full">
          <Settings size={18} />
          <span>設置</span>
        </button>
      </div>
    </div>
  );
}
