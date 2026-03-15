import Link from "next/link";

const cards = [
  {
    title: "Dashboard",
    description: "Browse, search, and filter your saved knowledge items.",
    href: "/dashboard",
  },
  {
    title: "Create Note",
    description: "Capture notes, links, and insights with AI assistance.",
    href: "/create",
  },
  {
    title: "Documentation",
    description: "Review architecture, UX principles, and infrastructure decisions.",
    href: "/docs",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500 shadow-sm">
            AI-powered knowledge system
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Second Brain
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A personal knowledge management system to store, search, summarize,
            and organize your ideas, notes, and resources in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/create"
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-black"
            >
              Create Your First Note
            </Link>
            <Link
              href="/dashboard"
              className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
            >
              Open Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-slate-900 transition group-hover:text-black">
                {card.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{card.description}</p>
              <div className="mt-6 text-sm font-semibold text-slate-900">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}