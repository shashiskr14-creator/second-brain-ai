import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Note from "@/lib/models/Note";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const note = await Note.findById(id);

    if (!note) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, note }, { status: 200 });
  } catch (error) {
    console.error("GET /api/notes/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch note" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const body = await req.json();
    const { title, content, type, tags, sourceUrl, summary } = body;

    if (!title || !content || !type) {
      return NextResponse.json(
        { success: false, message: "Title, content, and type are required" },
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

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title: String(title).trim(),
        content: String(content).trim(),
        type,
        tags: Array.isArray(tags)
          ? tags.map((tag) => String(tag).trim()).filter(Boolean)
          : [],
        sourceUrl: validatedUrl,
        summary: summary ? String(summary).trim() : "",
      },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, note: updatedNote },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/notes/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update note" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json(
        { success: false, message: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/notes/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete note" },
      { status: 500 }
    );
  }
}