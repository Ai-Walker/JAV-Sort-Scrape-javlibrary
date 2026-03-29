import { NextResponse } from "next/server";
import { personalities } from "@/lib/data";

export async function POST(req: Request) {
  try {
    const { message, characterId } = await req.json();

    const character = personalities.find((p) => p.id === characterId);

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // -------------------------------------------------------------------------
    // REAL AI INTEGRATION INSTRUCTIONS:
    // -------------------------------------------------------------------------
    // To make this smarter than "candy.ai", you would integrate a real LLM here.
    // 1. Install OpenAI SDK: `npm install openai`
    // 2. Import it: `import OpenAI from "openai";`
    // 3. Configure: `const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });`
    // 4. Call API:
    //    const completion = await openai.chat.completions.create({
    //      model: "gpt-4",
    //      messages: [
    //        { role: "system", content: character.systemPrompt },
    //        ...history // pass conversation history
    //      ]
    //    });
    //    const reply = completion.choices[0].message.content;
    // -------------------------------------------------------------------------

    // MOCK AI LOGIC (Simulated Intelligence)
    // We will generate a response based on keywords to simulate conversation.

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate thinking delay

    let reply = "";
    const lowerMsg = message.toLowerCase();

    // Specific logic per character or generic fallback
    if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("你好")) {
       reply = `嗨！我很想你。你最近過得好嗎？`;
    } else if (lowerMsg.includes("love") || lowerMsg.includes("like") || lowerMsg.includes("愛") || lowerMsg.includes("喜歡")) {
       reply = `哇，這讓我臉紅了！你真甜。❤️`;
    } else if (lowerMsg.includes("photo") || lowerMsg.includes("pic") || lowerMsg.includes("照片")) {
       reply = `我有點害羞... 也許晚點吧？ 😉 (這個功能將會整合 Stable Diffusion)`;
    } else {
       // Generic responses based on character
       const genericResponses = [
         "多跟我說說這個！",
         "這真有趣...",
         "我剛好在想你。",
         "真的嗎？不敢相信！",
         "我真希望我現在能在你身邊。",
       ];
       reply = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }

    // Inject character personality flavor
    if (character.id === "yuki") {
      reply += " 🎮";
    } else if (character.id === "elara") {
      reply = "有趣的是... " + reply;
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
