"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Explain this topic with a simple example",
  "Teach me JavaScript from the beginning",
  "What is the difference between frontend and backend?",
  "Give me a practical coding exercise"
];

export default function AITutor() {
  const [subject, setSubject] = useState("Programming");
  const [level, setLevel] = useState("Beginner");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your SkillPilot AI Tutor. What would you like to learn today? Ask me anything, and I'll explain it step by step."
    }
  ]);

  async function sendMessage(value?: string) {
    const text = (value ?? question).trim();
    if (!text || loading) return;

    const updated: Message[] = [
      ...messages,
      { role: "user", content: text }
    ];

    setMessages(updated);
    setQuestion("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          level,
          messages: updated.filter((message, index) =>
            index !== 0 || message.role === "user"
          )
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response.");
      }

      setMessages(current => [
        ...current,
        { role: "assistant", content: data.answer }
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    setMessages([
      {
        role: "assistant",
        content: "New learning session started! What would you like to understand?"
      }
    ]);
    setError("");
    setQuestion("");
  }

  return (
    <section className="sp-tutor">
      <style jsx>{`
        .sp-tutor { color:#25291f; }
        .sp-tutor-head { display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
        .sp-tutor-title { font-size:23px; font-weight:750; margin:0 0 6px; }
        .sp-tutor-muted { color:#858a7e; font-size:13px; line-height:1.6; }
        .sp-tutor-controls { display:flex; gap:9px; flex-wrap:wrap; }
        .sp-tutor select { padding:10px 12px; border:1px solid #e3e8dc; border-radius:9px; background:white; color:#303529; font-size:12px; }
        .sp-tutor-chat { background:#fff; border:1px solid #e8ebe2; border-radius:16px; overflow:hidden; }
        .sp-tutor-messages { min-height:320px; max-height:520px; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:15px; }
        .sp-tutor-message { max-width:85%; padding:13px 15px; border-radius:13px; font-size:13px; line-height:1.75; white-space:pre-wrap; overflow-wrap:anywhere; }
        .sp-tutor-message.assistant { background:#f3f5ef; color:#333a2d; align-self:flex-start; }
        .sp-tutor-message.user { background:#29351f; color:white; align-self:flex-end; }
        .sp-tutor-label { font-size:10px; font-weight:800; letter-spacing:.8px; color:#81936b; margin-bottom:5px; }
        .sp-tutor-compose { border-top:1px solid #edf0e9; padding:14px; display:flex; gap:10px; align-items:flex-end; }
        .sp-tutor-compose textarea { flex:1; min-width:0; min-height:48px; max-height:120px; resize:vertical; border:1px solid #e2e6dc; border-radius:10px; padding:12px; font:inherit; font-size:13px; color:#303529; }
        .sp-tutor-send,.sp-tutor-new { border:0; border-radius:9px; padding:12px 15px; cursor:pointer; font-size:12px; font-weight:700; }
        .sp-tutor-send { background:#29351f; color:white; }
        .sp-tutor-new { background:#f0f3eb; color:#48583a; }
        .sp-tutor-send:disabled { opacity:.5; cursor:wait; }
        .sp-tutor-suggestions { display:flex; flex-wrap:wrap; gap:8px; margin:15px 0 18px; }
        .sp-tutor-suggestion { border:1px solid #e5e9df; border-radius:20px; padding:9px 12px; background:white; color:#5e6953; cursor:pointer; font-size:11px; }
        .sp-tutor-error { color:#b33d35; font-size:12px; padding:0 15px 12px; }
        @media(max-width:600px) { .sp-tutor-message{max-width:95%}.sp-tutor-messages{padding:13px}.sp-tutor-compose{padding:10px} }
      `}</style>

      <div className="sp-tutor-head">
        <div>
          <div className="sp-tutor-title">AI Tutor</div>
          <div className="sp-tutor-muted">Your personal learning companion, powered by Groq AI.</div>
        </div>
        <button className="sp-tutor-new" onClick={startNewChat}>+ New chat</button>
      </div>

      <div className="sp-tutor-controls">
        <select value={subject} onChange={e => setSubject(e.target.value)} aria-label="Choose subject">
          {["Programming","Mathematics","Science","Data Science","Web Development","General Learning"].map(item => <option key={item}>{item}</option>)}
        </select>
        <select value={level} onChange={e => setLevel(e.target.value)} aria-label="Choose experience level">
          {["Beginner","Intermediate","Advanced"].map(item => <option key={item}>{item}</option>)}
        </select>
      </div>

      <div className="sp-tutor-suggestions">
        {suggestions.map(item => (
          <button key={item} className="sp-tutor-suggestion" onClick={() => sendMessage(item)} disabled={loading}>
            {item}
          </button>
        ))}
      </div>

      <div className="sp-tutor-chat">
        <div className="sp-tutor-messages">
          {messages.map((message, index) => (
            <div key={index} className={`sp-tutor-message ${message.role}`}>
              {message.role === "assistant" && <div className="sp-tutor-label">SKILLPILOT AI</div>}
              {message.content}
            </div>
          ))}
          {loading && <div className="sp-tutor-message assistant">Thinking and preparing your explanation...</div>}
        </div>

        {error && <div className="sp-tutor-error">{error}</div>}

        <div className="sp-tutor-compose">
          <textarea
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask your tutor anything..."
            aria-label="Your question"
          />
          <button className="sp-tutor-send" onClick={() => sendMessage()} disabled={loading || !question.trim()}>
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
      <p className="sp-tutor-muted">Press Enter to send · Shift + Enter for a new line</p>
    </section>
  );
}
