import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/lib/models/Note";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json(
        { success: false, message: "Query parameter q is required" },
        { status: 400 }
      );
    }

    const notes = await Note.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { summary: { $regex: q, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const safeNotes = JSON.parse(JSON.stringify(notes));

    const answer =
      safeNotes.length > 0
        ? safeNotes
            .map((note: any, index: number) => {
              const summaryText =
                note.summary && String(note.summary).trim()
                  ? note.summary
                  : String(note.content).slice(0, 180) + (String(note.content).length > 180 ? "..." : "");

              return `${index + 1}. ${note.title}: ${summaryText}`;
            })
            .join("\n")
        : "No matching notes found.";

    const sources = safeNotes.map((note: any) => ({
      id: note._id,
      title: note.title,
      type: note.type,
      tags: note.tags || [],
      sourceUrl: note.sourceUrl || "",
      createdAt: note.createdAt,
    }));

    return NextResponse.json(
      {
        success: true,
        query: q,
        answer,
        sources,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/public/brain/query error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to query public brain API" },
      { status: 500 }
    );
  }
}