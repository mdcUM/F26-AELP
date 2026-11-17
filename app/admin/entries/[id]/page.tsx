import { EntryDetailsForm } from "@/components/admin/entries/entry-details-form";
import { EntryCompaniesIssues } from "@/components/admin/entries/entry-companies-issues";
import { EntryPublicationPanel } from "@/components/admin/entries/entry-publication-panel";
import { EntryLivePreview } from "@/components/admin/entries/entry-live-preview";

// Individual entry editor: form on the left, publication + preview on the right.
export default async function EntryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Entry {id}</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <EntryDetailsForm />
          <EntryCompaniesIssues />
        </div>
        <aside className="flex flex-col gap-6">
          <EntryPublicationPanel />
          <EntryLivePreview />
        </aside>
      </div>
    </div>
  );
}
