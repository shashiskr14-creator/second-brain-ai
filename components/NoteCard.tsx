import Link from "next/link";

type Note = {
  _id: string;
  title: string;
  content: string;
  type: "note" | "link" | "insight";
  tags: string[];
  sourceUrl?: string;
  createdAt: string;
};

export default function NoteCard({ note }: { note: Note }) {
  return (
    <Link href={`/item/${note._id}`}>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-700">
            {note.type}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-900">{note.title}</h2>

        <p className="mb-4 line-clamp-3 text-sm text-gray-600">
          {note.content}
        </p>

        {note.tags?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-black/5 px-3 py-1 text-xs text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {note.sourceUrl && (
          <span className="text-sm font-medium text-black underline">
            View Details
          </span>
        )}
      </div>
    </Link>
  );
}