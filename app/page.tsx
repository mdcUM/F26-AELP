"use client"

import { Hero } from "@/components/hero";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ConnectSupabaseSteps } from "@/components/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/lib/utils";
import { SiteNav } from "@/components/site_navigation";


// shadcn imports
import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
//import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const companies = [
  { value: "amazon", label: "Amazon", count: 9 },
  { value: "apple", label: "Apple", count: 6 },
  { value: "google", label: "Google", count: 7 },
  { value: "meta", label: "Meta", count: 5 },
  { value: "microsoft", label: "Microsoft", count: 3 },
]

const companyCards = [
  { slug: "amazon", name: "Amazon", also: "Ring, Whole Foods, One Medical", articles: 9,
    tags: ["Prices", "Privacy and surveillance", "Workers"],
    latest: "Amazon raises seller fees for third year" },
  { slug: "apple", name: "Apple", also: "App Store, iCloud, Apple Pay", articles: 6,
    tags: ["Competition", "Privacy and surveillance"],
    latest: "Apple App Store fees challenged by developers" },
  { slug: "google", name: "Google", also: "YouTube, Android, DoubleClick", articles: 7,
    tags: ["Competition", "Privacy and surveillance"],
    latest: "Google ad tech ruling appealed" },
  { slug: "meta", name: "Meta", also: "Facebook, Instagram, WhatsApp", articles: 5,
    tags: ["Kids and safety", "Privacy and surveillance"],
    latest: "Meta settles child safety case for $17B" },
  { slug: "microsoft", name: "Microsoft", also: "Azure, LinkedIn, Xbox", articles: 3,
    tags: ["Competition", "Workers"],
    latest: "Microsoft cloud licensing draws EU complaint" },
]

// pill bg/text + dot color per tag
const tagStyles: Record<string, string> = {
  "Prices": "bg-amber-100 text-amber-900 [&>i]:bg-amber-500",
  "Privacy and surveillance": "bg-purple-100 text-purple-900 [&>i]:bg-purple-500",
  "Workers": "bg-emerald-100 text-emerald-900 [&>i]:bg-emerald-500",
  "Competition": "bg-blue-100 text-blue-900 [&>i]:bg-blue-500",
  "Kids and safety": "bg-pink-100 text-pink-900 [&>i]:bg-pink-500",
}

function CompanyCard({ c }: { c: (typeof companyCards)[number] }) {
  return (
    <div className="flex min-h-[250px] flex-col border border-border bg-white p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-black uppercase tracking-tight text-navy">{c.name}</h3>
        <span className="text-[11px] text-muted-foreground">{c.articles} articles</span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">Also: {c.also}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.tags.map((t) => (
          <span key={t} className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium ${tagStyles[t]}`}>
            <i className="size-1 rounded-full" />
            {t}
          </span>
        ))}
      </div>

      <p className="mt-4 border-t border-border pt-4 text-xs text-foreground">Latest: {c.latest}</p>

      <a href={`/companies/${c.slug}`} className="mt-auto pt-6 text-xs font-bold text-brand hover:underline">
        View profile →
      </a>
    </div>
  )
}

function CompanyFilter({ total }: { total: number }) {
  return (
    <ToggleGroup
      type="single"
      defaultValue="all"
      variant="outline"
      size="sm"
      className="flex flex-row flex-wrap justify-start gap-2"
    >
      <ToggleGroupItem value="all">
        All companies <span className="ml-1.5 font-normal opacity-60">{total}</span>
      </ToggleGroupItem>
      {companies.map((c) => (
        <ToggleGroupItem key={c.value} value={c.value}>
          {c.label} <span className="ml-1.5 font-normal opacity-60">{c.count}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export default function Home() {
  // inside Home():
const [query, setQuery] = useState("")
const [sort, setSort] = useState("articles")

const visible = companyCards
  .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.also.toLowerCase().includes(query.toLowerCase()))
  .sort((a, b) => (sort === "articles" ? b.articles - a.articles : a.name.localeCompare(b.name)))

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <SiteNav />
        <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
          <Hero />
          
          <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button variant="outline">This is a ShadCN button</Button>
          </div>
          <main className="flex-1 flex flex-col gap-6 px-4">
            <h2 className="font-medium text-xl mb-4">Next steps</h2>
            {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
          </main>
        </div>

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
  <div className="flex">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search companies or brands (e.g. Ring, Instagram, YouTube)"
        className="h-11 rounded-none border-navy pl-10 text-sm"
      />
    </div>
    <Button className="h-11 rounded-none bg-brand px-8 text-[11px] font-bold uppercase tracking-[0.15em] text-white hover:bg-brand/90">
      Search
    </Button>
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
