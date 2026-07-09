import * as todoService from "./todo.service.js";

export async function getAllTodos(req, res) {
  const todos = await todoService.getAllTodos();
  res.json(todos);
}

export async function createTodo(req, res) {
  const { title } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res
      .status(400)
      .json({ error: "title is required and cannot be empty" });
  }

  const todo = await todoService.createTodo(req.body);
  res.status(201).json(todo);
}

export async function updateTodo(req, res) {
  const { title } = req.body;

  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res.status(400).json({ error: "title cannot be empty" });
  }

  const todo = await todoService.updateTodo(req.params.id, req.body);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(todo);
}

export async function deleteTodo(req, res) {
  const deleted = await todoService.deleteTodo(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(204).end();
}
