export default function Navbar() {
  return (
    <div style={styles.nav}>
      <h2>📚 Admin Dashboard</h2>
    </div>
  );
}

const styles = {
  nav: {
    background: "#111",
    color: "white",
    padding: "15px",
    textAlign: "center",
  },
};