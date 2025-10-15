import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthAPI } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await AuthAPI.login({ email, password });
      login({ user: res.user, token: res.token });
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.wrap}>
      <div style={styles.card as any}>
        <h2 style={styles.title as any}>Sign In</h2>
        <form onSubmit={onSubmit} style={styles.form as any}>
          <input
            style={styles.input as any}
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input as any}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label style={styles.checkboxRow as any}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span style={{ marginLeft: 8 }}>Remember password</span>
          </label>
          {error && <div style={styles.error as any}>{error}</div>}
          <button disabled={loading} style={styles.button as any} type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div style={styles.footer as any}>
          Need an Account? <Link to="/signup">Register here</Link>
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
    background: "transparent",
  },
  card: {
    width: 380,
    background: "#fff",
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    padding: 24,
  },
  title: {
    margin: 0,
    marginBottom: 16,
    textAlign: "center",
    fontWeight: 600,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    height: 36,
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    padding: "0 12px",
    outline: "none",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    color: "#6b7280",
  },
  button: {
    height: 38,
    borderRadius: 6,
    background: "#1e90ff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  footer: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#6b7280",
  },
  error: {
    color: "#b91c1c",
    fontSize: 14,
  },
};
