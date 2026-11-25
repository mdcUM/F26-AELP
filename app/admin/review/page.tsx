import { Suspense } from "react";
import { ReviewTabs } from "@/components/admin/review/review-tabs";
import { ReviewList } from "@/components/admin/review/review-list";
import { ReviewDetails } from "@/components/admin/review/review-details";

type Props = { searchParams: Promise<{ status?: string }> };

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
        <ReviewDetails />
      </div>
    </div>
  );
}

async function TabsWithStatus({ searchParams }: Props) {
  const { status = "pending" } = await searchParams;
  return <ReviewTabs current={status} />;
}

async function ListWithStatus({ searchParams }: Props) {
  const { status = "pending" } = await searchParams;
  return <ReviewList status={status} />;
}