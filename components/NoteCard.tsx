import Link from "next/link";

interface Note {
  _id: string;
  title: string;
  content: string;
  summary?: string;
  tags?: string[];
  type: string;
  sourceUrl?: string;
  createdAt?: string;
}

export default function NoteCard({ note }: { note: Note }) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
            {note.type}
          </span>

          <h2 className="mt-4 text-2xl font-semibold leading-snug text-slate-900">
            {note.title}
          </h2>
        </div>

        {note.createdAt && (
          <span className="text-xs font-medium text-slate-400">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>

      <p className="mt-4 line-clamp-4 leading-7 text-slate-600">
        {note.summary || note.content}
      </p>

      {note.tags && note.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <Link
          href={`/item/${note._id}`}
          className="text-sm font-semibold text-slate-900 transition hover:underline"
        >
          View Details →
        </Link>

        {note.sourceUrl && (
          <a
            href={note.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-slate-500 transition hover:text-slate-900 hover:underline"
          >
            Source
          </a>
        )}
      </div>
    </div>
  );
}