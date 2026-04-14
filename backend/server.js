import e from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth.js";
import dotenv from "dotenv";
import booksRouter from "./src/routes/books.routes.js";
import borrowRouter from "./src/routes/borrow.routes.js";
import cors from "cors"



const app = e();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  })
);

dotenv.config();

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(e.json());

app.use("/api", booksRouter);
app.use("/api", borrowRouter);

app.listen(3001, () => {
  console.log(`Server running on port ${3001}`);
});
