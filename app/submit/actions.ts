"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { SubmissionPayload } from "@/components/submission-form";

export async function submitSubmission(
  p: SubmissionPayload,
): Promise<{ ok: boolean; error?: string }> {
  
  if (p.website) return { ok: true };

  //re check essential on server
  if (!p.title.trim() || (p.type !== "article" && p.type !== "company")) {
    return { ok: false, error: "Invalid submission." };
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("submissions").insert({
    proposed_type: p.type,
    title: p.title.trim(),
    content: p.description.trim() || null,
    link: p.link.trim() || null,
    submitter_info: [p.submitterName, p.submitterEmail].filter(Boolean).join(" · ") || null,
    status: "new",
  });

  if (error) {
    console.error("submission insert failed", error.message);
    return { ok: false, error: "Could not save your submission." };
  }
  return { ok: true };
}