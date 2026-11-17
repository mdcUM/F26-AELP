import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function SiteNav() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <Link href="/" className="font-semibold">
          AELP
        </Link>
        <Link href="/submit" className={buttonVariants({ size: "sm" })}>
          Submit a tip
        </Link>
      </div>
    </nav>
  );
}