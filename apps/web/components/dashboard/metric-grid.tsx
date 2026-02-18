import { Card } from "@/components/ui/card";

export function MetricGrid({ metrics }: { metrics: { label: string; value: string; detail: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <p className="text-sm text-text/70">{metric.label}</p>
          <p className="mt-2 text-2xl font-bold text-primary">{metric.value}</p>
          <p className="mt-1 text-sm text-text/70">{metric.detail}</p>
        </Card>
      ))}
    </div>
  );
}
