export type Article = {
    id: number;
    title: string;
    source_link: string;
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