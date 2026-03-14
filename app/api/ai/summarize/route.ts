import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, message: "Content is required" },
        { status: 400 }
      );
    }

    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "dummy"
    ) {
      const fallbackSummary =
        content.length > 140
          ? content.slice(0, 140) + "..."
          : content;

      return NextResponse.json({
        success: true,
        summary: fallbackSummary,
        fallback: true,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You summarize notes clearly and briefly in 1 to 2 sentences.",
        },
        {
          role: "user",
          content: `Summarize this note:\n\n${content}`,
        },
      ],
      temperature: 0.4,
    });

    const summary = completion.choices[0]?.message?.content?.trim() || "";

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("POST /api/ai/summarize error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to summarize content" },
      { status: 500 }
    );
  }
}