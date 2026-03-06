"use client";
import { useState, useEffect } from "react";
import { heroData, socialLinks } from "../../data/data";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % heroData.roles.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "6rem 2rem 4rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translateX(-50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(45,212,191,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Grid lines decoration */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "60px 60px", opacity: 0.3,
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", width: "100%", position: "relative" }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "var(--teal-glow)", border: "1px solid rgba(45,212,191,0.3)",
          borderRadius: "999px", padding: "0.35rem 1rem",
          marginBottom: "2rem",
          animation: "fadeUp 0.6s ease both",
        }}>
          <span style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "var(--teal)", display: "inline-block",
            boxShadow: "0 0 8px var(--teal)",
            animation: "pulse 2s infinite",
          }} />
          <span style={{ fontSize: "0.8rem", color: "var(--teal)", fontFamily: "var(--font-display)", letterSpacing: "0.1em" }}>
            Open to Opportunities
          </span>
        </div>

        {/* Greeting */}
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "1.1rem",
          color: "var(--text-dim)", marginBottom: "0.5rem",
          animation: "fadeUp 0.6s 0.1s ease both", opacity: 0,
        }}>
          {heroData.greeting}
        </p>

        {/* Name */}
        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 1,
          letterSpacing: "-0.03em", marginBottom: "1rem",
          animation: "fadeUp 0.6s 0.2s ease both", opacity: 0,
        }}>
          {heroData.name}
          <span style={{ color: "var(--teal)" }}>.</span>
        </h1>

        {/* Animated role */}
        <div style={{
          height: "3rem", marginBottom: "1.5rem",
          animation: "fadeUp 0.6s 0.3s ease both", opacity: 0,
        }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: "var(--teal)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s, transform 0.4s",
            display: "inline-block",
          }}>
            {heroData.roles[roleIndex]}
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: "1.05rem", color: "var(--text-dim)",
          maxWidth: "540px", lineHeight: 1.8, marginBottom: "2.5rem",
          animation: "fadeUp 0.6s 0.4s ease both", opacity: 0,
        }}>
          {heroData.description}
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "1rem", flexWrap: "wrap",
          animation: "fadeUp 0.6s 0.5s ease both", opacity: 0,
        }}>
          <a href={heroData.ctaPrimary.href} style={{
            background: "var(--teal)", color: "#0a0a0f",
            padding: "0.75rem 2rem", borderRadius: "4px",
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: "0.9rem", letterSpacing: "0.05em",
            transition: "all 0.2s", display: "inline-block",
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {heroData.ctaPrimary.label}
          </a>
          <a href={heroData.ctaSecondary.href} style={{
            background: "transparent", border: "1px solid var(--border)",
            color: "var(--text)", padding: "0.75rem 2rem", borderRadius: "4px",
            fontFamily: "var(--font-display)", fontWeight: 600,
            fontSize: "0.9rem", letterSpacing: "0.05em",
            transition: "all 0.2s", display: "inline-block",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--teal)";
              e.currentTarget.style.color = "var(--teal)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text)";
            }}
          >
            {heroData.ctaSecondary.label}
          </a>

          {/* Social Links */}
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" style={{
              border: "1px solid var(--border)", borderRadius: "4px",
              padding: "0.75rem 1rem", color: "var(--text-dim)",
              fontSize: "0.9rem", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--teal)"; e.currentTarget.style.color = "var(--teal)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-dim)"; }}
            >
              GitHub ↗
            </a>
          )}
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: "-3rem", left: 0,
          display: "flex", alignItems: "center", gap: "0.75rem",
          color: "var(--text-muted)", fontSize: "0.75rem",
          fontFamily: "var(--font-display)", letterSpacing: "0.1em",
          animation: "fadeUp 0.6s 0.8s ease both", opacity: 0,
        }}>
          <span style={{
            display: "inline-block", width: "1px", height: "40px",
            background: "linear-gradient(to bottom, var(--teal), transparent)",
            animation: "scrollPulse 2s infinite",
          }} />
          SCROLL
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.5; transform: scaleY(0.7); }
        }
      `}</style>
    </section>
  );
}