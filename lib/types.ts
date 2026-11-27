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

export type EntryStatus = "draft" | "published" | "archived";

export type Tag = {
  id: number;
  name: string;
};

export type CompanyOption = {
  id: number;
  name: string;
};

export type EntryInput = {
  headline: string;
  summary: string;
  source_link: string;
  date: string;
  company_id: number | null;
  is_pinned: boolean;
  tag_ids: number[];
};

export const EMPTY_ENTRY: EntryInput = {
  headline: "",
  summary: "",
  source_link: "",
  date: "",
  company_id: null,
  is_pinned: false,
  tag_ids: [],
};

export type EntryRecord = EntryInput & {
  id: number;
  status: EntryStatus;
};
