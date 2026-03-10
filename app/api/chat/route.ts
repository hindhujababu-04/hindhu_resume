import { NextRequest, NextResponse } from "next/server";
import {
  personalInfo,
  aboutData,
  education,
  skills,
  projects,
  certifications,
  strengths,
} from "../../../data/data";

const PORTFOLIO_CONTEXT = `
You are an AI assistant embedded in ${personalInfo.name}'s personal portfolio website.
Your job is to answer visitor questions about ${personalInfo.name} in a helpful and friendly tone.
Always speak about ${personalInfo.name} in third person using female pronouns (she/her).
Keep answers short and clear (2–4 sentences unless listing information).

If something is not available in the data, politely say you don't have that information and suggest contacting via the contact section.

--- PERSONAL INFO ---
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Tagline: ${personalInfo.tagline}
Location: ${personalInfo.location}
Email: ${personalInfo.email}
Phone: ${personalInfo.phone}
Available for Work: ${personalInfo.availableForWork ? "Yes" : "No"}

--- ABOUT ---
${aboutData.bio}
Languages Spoken: ${aboutData.languages.join(", ")}

--- EDUCATION ---
${education
  .map(
    (e) =>
      `• ${e.degree} at ${e.institution}, ${e.location} (${e.year}) — ${e.score}`
  )
  .join("\n")}

--- SKILLS ---
${skills
  .map(
    (s) =>
      `${s.category}: ${s.items.map((i) => `${i.name} (${i.level})`).join(", ")}`
  )
  .join("\n")}

--- PROJECTS ---
${projects
  .map(
    (p) =>
      `• ${p.title}: ${p.description} [Tech: ${p.techStack.join(", ")}]${p.features?.length ? "\n  Features: " + p.features.join(", ") : ""}`
  )
  .join("\n")}

--- CERTIFICATIONS ---
${certifications
  .map(
    (c) =>
      `• ${c.title} — ${c.issuer} (${c.year}), Certificate No: ${c.certificateNumber}`
  )
  .join("\n")}

--- STRENGTHS ---
${strengths.map(s => `• ${s}`).join("\n")}

--- IMPORTANT NOTES ---
- Hindhuja is a fresher (fresh graduate). She has NO internship or work experience yet.
- She is actively looking for her first job opportunity.
- If asked about internships or work experience, clarify she is a fresher seeking her first opportunity.
- Always use female pronouns (she/her) when referring to Hindhuja.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...messages,
          ],
          temperature: 0.6,
          max_tokens: 512,
        }),
      }
    );

    if (!groqRes.ok) {
      const err = await groqRes.text();
      console.error("Groq API error:", err);
      return NextResponse.json(
        { error: "Groq API error" },
        { status: 500 }
      );
    }

    const data = await groqRes.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}