import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./db/db.js";
import { userRouter } from "./routes/userAuth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { noteRouter } from "./routes/note.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "PATCH", "PUT", "POST", "DELETE"],
  })
);

app.use("/", userRouter);
app.use("/", noteRouter);

connectDatabase().then(() => {
  console.log("Database connnected successfully!");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
