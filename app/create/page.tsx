import NoteForm from "@/components/NoteForm";

export default function CreatePage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 shadow-sm">
            Knowledge capture
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Create Note
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Add a new knowledge item to your second brain with optional AI assistance.
          </p>
        </div>

        <NoteForm />
      </section>
    </main>
  );
}