import { Todo } from "./todo.model.js";

export async function getAllTodos() {
  return Todo.findAll({ order: [["createdAt", "DESC"]] });
}

export async function createTodo({ title, description, completed }) {
  return Todo.create({
    title: title.trim(),
    description: typeof description === "string" ? description.trim() : null,
    completed: typeof completed === "boolean" ? completed : false,
  });
}

export async function updateTodo(id, { title, description, completed }) {
  const todo = await Todo.findByPk(id);

  if (!todo) {
    return null;
  }

  return todo.update({
    ...(title !== undefined && { title: title.trim() }),
    ...(description !== undefined && {
      description: typeof description === "string" ? description.trim() : null,
    }),
    ...(completed !== undefined && { completed: Boolean(completed) }),
  });
}

export async function deleteTodo(id) {
  const todo = await Todo.findByPk(id);

  if (!todo) {
    return false;
  }

  await todo.destroy();
  return true;
}
