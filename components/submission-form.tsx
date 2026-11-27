"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitSubmission } from "@/app/submit/actions";
import {
  INDUSTRIES,
  REPORTER_ROLES,
  STATES,
  TIMEFRAMES,
} from "@/lib/submission-options";

export type SubmissionPayload = {
  company: string;
  industry: string;
  description: string;
  state: string;
  timeframe: string;
  reporterRole: string;
  email: string;
  followUpOk: boolean;
  website: string; //honeypot: hidden from humans
};

type Errors = Partial<Record<keyof SubmissionPayload, string>>;

const textareaClass =
  "border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-28 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2";
const selectClass =
  "border-input bg-background focus-visible:ring-ring h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-2";

function SelectField(props: {
  id: string;
  label: string;
  options: readonly string[];
  placeholder: string;
}) {
  const { id, label, options, placeholder } = props;
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <select id={id} name={id} className={selectClass} defaultValue="">
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function validate(p: SubmissionPayload): Errors {
  const errors: Errors = {};
  const email = p.email.trim();
  if (!p.company.trim()) errors.company = "Company is required.";
  if (!p.description.trim()) {
    errors.description = "Tell us what you saw or experienced.";
  }
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (p.followUpOk && !email) {
    errors.email = "Add your email so we can follow up.";
  }
  return errors;
}

export function SubmissionForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: keyof SubmissionPayload) => String(data.get(key) ?? "");
    const payload: SubmissionPayload = {
      company: get("company"),
      industry: get("industry"),
      description: get("description"),
      state: get("state"),
      timeframe: get("timeframe"),
      reporterRole: get("reporterRole"),
      email: get("email"),
      followUpOk: data.get("followUpOk") === "on",
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
    const result = await submitSubmission(payload);
    setStatus(result.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-4 rounded-md border p-6">
        <h2 className="text-xl font-semibold">Thank you!</h2>
        <p className="text-sm text-muted-foreground">
          Your report was received. AELP staff review every submission.
        </p>
        <Button className="w-fit" variant="outline" onClick={() => setStatus("idle")}>
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 rounded-md border p-6"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" name="company" placeholder="e.g. Invitation Homes" />
          {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
        </div>
        <SelectField
          id="industry"
          label="Industry"
          options={INDUSTRIES}
          placeholder="Select an industry"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">What did you see or experience?</Label>
        <textarea
          id="description"
          name="description"
          className={textareaClass}
          placeholder="Plain language is great. Include dates, places, and names if you know them."
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <SelectField id="state" label="Where? (state)" options={STATES} placeholder="Select a state" />
        <SelectField id="timeframe" label="When did this happen?" options={TIMEFRAMES} placeholder="Select" />
        <SelectField id="reporterRole" label="You are a..." options={REPORTER_ROLES} placeholder="Select" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>
        <label className="flex items-start gap-2 text-sm">
          <input type="checkbox" name="followUpOk" className="mt-1" />
          <span>
            <span className="font-medium">AELP can follow up with me</span>
            <br />
            <span className="text-xs text-muted-foreground">
              Your email is never published or shared.
            </span>
          </span>
        </label>
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

      <div className="flex flex-wrap items-center gap-4 border-t pt-4">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting..." : "Submit report"}
        </Button>
        <p className="text-xs text-muted-foreground">
          Reports are reviewed by AELP staff before any information is used.
        </p>
      </div>
    </form>
  );
}