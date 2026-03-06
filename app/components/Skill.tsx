"use client";

const skills = [
  { category: "Programming", color: "#2dd4bf", items: ["Python", "Java"] },
  { category: "Web Development", color: "#818cf8", items: ["HTML", "CSS", "Next.js"] },
  { category: "Database", color: "#fb923c", items: ["SQL"] },
  { category: "Tools", color: "#34d399", items: ["Tkinter", "Git"] },
];

export default function Skill() {
  return (
    <section id="skills" style={{
      padding: "6rem 2rem",
      background: "#13131a",
      borderTop: "1px solid #1e1e2e",
      borderBottom: "1px solid #1e1e2e",
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "#2dd4bf",
          marginBottom: "0.5rem",
          display: "block",
        }}>
          What I Know
        </span>

        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          color: "#e2e8f0",
          marginBottom: "3rem",
          lineHeight: 1.1,
        }}>
          My <span style={{ color: "#2dd4bf" }}>Skills</span>
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
        }}>
          {skills.map((group) => (
            <div key={group.category} style={{
              background: "#111118",
              border: "1px solid #1e1e2e",
              borderRadius: "12px",
              padding: "1.5rem",
            }}>

              {/* Header */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "1.25rem",
              }}>
                <span style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: group.color,
                  boxShadow: `0 0 8px ${group.color}`,
                  flexShrink: 0,
                }} />
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: group.color,
                  margin: 0,
                }}>
                  {group.category}
                </h3>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "0.5rem" }}>
                {group.items.map((item) => (
                  <span key={item} style={{
                    background: `${group.color}18`,
                    border: `1px solid ${group.color}40`,
                    color: "#e2e8f0",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "999px",
                    fontSize: "0.85rem",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 500,
                  }}>
                    {item}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}