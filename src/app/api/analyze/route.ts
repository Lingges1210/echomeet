import { NextRequest, NextResponse } from "next/server";
import { getGroqClient, GROQ_MODEL } from "@/lib/groq";
import { buildAnalysisPrompt } from "@/lib/prompts";
import { supabase } from "@/lib/supabase";
import type { MeetingAnalysis, AnalyzeRequest } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeRequest = await req.json();
    const { notes, meetingContext, attendeeHint } = body;

    // Validation
    if (!notes || notes.trim().length < 20) {
      return NextResponse.json(
        { error: "Please provide at least 20 characters of meeting notes." },
        { status: 400 }
      );
    }

    if (notes.length > 15000) {
      return NextResponse.json(
        { error: "Notes too long. Maximum 15,000 characters (about 2,500 words)." },
        { status: 400 }
      );
    }

    // Build prompt and call Groq
    const prompt = buildAnalysisPrompt(notes, meetingContext, attendeeHint);
    const groq = getGroqClient();

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are EchoMeet, a precise meeting analyst. You always respond with valid JSON only, no markdown fences, no preamble.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 4096,
    });

    const rawResponse = completion.choices[0]?.message?.content ?? "";

    // Parse JSON — strip any accidental markdown fences
    const cleanJson = rawResponse
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let analysis: MeetingAnalysis;
    try {
      analysis = JSON.parse(cleanJson);
    } catch {
      console.error("Failed to parse Groq response:", rawResponse);
      return NextResponse.json(
        {
          error:
            "AI returned an unexpected format. Please try again or simplify your notes.",
        },
        { status: 500 }
      );
    }

    // Optionally save to Supabase
    if (supabase) {
      try {
        await supabase.from("meetings").insert({
          title: analysis.title,
          summary: analysis.summary,
          raw_notes: notes,
          analysis: analysis,
          action_items_count: analysis.actionItems?.length ?? 0,
          decisions_count: analysis.decisions?.length ?? 0,
        });
      } catch (dbError) {
        // Don't fail the request if DB save fails
        console.warn("Supabase save failed:", dbError);
      }
    }

    return NextResponse.json({ analysis }, { status: 200 });
  } catch (error: unknown) {
    console.error("Analysis error:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";

    if (message.includes("GROQ_API_KEY")) {
      return NextResponse.json(
        {
          error:
            "Groq API key not configured. Add GROQ_API_KEY to your .env.local file.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
