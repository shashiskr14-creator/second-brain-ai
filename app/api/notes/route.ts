import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/lib/models/Note";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    let filter: any = {};

    if (query) {
      filter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
          { tags: { $regex: query, $options: "i" } },
        ],
      };
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, notes }, { status: 200 });
  } catch (error) {
    console.error("GET /api/notes error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { title, content, type, tags, sourceUrl, summary, aiTags } = body;

    if (!title || !content || !type) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, content, and type are required",
        },
        { status: 400 }
      );
    }

    let validatedUrl = "";

    if (sourceUrl && String(sourceUrl).trim() !== "") {
      try {
        validatedUrl = new URL(String(sourceUrl).trim()).toString();
      } catch {
        return NextResponse.json(
          { success: false, message: "Invalid URL format" },
          { status: 400 }
        );
      }
    }

    const note = await Note.create({
      title: String(title).trim(),
      content: String(content).trim(),
      type,
      tags: Array.isArray(tags)
        ? tags.map((tag) => String(tag).trim()).filter(Boolean)
        : [],
      sourceUrl: validatedUrl,
      summary: summary ? String(summary).trim() : "",
      aiTags: Array.isArray(aiTags)
        ? aiTags.map((tag) => String(tag).trim()).filter(Boolean)
        : [],
    });

    return NextResponse.json(
      { success: true, note },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/notes error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to create note" },
      { status: 500 }
    );
  }
}