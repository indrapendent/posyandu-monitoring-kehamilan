import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

interface Bumil {
  id: string;
  id_ibu: string;
  nama_ibu: string;
  usia: number;
  usia_hamil: string;
  alamat: string;
  kategori_risiko: string;
}

async function getBumil(): Promise<Bumil[]> {
  const { data, error } = await supabase
    .from("bumil_dataset")
    .select("*")
    .order("nama_ibu");

  if (error) {
    console.error(error);
    return [];
  }

  return data as Bumil[];
}

function getRiskColor(risk: string) {
  switch (risk) {
    case "KBR":
      return "text-green-700";

    case "KRR":
      return "text-green-500";

    case "KRT":
      return "text-yellow-600";

    case "KRST":
      return "text-red-600";

    default:
      return "text-gray-600";
  }
}

export default async function MothersPage() {
  const mothers = await getBumil();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <Navbar />

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-700">
            Data Bumil Posyandu
          </h1>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  ID Bumil
                </th>

                <th className="p-4 text-left">
                  Nama Bumil
                </th>

                <th className="p-4 text-left">
                  Usia
                </th>

                <th className="p-4 text-left">
                  Usia Kehamilan
                </th>

                <th className="p-4 text-left">
                  Risiko
                </th>
              </tr>
            </thead>

            <tbody>
              {mothers.map((mother) => (
                <tr
                  key={mother.id}
                  className="border-t"
                >
                  <td className="p-4 font-medium">
                    {mother.id_ibu}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/mothers/${mother.id}`}
                      className="text-green-700 hover:underline"
                    >
                      {mother.nama_ibu}
                    </Link>
                  </td>

                  <td className="p-4">
                    {mother.usia} Tahun
                  </td>

                  <td className="p-4">
                    {mother.usia_hamil}
                  </td>

                  <td className={`p-4 font-medium ${getRiskColor(mother.kategori_risiko)}`}>
                    {mother.kategori_risiko}
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

             