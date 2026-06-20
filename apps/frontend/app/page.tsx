async function getMessage() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);

  try {
    const response = await fetch("http://localhost:4000/api/message", {
      cache: "no-store",
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error("Backend request failed");
    }

    const data = (await response.json()) as { message: string };
    return data.message;
  } catch {
    return "Backend is not reachable yet.";
  } finally {
    clearTimeout(timeout);
  }
}

export default async function HomePage() {
  const message = await getMessage();

  return (
    <main className="app">
      <section className="panel">
        <p className="label">Cleaning Service</p>
        <h1>Next.js + Express + TypeScript</h1>
        <p>{message}</p>
      </section>
    </main>
  );
}
