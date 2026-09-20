export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "2rem", fontFamily: "Segoe UI, Arial, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ margin: 0, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5b1120", fontWeight: 700 }}>UVA Wise</p>
        <h1 style={{ margin: "0.75rem 0 0.5rem", fontSize: "clamp(2.5rem, 7vw, 4rem)" }}>Page not found</h1>
        <p style={{ margin: 0, color: "#4a443e" }}>The page you requested could not be located.</p>
      </div>
    </main>
  );
}
