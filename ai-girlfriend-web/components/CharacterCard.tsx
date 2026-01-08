import Link from "next/link";
import Image from "next/image";
import { Personality } from "@/lib/data";
import { MessageCircle, CheckCircle2 } from "lucide-react";

export function CharacterCard({ character }: { character: Personality }) {
  return (
    <Link href={`/chat/${character.id}`} className="group relative block h-[380px] w-full overflow-hidden rounded-3xl bg-slate-900 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={character.imageUrl}
          alt={character.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 left-4 flex gap-2">
        {character.status === "online" && (
            <span className="flex items-center gap-1 bg-green-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md uppercase tracking-wide shadow-lg">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Online
            </span>
        )}
        {character.tags.includes("NSFW") && (
            <span className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md uppercase tracking-wide shadow-lg">
                NSFW
            </span>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-6">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-2xl font-bold text-white leading-tight">{character.name}</h3>
          {character.verified && <CheckCircle2 size={18} className="text-blue-400 fill-blue-400/20" />}
        </div>

        <p className="text-slate-300 text-sm line-clamp-2 mb-4 font-light leading-relaxed opacity-90">
            {character.bio}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
            {character.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-slate-200 border border-white/20 px-2 py-1 rounded-md backdrop-blur-sm">
                    {tag}
                </span>
            ))}
        </div>

        <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2.5 rounded-full text-sm font-bold transition-transform active:scale-95 hover:bg-pink-100 w-full justify-center">
                <MessageCircle size={16} />
                開始聊天
            </button>
        </div>
      </div>
    </Link>
  );
}
