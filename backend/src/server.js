import express from "express";
import cors from "cors";
import { sequelize } from "./db/index.js";
import todoRoutes from "./modules/todo/todo.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Todo Tracker API is running",
  });
});

app.use("/todos", todoRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

start();
