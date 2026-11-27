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

  const sourceLink = input.source_link.trim();
  if (sourceLink && !isValidUrl(sourceLink)) {
    errors.source_link = "Use a full link starting with http:// or https://.";
  } else if (publishing && !sourceLink) {
    errors.source_link = "Add a link to the article.";
  }

  if (publishing) {
    if (!input.date) errors.date = "Add the date.";
    if (input.company_id === null) errors.company_id = "Pick a company.";
  }

  return errors;
}
