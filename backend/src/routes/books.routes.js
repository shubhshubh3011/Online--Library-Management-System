import e from "express";
import { addBook } from "../controller/book.controller.js";

const router = e.Router()

router.post('/books/create', addBook)
router.get("/books")


export default router