"use client"

import { personalInfo, navLinks } from "../../data/data";

export default function Footer() {
  return (
    <footer style={{
      padding: "2.5rem 2rem",
      borderTop: "1px solid var(--border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "1rem",
    }}>
      <p style={{
        fontFamily: "var(--font-display)", color: "var(--text-muted)",
        fontSize: "0.85rem",
      }}>
        Designed & Built by{" "}
        <span style={{ color: "var(--teal)", fontWeight: 600 }}>{personalInfo.name}</span>
        {" "}· {new Date().getFullYear()}
      </p>

      <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} style={{
            color: "var(--text-muted)", fontSize: "0.8rem",
            fontFamily: "var(--font-display)", letterSpacing: "0.05em",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--teal)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}