"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type NoteType = "note" | "link" | "insight";

type Note = {
  _id: string;
  title: string;
  content: string;
  type: NoteType;
  tags: string[];
  sourceUrl?: string;
  summary?: string;
  aiTags?: string[];
};

export default function EditNoteForm({ note }: { note: Note }) {
  const router = useRouter();

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [type, setType] = useState<NoteType>(note.type);
  const [tags, setTags] = useState(note.tags.join(", "));
  const [sourceUrl, setSourceUrl] = useState(note.sourceUrl || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const res = await fetch(`/api/notes/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          type,
          tags: parsedTags,
          sourceUrl,
          summary: note.summary || "",
          aiTags: note.aiTags || [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update note");
      }

      setMessage("Note updated successfully.");
      router.push(`/item/${note._id}`);
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
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Tags
        </label>
        <input
          type="text"
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
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
        />
        <p className="mt-1 text-xs text-gray-500">
          Optional link to the source of this note.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-black px-4 py-3 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update Note"}
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}