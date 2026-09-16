import Link from "next/link";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

export default async function MotherDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const { data: mother, error: motherError } =
    await supabase
      .from("mothers")
      .select("*")
      .eq("id", id)
      .single();

  if (motherError || !mother) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">
          Data tidak ditemukan
        </h1>
      </main>
    );
  }

  const { data: examinations } =
    await supabase
      .from("examinations")
      .select("*")
      .eq("mother_id", id)
      .order("tanggal_pemeriksaan", {
        ascending: false,
      });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <Navbar />

        <h1 className="mb-6 text-3xl font-bold text-green-700">
          Detail Ibu Hamil
        </h1>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">
                Nama
              </p>
              <p className="font-medium">
                {mother.nama}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Tanggal Lahir
              </p>
              <p className="font-medium">
                {formatDate(
                  mother.tanggal_lahir
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Nomor HP
              </p>
              <p className="font-medium">
                {mother.nomor_hp}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Alamat
              </p>
              <p className="font-medium">
                {mother.alamat}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                HPHT
              </p>
              <p className="font-medium">
                {formatDate(mother.hpht)}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                HPL
              </p>
              <p className="font-medium">
                {formatDate(mother.hpl)}
              </p>
            </div>

            <div className="pt-4">
              <Link
                href={`/mothers/${id}/examinations/new`}
                className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Tambah Pemeriksaan
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Riwayat Pemeriksaan
          </h2>

          {!examinations ||
          examinations.length === 0 ? (
            <p className="text-gray-500">
              Belum ada riwayat pemeriksaan.
            </p>
          ) : (
            <div className="space-y-4">
              {examinations.map((exam) => (
                <div
                  key={exam.id}
                  className="rounded-lg border p-4"
                >
                  <p className="font-medium">
                    {formatDate(
                      exam.tanggal_pemeriksaan
                    )}
                  </p>

                  <p className="text-sm text-gray-600">
                    Berat: {exam.berat_badan} kg
                  </p>

                  <p className="text-sm text-gray-600">
                    Tekanan Darah:{" "}
                    {exam.tekanan_darah}
                  </p>

                  <p className="text-sm text-gray-600">
                    LILA: {exam.lila} cm
                  </p>

                  <p className="text-sm text-gray-600">
                    Keluhan: {exam.keluhan}
                  </p>

                  <p className="text-sm text-gray-600">
                    Catatan: {exam.catatan}
                  </p>

                  <p
                    className={`font-semibold ${
                      exam.status_risiko ===
                      "Risiko Tinggi"
                        ? "text-red-600"
                        : exam.status_risiko ===
                          "Risiko Sedang"
                        ? "text-yellow-500"
                        : "text-green-600"
                    }`}
                  >
                    {exam.status_risiko}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}