import { personalities } from "@/lib/data";
import { CharacterCard } from "@/components/CharacterCard";
import { Search } from "lucide-react";

export default function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-10">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
            <h1 className="text-4xl font-bold text-white mb-2">探索你的伴侶</h1>
            <p className="text-slate-400">發現獨特的 AI 個性，開始一段新的關係。</p>
        </div>

        <div className="relative w-full md:w-96">
            <input
                type="text"
                placeholder="搜尋角色、標籤..."
                className="w-full bg-slate-900/50 border border-slate-800 rounded-full px-5 py-3 pl-12 text-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all placeholder:text-slate-600"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        </div>
      </header>

      {/* Featured Section (Optional - maybe later) */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {personalities.map((p) => (
          <CharacterCard key={p.id} character={p} />
        ))}
      </div>
    </div>
  );
}
