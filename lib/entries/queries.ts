import { createClient } from "@/lib/supabase/server";
import type { CompanyOption, EntryRecord, Tag } from "@/lib/types";

export async function getEntry(id: number): Promise<EntryRecord | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("entries")
    .select(
      "*, profiles(display_name), entry_companies(company_id, is_pinned), entry_tags(tag_id)",
    )
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  return {
    id: data.id,
    headline: data.headline,
    summary: data.summary ?? "",
    source_url: data.source_url ?? "",
    source_name: data.source_name ?? "",
    published_date: data.published_date ?? "",
    type: data.type ?? "",
    status: data.status,
    updated_at: data.updated_at,
    updated_by_name: data.profiles?.display_name ?? null,
    companies: data.entry_companies,
    tag_ids: data.entry_tags.map((t: { tag_id: number }) => t.tag_id),
  };
}

export async function listCompanyOptions(): Promise<CompanyOption[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("companies")
    .select("id, company_name")
    .order("company_name");
  if (error) throw error;
  return data;
}

export async function listTags(): Promise<Tag[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tags").select("id, name").order("name");
  if (error) throw error;
  return data;
}
