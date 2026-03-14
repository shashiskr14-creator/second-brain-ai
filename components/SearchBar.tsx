"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      router.push("/dashboard");
      return;
    }

    router.push(`/dashboard?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6 flex gap-3">
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
      />
      <button
        type="submit"
        className="rounded-xl bg-black px-5 py-3 text-white"
      >
        Search
      </button>
    </form>
  );
}