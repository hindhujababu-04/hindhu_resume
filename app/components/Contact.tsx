"use client";
import { personalInfo, socialLinks } from "../../data/data";

export default function Contact() {
  return (
    <section id="contact" style={{
      padding: "6rem 2rem",
      background: "var(--bg-card2)",
      borderTop: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p className="section-label">Get In Touch</p>
        <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
          Let's <span className="teal">Connect</span>
        </h2>
        <p style={{
          color: "var(--text-dim)", fontSize: "1.05rem",
          lineHeight: 1.8, marginBottom: "3rem",
          maxWidth: "500px", margin: "0 auto 3rem",
        }}>
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi — my inbox is always open!
        </p>

        {/* Contact cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem", marginBottom: "2.5rem",
        }}>
          {[
            { icon: "✉️", label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
            { icon: "📱", label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
            { icon: "📍", label: "Location", value: personalInfo.location, href: "#" },
          ].map((item) => (
            <a key={item.label} href={item.href} style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: "12px", padding: "1.5rem",
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "0.5rem", textDecoration: "none",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.1em", fontFamily: "var(--font-display)", textTransform: "uppercase" }}>
                {item.label}
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text)", fontFamily: "var(--font-display)", fontWeight: 500 }}>
                {item.value}
              </p>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a href={`mailto:${personalInfo.email}`} style={{
          display: "inline-block",
          background: "var(--teal)", color: "#0a0a0f",
          padding: "0.9rem 2.5rem", borderRadius: "4px",
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: "1rem", letterSpacing: "0.05em",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(45,212,191,0.3)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          Say Hello ✦
        </a>

        {/* Social Links */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" style={{
              color: "var(--text-muted)", fontSize: "0.9rem",
              fontFamily: "var(--font-display)", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              GitHub ↗
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={{
              color: "var(--text-muted)", fontSize: "0.9rem",
              fontFamily: "var(--font-display)", transition: "color 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              LinkedIn ↗
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
