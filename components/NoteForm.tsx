"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type NoteType = "note" | "link" | "insight";

export default function NoteForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<NoteType>("note");
  const [tags, setTags] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [tagLoading, setTagLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerateSummary = async () => {
    if (!content.trim()) {
      setMessage("Please enter content before generating a summary.");
      return;
    }

    try {
      setSummaryLoading(true);
      setMessage("");

      const res = await fetch("/api/ai/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate summary");
      }

      setSummary(data.summary || "");
      setMessage(
        data.fallback
          ? "Fallback summary generated."
          : "AI summary generated successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleGenerateTags = async () => {
    if (!title.trim() && !content.trim()) {
      setMessage("Please enter title or content before generating tags.");
      return;
    }

    try {
      setTagLoading(true);
      setMessage("");

      const res = await fetch("/api/ai/tag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to generate tags");
      }

      if (Array.isArray(data.tags)) {
        setTags(data.tags.join(", "));
      }

      setMessage(
        data.fallback
          ? "Fallback tags generated."
          : "AI tags generated successfully."
      );
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setTagLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          type,
          tags: parsedTags,
          sourceUrl,
          summary,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create note");
      }

      setMessage("Note created successfully.");
      setTitle("");
      setContent("");
      setType("note");
      setTags("");
      setSourceUrl("");
      setSummary("");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          placeholder="Write your note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as NoteType)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
        >
          <option value="note">Note</option>
          <option value="link">Link</option>
          <option value="insight">Insight</option>
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>

          <button
            type="button"
            onClick={handleGenerateTags}
            disabled={tagLoading}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
          >
            {tagLoading ? "Generating..." : "Generate AI Tags"}
          </button>
        </div>

        <input
          type="text"
          placeholder="react, frontend, hooks"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Source URL
        </label>
        <input
          type="text"
          placeholder="https://example.com"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Optional link to the source of this note.
        </p>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="block text-sm font-medium text-gray-700">
            Summary
          </label>

          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={summaryLoading}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
          >
            {summaryLoading ? "Generating..." : "Generate AI Summary"}
          </button>
        </div>

        <textarea
          placeholder="Generated summary will appear here"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-4 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Note"}
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}