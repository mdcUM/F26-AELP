"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setStatus } from "@/components/admin/review/actions";

const labels: Record<string, string> = {
  new: "New",
  "follow-up": "Follow up",
  archived: "Archived",
  spam: "Spam"
};

export function StatusForm({
  id,
  currentStatus,
  tab,
}: {
  id: string;
  currentStatus: string;
  tab: string;
}) {
  const router = useRouter();

  async function save(formData: FormData) {
    const status = formData.get("status") as string;
    if (status === currentStatus) return;

    try {
      await setStatus(id, status);
    } catch {
      toast.error("Couldn't update status");
      return;
    }

    router.push(`/admin/review?status=${tab}`, { scroll: false });
    toast(`Item moved to ${labels[status]}`, {
      action: {
        label: "View",
        onClick: () => router.push(`/admin/review?status=${status}&id=${id}`),
      },
    });
  }

  return (
    <form action={save} className="flex gap-2 mt-2">
      <label htmlFor="status">Mark as:</label>
      <select id="status" name="status" defaultValue={currentStatus} className="border">
        <option value="new">New</option>
        <option value="follow-up">Follow-up</option>
        <option value="reviewed">Reviewed</option>
        <option value="spam">Spam</option>
      </select>
      <button className="border px-2">Save</button>
    </form>
  );
}