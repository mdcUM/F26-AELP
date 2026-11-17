"use client";

import { useState } from "react";

// dropdown options
export const WHEN_OPTIONS = [
  "Within the last year",
  "1-3 years ago",
  "More than 3 years ago",
] as const;

export const ROLE_OPTIONS = [
  "Consumer / customer",
  "Current or former employee",
  "Other",
] as const;

// submission variables
export type SubmissionInput = {
  company: string;
  industry: string;
  description: string;
  state: string;
  when: (typeof WHEN_OPTIONS)[number];
  role: (typeof ROLE_OPTIONS)[number];
  email: string;
  can_follow_up: boolean;
};

export const EMPTY_SUBMISSION: SubmissionInput = {
  company: "",
  industry: "",
  description: "",
  state: "",
  when: WHEN_OPTIONS[0],
  role: ROLE_OPTIONS[0],
  email: "",
  can_follow_up: false,
};

export function Questionnaire() {
  const [form, setForm] = useState<SubmissionInput>(EMPTY_SUBMISSION);

  // check
  const isValid =
    form.company.trim() !== "" &&
    form.industry !== "" &&
    form.description.trim() !== "" &&
    form.state !== "";

  function handleSubmit() {
    if (!isValid) return;
    // need to the admin side like the progress and stuff
    console.log("submission", form);
    setForm(EMPTY_SUBMISSION);
  }

  return (
    <section id="questionnaire" className="flex flex-col gap-4 px-4 scroll-mt-8">
      <h2 className="font-medium text-xl">Questionnaire</h2>
    </section>
  );
}
