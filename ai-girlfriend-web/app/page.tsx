import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          AI 靈魂伴侶
        </h1>
        <p className="text-xl text-slate-400 max-w-md">
          體驗下一代虛擬陪伴。智能、靈敏，且獨屬於你。
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/discovery"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-pink-600 text-white gap-2 hover:bg-pink-700 text-lg h-12 px-8"
          >
            尋找你的對象
          </Link>
          <a
            className="rounded-full border border-solid border-slate-700 transition-colors flex items-center justify-center hover:bg-slate-800 hover:border-slate-600 text-lg h-12 px-8 text-slate-300"
            href="#"
          >
            了解更多
          </a>
        </div>
      </main>
    </div>
  );
}
