import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/sign-in/email", {
        email,
        password,
      });

      console.log(res.data)

      localStorage.setItem("user_id", res.data.user.id);

      alert("Login successful ✅");
      navigate("/books");
    } catch (err) {
      console.log(err);
      alert(
        err?.response?.data?.message || "Login failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "60px auto",
      padding: "25px",
      borderRadius: "10px",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    title: {
      textAlign: "center",
      marginBottom: "10px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
    },
    button: {
      padding: "10px",
      backgroundColor: loading ? "#94a3b8" : "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: "500",
    },
    link: {
      textAlign: "center",
      marginTop: "10px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        style={styles.button}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={styles.link}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}