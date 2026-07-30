import express from "express";
import { signup, login } from "../Controller/authController.js";

const router = express.Router();

// Register route
router.post("/register", signup);

// Login route
router.post("/login", login);

export default router;