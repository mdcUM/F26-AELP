import { tagStyles, type CompanyCardData } from "@/lib/mock-data"

export function CompanyCard({ c }: { c: CompanyCardData }) {
  return (
    <div className="flex min-h-[250px] flex-col border border-border bg-card p-5 dark:bg-white/5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-black uppercase tracking-tight text-navy dark:text-white">{c.name}</h3>
        <span className="text-[11px] text-muted-foreground">{c.articles} articles</span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">Also: {c.also}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.tags.map((t) => (
          <span key={t} className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium ${tagStyles[t]}`}>
            <i className="size-1 rounded-full" />
            {t}
          </span>
        ))}
      </div>

      <p className="mt-4 border-t border-border pt-4 text-xs text-foreground">Latest: {c.latest}</p>

      <a href={`/companies/${c.slug}`} className="mt-auto pt-6 text-xs font-bold text-brand hover:underline">
        View profile →
      </a>
    </div>
  )
}