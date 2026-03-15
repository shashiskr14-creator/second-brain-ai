import SearchBar from "@/components/SearchBar";
import NoteCard from "@/components/NoteCard";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Note from "@/lib/models/Note";

async function getNotes(query?: string, type?: string) {
  await connectDB();

  const filter: any = {};

  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
      { tags: { $regex: query, $options: "i" } },
      { summary: { $regex: query, $options: "i" } },
    ];
  }

  if (type) {
    filter.type = type;
  }

  const notes = await Note.find(filter).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(notes));
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const type = params.type || "";

  const notes = await getNotes(query, type);

  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 shadow-sm">
              Knowledge dashboard
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
              Dashboard
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Browse, search, and manage your saved knowledge items.
            </p>
          </div>

          <Link
            href="/create"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black"
          >
            Create Note
          </Link>
        </div>

        <SearchBar />

        {notes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">
              No notes found
            </h2>
            <p className="mt-3 text-slate-600">
              Try changing your search or create a new knowledge item.
            </p>
            <Link
              href="/create"
              className="mt-6 inline-block rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              Create Note
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {notes.map((note: any) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}