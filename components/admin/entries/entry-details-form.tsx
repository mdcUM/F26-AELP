import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SUMMARY_MAX, type EntryErrors } from "@/lib/entries/validation";
import type { EntryInput } from "@/lib/types";

type Props = {
  entry: EntryInput;
  errors: EntryErrors;
  onChange: <K extends keyof EntryInput>(key: K, value: EntryInput[K]) => void;
};

const textareaClass =
  "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring aria-invalid:border-destructive min-h-28 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2";

export function EntryDetailsForm({ entry, errors, onChange }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entry details</CardTitle>
        <CardDescription>Clear, factual copy helps readers understand what happened.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <Field id="headline" label="Headline *" error={errors.headline}>
          <Input
            id="headline"
            aria-invalid={!!errors.headline}
            value={entry.headline}
            onChange={(e) => onChange("headline", e.target.value)}
          />
        </Field>

        <Field
          id="summary"
          label="Short summary *"
          error={errors.summary}
          hint={`${entry.summary.length} / ${SUMMARY_MAX} characters · One or two sentences`}
        >
          <textarea
            id="summary"
            aria-invalid={!!errors.summary}
            className={textareaClass}
            value={entry.summary}
            onChange={(e) => onChange("summary", e.target.value)}
          />
        </Field>

        <Field id="source_link" label="Link to article *" error={errors.source_link}>
          <Input
            id="source_link"
            type="url"
            placeholder="https://"
            aria-invalid={!!errors.source_link}
            value={entry.source_link}
            onChange={(e) => onChange("source_link", e.target.value)}
          />
        </Field>

        <Field id="date" label="Date *" error={errors.date}>
          <Input
            id="date"
            type="date"
            className="sm:w-48"
            aria-invalid={!!errors.date}
            value={entry.date}
            onChange={(e) => onChange("date", e.target.value)}
          />
        </Field>
      </CardContent>
    </Card>
  );
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        hint && <p className="text-sm text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
