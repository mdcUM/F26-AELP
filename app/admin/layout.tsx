import Link from "next/link";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";
import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">


      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={"/admin"}>Admin page navbar</Link>
          </div>
          {!hasEnvVars ? (
            <EnvVarWarning />
          ) : (
            <Suspense>
              <AuthButton />
            </Suspense>
          )}
        </div>
      </nav>
        
      <div className="flex flex-1">
        <aside className="w-56 border-r p-4 flex flex-col gap-2">
          <p className="font-bold mb-4">AELP admin side</p>
          <Link href="/admin">Home</Link>
          <Link href="/admin/review">Review queue</Link>
          <Link href="/admin/entries">Entries</Link>
          <Link href="/admin/companies">Companies</Link>
        </aside>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}