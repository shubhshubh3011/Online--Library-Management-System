import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/sign-up/email", {
        name,
        email,
        password,
      });

      alert("Registration successful ✅");

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(
        err?.response?.data?.message || "Registration failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      maxWidth: "420px",
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
      backgroundColor: loading ? "#94a3b8" : "#2563eb",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: "500",
    },
    link: {
      textAlign: "center",
      fontSize: "14px",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>

      <input
        style={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <p style={styles.link}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}