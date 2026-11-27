"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function setStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("submissions")
    .update({ status })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/review");
}

export async function updateNotes(id: string, notes: string | null) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("submissions")
    .update({ notes })
    .eq("id", id);

  if (error) throw new Error(error.message);
}