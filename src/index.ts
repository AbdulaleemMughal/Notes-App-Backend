import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./db/db.js";
import { userRouter } from "./routes/userAuth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { noteRouter } from "./routes/note.js";
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://notes-app-frontend-ikq1.vercel.app/'],
    credentials: true,
    methods: ["GET", "PATCH", "PUT", "POST", "DELETE"],
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
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
