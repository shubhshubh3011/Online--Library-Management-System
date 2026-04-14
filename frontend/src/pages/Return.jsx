import { useState } from "react";
import API from "../api/axios";

export default function Return() {
  const [bookId, setBookId] = useState("");
  const [loading, setLoading] = useState(false);

  const returnBook = async () => {
    if (!bookId.trim()) {
      alert("Please enter a Book ID");
      return;
    }

    try {
      setLoading(true);

      await API.post("/return", { borrowId: bookId });

      alert("Book returned successfully ✅");
      setBookId("");
    } catch (err) {
      console.log(err);
      alert(
        err?.response?.data?.message || "Error returning book ❌"
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
      backgroundColor: loading ? "#94a3b8" : "#f97316",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: "500",
    },
    title: {
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Return Book</h2>

      <input
        style={styles.input}
        placeholder="Enter Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />

      <button
        style={styles.button}
        onClick={returnBook}
        disabled={loading}
      >
        {loading ? "Returning..." : "Return Book"}
      </button>
    </div>
  );
}