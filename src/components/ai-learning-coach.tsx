"use client";

import { useState } from "react";

type Plan = {
  summary: string;
  skillGaps: { skill: string; importance: string; reason: string }[];
  weeklyPlan: { week: string; focus: string; tasks: string[] }[];
  resources: { title: string; provider: string; url: string; reason: string }[];
  projects: { title: string; description: string; skills: string[] }[];
};

const roles = [
  "Frontend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "UI/UX Designer"
];

export default function AILearningCoach() {
  const [role, setRole] = useState(roles[0]);
  const [level, setLevel] = useState("Beginner");
  const [goal, setGoal] = useState("");
  const [skills, setSkills] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generatePlan() {
    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const response = await fetch("/api/learning-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          level,
          goal,
          skills: skills.split(",").map(s => s.trim()).filter(Boolean)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not generate your plan.");
      }

      setPlan(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="sp-ai-coach">
      <style jsx>{`
        .sp-ai-coach {margin:0 0 30px;background:#fff;border:1px solid #e8ebe2;border-radius:17px;padding:23px;color:#25291f;}
        .sp-ai-coach h2 {font-size:21px;margin:0 0 8px;}
        .sp-ai-muted {font-size:12px;color:#858a7e;line-height:1.7;}
        .sp-ai-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px;margin-top:19px;}
        .sp-ai-field label {display:block;font-size:12px;font-weight:700;margin-bottom:7px;}
        .sp-ai-field input,.sp-ai-field select,.sp-ai-field textarea {width:100%;padding:11px;border:1px solid #e2e6dc;border-radius:9px;background:#fff;color:#303529;font:inherit;font-size:13px;}
        .sp-ai-field textarea {min-height:75px;resize:vertical;}
        .sp-ai-button {margin-top:16px;border:0;border-radius:9px;background:#29351f;color:white;padding:12px 17px;font-size:13px;font-weight:700;cursor:pointer;}
        .sp-ai-button:disabled {opacity:.6;cursor:wait;}
        .sp-ai-result {margin-top:24px;border-top:1px solid #edf0e9;padding-top:20px;}
        .sp-ai-result h3 {font-size:16px;margin:19px 0 10px;}
        .sp-ai-result p,.sp-ai-result li {font-size:13px;color:#666e60;line-height:1.7;}
        .sp-ai-item {padding:14px;border:1px solid #edf0e9;border-radius:11px;margin:9px 0;}
        .sp-ai-item strong {font-size:13px;}
        .sp-ai-item a {color:#587638;font-size:12px;font-weight:700;}
        .sp-ai-error {margin-top:14px;color:#b33d35;font-size:13px;}
        @media(max-width:600px) {.sp-ai-grid{grid-template-columns:1fr}.sp-ai-coach{padding:16px}}
      `}</style>

      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <span style={{fontSize:22}}>✳</span>
        <span style={{fontSize:10,fontWeight:800,letterSpacing:1,color:"#688348"}}>POWERED BY GROQ AI</span>
      </div>

      <h2>Your AI Learning Coach</h2>
      <p className="sp-ai-muted">
        Tell us where you want to go. SkillPilot will build a personalized learning plan for your career.
      </p>

      <div className="sp-ai-grid">
        <div className="sp-ai-field">
          <label>Career goal</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            {roles.map(item => <option key={item}>{item}</option>)}
          </select>
        </div>

        <div className="sp-ai-field">
          <label>Current experience</label>
          <select value={level} onChange={e => setLevel(e.target.value)}>
            {["Beginner","Intermediate","Advanced"].map(item => <option key={item}>{item}</option>)}
          </select>
        </div>

        <div className="sp-ai-field">
          <label>What do you want to achieve?</label>
          <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g. Become job-ready in 6 months" />
        </div>

        <div className="sp-ai-field">
          <label>Skills you already know</label>
          <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. HTML, CSS, JavaScript" />
        </div>
      </div>

      <button className="sp-ai-button" onClick={generatePlan} disabled={loading}>
        {loading ? "Creating your learning plan..." : "✳ Generate my AI learning plan"}
      </button>

      {error && <div className="sp-ai-error">{error}</div>}

      {plan && (
        <div className="sp-ai-result">
          <div style={{fontSize:10,fontWeight:800,color:"#688348",letterSpacing:1}}>YOUR PERSONALIZED PLAN</div>
          <p>{plan.summary}</p>

          <h3>Skills to improve</h3>
          {plan.skillGaps.map((item,i) => (
            <div className="sp-ai-item" key={i}>
              <strong>{item.skill} · {item.importance}</strong>
              <p>{item.reason}</p>
            </div>
          ))}

          <h3>Your 4-week roadmap</h3>
          {plan.weeklyPlan.map((item,i) => (
            <div className="sp-ai-item" key={i}>
              <strong>{item.week}: {item.focus}</strong>
              <ul>{item.tasks.map((task,j) => <li key={j}>{task}</li>)}</ul>
            </div>
          ))}

          <h3>Recommended learning resources</h3>
          {plan.resources.map((item,i) => (
            <div className="sp-ai-item" key={i}>
              <strong>{item.title}</strong>
              <p>{item.provider} · {item.reason}</p>
              {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer">Open resource ↗</a>}
            </div>
          ))}

          <h3>Portfolio projects</h3>
          {plan.projects.map((item,i) => (
            <div className="sp-ai-item" key={i}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <div className="sp-ai-muted">Skills: {item.skills.join(", ")}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
