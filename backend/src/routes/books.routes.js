import e from "express";
import { addBook, deleteBook, getAllBooks} from "../controller/book.controller.js";

const router = e.Router();

router.post("/books/create", addBook);
router.get("/books", getAllBooks);
router.delete("/books/:id", deleteBook)

export default router;
