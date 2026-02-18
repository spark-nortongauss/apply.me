import { Card } from "@/components/ui/card";

const jobs = [
  { title: "Senior Product Manager, AI Growth", company: "Northstar Labs", fit: 92, salary: "$180k-$220k" },
  { title: "Staff Data Strategist", company: "Helio Systems", fit: 88, salary: "$170k-$205k" },
  { title: "Head of Platform Partnerships", company: "Aether Works", fit: 84, salary: "$190k-$240k" }
];

export default function JobBoardPage() {
  return (
    <main className="section-shell py-12">
      <h1 className="text-3xl font-bold text-primary">Smart Job Matching</h1>
      <p className="mt-2 text-text/70">Fit scores combine skill depth, trajectory prediction, and culture compatibility.</p>
      <div className="mt-8 grid gap-4">
        {jobs.map((job) => (
          <Card key={job.title}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-primary">{job.title}</p>
                <p className="text-text/70">{job.company}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-accent">Fit {job.fit}</p>
                <p className="text-sm text-text/70">{job.salary}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
