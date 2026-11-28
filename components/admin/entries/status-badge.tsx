import { Badge } from "@/components/ui/badge";
import type { EntryStatus } from "@/lib/types";

const STYLES: Record<EntryStatus, { label: string; variant: "default" | "outline" | "secondary" }> = {
  draft: { label: "Draft", variant: "outline" },
  published: { label: "Published", variant: "default" },
  archived: { label: "Archived", variant: "secondary" },
};

export function StatusBadge({ status }: { status: EntryStatus }) {
  const { label, variant } = STYLES[status];
  return <Badge variant={variant}>{label}</Badge>;
}
