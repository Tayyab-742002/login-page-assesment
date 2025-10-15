import React from "react";

export default function App() {
  const [message, setMessage] = React.useState<string>("Loading...");
  const apiBaseUrl =
    (import.meta as any).env?.VITE_API_URL || "http://localhost:4000";

  React.useEffect(() => {
    fetch(`${apiBaseUrl}/`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMessage(data?.message ?? "OK");
      })
      .catch((err) => setMessage(`Error: ${err.message}`));
  }, [apiBaseUrl]);

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      <h1>Frontend ↔ Backend check</h1>
      <p>GET / from backend: {message}</p>
    </div>
  );
}

