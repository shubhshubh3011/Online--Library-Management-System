import e from "express";
import { borrowBook, returnBook } from "../controller/borrow.controller.js";

const router = e.Router();

router.post("/borrow", borrowBook);
router.post("/return", returnBook);

export default router;
