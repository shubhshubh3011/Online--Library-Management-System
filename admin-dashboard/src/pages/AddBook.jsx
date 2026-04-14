import { useState } from "react";
import API from "../api/api";

export default function AddBook() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    quantity: 0,
    publishedYear: new Date().getFullYear(),
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/books/create", book);

      setMsg("Book added successfully!");

      setBook({
        title: "",
        author: "",
        isbn: "",
      });
    } catch (err) {
      console.error(err);
      setMsg("Error adding book");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Add Book</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          style={styles.input}
          required
        />

        {/* ISBN FIELD ADDED */}
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={book.isbn}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="ISBN"
          value={book.quantity}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="number"
          name="publishedYear"
          placeholder="ISBN"
          value={book.publishedYear}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Add Book
        </button>
      </form>

      {msg && <p>{msg}</p>}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};