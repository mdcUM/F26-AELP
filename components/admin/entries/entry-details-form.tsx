"use client";

import { useState } from "react";

type HttpUrl = `http://${string}` | `https://${string}`;

export type ArticleStatus = "draft" | "published";

export type EntryInput = {
  headline: string;
  summary: string;
  source_link: HttpUrl | "";
  date: string;
  company_id: number | null;
  status: ArticleStatus;
  is_pinned: boolean;
};

export const EMPTY_ENTRY: EntryInput = {
  headline: "",
  summary: "",
  source_link: "",
  date: "",
  company_id: null,
  status: "draft",
  is_pinned: false,
};

export function EntryDetailsForm() {
  const [entry, setEntry] = useState<EntryInput>(EMPTY_ENTRY);

  function update<K extends keyof EntryInput>(key: K, value: EntryInput[K]) {
    setEntry((prev) => ({ ...prev, [key]: value }));
  }

  return <div>EntryDetailsForm</div>;
}
