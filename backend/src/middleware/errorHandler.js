export function notFoundHandler(req, res) {
  res.status(404).json({ error: "Route not found" });
}

export function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: err.errors.map((e) => e.message),
    });
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
}
