"use client";

import { useMemo, useState } from "react";

type Section = "Dashboard" | "Career Intelligence" | "Study Resources" | "Assessments" | "AI Tutor";

const resources = [
  { title: "JavaScript Fundamentals", type: "Course", level: "Beginner", category: "Programming", time: "4 hours" },
  { title: "React — The Complete Guide", type: "Video", level: "Intermediate", category: "Web Development", time: "8 hours" },
  { title: "Python for Everybody", type: "Course", level: "Beginner", category: "Programming", time: "6 hours" },
  { title: "Data Structures and Algorithms", type: "Practice", level: "Intermediate", category: "Computer Science", time: "5 hours" },
  { title: "Build Your First AI App", type: "Project", level: "Intermediate", category: "Artificial Intelligence", time: "3 hours" },
];

const questions = [
  { question: "Which JavaScript keyword declares a block-scoped variable that can be reassigned?", options: ["var", "let", "const", "static"], answer: 1 },
  { question: "What does API stand for?", options: ["Application Programming Interface", "Applied Program Integration", "Advanced Platform Internet", "Application Process Instruction"], answer: 0 },
  { question: "Which data structure follows the FIFO principle?", options: ["Stack", "Tree", "Queue", "Graph"], answer: 2 },
];

const nav: { name: Section; icon: string }[] = [
  { name: "Dashboard", icon: "⌂" },
  { name: "Career Intelligence", icon: "◈" },
  { name: "Study Resources", icon: "▤" },
  { name: "Assessments", icon: "✓" },
  { name: "AI Tutor", icon: "✳" },
];

export default function DashboardPage() {
  const [active, setActive] = useState<Section>("Dashboard");
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; text: string }[]>([
    { role: "tutor", text: "Hi! I'm your SkillPilot study assistant. Ask me about a concept, get an explanation, or request a practice question." }
  ]);

  const filteredResources = useMemo(
    () => resources.filter(r => `${r.title} ${r.category} ${r.type}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const score = questions.reduce((total, q, i) => total + (answers[i] === q.answer ? 1 : 0), 0);

  function sendMessage() {
    const value = message.trim();
    if (!value) return;
    setChat(current => [
      ...current,
      { role: "you", text: value },
      { role: "tutor", text: "This is the SkillPilot demo tutor. Your question has been received. Connect the AI Tutor API to generate personalized explanations, examples and practice exercises." }
    ]);
    setMessage("");
  }

  return (
    <main className="sp-shell">
      <style>{`
        * { box-sizing: border-box; }
        .sp-shell { min-height:100vh; background:#f7f8f6; color:#20251f; font-family:Arial,Helvetica,sans-serif; display:flex; }
        .sp-sidebar { width:250px; flex-shrink:0; background:#fff; border-right:1px solid #e9ece7; padding:26px 18px; display:flex; flex-direction:column; }
        .sp-brand { font-size:23px; font-weight:800; letter-spacing:-1px; padding:0 12px 34px; }
        .sp-brand span { color:#a2c94d; }
        .sp-nav-label { font-size:10px; font-weight:700; color:#9ba198; letter-spacing:1.5px; padding:0 12px 12px; }
        .sp-nav { border:0; background:transparent; width:100%; padding:12px; border-radius:10px; display:flex; align-items:center; gap:12px; text-align:left; color:#70786d; font-size:13px; font-weight:600; cursor:pointer; margin-bottom:5px; }
        .sp-nav:hover,.sp-nav.active { background:#f0f5e7; color:#354a19; }
        .sp-nav-icon { width:22px; font-size:18px; text-align:center; }
        .sp-side-bottom { margin-top:auto; border-top:1px solid #edf0eb; padding:18px 10px 0; color:#8a9185; font-size:11px; line-height:1.7; }
        .sp-main { flex:1; min-width:0; padding:30px 4.5%; max-width:1600px; margin:0 auto; }
        .sp-top { display:flex; align-items:center; justify-content:space-between; gap:15px; margin-bottom:34px; }
        .sp-eyebrow { color:#8b9484; font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; }
        .sp-title { font-size:30px; letter-spacing:-1.3px; margin:7px 0; font-weight:750; }
        .sp-subtitle { color:#858d81; font-size:13px; line-height:1.6; }
        .sp-avatar { width:39px; height:39px; border-radius:50%; background:#eaf1dc; color:#496326; display:grid; place-items:center; font-weight:800; }
        .sp-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin:24px 0; }
        .sp-card { background:#fff; border:1px solid #e9ece6; border-radius:15px; padding:20px; min-width:0; }
        .sp-stat-label { color:#899185; font-size:12px; }
        .sp-stat-value { font-size:29px; font-weight:750; letter-spacing:-1px; margin:12px 0 5px; }
        .sp-stat-note { color:#81945d; font-size:11px; }
        .sp-section-title { font-size:17px; font-weight:750; margin:0 0 16px; letter-spacing:-.4px; }
        .sp-columns { display:grid; grid-template-columns:minmax(0,1.5fr) minmax(250px,1fr); gap:16px; }
        .sp-progress-row { margin:18px 0; }
        .sp-progress-head { display:flex; justify-content:space-between; font-size:12px; margin-bottom:9px; gap:10px; }
        .sp-progress-head span:last-child { color:#87917d; }
        .sp-track { height:7px; background:#edf0e9; border-radius:20px; overflow:hidden; }
        .sp-fill { height:100%; border-radius:20px; background:#a6c95b; }
        .sp-task { display:flex; gap:12px; align-items:center; padding:13px 0; border-bottom:1px solid #f0f1ed; }
        .sp-task:last-child { border:0; }
        .sp-task-icon { width:35px; height:35px; display:grid; place-items:center; background:#f1f5e9; border-radius:10px; }
        .sp-task-title { font-size:12px; font-weight:700; }
        .sp-task-sub { font-size:11px; color:#92998d; margin-top:4px; }
        .sp-button { border:0; border-radius:9px; padding:11px 16px; background:#b4d56b; color:#253414; font-weight:750; font-size:12px; cursor:pointer; }
        .sp-button:hover { background:#a4c65a; }
        .sp-button.secondary { background:#f0f3eb; color:#4c5940; }
        .sp-list { display:grid; gap:12px; }
        .sp-item { background:#fff; border:1px solid #e9ece6; border-radius:13px; padding:17px; display:flex; align-items:center; justify-content:space-between; gap:14px; }
        .sp-item h3 { font-size:14px; margin:0 0 6px; }
        .sp-item p { font-size:11px; color:#8a9285; margin:0; }
        .sp-tag { display:inline-block; background:#f0f4e9; color:#657c3e; border-radius:20px; padding:5px 9px; font-size:10px; margin:0 5px 5px 0; }
        .sp-input { width:100%; border:1px solid #e5e9e1; background:#fff; border-radius:10px; padding:12px 14px; font:inherit; font-size:13px; outline:none; }
        .sp-input:focus { border-color:#a9c96b; }
        .sp-option { display:block; width:100%; text-align:left; padding:12px 14px; border:1px solid #e8ebe5; border-radius:10px; margin-top:8px; background:#fff; font-size:12px; cursor:pointer; color:#394035; }
        .sp-option.selected { border-color:#9cbd5b; background:#f3f7eb; }
        .sp-option:disabled { cursor:default; }
        .sp-chat { height:350px; overflow:auto; background:#fff; border:1px solid #e9ece6; border-radius:14px; padding:18px; display:flex; flex-direction:column; gap:12px; }
        .sp-bubble { max-width:85%; padding:12px 14px; border-radius:12px; font-size:12px; line-height:1.6; }
        .sp-bubble.tutor { background:#f0f4e9; align-self:flex-start; }
        .sp-bubble.you { background:#e6edda; align-self:flex-end; }
        .sp-mobile-nav { display:none; }
        @media(max-width:1000px) { .sp-sidebar{width:210px}.sp-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sp-main{padding:25px 3%} }
        @media(max-width:700px) { .sp-shell{display:block}.sp-sidebar{width:100%;padding:13px 14px;border-right:0;border-bottom:1px solid #e9ece7}.sp-brand{padding:0 7px 13px}.sp-nav-label,.sp-side-bottom{display:none}.sp-nav-wrap{display:flex;overflow-x:auto;gap:5px}.sp-nav{white-space:nowrap;width:auto;padding:9px 11px;font-size:11px;margin:0}.sp-nav-icon{display:none}.sp-main{padding:22px 16px}.sp-title{font-size:25px}.sp-columns{grid-template-columns:1fr}.sp-grid{gap:9px}.sp-card{padding:15px}.sp-stat-value{font-size:24px}.sp-top{margin-bottom:25px} }
        @media(max-width:390px) { .sp-grid{grid-template-columns:1fr 1fr}.sp-stat-value{font-size:21px}.sp-item{align-items:flex-start;flex-direction:column} }
      `}</style>

      <aside className="sp-sidebar">
        <div className="sp-brand">skillpilot<span>.</span></div>
        <div className="sp-nav-label">WORKSPACE</div>
        <div className="sp-nav-wrap">
          {nav.map(item => (
            <button key={item.name} className={`sp-nav ${active === item.name ? "active" : ""}`} onClick={() => setActive(item.name)}>
              <span className="sp-nav-icon">{item.icon}</span>{item.name}
            </button>
          ))}
        </div>
        <div className="sp-side-bottom">SKILLPILOT AI<br />Your learning journey, intelligently guided.<br /><br />MVP preview · Demo workspace</div>
      </aside>

      <section className="sp-main">
        <header className="sp-top">
          <div>
            <div className="sp-eyebrow">YOUR LEARNING WORKSPACE</div>
            <h1 className="sp-title">{active === "Dashboard" ? "Welcome back, Learner" : active}</h1>
            <div className="sp-subtitle">Build skills. Discover opportunities. Move forward.</div>
          </div>
          <div className="sp-avatar">S</div>
        </header>

        {active === "Dashboard" && <>
          <div className="sp-grid">
            {[["Learning progress","68%","↑ 12% this month"],["Skills in progress","08","Across 3 learning areas"],["Learning streak","06 days","Keep your momentum"],["Assessments passed","04","Demo performance"]].map(s => (
              <div className="sp-card" key={s[0]}><div className="sp-stat-label">{s[0]}</div><div className="sp-stat-value">{s[1]}</div><div className="sp-stat-note">{s[2]}</div></div>
            ))}
          </div>
          <div className="sp-columns">
            <div className="sp-card">
              <h2 className="sp-section-title">Your learning progress</h2>
              {[["Web Development",75],["Python Programming",60],["Data Structures",42],["Artificial Intelligence",25]].map(p => (
                <div className="sp-progress-row" key={p[0]}><div className="sp-progress-head"><strong>{p[0]}</strong><span>{p[1]}%</span></div><div className="sp-track"><div className="sp-fill" style={{width:`${p[1]}%`}} /></div></div>
              ))}
            </div>
            <div className="sp-card">
              <h2 className="sp-section-title">Continue learning</h2>
              {[["▶","React fundamentals","Lesson 6 · 20 min"],["⌘","Python practice","Exercise 3 · 15 min"],["✦","AI foundations","Module 2 · 30 min"]].map(t => <div className="sp-task" key={t[1]}><div className="sp-task-icon">{t[0]}</div><div><div className="sp-task-title">{t[1]}</div><div className="sp-task-sub">{t[2]}</div></div></div>)}
              <button className="sp-button" style={{marginTop:15}} onClick={() => setActive("Study Resources")}>Explore resources →</button>
            </div>
          </div>
        </>}

        {active === "Career Intelligence" && <>
          <div className="sp-card" style={{marginBottom:18,background:"#f0f5e7"}}>
            <div className="sp-eyebrow">CAREER DIRECTION · DEMO ANALYSIS</div>
            <h2 style={{fontSize:23,margin:"10px 0"}}>Your next opportunity starts with the right skills.</h2>
            <p className="sp-subtitle">Explore a sample career pathway and the capabilities you can develop to move toward it.</p>
          </div>
          <div className="sp-columns">
            <div className="sp-card"><h2 className="sp-section-title">Recommended career paths</h2>
              {[["Frontend Developer","Build responsive web experiences","High alignment"],["Full Stack Developer","Build complete web applications","Growing pathway"],["AI Application Developer","Create products powered by AI","Emerging pathway"]].map(x=><div className="sp-task" key={x[0]}><div className="sp-task-icon">◈</div><div style={{flex:1}}><div className="sp-task-title">{x[0]}</div><div className="sp-task-sub">{x[1]}</div><span className="sp-tag">{x[2]}</span></div></div>)}
            </div>
            <div className="sp-card"><h2 className="sp-section-title">Skills to strengthen</h2>
              {[["JavaScript",80],["React",55],["APIs",35],["SQL",25],["Git",65]].map(x=><div className="sp-progress-row" key={x[0]}><div className="sp-progress-head"><strong>{x[0]}</strong><span>{x[1]}% · demo</span></div><div className="sp-track"><div className="sp-fill" style={{width:`${x[1]}%`}}/></div></div>)}
            </div>
          </div>
          <div className="sp-card" style={{marginTop:16}}><h2 className="sp-section-title">Suggested roadmap</h2><div className="sp-list">{["Strengthen JavaScript fundamentals","Build two React projects","Learn REST APIs and database basics","Create and deploy a portfolio project"].map((x,i)=><div className="sp-task" key={x}><div className="sp-task-icon">{i+1}</div><div><div className="sp-task-title">{x}</div><div className="sp-task-sub">Suggested milestone · Demo roadmap</div></div></div>)}</div></div>
        </>}

        {active === "Study Resources" && <>
          <div className="sp-card" style={{marginBottom:18}}><h2 className="sp-section-title">Find your next learning resource</h2><input className="sp-input" placeholder="Search courses, topics or skills..." value={search} onChange={e=>setSearch(e.target.value)}/><p className="sp-subtitle" style={{marginTop:10}}>Browse the sample library. External discovery integrations can be connected next.</p></div>
          <div className="sp-list">{filteredResources.map(r=><div className="sp-item" key={r.title}><div><h3>{r.title}</h3><p>{r.category} · {r.level} · {r.time}</p><div style={{marginTop:9}}><span className="sp-tag">{r.type}</span><span className="sp-tag">{r.level}</span></div></div><button className="sp-button secondary" onClick={()=>alert(`${r.title} selected. Add the course content integration to open this resource.`)}>View resource</button></div>)}{filteredResources.length===0&&<div className="sp-card">No matching resources. Try another search.</div>}</div>
        </>}

        {active === "Assessments" && <>
          <div className="sp-card" style={{marginBottom:18}}><div className="sp-eyebrow">KNOWLEDGE CHECK · DEMO QUIZ</div><h2 className="sp-section-title" style={{marginTop:9}}>Programming fundamentals</h2><p className="sp-subtitle">Choose one answer for each question, then submit to see your score.</p><span className="sp-tag">3 questions</span><span className="sp-tag">Instant demo scoring</span></div>
          {questions.map((q,i)=><div className="sp-card" key={q.question} style={{marginBottom:13}}><h3 style={{fontSize:14,margin:"0 0 12px"}}>{i+1}. {q.question}</h3>{q.options.map((o,j)=><button disabled={submitted} key={o} className={`sp-option ${answers[i]===j?"selected":""}`} onClick={()=>setAnswers(a=>a.map((v,k)=>k===i?j:v))}>{String.fromCharCode(65+j)}. {o}</button>)}</div>)}
          {!submitted?<button className="sp-button" disabled={answers.some(a=>a<0)} onClick={()=>setSubmitted(true)}>Submit assessment</button>:<div className="sp-card"><h2 className="sp-section-title">Your result: {score} / {questions.length}</h2><p className="sp-subtitle">{score===3?"Excellent work!":score===2?"Good progress. Review the question you missed.":"Keep practicing. Revisit the fundamentals and try again."} This is a sample assessment, not a verified skill certification.</p><button className="sp-button" onClick={()=>{setAnswers([-1,-1,-1]);setSubmitted(false)}}>Try again</button></div>}
        </>}

        {active === "AI Tutor" && <>
          <div className="sp-card" style={{marginBottom:16,background:"#f0f5e7"}}><div className="sp-eyebrow">YOUR STUDY COMPANION</div><h2 style={{fontSize:22,margin:"9px 0"}}>Learn by asking questions.</h2><p className="sp-subtitle">This interface is ready for your real AI provider integration. Current replies are demo responses.</p></div>
          <div className="sp-chat">{chat.map((m,i)=><div key={i} className={`sp-bubble ${m.role==="you"?"you":"tutor"}`}>{m.text}</div>)}</div>
          <div style={{display:"flex",gap:9,marginTop:12}}><input className="sp-input" placeholder="Ask a learning question..." value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendMessage()}}/><button className="sp-button" onClick={sendMessage}>Send</button></div>
        </>}
        <footer style={{padding:"28px 0 10px",fontSize:10,color:"#a0a69b"}}>SKILLPILOT AI · MVP PREVIEW · Sample metrics and recommendations are illustrative demo data.</footer>
      </section>
    </main>
  );
}
