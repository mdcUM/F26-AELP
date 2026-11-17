import type { Article, Company } from "@/lib/types";

export const companies: Company[] = [
  {
    id: 1,
    company_name: "Acme Robotics",
    industry_types: ["robotics"],
    summary: "Builds warehouse robots for small businesses.",
    tags: ["robotics", "logistics"],
  },
  {
    id: 2,
    company_name: "Amazon",
    industry_types: ["retail", "cloud computing", "logistics"],
    summary:
      "Amazon is a global technology company spanning e-commerce, cloud computing, logistics, and AI. Founded in 1994 as an online bookstore, it is now one of the world's largest retailers.",
    tags: ["monopoly", "self-preferencing", "workers", "small business", "FTC"],
  },
  {
    id: 3,
    company_name: "Meta",
    industry_types: ["social media", "artificial intelligence", "virtual reality"],
    summary:
      "Meta is a technology company that builds social media and communication platforms, including Facebook, Instagram, WhatsApp, and Messenger. Formerly known as Facebook, it rebranded in 2021 to reflect its investments in virtual reality, augmented reality, and artificial intelligence.",
    tags: ["monopoly", "mergers", "data privacy", "FTC", "consumers"],
  },
];

export const articles: Article[] = [
  {
    id: 1,
    company_id: 2,
    title: "FTC sues Amazon for illegally maintaining monopoly power",
    source_link: "https://example.com/ftc-sues-amazon",
    published_at: "2026-09-26",
    tags: ["monopoly", "FTC", "lawsuit"],
  },
  {
    id: 2,
    company_id: 2,
    title: "Amazon's rising seller fees squeeze small businesses on its marketplace",
    source_link: "https://example.com/amazon-seller-fees",
    published_at: "2026-07-14",
    tags: ["self-preferencing", "small business"],
  },
  {
    id: 3,
    company_id: 2,
    title:
      "Warehouse workers allege Amazon's productivity quotas and surveillance practices violate labor protections, prompting calls for a federal investigation into the company's employment practices",
    source_link: "https://example.com/amazon-warehouse-workers",
    published_at: "2026-03-02",
    tags: ["workers", "investigation", "labor", "monopoly", "Congress", "DOJ"],
  },
  {
    id: 4,
    company_id: 3,
    title: "Court weighs whether Meta's Instagram and WhatsApp deals broke antitrust law",
    source_link: "https://example.com/meta-instagram-whatsapp",
    published_at: "2026-10-30",
    tags: ["mergers", "FTC", "lawsuit"],
  },
  {
    id: 5,
    company_id: 3,
    title: "How Meta's data collection shapes the ads you see",
    source_link: "https://example.com/meta-data-ads",
    published_at: "2025-12-18",
    tags: [],
  },
  {
    id: 6,
    company_id: 1,
    title: "Acme Robotics opens new facility in Ohio",
    source_link: "https://example.com/acme-ohio",
    published_at: "2026-05-21",
    tags: ["workers"],
  },
];