import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 20px",
      backgroundColor: "#1e293b",
      color: "white",
    },
    left: {
      display: "flex",
      gap: "15px",
      alignItems: "center",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "16px",
    },
    right: {
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "6px 12px",
      backgroundColor: "#ef4444",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.navbar}>
      {/* Left side links */}
      <div style={styles.left}>
        <Link style={styles.link} to="/books">Books</Link>
        <Link style={styles.link} to="/borrow">Borrow</Link>
        <Link style={styles.link} to="/return">Return</Link>
        <Link style={styles.link} to="/register">Register</Link>
      </div>

      {/* Right side */}
      <div style={styles.right}>
        <button style={styles.button} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}