"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { validateEntry, type EntryErrors } from "@/lib/entries/validation";
import type { EntryInput, EntryStatus } from "@/lib/types";

export type SaveEntryResult =
  | { ok: true; id: number }
  | { ok: false; errors?: EntryErrors; message?: string };

export async function saveEntry(
  id: number | null,
  input: EntryInput,
  status: EntryStatus,
): Promise<SaveEntryResult> {
  const errors = validateEntry(input, status);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const { data: auth } = await (await createClient()).auth.getClaims();
  if (!auth) return { ok: false, message: "Your session expired. Sign in again." };

  const supabase = createAdminClient();

  const row = {
    headline: input.headline.trim(),
    summary: input.summary.trim(),
    source_link: input.source_link.trim() || null,
    date: input.date || null,
    company_id: input.company_id,
    is_pinned: input.is_pinned,
    status,
  };

  const { data, error } = id
    ? await supabase.from("articles").update(row).eq("id", id).select("id").single()
    : await supabase.from("articles").insert(row).select("id").single();
  if (error) return { ok: false, message: error.message };

  const articleId: number = data.id;

  const { error: clearError } = await supabase
    .from("article_tags")
    .delete()
    .eq("article_id", articleId);
  if (clearError) return { ok: false, message: clearError.message };

  if (input.tag_ids.length > 0) {
    const { error: tagError } = await supabase
      .from("article_tags")
      .insert(input.tag_ids.map((tag_id) => ({ article_id: articleId, tag_id })));
    if (tagError) return { ok: false, message: tagError.message };
  }

  revalidatePath("/admin/entries");
  revalidatePath("/");

  return { ok: true, id: articleId };
}
