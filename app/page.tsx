export default function Home() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Second Brain
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          A personal knowledge management system to store, search, and organize
          your ideas, notes, and resources.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        <a
          href="/dashboard"
          className="rounded-xl border p-6 hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <p className="text-gray-600 mt-2">
            Browse and search all your saved notes.
          </p>
        </a>

        <a
          href="/create"
          className="rounded-xl border p-6 hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">Create Note</h2>
          <p className="text-gray-600 mt-2">
            Add new knowledge items to your system.
          </p>
        </a>

        <a
          href="/docs"
          className="rounded-xl border p-6 hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold">Documentation</h2>
          <p className="text-gray-600 mt-2">
            Understand the architecture and design decisions.
          </p>
        </a>

      </div>

    </div>
  );
}