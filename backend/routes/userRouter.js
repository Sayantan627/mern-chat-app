import express from "express";
import { getUsersForSidebar } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/", authenticateUser, getUsersForSidebar);

export default router;
