import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Mother {
  mother_id: string;
  nama: string;
  tanggal_lahir: string;
  nomor_hp: string;
  alamat: string;
  hpht: string;
  hpl: string;
}

interface Examination {
  examination_id: string;
  mother_id: string;
  tanggal_pemeriksaan: string;
  berat_badan: number;
  tekanan_darah: string;
  lila: number;
  keluhan: string;
  catatan: string;
  status_risiko: string;
}

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

async function getMothers(): Promise<Mother[]> {
  const response = await fetch(
  `${process.env.NEXT_PUBLIC_APP_URL}/api/mothers`,
  {
    next: {
      revalidate: 60,
    },
  }
);
  return response.json();
}

async function getExaminations(): Promise<
  Examination[]
> {
  const response = await fetch(
  `${process.env.NEXT_PUBLIC_APP_URL}/api/mothers`,
  {
    next: {
      revalidate: 60,
    },
  }
);

  return response.json();
}

export default async function MotherDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const mothers = await getMothers();
  const examinations = await getExaminations();

  const mother = mothers.find(
    (m) => m.mother_id === id
  );

  if (!mother) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold">
          Data tidak ditemukan
        </h1>
      </main>
    );
  }

  const motherExaminations =
    examinations.filter(
      (exam) => exam.mother_id === id
    );

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

                    {motherExaminations.length === 0 ? (
                      <p className="text-gray-500">
                        Belum ada riwayat pemeriksaan.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {motherExaminations.map(
                          (exam) => (
                            <div
                              key={exam.examination_id}
                              className="rounded-lg border p-4"
                            >
                              <p className="font-medium">
                                {formatDate(
                                  exam.tanggal_pemeriksaan
                                )}
                              </p>
                              <p className="text-sm text-gray-600">
                                Berat: {exam.berat_badan} kg |
                                Tekanan Darah:{" "}
                                {exam.tekanan_darah} | LILA:{" "}
                                {exam.lila} cm
                              </p>
                              <p className="text-sm text-gray-600">
                                Keluhan: {exam.keluhan}
                              </p>
                              <p className="text-sm text-gray-600">
                                Catatan: {exam.catatan}
                              </p>
                              <p className="text-sm font-medium">
                                Status Risiko:{" "}
                                {exam.status_risiko}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </main>
            );
          }