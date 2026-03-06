"use client";
import { useState, useRef, useEffect } from "react";

// ── Paste your portfolio data here (mirrors data.ts) ──────────────────────────
const PORTFOLIO_CONTEXT = `
Name: Hindhuja
Email: hindhujababu@gmail.com
Phone: +91 6369433371
Location: Kanchipuram, India
Status: Fresher, Open to Work

Education:
- BCA from Sri Sankara Arts & Science College, Kanchipuram (2022–2025), CGPA: 8.0
- HSC from Govt. Girls Hr. Sec. School, Kanchipuram (2021–2022), 67%
- SSLC from Govt. Girls Hr. Sec. School, Kanchipuram (2019–2021), 65%

Skills:
- Programming Languages: Python (Basics), Java (Basics)
- Web Development: HTML (Basics), CSS (Basics), Next.js (Learning)
- Database: SQL
- Tools: Tkinter, Git

Projects:
- Resume Builder: A GUI-based desktop application built using Python and Tkinter.
  Developed a user-friendly interface for resume creation.

Certifications:
- Programming in Python — Livewire (Certificate No: CO240729Z869184)

Strengths:
- Good Communication Skills
- Time Management Skills
- Problem Solving
- Eagerness to Learn

Languages known: English, Tamil
`;

const SUGGESTED = [
  "What skills does Hindhuja have?",
  "Tell me about her projects",
  "What is her education background?",
  "Is she open to work?",
  "What certifications does she have?",
];

type Message = { role: "user" | "assistant"; content: string };

export default function AIAssistant({ groqApiKey }: { groqApiKey: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    setError("");

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqApiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: `You are a friendly AI assistant embedded in Hindhuja's portfolio website. 
Your job is to answer visitor questions about Hindhuja based ONLY on the data below.
Be conversational, warm, and concise. If asked something not in the data, say you don't have that info.
Keep answers short (2-4 sentences max). Never make up information.

PORTFOLIO DATA:
${PORTFOLIO_CONTEXT}`,
            },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error?.message || "Groq API error");
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage(input);
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 200,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: open ? "#1a1a2e" : "#2dd4bf",
          border: open ? "1px solid #2dd4bf" : "none",
          color: open ? "#2dd4bf" : "#0a0a0f",
          fontSize: "1.4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(45,212,191,0.4)",
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        aria-label="Toggle AI Assistant"
      >
        {open ? "✕" : "✦"}
      </button>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: "fixed",
          bottom: "5.5rem",
          right: "2rem",
          zIndex: 199,
          width: "min(380px, calc(100vw - 2rem))",
          height: "520px",
          background: "#0f0f18",
          border: "1px solid #1e1e2e",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(45,212,191,0.08)",
          animation: "slideUp 0.2s ease",
        }}>

          {/* Header */}
          <div style={{
            padding: "1rem 1.25rem",
            borderBottom: "1px solid #1e1e2e",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "#0a0a0f",
          }}>
            <div style={{
              width: "36px", height: "36px",
              borderRadius: "50%",
              background: "rgba(45,212,191,0.12)",
              border: "1px solid rgba(45,212,191,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1rem", flexShrink: 0,
            }}>✦</div>
            <div>
              <p style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700, fontSize: "0.9rem", color: "#e2e8f0",
                margin: 0,
              }}>Ask about Hindhuja</p>
              <p style={{ fontSize: "0.72rem", color: "#2dd4bf", margin: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{
                  width: "5px", height: "5px", borderRadius: "50%",
                  background: "#2dd4bf", display: "inline-block",
                  animation: "blink 2s infinite",
                }} />
                AI Powered · Groq
              </p>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "1rem",
            display: "flex", flexDirection: "column", gap: "0.75rem",
          }}>
            {messages.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{
                  color: "#64748b", fontSize: "0.85rem", textAlign: "center",
                  padding: "1rem 0",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  Hi! Ask me anything about Hindhuja 👋
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {SUGGESTED.map((q) => (
                    <button key={q} onClick={() => sendMessage(q)} style={{
                      background: "rgba(45,212,191,0.06)",
                      border: "1px solid rgba(45,212,191,0.2)",
                      borderRadius: "8px",
                      padding: "0.5rem 0.75rem",
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "background 0.15s, color 0.15s",
                    }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(45,212,191,0.12)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f0";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(45,212,191,0.06)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "0.65rem 0.9rem",
                  borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: msg.role === "user" ? "#2dd4bf" : "#16161f",
                  color: msg.role === "user" ? "#0a0a0f" : "#e2e8f0",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  fontFamily: "'DM Sans', sans-serif",
                  border: msg.role === "assistant" ? "1px solid #1e1e2e" : "none",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{
                  padding: "0.65rem 1rem",
                  borderRadius: "12px 12px 12px 2px",
                  background: "#16161f",
                  border: "1px solid #1e1e2e",
                  display: "flex", gap: "4px", alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: "#2dd4bf", display: "inline-block",
                      animation: `bounce 1s ${i * 0.15}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "8px", padding: "0.6rem 0.8rem",
                color: "#fca5a5", fontSize: "0.8rem",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                ⚠ {error}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "0.75rem 1rem",
            borderTop: "1px solid #1e1e2e",
            display: "flex", gap: "0.5rem",
            background: "#0a0a0f",
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask something..."
              disabled={loading}
              style={{
                flex: 1,
                background: "#16161f",
                border: "1px solid #1e1e2e",
                borderRadius: "8px",
                padding: "0.6rem 0.9rem",
                color: "#e2e8f0",
                fontSize: "0.85rem",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={e => (e.target.style.borderColor = "#2dd4bf")}
              onBlur={e => (e.target.style.borderColor = "#1e1e2e")}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                background: input.trim() && !loading ? "#2dd4bf" : "#1e1e2e",
                border: "none",
                borderRadius: "8px",
                width: "38px", height: "38px",
                color: input.trim() && !loading ? "#0a0a0f" : "#64748b",
                fontSize: "1rem",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                transition: "all 0.2s",
                flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}