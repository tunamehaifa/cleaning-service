"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
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
        <h1>Next.js + Express + TypeScript</h1>
        <p>{message}</p>
      </section>
    </main>
  );
}
