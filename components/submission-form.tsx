"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidUrl } from "@/lib/utils";

export type SubmissionType = "article" | "company";

export type SubmissionPayload = {
  type: SubmissionType;
  title: string;
  link: string;
  description: string;
  submitterName: string;
  submitterEmail: string;
  website: string; //honeypot: hidden from humans
};

type Errors = Partial<Record<keyof SubmissionPayload, string>>;

const textareaClass =
  "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-28 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2";

function validate(p: SubmissionPayload): Errors {
  const errors: Errors = {};
  if (!p.title.trim()) {
    errors.title = p.type === "article" ? "Headline is required." : "Company name is required.";
  }
  if (p.type === "article" && !p.link.trim()) {
    errors.link = "A link to the article is required.";
  } else if (p.link.trim() && !isValidUrl(p.link.trim())) {
    errors.link = "Enter a full URL starting with http:// or https://";
  }
  if (p.submitterEmail.trim() && !/^\S+@\S+\.\S+$/.test(p.submitterEmail.trim())) {
    errors.submitterEmail = "Enter a valid email address.";
  }
  return errors;
}

export function SubmissionForm() {
  const [type, setType] = useState<SubmissionType>("article");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: keyof SubmissionPayload) => String(data.get(key) ?? "");
    const payload: SubmissionPayload = {
      type,
      title: get("title"),
      link: get("link"),
      description: get("description"),
      submitterName: get("submitterName"),
      submitterEmail: get("submitterEmail"),
      website: get("website"),
    };

    if (payload.website) {
      setStatus("success");
      return;
    }
    const found = validate(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("submitting");
    console.log("submission payload", payload); // we need to send ts to supabase
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4 rounded-md border p-6">
        <h2 className="text-xl font-semibold">Thank you!</h2>
        <p className="text-sm text-muted-foreground">
          Your submission was received and will be reviewed by our team.
        </p>
        <Button className="w-fit" variant="outline" onClick={() => setStatus("idle")}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      <div className="flex gap-2">
        {(["article", "company"] as const).map((t) => (
          <Button
            key={t}
            type="button"
            variant={type === t ? "default" : "outline"}
            onClick={() => setType(t)}
          >
            {t === "article" ? "Suggest an article" : "Suggest a company"}
          </Button>
        ))}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">{type === "article" ? "Headline" : "Company name"}</Label>
        <Input id="title" name="title" />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="link">
          {type === "article" ? "Article link" : "Company website (optional)"}
        </Label>
        <Input id="link" name="link" type="url" placeholder="https://" />
        {errors.link && <p className="text-sm text-red-500">{errors.link}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Why should we include this? (optional)</Label>
        <textarea id="description" name="description" className={textareaClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="submitterName">Your name (optional)</Label>
          <Input id="submitterName" name="submitterName" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="submitterEmail">Your email (optional)</Label>
          <Input id="submitterEmail" name="submitterEmail" type="email" />
          {errors.submitterEmail && (
            <p className="text-sm text-red-500">{errors.submitterEmail}</p>
          )}
        </div>
      </div>

      {/* Honeypot: hidden from humans, bots tend to fill it */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
      )}

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}