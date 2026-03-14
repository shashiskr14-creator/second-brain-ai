export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
        <p className="mt-2 text-gray-600">
          Architecture notes and design decisions for the Second Brain app.
        </p>
      </div>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          Portable Architecture
        </h2>
        <p className="text-gray-700 leading-7">
          The application is structured into reusable layers: UI components,
          API routes, database models, and utility modules. This separation
          makes the system easier to maintain, extend, and deploy.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          UX Principles
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Clarity over clutter</li>
          <li>Fast note capture</li>
          <li>Readable information hierarchy</li>
          <li>Responsive layout across screen sizes</li>
          <li>Simple navigation with low friction</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          AI Features
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>AI summary generation for long notes</li>
          <li>AI auto-tag generation based on title and content</li>
          <li>Fallback behavior when OpenAI key is unavailable</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          Public API Access
        </h2>
        <p className="text-gray-700 leading-7">
          The application exposes a public query endpoint at
          <span className="mx-1 rounded bg-gray-100 px-2 py-1 font-mono text-sm">
            /api/public/brain/query?q=your-query
          </span>
          which returns a structured JSON response containing an answer and the
          matching note sources.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          Infrastructure Mindset
        </h2>
        <p className="text-gray-700 leading-7">
          Notes are stored in MongoDB and exposed through API routes. The system
          is designed so AI features and public querying can be added without
          changing the core note schema significantly.
        </p>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-xl font-semibold text-gray-900">
          Current Features
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>Create and store notes</li>
          <li>Dashboard with searchable note cards</li>
          <li>Single note detail page</li>
          <li>Edit and delete notes</li>
          <li>AI summary generation</li>
          <li>AI auto-tag generation</li>
          <li>Public query API endpoint</li>
          <li>MongoDB-backed persistence</li>
        </ul>
      </section>
    </div>
  );
}