import { SiteNav } from "@/components/site_navigation";
import { SubmissionForm } from "@/components/submission-form";

const STEPS = [
  { title: "We read every report.", body: "AELP staff review each submission by hand." },
  {
    title: "We sort it.",
    body: "Reports are grouped by industry, state, and issue so we can spot new trends.",
  },
  { title: "We may follow up.", body: "Only if you leave your email and opt in." },
];

export default function SubmitPage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <SiteNav />
      <div className="w-full max-w-5xl p-5 grid gap-10 md:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500">
            Public reporting
          </p>
          <h1 className="text-3xl font-extrabold uppercase">Seen something? Report it.</h1>
          <p className="text-sm text-muted-foreground">
            AELP reviews every submission. Nothing is published without review. You can
            submit anonymously.
          </p>
          <ol className="flex flex-col gap-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-3 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-foreground text-xs text-background">
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold">{s.title}</span>
                  <br />
                  <span className="text-muted-foreground">{s.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <SubmissionForm />
      </div>
    </main>
  );
}