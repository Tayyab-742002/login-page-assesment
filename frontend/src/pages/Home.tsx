import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth();
  return (
    <div style={styles.wrap}>
      <div style={styles.card as any}>
        <h2 style={styles.title as any}>
          Welcome{user?.name ? `, ${user.name}` : ""}!
        </h2>
        <p style={{ marginTop: 8 }}>
          You are logged in as <strong>{user?.email}</strong>
        </p>
        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
          <button style={styles.button as any} onClick={logout}>
            Logout
          </button>
          {!user && <Link to="/login">Login</Link>}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1e90ff 0%, #4facfe 100%)",
  },
  card: {
    width: 480,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    padding: 24,
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontWeight: 600,
  },
  button: {
    height: 38,
    borderRadius: 6,
    background: "#1e90ff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    padding: "0 16px",
  },
};
