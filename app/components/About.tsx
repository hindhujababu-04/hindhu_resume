import { aboutData, education, personalInfo } from "../../data/data";

export default function About() {
  return (
    <section id="about" style={{
      padding: "6rem 2rem",
      maxWidth: "1000px", margin: "0 auto",
    }}>
      <p className="section-label">Who I Am</p>
      <h2 className="section-title" style={{ marginBottom: "3rem" }}>
        About <span className="teal">Me</span>
      </h2>

      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr",
        gap: "3rem", alignItems: "start",
      }} className="about-grid">
        {/* Left: Bio + highlights */}
        <div>
          <p style={{
            color: "var(--text-dim)", fontSize: "1.05rem",
            lineHeight: 1.9, marginBottom: "2rem",
          }}>
            {aboutData.bio}
          </p>

          {/* Highlights */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
          }}>
            {aboutData.highlights.map((h) => (
              <div key={h.label} style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: "8px", padding: "1rem",
              }}>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-display)", marginBottom: "0.25rem" }}>
                  {h.label}
                </p>
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text)", fontSize: "0.95rem" }}>
                  {h.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Education */}
        <div>
          <h3 style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "1.1rem", color: "var(--text)", marginBottom: "1.5rem",
            paddingBottom: "0.75rem", borderBottom: "1px solid var(--border)",
          }}>
            Education
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {education.map((edu, i) => (
              <div key={i} style={{
                display: "flex", gap: "1rem", alignItems: "flex-start",
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "var(--teal-glow)", border: "1px solid rgba(45,212,191,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: "2px",
                }}>
                  <span style={{ fontSize: "0.8rem" }}>🎓</span>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--text)", fontSize: "0.95rem" }}>
                    {edu.degree}
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.15rem" }}>
                    {edu.institution}
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--teal)" }}>{edu.score}</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{edu.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}