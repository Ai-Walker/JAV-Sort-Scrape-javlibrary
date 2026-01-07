import Link from "next/link";
import { personalities } from "@/lib/data";

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <header className="mb-12 flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          AI 靈魂伴侶
        </Link>
        <div className="text-sm text-slate-400">
          選擇你的伴侶
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">探索</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalities.map((p) => (
            <div key={p.id} className="bg-slate-800 rounded-2xl overflow-hidden hover:ring-2 hover:ring-pink-500 transition-all cursor-pointer group">
              <div className={`h-48 ${p.avatarColor} w-full flex items-center justify-center text-6xl`}>
                {/* Placeholder for avatar image */}
                {p.name[0]}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{p.name}</h2>
                  <span className="bg-slate-700 text-xs px-2 py-1 rounded text-slate-300">{p.age} 歲</span>
                </div>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-xs text-pink-400 border border-pink-900/50 bg-pink-900/20 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">
                  {p.bio}
                </p>
                <Link
                  href={`/chat/${p.id}`}
                  className="block w-full text-center bg-slate-700 hover:bg-pink-600 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  與 {p.name} 聊天
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
