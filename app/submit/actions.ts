"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import type { SubmissionPayload } from "@/components/submission-form";
import { INDUSTRIES, REPORTER_ROLES, STATES, TIMEFRAMES } from "@/lib/submission-options";

const isAllowed = (list: readonly string[], v: string) => v === "" || list.includes(v);
export async function submitSubmission(
  p: SubmissionPayload,
): Promise<{ ok: boolean; error?: string }> {
  
  if (p.website) return { ok: true };

  //re check essential on server
  if (!p.title.trim() ||
    (p.type !== "article" && p.type !== "company") ||
    !isAllowed(INDUSTRIES, p.industry) ||
    !isAllowed(STATES, p.state) ||
    !isAllowed(TIMEFRAMES, p.timeframe) ||
    !isAllowed(REPORTER_ROLES, p.reporterRole)) {
    return { ok: false, error: "Invalid submission." };
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("submissions").insert({
    proposed_type: p.type,
    title: p.title.trim(),
    content: p.description.trim() || null,
    link: p.link.trim() || null,
    submitter_info: [p.submitterName, p.submitterEmail].filter(Boolean).join(" · ") || null,
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