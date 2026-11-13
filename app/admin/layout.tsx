import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-56 border-r p-4 flex flex-col gap-2">
        <p className="font-bold mb-4">AELP admin side</p>
        <Link href="/admin">Home</Link>
        <Link href="/admin/review">Review queue</Link>
        <Link href="/admin/entries">Entries</Link>
        <Link href="/admin/companies">Companies</Link>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}