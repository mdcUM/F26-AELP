import { EntryDetailsForm } from "@/components/admin/entries/entry-details-form";
import { EntryCompaniesIssues } from "@/components/admin/entries/entry-companies-issues";
import { EntryPublicationPanel } from "@/components/admin/entries/entry-publication-panel";
import { EntryLivePreview } from "@/components/admin/entries/entry-live-preview";

// "New entry": same editor layout as /admin/entries/[id], starting empty.
export default function NewEntryPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">New entry</h1>
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
