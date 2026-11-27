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
    .maybeSingle();

  if (error) return <p>Errpr: {error.message}</p>;
  if (!s) return <p>Submission not found.</p>;

  return (
    <div className="border p-4 flex flex-col gap-2">
      <h2 className="text-lg font-semibold">{s.title}</h2>
      <p>created_at: {s.created_at}</p>
      <p>content: {s.content}</p>
      <p>submitter_info: {s.submitter_info}</p>
      <p>industry: {s.industry}</p>
      <p>state: {s.state}</p>
      <p>timeframe: {s.timeframe}</p>
      <p>reporter role: {s.reporter_role}</p>
      <p>ok to follow up: {s.follow_up_ok ? "yes" : "no"}</p>
      <p>status: {s.status}</p>


      <StatusForm id={id} currentStatus={s.status} currentNotes={s.notes} tab={tab} />
    </div>
  );
}