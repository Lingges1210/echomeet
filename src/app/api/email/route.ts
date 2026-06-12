import { NextRequest, NextResponse } from "next/server";
import { getGroqClient, GROQ_MODEL } from "@/lib/groq";
import { buildEmailRefinementPrompt } from "@/lib/prompts";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { currentEmail, instruction } = await req.json();

    if (!currentEmail || !instruction) {
      return NextResponse.json(
        { error: "Both currentEmail and instruction are required." },
        { status: 400 }
      );
    }

    const groq = getGroqClient();
    const prompt = buildEmailRefinementPrompt(currentEmail, instruction);

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a professional email editor. Rewrite emails based on instructions. Respond with the email text only.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
      max_tokens: 1024,
    });

    const refinedEmail =
      completion.choices[0]?.message?.content?.trim() ?? "";

    return NextResponse.json({ email: refinedEmail }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
