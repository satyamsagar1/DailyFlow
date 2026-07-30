import express from "express";
import { createTodo, getTodos,updateTodo,deleteTodo } from "../Controller/todoController.js";
import {authMiddleware} from "../Middleware/authMiddleware.js"

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTodo);
router.get("/", getTodos);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;


