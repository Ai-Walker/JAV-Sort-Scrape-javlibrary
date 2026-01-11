import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google"; // Using Inter as a reliable Google Font
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-tc",
});

export const metadata: Metadata = {
  title: "AI Soulmate - Your Virtual Companion",
  description: "Chat with AI characters, explore personalities, and find your soulmate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${inter.className} ${notoSansTC.className} antialiased bg-slate-950 text-slate-100 flex h-screen overflow-hidden selection:bg-pink-500/30 font-sans`}>
        <aside className="hidden md:block h-full">
            <Sidebar />
        </aside>
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative">
            {children}
        </main>
      </body>
    </html>
  );
}
