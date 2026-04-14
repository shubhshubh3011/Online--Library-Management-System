import { useState } from "react";
import API from "../api/axios";

export default function Borrow() {
  const [bookId, setBookId] = useState("");
  const [loading, setLoading] = useState(false);

  const borrowBook = async () => {
    if (!bookId.trim()) {
      alert("Please enter a Book ID");
      return;
    }

    const userId = localStorage.getItem("user_id");

    try {
      setLoading(true);

      await API.post("/borrow", { bookId, userId });

      alert("Book borrowed successfully ✅");
      setBookId("");
    } catch (err) {
      console.log(err);
      alert(
        err?.response?.data?.message || "Error borrowing book ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
    },
    button: {
      padding: "10px",
      backgroundColor: loading ? "#94a3b8" : "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: loading ? "not-allowed" : "pointer",
    },
    title: {
      textAlign: "center",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Borrow Book</h2>

      <input
        style={styles.input}
        placeholder="Enter Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />

      <button
        style={styles.button}
        onClick={borrowBook}
        disabled={loading}
      >
        {loading ? "Borrowing..." : "Borrow Book"}
      </button>
    </div>
  );
}