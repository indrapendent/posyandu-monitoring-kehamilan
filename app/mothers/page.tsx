import Link from "next/link";
import { cache } from "react";

interface Mother {
  mother_id: string;
  nama: string;
  nomor_hp: string;
  hpht: string;
  hpl: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function getMothers(): Promise<Mother[]> {
  const response = await fetch(
    process.env.NEXT_PUBLIC_APP_URL + "/api/mothers",
{
  cache: "no-store",
}
  );

  return response.json();
}

export default async function MothersPage() {
  const mothers = await getMothers();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-700">
            Data Ibu Hamil
          </h1>
          <Link
            href="/mothers/new"
            className="rounded-xl bg-green-700 px-4 py-2 text-white"
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
              {mothers.map((mother) => (
                <tr
                  key={mother.mother_id}
                  className="border-t"
                >
                  <td className="p-4">
                    <Link href={`/mothers/${mother.mother_id}`}>
                      {mother.nama}
                    </Link>
                  </td>

                  <td className="p-4">
                    {mother.nomor_hp}
                  </td>

                  <td className="p-4">
                    {formatDate(mother.hpht)}
                  </td>

                  <td className="p-4">
                    {formatDate(mother.hpl)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}