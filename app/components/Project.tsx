"use client";

import { projects } from "../../data/data";

export default function Project() {
  return (
    <section id="projects" style={{ padding: "6rem 2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <p className="section-label">What I've Built</p>

        <h2 className="section-title" style={{ marginBottom: "3rem" }}>
          My <span className="teal">Projects</span>
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--teal)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "8px",
                    background: "var(--teal-glow)",
                    border: "1px solid rgba(45,212,191,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  📁
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--teal)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-muted)")
                      }
                    >
                      GitHub ↗
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.85rem",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--teal)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-muted)")
                      }
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--text)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "auto",
                }}
              >
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      background: "var(--bg-card2)",
                      border: "1px solid var(--border)",
                      color: "var(--teal)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: "4px",
                      fontSize: "0.78rem",
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Placeholder */}
          <div
            style={{
              background: "transparent",
              border: "1px dashed var(--border)",
              borderRadius: "12px",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              minHeight: "200px",
            }}
          >
            <span style={{ fontSize: "2rem" }}>⚡</span>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                color: "var(--text-muted)",
                fontSize: "0.9rem",
                textAlign: "center",
              }}
            >
              More projects coming soon...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}