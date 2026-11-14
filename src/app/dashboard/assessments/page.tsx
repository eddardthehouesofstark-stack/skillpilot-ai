import Link from "next/link";

const assessments = [
  {
    title: "Java Programming",
    description: "Test your Java fundamentals, syntax, and programming knowledge.",
    type: "MCQ",
    level: "Beginner",
    questions: "5 Questions",
    duration: "10 Minutes",
    href: "/dashboard/assessments/java",
  },
  {
    title: "Data Structures & Algorithms",
    description: "Challenge yourself with coding problems and logical thinking.",
    type: "Coding",
    level: "Intermediate",
    questions: "Coming Soon",
    duration: "Coming Soon",
    href: "#",
  },
  {
    title: "Web Development Fundamentals",
    description: "Evaluate your understanding of HTML, CSS, JavaScript, and web concepts.",
    type: "MCQ",
    level: "Beginner",
    questions: "5 Questions",
    duration: "10 Minutes",
    href: "/dashboard/assessments/web-development",
  },
  {
    title: "Problem Solving Challenge",
    description: "Improve your coding skills through practical programming challenges.",
    type: "Coding",
    level: "Advanced",
    questions: "Coming Soon",
    duration: "Coming Soon",
    href: "#",
  },
];

export default function AssessmentsPage() {
  return (
    <main className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          SkillPilot Workspace
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Assessments
        </h1>
        <p className="mt-2 text-gray-500">
          Test your knowledge, measure your progress, and discover what to learn next.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          ["04", "Available assessments"],
          ["02", "Assessment formats"],
          ["∞", "Opportunities to improve"],
        ].map(([number, label]) => (
          <div key={label} className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-2xl font-bold text-gray-900">{number}</p>
            <p className="mt-1 text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Explore assessments</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose an assessment to get started.
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
          MCQ + Coding
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {assessments.map((assessment, index) => (
          <article
            key={assessment.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-lg font-bold text-blue-700">
                {index + 1}
              </div>
              <div className="flex gap-2">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {assessment.type}
                </span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {assessment.level}
                </span>
              </div>
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-900">
              {assessment.title}
            </h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
              {assessment.description}
            </p>

            <div className="mt-5 flex gap-6 border-t border-gray-100 pt-4 text-sm text-gray-500">
              <span>{assessment.questions}</span>
              <span>{assessment.duration}</span>
            </div>

            {assessment.href !== "#" ? (
              <Link
                href={assessment.href}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Start assessment →
              </Link>
            ) : (
              <button
                disabled
                className="mt-5 w-full cursor-not-allowed rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-400"
              >
                Coming soon
              </button>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
