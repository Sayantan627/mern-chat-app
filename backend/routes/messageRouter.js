import express from "express";
const router = express.Router();
import { getMessages, sendMessage } from "../controllers/messageController.js";
import {
  validateIdParam,
  validateMessageInput,
} from "../middlewares/validationMiddleware.js";

router.get("/:id", validateIdParam, getMessages);
router.post("/send/:id", [validateIdParam, validateMessageInput], sendMessage);

export default router;
