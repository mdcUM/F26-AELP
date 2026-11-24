import { Suspense } from "react";
import { ReviewTabs } from "@/components/admin/review/review-tabs";
import { ReviewList } from "@/components/admin/review/review-list";
import { ReviewDetails } from "@/components/admin/review/review-details";

export default function ReviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Review queue</h1>
      <ReviewTabs />
      <div className="grid gap-6 grid-cols-[320px_1fr]">
        <Suspense fallback={<p>Loading…</p>}>
          <ReviewList />
        </Suspense>
        <ReviewDetails />
      </div>
    </div>
  );
}