import { createClient } from "@/lib/supabase/server";
import type { CompanyOption, EntryRecord, Tag } from "@/lib/types";

export async function getEntry(id: number): Promise<EntryRecord | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, headline, summary, source_link, date, company_id, is_pinned, status, article_tags(tag_id)",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    headline: data.headline ?? "",
    summary: data.summary ?? "",
    source_link: data.source_link ?? "",
    date: data.date ?? "",
    company_id: data.company_id,
    is_pinned: data.is_pinned ?? false,
    status: data.status,
    tag_ids: data.article_tags.map((t: { tag_id: number }) => t.tag_id),
  };
}

export async function listCompanyOptions(): Promise<CompanyOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("companies").select("id, name").order("name");
  if (error) throw error;
  return data;
}

export async function listTags(): Promise<Tag[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tags").select("id, name").order("name");
  if (error) throw error;
  return data;
}
