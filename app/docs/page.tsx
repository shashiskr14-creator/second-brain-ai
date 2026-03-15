const sections = [
  {
    title: "Portable Architecture",
    content:
      "The application is split into reusable layers: UI components, API routes, database models, and utility modules. This structure makes the system easier to maintain, test, and extend.",
  },
  {
    title: "UX Principles",
    list: [
      "Clarity over clutter",
      "Fast note capture",
      "Readable information hierarchy",
      "Responsive layout across screen sizes",
      "Simple navigation with low friction",
    ],
  },
  {
    title: "AI Features",
    list: [
      "AI summary generation for long notes",
      "AI auto-tag generation from title and content",
      "Fallback behavior when an OpenAI key is unavailable",
    ],
  },
  {
    title: "Public API Access",
    content:
      "The application exposes a public query endpoint at /api/public/brain/query?q=your-query which returns structured JSON responses with matching notes and a generated answer preview.",
  },
  {
    title: "Infrastructure Mindset",
    content:
      "Notes are stored in MongoDB Atlas and served through Next.js API routes. The architecture is intentionally simple, scalable, and deployment-friendly using Vercel.",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-10">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 shadow-sm">
            Architecture and decisions
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Documentation
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Architecture notes, UX principles, AI features, and infrastructure decisions for the Second Brain app.
          </p>
        </div>

        <div className="grid gap-6">
          {sections.map((section) => (
            <section
              key={section.title}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                {section.title}
              </h2>

              {section.content && (
                <p className="mt-4 leading-8 text-slate-600">
                  {section.content}
                </p>
              )}

              {section.list && (
                <ul className="mt-4 space-y-3 text-slate-600">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-slate-400" />
                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}