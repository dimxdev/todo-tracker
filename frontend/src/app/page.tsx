import TodoApp from "@/features/todo/TodoApp";
import ThemeToggle from "@/features/theme/ThemeToggle";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-xl px-4 py-10 sm:py-16">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal sm:text-3xl dark:text-paper">
            Todo Tracker
          </h1>
          <p className="mt-1 text-sm text-steel">
            Catat, tandai selesai, dan hapus tugasmu.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <TodoApp />
    </main>
  );
}
