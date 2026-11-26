import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function ReviewList({ status, selectedId }: { status: string ; selectedId?: string}) {
  const supabase = await createClient();

  let query = supabase
  .from("submissions")
  .select("id, created_at, title, content, link, submitter_info, status");

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data: submissions, error } = await query.order("created_at", { ascending: false });

  if (error) return <p>Error: {error.message}</p>;
  if (submissions.length === 0) return <p>empty!</p>;

  return (
  <ul className="border">
    {submissions.map((s) => (
      <li key={s.id} className="p-3 border-b last:border-b-0 text-sm">
        <Link
          href={`/admin/review?status=${status}&id=${s.id}`}
          scroll={false}
          className={`block p-2 ${String(s.id) === selectedId ? "bg-muted" : ""}`}
        >
        <p>{new Date(s.created_at).toLocaleDateString()}</p>
        <p>{s.title}</p>
        <p>{s.status}</p>

        </Link>
      </li>
    ))}
  </ul>
);
}