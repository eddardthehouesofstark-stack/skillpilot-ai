"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Check, ChevronDown,
  Code2, Compass, GraduationCap, Menu, MoveUpRight, Play, Sparkles,
  Target, X, Zap,
} from "lucide-react";
import { initMotion } from "@/lib/motion";

const navItems = [
  ["Platform", "#platform"],
  ["How it works", "#how-it-works"],
  ["For your future", "#future"],
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="section-label"><span />{children}</div>;
}

function DashboardPreview() {
  return (
    <div className="dashboard-shell" aria-label="SkillPilot dashboard preview">
      <div className="dashboard-top">
        <div className="window-dots"><i /><i /><i /></div>
        <span>skillpilot / your workspace</span>
        <span className="live-pill"><b /> LIVE PREVIEW</span>
      </div>
      <div className="dashboard-content">
        <aside className="mini-sidebar">
          <div className="mini-brand"><span className="brand-mark small"><Sparkles size={13} /></span></div>
          <div className="mini-nav active"><Target size={15} /></div>
          <div className="mini-nav"><Compass size={15} /></div>
          <div className="mini-nav"><GraduationCap size={15} /></div>
          <div className="mini-nav"><BrainCircuit size={15} /></div>
        </aside>
        <div className="mini-main">
          <div className="mini-greeting">
            <div><span className="eyebrow">MONDAY, YOUR NEXT CHAPTER</span><h3>Good morning, Alex<span>.</span></h3><p>Small steps today. Extraordinary progress tomorrow.</p></div>
            <div className="avatar">A</div>
          </div>
          <div className="mini-stats">
            <div className="stat-card"><span>CAREER READINESS</span><strong>72<small>%</small></strong><div className="meter"><i style={{ width: "72%" }} /></div><em>â†‘ 8% this month</em></div>
            <div className="stat-card"><span>SKILLS IN PROGRESS</span><strong>08</strong><div className="skill-dots"><i /><i /><i /><i /><i /><i /><i /><i /></div><em>Across 3 learning paths</em></div>
          </div>
          <div className="mini-bottom">
            <div className="learning-card">
              <div className="card-heading"><span>YOUR LEARNING PATH</span><span className="muted">View all â†—</span></div>
              <div className="learning-row"><div className="course-icon purple"><Code2 size={16} /></div><div><b>Full-stack foundations</b><small>Module 4 Â· React essentials</small></div><strong>68%</strong></div>
              <div className="meter"><i style={{ width: "68%" }} /></div>
              <div className="learning-row second"><div className="course-icon mint"><BrainCircuit size={16} /></div><div><b>Applied AI engineering</b><small>Module 2 Â· Neural networks</small></div><strong>32%</strong></div>
              <div className="meter"><i style={{ width: "32%" }} /></div>
            </div>
            <div className="ai-card"><div className="ai-orb"><Sparkles size={20} /></div><span>YOUR AI GUIDE</span><b>Ready when<br />you are.</b><p>Your next best step is waiting.</p><div className="ai-link">Ask your tutor <ArrowUpRight size={13} /></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const root = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!root.current) return;
    const cleanup = initMotion(root.current);
    return cleanup;
  }, []);

  return (
    <main ref={root}>
      <header className="site-header">
        <a href="#" className="brand" aria-label="SkillPilot home">
          <span className="brand-mark"><Sparkles size={17} strokeWidth={2.2} /></span>
          <span>skillpilot<span className="brand-ai">.ai</span></span>
        </a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a href="#platform" className="mobile-cta">Explore platform <ArrowUpRight size={15} /></a>
        </nav>
        <div className="header-actions">
          <a href="#platform" className="header-login">Explore platform</a>
          <button onClick={onGetStarted} className="button button-dark button-small">Get started <ArrowUpRight size={15} /></button>
        </div>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero section-pad" id="top">
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="hero-kicker reveal"><span className="kicker-spark"><Sparkles size={13} /></span> THE INTELLIGENCE BEHIND YOUR NEXT MOVE</div>
          <h1 className="hero-title">
            <span className="line-reveal">Become who</span>
            <span className="line-reveal"><em>youâ€™re meant</em> to be<span className="period">.</span></span>
          </h1>
          <div className="hero-bottom reveal">
            <p>Your goals are unique. Your learning should be too. Meet the AI-powered space that turns ambition into a plan â€” and a plan into progress.</p>
            <a className="button button-dark" href="#platform">Discover SkillPilot <ArrowUpRight size={16} /></a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="hero-glow" />
          <div className="hero-core"><div className="core-inner"><Sparkles size={35} strokeWidth={1.2} /></div></div>
          <div className="float-tag tag-career"><span className="tag-icon"><Target size={15} /></span><div><b>Career clarity</b><small>Find your direction</small></div><ArrowUpRight size={14} /></div>
          <div className="float-tag tag-skills"><span className="tag-icon violet"><Zap size={15} /></span><div><b>Skills that matter</b><small>Built around your goals</small></div><Check size={15} className="check" /></div>
          <div className="float-tag tag-ai"><span className="pulse-dot" /><span>AI learning companion</span></div>
          <div className="hero-index">01 <span>/ 05</span></div>
        </div>
        <a href="#manifesto" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        <div className="hero-side-note">LEARN WITH INTENTION. GROW WITH DIRECTION.</div>
      </section>

      <section className="manifesto section-pad" id="manifesto">
        <div className="manifesto-top reveal"><SectionLabel>A DIFFERENT WAY FORWARD</SectionLabel><span className="manifesto-index">01 â€” THE BIG PICTURE</span></div>
        <h2 className="manifesto-title reveal">The future doesnâ€™t<br />come with a <span className="serif-word">roadmap.</span><br /><span className="muted-line">So we help you</span> <span className="highlight-word">build one.</span></h2>
        <div className="manifesto-foot reveal"><p>Not another course library. Not another career quiz. One connected intelligence that understands where you are, sees where you want to go, and helps you close the distance.</p><a href="#how-it-works" className="text-link">See how it works <ArrowUpRight size={15} /></a></div>
        <div className="manifesto-decoration" aria-hidden="true">S<span>.</span></div>
      </section>

      <section className="platform section-pad" id="platform">
        <div className="platform-heading reveal">
          <div><SectionLabel>YOUR PERSONAL GROWTH SYSTEM</SectionLabel><h2>One platform.<br /><span className="serif-word">More possibility.</span></h2></div>
          <p>Everything you need to move from â€œI want toâ€ to â€œI did.â€ Connected, adaptive, and built around you.</p>
        </div>
        <div className="platform-grid">
          <article className="feature-card feature-career reveal">
            <div className="feature-meta"><span>01 / CAREER INTELLIGENCE</span><ArrowUpRight size={17} /></div>
            <div className="career-visual">
              <div className="career-ring ring-a" /><div className="career-ring ring-b" /><div className="career-center"><Target size={25} /><b>72%</b><small>READY</small></div>
              <div className="career-chip chip-one">Your strengths <Check size={12} /></div><div className="career-chip chip-two">Growth areas <span>03</span></div>
            </div>
            <h3>See the gap.<br /><em>Own the growth.</em></h3>
            <p>Understand the skills your dream role needs, what you already bring, and what to focus on next.</p>
            <span className="feature-number">01</span>
          </article>
          <article className="feature-card feature-learning reveal">
            <div className="feature-meta"><span>02 / PERSONALIZED LEARNING</span><ArrowUpRight size={17} /></div>
            <div className="learning-visual">
              <div className="path-line" />
              <div className="path-node node-done"><Check size={13} /></div><div className="path-node node-current"><span /></div><div className="path-node node-next"><Code2 size={13} /></div>
              <div className="path-label label-a"><b>Foundations</b><small>Completed</small></div><div className="path-label label-b"><b>Build & create</b><small>In progress Â· 68%</small></div><div className="path-label label-c"><b>Prove your skills</b><small>Up next</small></div>
            </div>
            <h3>A learning path<br /><em>that moves with you.</em></h3>
            <p>Discover the right resources, practice at your pace, and adapt as your skills grow.</p>
            <span className="feature-number">02</span>
          </article>
          <article className="feature-card feature-tutor reveal">
            <div className="feature-meta"><span>03 / AI TUTOR</span><ArrowUpRight size={17} /></div>
            <div className="tutor-visual">
              <div className="tutor-orb"><Sparkles size={27} /></div>
              <div className="chat-bubble bubble-user">Can you explain APIs simply?</div>
              <div className="chat-bubble bubble-ai"><span><Sparkles size={12} /> SkillPilot AI</span>An API is like a helpful waiter â€” it takes your request to the kitchen and brings back exactly what you asked for.</div>
            </div>
            <h3>Never learn<br /><em>alone again.</em></h3>
            <p>A context-aware guide for explanations, debugging, practice, and your next breakthrough.</p>
            <span className="feature-number">03</span>
          </article>
        </div>
      </section>

      <section className="statement section-pad" id="how-it-works">
        <div className="statement-bg-word" aria-hidden="true">POTENTIAL</div>
        <div className="statement-content reveal"><SectionLabel>BUILT AROUND YOUR MOMENTUM</SectionLabel><h2>Progress isnâ€™t<br />a straight line.<br /><span className="serif-word">Thatâ€™s the point.</span></h2><p>SkillPilot learns from your progress. Every assessment, project, and practice session helps make your next step smarter.</p><a href="#future" className="button button-light">Explore the approach <ArrowUpRight size={16} /></a></div>
        <div className="statement-graphic" aria-hidden="true"><div className="step-orbit orbit-x" /><div className="step-orbit orbit-y" /><div className="step-orbit orbit-z" /><div className="step-core"><BrainCircuit size={38} /></div><div className="step-label sl-one">LEARN</div><div className="step-label sl-two">PRACTICE</div><div className="step-label sl-three">EVOLVE</div></div>
      </section>

      <section className="intelligence section-pad" id="future">
        <div className="intelligence-head reveal"><SectionLabel>INTELLIGENCE THAT CONNECTS THE DOTS</SectionLabel><span className="manifesto-index">02 â€” THE ENGINE</span></div>
        <div className="intelligence-layout">
          <div className="intelligence-copy reveal"><h2>Six minds.<br /><span className="serif-word">One mission.</span></h2><p>A coordinated team of specialist AI agents works behind the scenes â€” understanding your profile, mapping skills, finding resources, and helping you keep moving.</p><a href="#get-started" className="text-link">Meet your learning system <ArrowUpRight size={15} /></a></div>
          <div className="agent-map reveal">
            <div className="agent-orbit orbit-outer" /><div className="agent-orbit orbit-inner" />
            <div className="agent-center"><span className="brand-mark"><Sparkles size={20} /></span><b>SKILLPILOT</b><small>ORCHESTRATOR</small></div>
            <div className="agent-node agent-a"><span><Target size={15} /></span><b>Career</b></div>
            <div className="agent-node agent-b"><span><GraduationCap size={15} /></span><b>Learning</b></div>
            <div className="agent-node agent-c"><span><BrainCircuit size={15} /></span><b>Skills</b></div>
            <div className="agent-node agent-d"><span><Compass size={15} /></span><b>Resources</b></div>
            <div className="agent-node agent-e"><span><Code2 size={15} /></span><b>Assessment</b></div>
            <div className="agent-node agent-f"><span><Sparkles size={15} /></span><b>AI Tutor</b></div>
            <div className="agent-caption">SPECIALISTS, WORKING IN SYNC</div>
          </div>
        </div>
      </section>

      <section className="closing section-pad" id="get-started">
        <div className="closing-orb" aria-hidden="true"><div /><div /><div /></div>
        <div className="closing-content reveal"><SectionLabel>YOUR NEXT CHAPTER STARTS HERE</SectionLabel><h2>Make your<br /><span className="serif-word">next move</span><br />a smart one<span className="period">.</span></h2><p>Bring your ambition. Weâ€™ll help with the direction.</p><a href="mailto:hello@skillpilot.ai" className="button button-dark">Letâ€™s get started <ArrowUpRight size={16} /></a></div>
        <div className="closing-side">YOUR POTENTIAL, IN MOTION.</div>
      </section>

      <footer className="site-footer">
        <a href="#top" className="brand"><span className="brand-mark"><Sparkles size={16} /></span><span>skillpilot<span className="brand-ai">.ai</span></span></a>
        <span>LEARN WITH INTENTION. GROW WITH DIRECTION.</span>
        <div><a href="#platform">Platform</a><a href="#future">Our approach</a><span>Â© 2026 SkillPilot AI</span></div>
      </footer>
    </main>
  );
}


