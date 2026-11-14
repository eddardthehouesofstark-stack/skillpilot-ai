import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const subject = String(body.subject || "General Learning").slice(0, 80);
    const level = String(body.level || "Beginner").slice(0, 40);

    const incoming = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
    const messages = incoming
      .filter((item: any) =>
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string"
      )
      .map((item: any) => ({
        role: item.role,
        content: String(item.content).slice(0, 4000)
      }));

    if (!messages.length || messages[messages.length - 1].role !== "user") {
      return NextResponse.json(
        { error: "Please enter a question first." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: `You are SkillPilot AI Tutor, a friendly and patient personal tutor.
The learner is studying: ${subject}.
Their current level is: ${level}.

Teach clearly and accurately. Explain difficult ideas step by step.
Use simple language, practical examples, and readable Markdown.
For programming questions, include code examples when useful.
Do not pretend to know the learner's background beyond what they tell you.
If a question is unclear, ask a focused follow-up question.
Encourage understanding rather than simply giving answers.`
            },
            ...messages
          ],
          temperature: 0.5,
          max_completion_tokens: 1800
        })
      }
    );

    if (!response.ok) {
      console.error("Groq AI Tutor error:", response.status);
      return NextResponse.json(
        { error: "The AI tutor is temporarily unavailable. Please try again." },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;

    if (typeof answer !== "string" || !answer.trim()) {
      throw new Error("Empty AI response.");
    }

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("AI Tutor error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
