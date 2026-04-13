import { db } from "../db/db.js";
import { books, borrow } from "../db/schema.js";
import { eq, and, gt, sql, isNull } from "drizzle-orm";

export const borrowBook = async (req, res) => {
  try {
    const { bookId, userId, days = 7 } = req.body;

    if (!bookId || !userId) {
      return res.status(400).json({
        success: false,
        message: "bookId and userId are required",
      });
    }

    // 1. Calculate due date
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + days);

    // 2. Atomic update (VERY IMPORTANT 🔥)
    const updatedBook = await db
      .update(books)
      .set({
        quantity: sql`${books.quantity} - 1`,
      })
      .where(
        and(
          eq(books.id, bookId),
          gt(books.quantity, 0), // ensures quantity > 0
        ),
      )
      .returning();

    // 3. If no row updated → book not available
    if (updatedBook.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Book not available",
      });
    }

    // 4. Create borrow record
    await db.insert(borrow).values({
      userId,
      bookId,
      dueDate,
    });

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
    });
  } catch (error) {
    console.error("Error borrowing book:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    if (!borrowId) {
      return res.status(400).json({
        success: false,
        message: "borrowId is required",
      });
    }

    // 1. Find active borrow record
    const borrowRecord = await db
      .select()
      .from(borrow)
      .where(
        and(
          eq(borrow.id, borrowId),
          isNull(borrow.returnedAt), // not returned yet
        ),
      );

    if (borrowRecord.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid or already returned",
      });
    }

    const bookId = borrowRecord[0].bookId;

    // 2. Mark as returned
    await db
      .update(borrow)
      .set({
        returnedAt: new Date(),
      })
      .where(eq(borrow.id, borrowId));

    // 3. Increase quantity
    await db
      .update(books)
      .set({
        quantity: sql`${books.quantity} + 1`,
      })
      .where(eq(books.id, bookId));

    res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
