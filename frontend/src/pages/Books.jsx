import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [borrowed, setBorrowed] = useState([]); // ✅ NEW
  const [hovered, setHovered] = useState(null);

  // ⚠️ TEMP USER ID (replace with login user later)
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/books");
      setBooks(res.data.data);
    };

    const loadBorrowed = async () => {
      const res = await API.get(`/borrowed/${userId}`);
      setBorrowed(res.data.data);
    };

    load();
    loadBorrowed();
  }, []);

  const styles = {
    container: { padding: "20px" },

    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
      color: "#1e293b",
    },

    sectionTitle: {
      marginTop: "40px",
      marginBottom: "15px",
      fontSize: "22px",
      fontWeight: "600",
      color: "#0f172a",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },

    card: (isHovered) => ({
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      padding: "16px",
      backgroundColor: "white",
      boxShadow: isHovered
        ? "0 10px 25px rgba(0,0,0,0.15)"
        : "0 2px 8px rgba(0,0,0,0.05)",
      transform: isHovered ? "translateY(-5px)" : "translateY(0)",
      transition: "all 0.25s ease",
      cursor: "pointer",
    }),

    bookTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#0f172a",
    },

    text: {
      margin: "4px 0",
      color: "#475569",
      fontSize: "14px",
    },

    badge: (available) => ({
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      marginTop: "8px",
      backgroundColor: available ? "#dcfce7" : "#fee2e2",
      color: available ? "#166534" : "#991b1b",
      fontWeight: "500",
    }),

    borrowCard: {
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginBottom: "10px",
      background: "#f8fafc",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📚 Books Collection</h2>

      {/* 📚 ALL BOOKS */}
      <div style={styles.grid}>
        {books.map((b, index) => (
          <div
            key={b._id}
            style={styles.card(hovered === index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <h3 style={styles.bookTitle}>{b.title}</h3>
            <p style={styles.text}>👤 Author: {b.author}</p>
            <p style={styles.text}>📦 Quantity: {b.quantity}</p>

            <div style={styles.badge(b.quantity > 0)}>
              {b.quantity > 0 ? "Available" : "Out of Stock"}
            </div>
          </div>
        ))}
      </div>

      {/* 📌 BORROWED BOOKS SECTION (NEW) */}
      <h3 style={styles.sectionTitle}>📌 Borrowed Books</h3>

      {borrowed.length === 0 ? (
        <p>No borrowed books</p>
      ) : (
        borrowed.map((b) => (
          <div key={b.borrowId} style={styles.borrowCard}>
            <h4>{b.title}</h4>
            <p>👤 Author: {b.author}</p>
            <p>🆔 Book_id: {b.borrowId}</p>
            <p>📅 Borrow Date: {b.borrowDate || "N/A"}</p>
          </div>
        ))
      )}
    </div>
  );
}