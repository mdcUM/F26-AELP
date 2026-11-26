import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site_navigation";
import { companies } from "@/lib/mock-data";
import {
  getArticlesForCompany,
  getCompanyBySlug,
  slugify,
} from "@/lib/company-utils";

export function generateStaticParams() {
  return companies.map((c) => ({ slug: slugify(c.company_name) }));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = getCompanyBySlug(slug);
  if (!company) notFound();

  const companyArticles = getArticlesForCompany(company.id);

  return (
    <main className="min-h-screen flex flex-col items-center">
      <SiteNav />
      <div className="w-full max-w-3xl p-5 flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">{company.company_name}</h1>
          <p className="text-sm text-muted-foreground">
            {company.industry_types.join(" · ")}
          </p>
          <p>{company.summary}</p>
          <div className="flex flex-wrap gap-2">
            {company.tags.map((tag) => (
              <span key={tag} className="rounded-full border px-3 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">
            Articles ({companyArticles.length})
          </h2>
          {companyArticles.length === 0 && (
            <p className="text-sm text-muted-foreground">No articles yet.</p>
          )}
          {companyArticles.map((a) => (
            <a
              key={a.id}
              href={a.source_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2 rounded-md border p-4 hover:bg-muted"
            >
              <span className="text-xs text-muted-foreground">
                {formatDate(a.published_at)}
              </span>
              <span className="font-medium">{a.title}</span>
              {a.tags.length > 0 && (
                <span className="flex flex-wrap gap-2">
                  {a.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs">
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}