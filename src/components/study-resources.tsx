"use client";
import AILearningCoach from "@/components/ai-learning-coach";

import { useEffect, useMemo, useState } from "react";

type Resource = {
  id: string;
  title: string;
  provider: string;
  category: string;
  level: string;
  minutes: number;
  description: string;
  roles: string[];
  url: string;
};

const resources: Resource[] = [
  {
    id: "react",
    title: "React Official Documentation",
    provider: "React",
    category: "Development",
    level: "Beginner",
    minutes: 60,
    description: "Learn components, hooks, state and modern React development.",
    roles: ["Frontend Developer", "Full Stack Developer"],
    url: "https://react.dev/learn"
  },
  {
    id: "mdn",
    title: "MDN Web Development",
    provider: "Mozilla",
    category: "Development",
    level: "Beginner",
    minutes: 90,
    description: "Build a strong foundation in HTML, CSS and JavaScript.",
    roles: ["Frontend Developer", "Full Stack Developer"],
    url: "https://developer.mozilla.org/en-US/docs/Learn_web_development"
  },
  {
    id: "typescript",
    title: "TypeScript Handbook",
    provider: "Microsoft",
    category: "Development",
    level: "Intermediate",
    minutes: 75,
    description: "Understand types, interfaces and safer JavaScript applications.",
    roles: ["Frontend Developer", "Full Stack Developer"],
    url: "https://www.typescriptlang.org/docs/"
  },
  {
    id: "roadmap",
    title: "Developer Learning Roadmaps",
    provider: "roadmap.sh",
    category: "Development",
    level: "All levels",
    minutes: 45,
    description: "Explore structured paths for software development careers.",
    roles: ["Frontend Developer", "Full Stack Developer"],
    url: "https://roadmap.sh/"
  },
  {
    id: "sql",
    title: "Interactive SQL Tutorial",
    provider: "SQLBolt",
    category: "Data",
    level: "Beginner",
    minutes: 50,
    description: "Practice SQL queries and learn database fundamentals.",
    roles: ["Data Analyst", "Full Stack Developer"],
    url: "https://sqlbolt.com/"
  },
  {
    id: "kaggle",
    title: "Learn Data Science",
    provider: "Kaggle",
    category: "Data",
    level: "Beginner",
    minutes: 90,
    description: "Learn Python, data visualization and machine learning basics.",
    roles: ["Data Analyst"],
    url: "https://www.kaggle.com/learn"
  },
  {
    id: "googleux",
    title: "Google UX Design Resources",
    provider: "Google",
    category: "Design",
    level: "Beginner",
    minutes: 90,
    description: "Explore user research, wireframes and design fundamentals.",
    roles: ["UI/UX Designer"],
    url: "https://grow.google/certificates/ux-design/"
  },
  {
    id: "figma",
    title: "Figma Learn",
    provider: "Figma",
    category: "Design",
    level: "Beginner",
    minutes: 45,
    description: "Practice interface design, prototyping and collaboration.",
    roles: ["UI/UX Designer"],
    url: "https://help.figma.com/hc/en-us/categories/360002051613-Learn-design"
  }
];

const roles = [
  "Frontend Developer",
  "Full Stack Developer",
  "Data Analyst",
  "UI/UX Designer"
];

export default function StudyResources() {
  const [role, setRole] = useState(roles[0]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("skillpilot-saved-resources");
      if (stored) setSavedIds(JSON.parse(stored));
    } catch {
      setSavedIds([]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(
        "skillpilot-saved-resources",
        JSON.stringify(savedIds)
      );
    }
  }, [savedIds, loaded]);

  const recommended = useMemo(
    () => resources.filter(item => item.roles.includes(role)),
    [role]
  );

  const visible = resources.filter(item => {
    const matchesSearch =
      `${item.title} ${item.provider} ${item.description}`
        .toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    const matchesSaved =
      !showSaved || savedIds.includes(item.id);

    return matchesSearch && matchesCategory && matchesSaved;
  });

  function toggleSaved(id: string) {
    setSavedIds(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  }

  return (
    <section className="sr-page">
      
      <AILearningCoach />
<style jsx>{`
        .sr-page { color:#25291f; }
        .sr-heading { display:flex;justify-content:space-between;align-items:flex-start;gap:15px;flex-wrap:wrap;margin-bottom:26px; }
        .sr-heading h1 {font-size:29px;margin:0 0 8px;font-weight:750;letter-spacing:-1px;}
        .sr-muted {color:#858a7e;font-size:13px;line-height:1.7;}
        .sr-hero {background:#edf5e2;border-radius:18px;padding:25px;margin-bottom:27px;}
        .sr-hero h2 {font-size:19px;margin:8px 0;}
        .sr-tag {font-size:10px;font-weight:800;letter-spacing:1px;color:#657d45;text-transform:uppercase;}
        .sr-select,.sr-search {border:1px solid #e3e6dc;border-radius:10px;padding:11px 13px;background:white;color:#303529;font:inherit;font-size:13px;outline:none;}
        .sr-search {width:100%;max-width:340px;}
        .sr-controls {display:flex;gap:10px;flex-wrap:wrap;margin:20px 0;}
        .sr-chip {border:1px solid #e5e8df;background:white;padding:9px 14px;border-radius:30px;font-size:12px;cursor:pointer;color:#687064;}
        .sr-chip.active {background:#28351f;color:white;border-color:#28351f;}
        .sr-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;}
        .sr-card {border:1px solid #e9ebe4;background:white;border-radius:15px;padding:19px;min-width:0;}
        .sr-card-top {display:flex;justify-content:space-between;gap:10px;align-items:center;}
        .sr-provider {font-size:11px;color:#83897d;font-weight:650;}
        .sr-card h3 {font-size:16px;margin:14px 0 8px;line-height:1.4;}
        .sr-card p {font-size:12px;color:#858a7e;line-height:1.7;min-height:42px;}
        .sr-meta {display:flex;gap:8px;flex-wrap:wrap;margin:14px 0;color:#858a7e;font-size:11px;}
        .sr-meta span {background:#f5f6f1;border-radius:20px;padding:6px 9px;}
        .sr-actions {display:flex;gap:9px;margin-top:14px;}
        .sr-button {border:0;border-radius:9px;padding:10px 13px;font-size:12px;font-weight:700;cursor:pointer;text-decoration:none;}
        .sr-primary {background:#29351f;color:white;}
        .sr-secondary {background:#f0f3e9;color:#536343;}
        .sr-section {font-size:17px;font-weight:750;margin:27px 0 14px;}
        .sr-empty {padding:35px;text-align:center;border:1px dashed #dfe3d8;border-radius:14px;color:#858a7e;font-size:13px;}
        @media(max-width:650px) {.sr-grid{grid-template-columns:1fr}.sr-search{max-width:none}.sr-card{padding:16px}}
      `}</style>

      <div className="sr-heading">
        <div>
          <h1>Study Resources</h1>
          <div className="sr-muted">
            Discover resources, build skills and keep your learning organized.
          </div>
        </div>
        <button className="sr-button sr-secondary" onClick={() => {
          setShowSaved(!showSaved);
          setCategory("All");
          setSearch("");
        }}>
          {showSaved ? "Browse all resources" : `â™¡ Saved (${savedIds.length})`}
        </button>
      </div>

      <div className="sr-hero">
        <div className="sr-tag">Your learning assistant</div>
        <h2>Find your next learning opportunity.</h2>
        <div className="sr-muted">
          Choose your career path to discover recommended learning materials.
        </div>
        <div style={{marginTop:16}}>
          <select className="sr-select" value={role} onChange={e => setRole(e.target.value)}>
            {roles.map(item => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      {!showSaved && <>
        <div className="sr-section">âœ³ Recommended for you</div>
        <div className="sr-muted" style={{marginBottom:14}}>
          Role-based recommendations for {role}. These are curated recommendations, not live AI-generated results yet.
        </div>
        <div className="sr-grid">
          {recommended.slice(0,2).map(item => (
            <article className="sr-card" key={item.id}>
              <div className="sr-tag">Recommended</div>
              <h3>{item.title}</h3>
              <div className="sr-provider">{item.provider}</div>
              <p>{item.description}</p>
              <div className="sr-actions">
                <a className="sr-button sr-primary" href={item.url} target="_blank" rel="noopener noreferrer">Start learning â†—</a>
                <button className="sr-button sr-secondary" onClick={() => toggleSaved(item.id)}>
                  {savedIds.includes(item.id) ? "â™¥ Saved" : "â™¡ Save"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </>}

      <div className="sr-section">
        {showSaved ? "Your saved resources" : "Explore learning resources"}
      </div>

      <input
        className="sr-search"
        placeholder="Search resources, topics or providers..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="sr-controls">
        {["All","Development","Data","Design"].map(item => (
          <button key={item} className={`sr-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      <div className="sr-grid">
        {visible.map(item => (
          <article className="sr-card" key={item.id}>
            <div className="sr-card-top">
              <span className="sr-provider">{item.provider}</span>
              <span className="sr-tag">{item.category}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="sr-meta">
              <span>{item.level}</span>
              <span>{item.minutes} min</span>
            </div>
            <div className="sr-actions">
              <a className="sr-button sr-primary" href={item.url} target="_blank" rel="noopener noreferrer">Open resource â†—</a>
              <button className="sr-button sr-secondary" onClick={() => toggleSaved(item.id)}>
                {savedIds.includes(item.id) ? "â™¥ Saved" : "â™¡ Save"}
              </button>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="sr-empty">
          {showSaved ? "No saved resources match your search." : "No resources found. Try another search."}
        </div>
      )}
    </section>
  );
}


