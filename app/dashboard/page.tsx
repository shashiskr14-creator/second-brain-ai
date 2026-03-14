import SearchBar from "@/components/SearchBar";
import NoteCard from "@/components/NoteCard";
import { connectDB } from "@/lib/db";
import Note from "@/lib/models/Note";

type DashboardPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

async function getNotes(query?: string) {
  await connectDB();

  let filter = {};

  if (query && query.trim()) {
    filter = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    };
  }

  const notes = await Note.find(filter).sort({ createdAt: -1 }).lean();

  return JSON.parse(JSON.stringify(notes));
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = resolvedSearchParams.q || "";
  const notes = await getNotes(query);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Browse all your saved knowledge items.
            </p>
          </div>

          <a
            href="/create"
            className="rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Create Note
          </a>
        </div>

        <SearchBar />

        {notes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            No notes found. Create your first knowledge item.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notes.map((note: any) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}