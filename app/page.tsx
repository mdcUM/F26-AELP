"use client"

import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import { SiteNav } from "@/components/site_navigation";
import { CompanyCard } from "@/components/company-card";
import { CompanyFilter } from "@/components/company-filter";
import { companyCards } from "@/lib/mock-data";

// shadcn imports
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("articles")

  // TODO: replace with a better search (e.g. Elasticsearch) later
  const visible = companyCards
    .filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.also.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) =>
      sort === "articles" ? b.articles - a.articles : a.name.localeCompare(b.name)
    )

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <SiteNav />
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />

          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button variant="outline">This is a ShadCN button</Button>
          </div>
          <section className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </section>
        </div>

        <div className="w-full max-w-5xl px-6">
          <Tabs defaultValue="articles" className="flex w-full flex-col gap-6">
            <TabsList variant="line" className="mx-auto w-full max-w-[520px]">
              <TabsTrigger value="articles">
                Articles <span className="font-normal text-muted-foreground">30</span>
              </TabsTrigger>
              <TabsTrigger value="companies">
                Companies <span className="font-normal text-muted-foreground">5</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="flex flex-col gap-4">
              <CompanyFilter total={30} />
              {/* article list goes here later */}
            </TabsContent>

            <TabsContent value="companies" className="flex flex-col gap-4">
              {/* search bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search companies or brands (e.g. Ring, Instagram, YouTube)"
                  className="h-11 rounded-none border-navy pl-10 text-sm dark:border-white/30"
                />
              </div>

              {/* count + sort */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {visible.length} companies · {visible.reduce((n, c) => n + c.articles, 0)} articles
                </span>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger className="h-9 w-[170px] rounded-none text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="articles">Sort: Most articles</SelectItem>
                    <SelectItem value="name">Sort: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* card grid */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {visible.map((c) => <CompanyCard key={c.slug} c={c} />)}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Supabase
            </a>
          </p>
          <ThemeSwitcher />
        </footer>
      </div>
    </main>
  );
}