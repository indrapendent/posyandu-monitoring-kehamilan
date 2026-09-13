import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mb-8 rounded-xl bg-white p-4 shadow">
      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Dashboard
        </Link>

        <Link
          href="/mothers"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Data Ibu
        </Link>

        <Link
          href="/mothers/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Tambah Ibu
        </Link>
      </div>
    </nav>
  );
}