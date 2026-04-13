import { db } from "../db/db.js";
import { books } from "../db/schema.js";
import { eq } from "drizzle-orm";


export const addBook = async (req, res) => {
  try {
    const { title, author, isbn, quantity, publishedYear } = req.body;

    // Validation
    if (!title || !author || !isbn || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Check if ISBN already exists
    const existingBook = await db
      .select()
      .from(books)
      .where(eq(books.isbn, isbn));

    if (existingBook.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Book with this ISBN already exists",
      });
    }

    // Insert book
    const newBook = await db
      .insert(books)
      .values({
        title,
        author,
        isbn,
        quantity,
        publishedYear,
      })
      .returning();

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook[0],
    });

  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};