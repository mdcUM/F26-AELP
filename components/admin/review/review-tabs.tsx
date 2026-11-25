import Link from "next/link";

const tabs = [
  { label: "New", status: "new" },
  { label: "Reviewed", status: "reviewed" },
  { label: "Follow Up", status: "follow-up" },
  { label: "Archived", status: "archived" },
  { label: "Spam", status: "spam" },
  { label: "All", status: "all" },
];



export function ReviewTabs({ current }: { current: string }) {
  return (
    <div className="flex gap-2 border-b">
      {tabs.map((tab) => (
        <Link
          key={tab.status}
          href={`/admin/review?status=${tab.status}`}
          className={
            tab.status === current
              ? "px-3 py-2 border-b-2 border-foreground font-medium"
              : "px-3 py-2 text-muted-foreground"
          }
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}