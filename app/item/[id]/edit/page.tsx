import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Note from "@/lib/models/Note";
import EditNoteForm from "@/components/EditNoteForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditNotePage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();

  const note = await Note.findById(id).lean();

  if (!note) {
    notFound();
  }

  const serializedNote = {
    _id: String(note._id),
    title: note.title || "",
    content: note.content || "",
    type: note.type || "note",
    tags: Array.isArray(note.tags) ? note.tags : [],
    sourceUrl: note.sourceUrl || "",
    summary: note.summary || "",
    aiTags: Array.isArray(note.aiTags) ? note.aiTags : [],
  };

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Edit Note
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Update your knowledge item
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Edit the note details and save your changes.
        </p>
      </div>

      <EditNoteForm note={serializedNote} />
    </section>
  );
}