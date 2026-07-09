import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-lightgray bg-white p-4 transition dark:border-slate dark:bg-slate/30">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-slate dark:accent-steel"
      />

      <div className="min-w-0 flex-1">
        <p
          className={`font-medium break-words ${
            todo.completed
              ? "text-steel line-through"
              : "text-charcoal dark:text-paper"
          }`}
        >
          {todo.title}
        </p>
        {todo.description && (
          <p className="mt-0.5 text-sm break-words text-steel">
            {todo.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label="Hapus todo"
        className="shrink-0 rounded-md px-2 py-1 text-sm text-steel transition hover:bg-lightgray hover:text-charcoal dark:hover:bg-charcoal dark:hover:text-paper"
      >
        Hapus
      </button>
    </li>
  );
}
