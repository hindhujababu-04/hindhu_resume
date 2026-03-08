"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { personalInfo } from "../../data/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What projects has Prasath built?",
  "What are his technical skills?",
  "Where has he interned?",
  "What certifications does he hold?",
  "How can I contact him?",
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      <div
        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold mt-1 ${
          isUser
            ? "bg-cyan-500 text-[#030d14]"
            : "bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/40 text-cyan-300"
        }`}
      >
        {isUser ? "U" : "AI"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed font-mono ${
          isUser
            ? "bg-cyan-500/20 border border-cyan-500/30 text-cyan-100 rounded-tr-sm"
            : "bg-[#0a1a26] border border-cyan-900/40 text-slate-300 rounded-tl-sm"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function AIAssistantModal() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm an AI assistant trained on ${personalInfo.name}'s portfolio. Ask me anything about his skills, projects, experience, or how to get in touch! 👋`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = { role: "user", content: trimmed };
      const updatedMessages = [...messages, userMsg];

      setMessages(updatedMessages);
      setInput("");
      setLoading(true);
      setShowSuggestions(false);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply ?? "Something went wrong. Please try again." },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Network error. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 group flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-[#030d14] font-mono font-bold text-sm shadow-[0_0_30px_rgba(0,200,255,0.35)] hover:shadow-[0_0_40px_rgba(0,200,255,0.55)] hover:from-cyan-400 hover:to-blue-400 transition-all duration-300"
        aria-label="Open AI Assistant"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-cyan-400/20 animate-ping group-hover:hidden" />

        <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.691-1.338 2.691H4.136c-1.368 0-2.337-1.69-1.338-2.69L4.2 15.3"
          />
        </svg>
        <span className="relative z-10">Ask AI</span>
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-[#030d14]/70 backdrop-blur-sm flex items-end sm:items-center justify-center sm:justify-end sm:pr-6 sm:pb-6"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          {/* Modal */}
          <div className="relative w-full sm:w-[420px] h-[85vh] sm:h-[600px] flex flex-col rounded-t-2xl sm:rounded-2xl bg-[#06121c] border border-cyan-900/40 shadow-[0_0_60px_rgba(0,200,255,0.1)] overflow-hidden animate-slide-up">

            {/* Scanline texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.015] z-0"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, rgba(0,200,255,1) 0px, rgba(0,200,255,1) 1px, transparent 1px, transparent 4px)",
              }}
            />

            {/* Header */}
            <div className="relative z-10 flex items-center gap-3 px-5 py-4 border-b border-cyan-900/30 bg-[#040e17]">
              {/* AI icon */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,200,255,0.2)]">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.691-1.338 2.691H4.136c-1.368 0-2.337-1.69-1.338-2.69L4.2 15.3" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-mono font-bold text-white text-sm leading-none">Portfolio AI</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs text-cyan-600">Powered by Groq · llama3-8b</span>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-900/40 flex items-center justify-center text-slate-500 hover:text-white hover:bg-cyan-500/20 transition-all"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 py-5 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-900/40">
              {messages.map((msg, i) => (
                <MessageBubble key={i} msg={msg} />
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-xs font-mono font-bold text-cyan-300 mt-1">
                    AI
                  </div>
                  <div className="bg-[#0a1a26] border border-cyan-900/40 rounded-2xl rounded-tl-sm">
                    <TypingDots />
                  </div>
                </div>
              )}

              {/* Suggested questions */}
              {showSuggestions && messages.length === 1 && (
                <div className="pt-2">
                  <p className="font-mono text-xs text-slate-600 mb-3 text-center tracking-widest uppercase">
                    Suggested questions
                  </p>
                  <div className="flex flex-col gap-2">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-left text-xs font-mono text-slate-400 px-3 py-2.5 rounded-xl border border-cyan-900/30 bg-[#0a1a26]/60 hover:border-cyan-500/40 hover:text-cyan-300 hover:bg-cyan-500/5 transition-all duration-200"
                      >
                        <span className="text-cyan-700 mr-2">›</span>
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="relative z-10 px-4 py-4 border-t border-cyan-900/30 bg-[#040e17]">
              <div className="flex items-center gap-2 bg-[#0a1a26] border border-cyan-900/40 rounded-xl px-4 py-2.5 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_12px_rgba(0,200,255,0.07)] transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about skills, projects..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm font-mono text-slate-300 placeholder:text-slate-700 focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="shrink-0 w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-[#030d14] hover:bg-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Send"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
              <p className="font-mono text-xs text-slate-700 text-center mt-2">
                Press <kbd className="text-slate-600">Enter</kbd> to send · <kbd className="text-slate-600">Esc</kbd> to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Slide-up animation */}
      <style jsx global>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .animate-slide-up {
          animation: slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}