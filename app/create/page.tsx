import NoteForm from "@/components/NoteForm";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Note</h1>
          <p className="mt-2 text-gray-600">
            Add a new knowledge item to your second brain.
          </p>
        </div>

        <NoteForm />
      </div>
    </main>
  );
}