import Link from "next/link";

export default function MothersPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-700">
            Data Ibu Hamil
          </h1>
          <Link
            href="/mothers/new"
            className="rounded-xl bg-green-600 px-4 py-2 text-white hover:shadow"
          >
            Tambah Data
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">No HP</th>
                <th className="p-4 text-left">HPHT</th>
                <th className="p-4 text-left">HPL</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-4">Belum ada data</td>
                <td className="p-4">-</td>
                <td className="p-4">-</td>
                <td className="p-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}