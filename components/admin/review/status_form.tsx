"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { setStatus, updateNotes } from "@/components/admin/review/actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";

const labels: Record<string, string> = {
  new: "New",
  "follow-up": "Follow up",
  archived: "Archived",
  spam: "Spam"
};

export function StatusForm({
  id,
  currentStatus,
  currentNotes,
  tab,
}: {
  id: string;
  currentStatus: string;
  currentNotes: string | null;
  tab: string;
}) {
  const router = useRouter();
  const [noteState, setNoteState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function saveNotes(formData: FormData) {
    const notes = (formData.get("notes") as string).trim();
    if (notes === (currentNotes ?? "")) return;

    setNoteState("saving");
    try {
        await updateNotes(id, notes || null);
    } catch {
        setNoteState("error");
        return;
    }
    setNoteState("saved");
    router.refresh();
    toast(`Notes saved`, {});
  }

  async function save(formData: FormData) {
    const status = formData.get("status") as string;
    if (status === currentStatus) return;

    try {
      await setStatus(id, status);
    } catch {
      toast.error("Couldn't update status. Try again.");
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
    <div className="flex flex-col gap-4 mt-2">
    <form action={saveNotes} className="flex flex-col gap-2">
        <label htmlFor="notes">Notes</label>
        <textarea
            id="notes"
            name="notes"
            rows={3}
            defaultValue={currentNotes ?? ""}
            onChange={() => setNoteState("idle")}
            className="border p-1"
        />
        <div className="flex items-center gap-2">
            <button className="border px-2" disabled={noteState === "saving"}>
            Save
            </button>
            {noteState === "saving" && <span>Saving…</span>}
            {noteState === "saved" && <span>Saved</span>}
            {noteState === "error" && <span>Couldn't save. Try again.</span>}
        </div>
        </form>

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
    </div>
  );
}