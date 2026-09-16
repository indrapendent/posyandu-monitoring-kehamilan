import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mb-8 rounded-xl bg-white p-4 shadow">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Link href="/dashboard" className="flex items-center gap-3">
        <Image
          src="/logo-posyandu.PNG"
          alt="Logo Posyandu"
          width={48}
          height={48}
        />

        <div>
          <h1 className="text-lg font-semibold">
            Monitoring Kehamilan
          </h1>

          <p className="text-sm text-gray-500">
            Posyandu
          </p>
        </div>
      </Link>

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
      </div>
      </div>
    </nav>
  );
}