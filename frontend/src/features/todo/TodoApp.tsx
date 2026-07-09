"use client";

import { useEffect, useState } from "react";
import type { Todo } from "@/types/todo";
import * as api from "@/lib/api";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await api.getTodos();
        if (active) setTodos(data);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Gagal memuat todo");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  async function handleAdd(title: string, description: string) {
    setError(null);
    try {
      const created = await api.createTodo({ title, description });
      setTodos((prev) => [created, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menambah todo");
    }
  }

  async function handleToggle(todo: Todo) {
    setError(null);
    try {
      const updated = await api.updateTodo(todo.id, { completed: !todo.completed });
      setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengubah todo");
    }
  }

  async function handleDelete(id: number) {
    setError(null);
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus todo");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <TodoForm onAdd={handleAdd} />

      {error && (
        <p className="rounded-lg border border-steel bg-steel/10 px-4 py-2.5 text-sm text-slate dark:text-lightgray">
          {error}
        </p>
      )}

      {loading ? (
        <p className="py-8 text-center text-steel">Memuat todo...</p>
      ) : todos.length === 0 ? (
        <p className="py-8 text-center text-steel">
          Belum ada todo. Tambahkan satu di atas untuk memulai.
        </p>
      ) : (
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </div>
  );
}
