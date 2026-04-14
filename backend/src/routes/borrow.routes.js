import e from "express";
import { borrowBook, getUserBooks, returnBook } from "../controller/borrow.controller.js";

const router = e.Router();

router.post("/borrow", borrowBook);
router.post("/return", returnBook);
router.get("/borrowed/:userId", getUserBooks);

export default router;
