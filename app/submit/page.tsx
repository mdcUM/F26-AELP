import { SiteNav } from "@/components/site_navigation";
import { SubmissionForm } from "@/components/submission-form";

export default function SubmitPage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <SiteNav />
      <div className="w-full max-w-2xl p-5 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Submit a tip</h1>
          <p className="text-sm text-muted-foreground">
            Know an article or company we should feature? Let us know.
          </p>
        </div>
        <SubmissionForm />
      </div>
    </main>
  );
}