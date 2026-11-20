type HttpUrl = `http://${string}` | `https://${string}`;

export type Article = {

    id: number;
    title: string;
    source_link: HttpUrl;
    published_at: string;
    company_id: number;
    tags: string[];
};

export type Company = {
    id: number;
    company_name: string;
    industry_types: string[];
    summary: string;
    tags: string[];
};

export const ENTRY_TYPE_OPTIONS = [
  { value: "government_action", label: "Government and court action" },
  { value: "news_report", label: "News report" },
  { value: "aelp_research", label: "AELP research" },
  { value: "merger_acquisition", label: "Merger or acquisition" },
] as const;

export type EntryType = (typeof ENTRY_TYPE_OPTIONS)[number]["value"];

export type EntryStatus = "draft" | "published";

export type Tag = {
  id: number;
  name: string;
};

export type CompanyOption = {
  id: number;
  company_name: string;
};

export type EntryCompanyLink = {
  company_id: number;
  is_pinned: boolean;
};

export type EntryInput = {
  headline: string;
  summary: string;
  source_url: string;
  source_name: string;
  published_date: string;
  type: EntryType | "";
  companies: EntryCompanyLink[];
  tag_ids: number[];
};

export const EMPTY_ENTRY: EntryInput = {
  headline: "",
  summary: "",
  source_url: "",
  source_name: "",
  published_date: "",
  type: "",
  companies: [],
  tag_ids: [],
};

export type EntryRecord = EntryInput & {
  id: number;
  status: EntryStatus;
  updated_at: string;
  updated_by_name: string;
};
