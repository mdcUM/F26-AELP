import { EntriesHeader } from "@/components/admin/entries/entries-header";
import { EntriesFilters } from "@/components/admin/entries/entries-filters";
import { EntriesTable } from "@/components/admin/entries/entries-table";
import { EntriesPagination } from "@/components/admin/entries/entries-pagination";

// Entries overview: header, search/filters, table, pagination.
export default function EntriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <EntriesHeader />
      <EntriesFilters />
      <EntriesTable />
      <EntriesPagination />
    </div>
  );
}
