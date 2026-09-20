export default function Home() {
  return (
    <main className="shell">
      <div className="brand-bar" aria-label="UVA Wise branding">
        <span className="brand-mark">UVA Wise</span>
      </div>

      <p className="eyebrow">Campus Life Survey</p>

      <h1>
        Explore the
        <span> Highland Cavs</span>
        <br />experience
      </h1>

      <p className="lede">
        A focused platform for understanding student life, belonging, and engagement across the UVA Wise community.
      </p>

      <div className="cta-row">
        <a className="primary" href="#start">
          Start survey
        </a>
        <a className="secondary" href="#insights">
          View insights
        </a>
      </div>

      <div className="status-card">
        <span className="status-dot" aria-hidden="true" />
        <div>
          <strong>Foundation online</strong>
          <p>Local development, database migrations, and health checks are configured for a smooth campus research workflow.</p>
        </div>
      </div>
    </main>
  );
}
