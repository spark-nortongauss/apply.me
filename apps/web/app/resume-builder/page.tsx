import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResumeBuilderPage() {
  return (
    <main className="section-shell py-12">
      <h1 className="text-3xl font-bold text-primary">AI CV & Cover Letter Builder</h1>
      <p className="mt-2 text-text/70">Generate ATS-optimized resume variants, targeted letters, and interview responses.</p>
      <Card className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-primary">Upload and Optimize</h2>
        <p className="text-sm text-text/70">Supports PDF and DOCX upload to Supabase Storage with extraction and version history.</p>
        <div className="flex flex-wrap gap-3">
          <Button>Upload CV</Button>
          <Button variant="outline">Generate Startup Variant</Button>
          <Button variant="outline">Generate Cover Letter</Button>
        </div>
      </Card>
    </main>
  );
}
