import { createClient } from "@/lib/supabase/server";

export async function ReviewList() {
  const supabase = await createClient();
  const { data: submissions, error } = await supabase
    .from("submissions")
    .select("id, created_at, title, content, link, submitter_info, status")
    .order("created_at", { ascending: false });

  if (error) return <p>Error: {error.message}</p>;
  if (submissions.length === 0) return <p>empty!</p>;

  return (
  <ul className="border">
    {submissions.map((s) => (
      <li key={s.id} className="p-3 border-b last:border-b-0 text-sm">
        <p>created_at: {s.created_at}</p>
        <p>title: {s.title}</p>
        <p>content: {s.content}</p>
        <p>link: {s.link}</p>
        <p>submitter_info: {s.submitter_info}</p>
        <p>status: {s.status}</p>
      </li>
    ))}
  </ul>
);
}