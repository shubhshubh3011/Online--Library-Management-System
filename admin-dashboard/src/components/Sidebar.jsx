import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.logo}>📚 Admin</h2>

      <Link style={styles.link} to="/">Dashboard</Link>
      <Link style={styles.link} to="/books">Books</Link>
      {/* <Link to="/users">Users</Link> */}
      <Link style={styles.link} to="/add-book">Add Book</Link>
      {/* <Link to="/add-user">Add User</Link> */}
    </div>
  );
}

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "linear-gradient(180deg, #1f1f1f, #111)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    padding: "20px 15px",
    gap: "12px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.4)",
  },

  logo: {
    marginBottom: "20px",
    fontSize: "22px",
    textAlign: "center",
    color: "#00d4ff",
    letterSpacing: "1px",
  },

  link: {
    textDecoration: "none",
    color: "#ddd",
    padding: "10px 12px",
    borderRadius: "8px",
    transition: "0.2s",
    fontSize: "15px",
  },
};