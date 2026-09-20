import Image from "next/image";

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="institutional-lockup" href="https://www.uvawise.edu/" aria-label="UVA Wise home">
          <Image src="/uva-wise-primary-logo.jpg" alt="UVA Wise" width={126} height={106} priority />
        </a>
        <span className="header-rule" aria-hidden="true" />
        <span className="site-name">Campus Life Survey</span>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Student voice · Campus experience</p>

        <h1 id="page-title">
          Your voice
          <span> shapes</span>
          <br />UVA Wise.
        </h1>

        <p className="lede">
          Tell us what&apos;s working, what could be better, and what would help you feel more connected to campus.
        </p>

        <div className="cta-row">
          <a className="primary" href="#survey">
            Take the survey <span aria-hidden="true">→</span>
          </a>
        </div>

        <p className="survey-meta">
          <span>10 minutes</span>
          <span aria-hidden="true">•</span>
          <span>Open to UVA Wise students</span>
          <span aria-hidden="true">•</span>
          <span>Responses are confidential</span>
        </p>
      </section>

      <section className="survey-card" id="survey" aria-labelledby="survey-title">
        <div className="survey-card-heading">
          <span className="status-dot" aria-hidden="true" />
          <p className="card-kicker">Campus Life Survey</p>
        </div>
        <h2 id="survey-title">Help build a stronger campus experience.</h2>
        <p>
          Your perspective helps UVA Wise understand belonging, engagement, and the everyday experiences that shape student life.
          The survey link will appear here when the feedback period opens.
        </p>
        <div className="topic-list" aria-label="Survey topics">
          <span>Belonging</span>
          <span>Engagement</span>
          <span>Campus experience</span>
        </div>
      </section>
    </main>
  );
}
