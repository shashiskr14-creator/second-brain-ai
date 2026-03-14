import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { title, content } = await req.json();

    if ((!title || !String(title).trim()) && (!content || !String(content).trim())) {
      return NextResponse.json(
        { success: false, message: "Title or content is required" },
        { status: 400 }
      );
    }

    const inputText = `${title ? `Title: ${title}\n` : ""}${content ? `Content: ${content}` : ""}`;

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "dummy") {
      const fallbackTags = Array.from(
        new Set(
          inputText
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, " ")
            .split(/\s+/)
            .filter((word) => word.length > 4)
            .slice(0, 5)
        )
      );

      return NextResponse.json({
        success: true,
        tags: fallbackTags,
        fallback: true,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Generate 3 to 5 short lowercase tags for the given note. Return only a comma-separated list with no extra text.",
        },
        {
          role: "user",
          content: inputText,
        },
      ],
      temperature: 0.3,
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";
    const tags = raw
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      tags,
    });
  } catch (error) {
    console.error("POST /api/ai/tag error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to generate tags" },
      { status: 500 }
    );
  }
}