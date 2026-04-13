import e from "express";
import { addBook, getAllBooks } from "../controller/book.controller.js";

const router = e.Router();

router.post("/books/create", addBook);
router.get("/books", getAllBooks);

export default router;
