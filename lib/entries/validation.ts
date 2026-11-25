import type { EntryInput, EntryStatus } from "@/lib/types";
import { isValidUrl } from "@/lib/utils";

export const SUMMARY_MAX = 320;

export type EntryErrors = Partial<Record<keyof EntryInput, string>>;

export function validateEntry(input: EntryInput, status: EntryStatus) {
  const errors: EntryErrors = {};
  const publishing = status === "published";

  if (!input.headline.trim()) errors.headline = "Add a headline.";

  if (input.summary.length > SUMMARY_MAX) {
    errors.summary = `Keep it to ${SUMMARY_MAX} characters or fewer.`;
  } else if (publishing && !input.summary.trim()) {
    errors.summary = "Add a short summary.";
  }

  const sourceUrl = input.source_url.trim();
  if (sourceUrl && !isValidUrl(sourceUrl)) {
    errors.source_url = "Use a full link starting with http:// or https://.";
  } else if (publishing && !sourceUrl) {
    errors.source_url = "Add a link to the article.";
  }

  if (publishing) {
    if (!input.source_name.trim()) errors.source_name = "Add the source name.";
    if (!input.published_date) errors.published_date = "Add the date.";
    if (!input.type) errors.type = "Pick a type.";
    if (input.companies.length === 0) errors.companies = "Add at least one company.";
  }

  return errors;
}
