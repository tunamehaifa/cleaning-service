import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/message")
      .then((response) => response.json())
      .then((data: { message: string }) => setMessage(data.message))
      .catch(() => setMessage("Backend is not reachable yet."));
  }, []);

  return (
    <main className="app">
      <section className="panel">
        <p className="label">Matalenu</p>
        <h1>React + Express + TypeScript</h1>
        <p>{message}</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
