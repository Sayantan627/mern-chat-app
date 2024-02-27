import "express-async-errors";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import { app, server } from "./socket/socket.js";
// import morgan from "morgan";
import cookieParser from "cookie-parser";

// db
import connectDB from "./db/connectDB.js";

// routers
import authRouter from "./routes/authRouter.js";
import messageRouter from "./routes/messageRouter.js";
import userRouter from "./routes/userRouter.js";

// middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import { authenticateUser } from "./middlewares/authMiddleware.js";

const __dirname = path.resolve();

// app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", authenticateUser, messageRouter);
app.use("/api/v1/users", userRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}...`);
});
