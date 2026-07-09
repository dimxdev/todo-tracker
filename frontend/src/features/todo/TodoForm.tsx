"use client";

import { useState } from "react";

interface TodoFormProps {
  onAdd: (title: string, description: string) => Promise<void>;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() === "" || submitting) return;

    setSubmitting(true);
    try {
      await onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Judul todo..."
        className="rounded-lg border border-lightgray bg-white px-4 py-2.5 text-charcoal outline-none transition focus:border-slate dark:border-slate dark:bg-slate/40 dark:text-paper dark:focus:border-steel"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Deskripsi (opsional)"
        className="rounded-lg border border-lightgray bg-white px-4 py-2.5 text-charcoal outline-none transition focus:border-slate dark:border-slate dark:bg-slate/40 dark:text-paper dark:focus:border-steel"
      />
      <button
        type="submit"
        disabled={title.trim() === "" || submitting}
        className="rounded-lg bg-slate px-4 py-2.5 font-medium text-paper transition hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-50 dark:bg-steel dark:text-charcoal dark:hover:bg-lightgray"
      >
        {submitting ? "Menambah..." : "Tambah"}
      </button>
    </form>
  );
}
