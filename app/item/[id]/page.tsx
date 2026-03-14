import Link from "next/link";
import DeleteNoteButton from "@/components/DeleteNoteButton";
import { connectDB } from "@/lib/db";
import Note from "@/lib/models/Note";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getNote(id: string) {
  await connectDB();
  const note = await Note.findById(id).lean();

  if (!note) {
    throw new Error("Note not found");
  }

  return JSON.parse(JSON.stringify(note));
}

export default async function NoteDetailPage({ params }: PageProps) {
  const { id } = await params;
  const note = await getNote(id);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to Dashboard
        </Link>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
          {note.type}
        </span>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="mb-3 text-3xl font-bold text-gray-900">
              {note.title}
            </h1>

            <div className="text-sm text-gray-500">
              Created on {new Date(note.createdAt).toLocaleString()}
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/item/${note._id}/edit`}
              className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Edit Note
            </Link>

            <DeleteNoteButton id={note._id} />
          </div>
        </div>

        <div className="mb-8 whitespace-pre-wrap text-base leading-8 text-gray-700">
          {note.content}
        </div>

        {note.tags?.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {note.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-black/5 px-3 py-1 text-sm text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {note.sourceUrl && (
          <a
            href={note.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Open Source Link
          </a>
        )}
      </div>
    </div>
  );
}