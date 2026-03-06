"use client";
import { useState, useEffect } from "react";
import { navLinks, personalInfo } from "../../data/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* Logo */}
        <a href="#hero" className="logo">
          {personalInfo.name}
          <span className="logo-dot">.</span>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire Me button (desktop) */}
        <a href="#contact" className="hire-btn desktop-only">
          Hire Me
        </a>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "visible" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-hire"
          onClick={() => setMenuOpen(false)}
        >
          Hire Me
        </a>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 2rem;
          background: transparent;
          transition: background 0.3s ease, backdrop-filter 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(10, 10, 15, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
        }
        .logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.3rem;
          color: var(--teal);
          letter-spacing: -0.02em;
          text-decoration: none;
        }
        .logo-dot { color: var(--text); }
        .nav-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-link {
          font-family: var(--font-display);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-dim);
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--teal); }
        .hire-btn {
          background: transparent;
          border: 1px solid var(--teal);
          color: var(--teal);
          padding: 0.45rem 1.2rem;
          border-radius: 4px;
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .hire-btn:hover {
          background: var(--teal);
          color: #0a0a0f;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .bar {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--text);
          border-radius: 2px;
        }
        .mobile-menu {
          display: none;
          position: fixed;
          top: 64px;
          left: 0; right: 0;
          z-index: 99;
          background: rgba(10, 10, 15, 0.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          flex-direction: column;
          padding: 1.5rem 2rem;
          gap: 1rem;
          opacity: 0;
          transform: translateY(-10px);
          pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .mobile-menu.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: all;
        }
        .mobile-link {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-dim);
          text-decoration: none;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }
        .mobile-link:hover { color: var(--teal); }
        .mobile-hire {
          display: inline-block;
          margin-top: 0.5rem;
          background: var(--teal);
          color: #0a0a0f;
          padding: 0.65rem 1.5rem;
          border-radius: 4px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: none;
          text-align: center;
        }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .desktop-only { display: none; }
          .hamburger { display: flex; }
          .mobile-menu { display: flex; }
        }
      `}</style>
    </>
  );
}