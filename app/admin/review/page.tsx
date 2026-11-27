import { Suspense } from "react";
import { ReviewTabs } from "@/components/admin/review/review-tabs";
import { ReviewList } from "@/components/admin/review/review-list";
import { ReviewDetails } from "@/components/admin/review/review-details";
import { createClient } from "@/lib/supabase/server";

type Props = { searchParams: Promise<{ status?: string ; id?: string}> };

export default function ReviewPage({ searchParams }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Review queue</h1>

      <Suspense fallback={<ReviewTabs current="" />}>
        <TabsWithStatus searchParams={searchParams} />
      </Suspense>

      <div className="grid gap-6 grid-cols-[320px_1fr]">
        <Suspense fallback={<p>Loading…</p>}>
          <ListWithStatus searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<p>Loading…</p>}>
          <DetailWithId searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function TabsWithStatus({ searchParams }: Props) {
  const { status = "new" } = await searchParams;
  const supabase = await createClient();

  // Counts rows with a given status, without downloading them.
  const countFor = async (s: string) => {
    const { count } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", s);
    return count ?? 0;
  };

  const [newCount, followUpCount] = await Promise.all([
    countFor("new"),
    countFor("follow-up"),
  ]);

  return (
    <ReviewTabs
      current={status}
      counts={{ "new": newCount, "follow-up": followUpCount }}
    />
  );

}

async function ListWithStatus({ searchParams }: Props) {
  const { status = "new" , id} = await searchParams;
  return <ReviewList status={status} selectedId={id}/>;
}

async function DetailWithId({ searchParams }: Props) {
  const { status = "new", id } = await searchParams;
  return <ReviewDetails id={id} tab={status} />;
}