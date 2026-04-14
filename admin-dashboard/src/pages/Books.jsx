import { useEffect, useState } from "react";
import API from "../api/api";

export default function Books() {
  const [books, setBooks] = useState([]);

  // 📡 FETCH BOOKS FROM BACKEND
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data.data); // adjust if backend sends {data: books}
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  // // 🗑 DELETE BOOK FROM BACKEND
  const deleteBook = async (id) => {
    try {
      await API.delete(`/books/${id}`);

      // update UI after delete
      setBooks((prev) => prev.filter((b) => b.id !== id));

      alert(`Book Deleted Successfully`);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div>
      <h2>📚 Books</h2>

      {books.length === 0 ? (
        <p>No books found</p>
      ) : (
        books.map((book) => (
          <div key={book.id} style={styles.card}>
            <h3>{book.title}</h3>
            <p>Published Year: {book.publishedYear}</p>
            {/* <p>{book.quantity}</p> */}

            <button onClick={() => deleteBook(book.id)} style={styles.btn}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px 0",
  },
  btn: {
    background: "red",
    color: "white",
    padding: "5px",
    border: "none",
  },
};