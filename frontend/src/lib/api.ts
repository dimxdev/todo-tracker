import type { Todo, CreateTodoInput, UpdateTodoInput } from "@/types/todo";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.error ?? `Request gagal (${res.status})`;
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export function getTodos(): Promise<Todo[]> {
  return request<Todo[]>("/todos");
}

export function createTodo(input: CreateTodoInput): Promise<Todo> {
  return request<Todo>("/todos", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function updateTodo(id: number, input: UpdateTodoInput): Promise<Todo> {
  return request<Todo>(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export function deleteTodo(id: number): Promise<void> {
  return request<void>(`/todos/${id}`, { method: "DELETE" });
}
