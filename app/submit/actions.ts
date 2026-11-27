"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { SubmissionPayload } from "@/components/submission-form";
import { INDUSTRIES, REPORTER_ROLES, STATES, TIMEFRAMES } from "@/lib/submission-options";

const isAllowed = (list: readonly string[], v: string) => list.includes(v);

export async function submitSubmission(
  p: SubmissionPayload,
): Promise<{ ok: boolean; error?: string }> {
  // Honeypot: bots fill the hidden field. Pretend it worked, store nothing.
  if (p.website) return { ok: true };

  // Never trust the client: re-check on the server
  if (
    !p.company.trim() ||
    !p.description.trim() ||
    !isAllowed(INDUSTRIES, p.industry) ||
    !isAllowed(STATES, p.state) ||
    !isAllowed(TIMEFRAMES, p.timeframe) ||
    !isAllowed(REPORTER_ROLES, p.reporterRole)
  ) {
    return { ok: false, error: "Invalid submission." };
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("submissions").insert({
    proposed_type: "company", // TODO: confirm with Ann and Aiden
    title: p.company.trim(),
    content: p.description.trim(),
    submitter_info: p.email.trim() || null,
    industry: p.industry || null,
    state: p.state || null,
    timeframe: p.timeframe || null,
    reporter_role: p.reporterRole || null,
    follow_up_ok: p.followUpOk,
    status: "new",
  });

  if (error) {
    console.error("submission insert failed", error.message);
    return { ok: false, error: "Could not save your submission." };
  }
  return { ok: true };
}