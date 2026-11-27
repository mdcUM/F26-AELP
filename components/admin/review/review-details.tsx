import { createClient } from "@/lib/supabase/server";
import { StatusForm } from "@/components/admin/review/status_form";

export async function ReviewDetails({ id, tab }: { id?: string; tab: string }) {
  if (!id) {
    return;
  }

  const supabase = await createClient();
  const { data: s, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="border p-4 flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{s.title}</h2>
      <p>created_at: {s.created_at}</p>
      <p>content: {s.content}</p>
      <p>link: {s.link}</p>
      <p>submitter_info: {s.submitter_info}</p>
      <p>status: {s.status}</p>


      <StatusForm id={id} currentStatus={s.status} tab={tab} />
    </div>
  );
}