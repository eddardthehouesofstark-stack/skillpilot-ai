import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key is not configured on the server." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const role = String(body.role || "").slice(0, 100);
    const level = String(body.level || "Beginner").slice(0, 50);
    const goal = String(body.goal || "").slice(0, 500);
    const skills = Array.isArray(body.skills)
      ? body.skills.slice(0, 20).map((s: unknown) => String(s).slice(0, 80))
      : [];

    if (!role) {
      return NextResponse.json(
        { error: "Please select a career role." },
        { status: 400 }
      );
    }

    const prompt = `
You are SkillPilot AI, a practical career learning coach.

Create a personalized learning plan using this learner profile:
Career role: ${role}
Current level: ${level}
Learning goal: ${goal || "Become job-ready"}
Existing skills: ${skills.join(", ") || "Not specified"}

Return ONLY a valid JSON object with this exact structure:
{
  "summary": "A concise personalized assessment",
  "skillGaps": [
    { "skill": "Skill name", "importance": "High", "reason": "Why it matters" }
  ],
  "weeklyPlan": [
    { "week": "Week 1", "focus": "Topic", "tasks": ["Task one", "Task two"] }
  ],
  "resources": [
    { "title": "Resource title", "provider": "Provider", "url": "https://official-resource-url", "reason": "Why it is useful" }
  ],
  "projects": [
    { "title": "Project name", "description": "What to build", "skills": ["Skill one"] }
  ]
}

Requirements:
- Include 3 to 5 skill gaps.
- Include a practical 4-week learning plan.
- Include 4 useful learning resources with real, reputable official URLs.
- Include 2 practical portfolio projects.
- Make the plan appropriate for the learner's level.
- Prefer free resources and official documentation.
- Do not claim the learner has skills they did not report.
- Keep all explanations clear and actionable.
`;

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
              content: "You are SkillPilot AI. Return valid JSON only."
            },
            { role: "user", content: prompt }
          ],
          temperature: 0.4,
          max_completion_tokens: 3500
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Groq could not generate recommendations. Check your model, API key and account access." },
        { status: response.status === 429 ? 429 : 502 }
      );
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content;

    if (typeof content !== "string" || !content.trim()) {
      throw new Error("The AI returned an empty response.");
    }

    content = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");

    const firstBrace = content.indexOf("{");
    const lastBrace = content.lastIndexOf("}");

    if (firstBrace < 0 || lastBrace < firstBrace) {
      throw new Error("The AI response was not valid JSON.");
    }

    const result = JSON.parse(content.slice(firstBrace, lastBrace + 1));

    if (!Array.isArray(result.skillGaps) ||
        !Array.isArray(result.weeklyPlan) ||
        !Array.isArray(result.resources) ||
        !Array.isArray(result.projects)) {
      throw new Error("The AI response is missing required sections.");
    }

    result.resources = result.resources.map((item: any) => ({
      ...item,
      url: typeof item.url === "string" &&
        /^https:\/\//i.test(item.url) ? item.url : ""
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Learning recommendation error:", error);
    return NextResponse.json(
      { error: "Unable to generate your learning plan. Please try again." },
      { status: 500 }
    );
  }
}
