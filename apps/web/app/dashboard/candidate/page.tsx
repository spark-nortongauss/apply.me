import { MetricGrid } from "@/components/dashboard/metric-grid";

const metrics = [
  { label: "Career Vector Score", value: "82.4", detail: "Top 12% for product leadership track" },
  { label: "Resume Health", value: "91/100", detail: "Strong quantified outcomes, minor ATS gaps" },
  { label: "Suggested Jobs", value: "27", detail: "13 roles above 80 fit score" },
  { label: "Missing Skills", value: "4", detail: "Cloud FinOps, stakeholder mapping, BI storytelling" },
  { label: "Salary Estimate", value: "$165k-$205k", detail: "US remote market band" },
  { label: "Applications", value: "9 active", detail: "2 interviews this week" }
];

export default function CandidateDashboardPage() {
  return (
    <main className="section-shell py-12">
      <h1 className="text-3xl font-bold text-primary">Candidate Dashboard</h1>
      <p className="mt-2 text-text/70">Track employability, job fit, and growth plan in one command center.</p>
      <div className="mt-8">
        <MetricGrid metrics={metrics} />
      </div>
    </main>
  );
}
