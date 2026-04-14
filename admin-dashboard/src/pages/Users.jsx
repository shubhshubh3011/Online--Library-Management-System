import { useEffect, useState } from "react";
import API from "../api/api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading users...</h2>;
  }

  return (
    <div style={styles.container}>
      <h1>Users</h1>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => (
          <div key={user.id} style={styles.card}>
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>

            <button
              onClick={() => deleteUser(user.id)}
              style={styles.button}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  button: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
  },
};