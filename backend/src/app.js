import express from "express";
import cors from "cors";

import authRoutes from "./Routes/authRoutes.js";
import todoRoutes from "./Routes/todoRoutes.js";

const app = express();

app.use(
  cors({
    origin: "https://daily-flow-ebon.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

export default app;
