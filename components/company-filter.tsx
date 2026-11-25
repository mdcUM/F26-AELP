"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { companyFilters } from "@/lib/mock-data"

export function CompanyFilter({ total }: { total: number }) {
  return (
    <ToggleGroup
      type="single"
      defaultValue="all"
      variant="outline"
      size="sm"
      className="flex flex-row flex-wrap justify-start gap-2"
    >
      <ToggleGroupItem value="all">
        All companies <span className="ml-1.5 font-normal opacity-60">{total}</span>
      </ToggleGroupItem>
      {companyFilters.map((c) => (
        <ToggleGroupItem key={c.value} value={c.value}>
          {c.label} <span className="ml-1.5 font-normal opacity-60">{c.count}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}