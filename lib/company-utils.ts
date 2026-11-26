import { articles, companies } from "@/lib/mock-data";

export function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCompanyBySlug(slug: string) {
  return companies.find((c) => slugify(c.company_name) === slug);
}

// Newest first
export function getArticlesForCompany(companyId: number) {
  return articles
    .filter((a) => a.company_id === companyId)
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
}