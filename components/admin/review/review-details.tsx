import { createClient } from "@/lib/supabase/server";
import { setStatusFromForm } from "@/components/admin/review/actions";

export async function ReviewDetails({ id }: { id?: string }) {
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


      <form action={setStatusFromForm} className="flex gap-2 mt-2">
        <input type="hidden" name="id" value={id} />
        <label htmlFor="status">Mark as:</label>
        <select id="status" name="status" defaultValue={s.status} className="border">
          <option value="new">New</option>
          <option value="follow-up">Follow-up</option>
          <option value="reviewed">Reviewed</option>
          <option value="spam">Spam</option>
        </select>
        <button className="border px-2">Save</button>
      </form>
    </div>
  );
}