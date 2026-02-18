import { MetricGrid } from "@/components/dashboard/metric-grid";

const metrics = [
  { label: "Open Roles", value: "14", detail: "Across product, data, and engineering" },
  { label: "Qualified Candidates", value: "318", detail: "Above 75 success prediction" },
  { label: "Pipeline Velocity", value: "+22%", detail: "Month-over-month" },
  { label: "Talent Clusters", value: "9", detail: "Built from vector affinity and domain fit" },
  { label: "Outbound Replies", value: "41%", detail: "Above benchmark by 16 points" },
  { label: "Avg Fit Score", value: "84", detail: "For shortlisted candidates" }
];

export default function RecruiterDashboardPage() {
  return (
    <main className="section-shell py-12">
      <h1 className="text-3xl font-bold text-primary">Recruiter Dashboard</h1>
      <p className="mt-2 text-text/70">Search, shortlist, and engage top talent with vector intelligence.</p>
      <div className="mt-8">
        <MetricGrid metrics={metrics} />
      </div>
    </main>
  );
}
