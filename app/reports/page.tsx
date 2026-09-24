import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";

async function getReportData() {
  const { data } = await supabase
    .from("bumil_dataset")
    .select("*");

  const total = data?.length ?? 0;

  const kbr =
    data?.filter(
      (d) => d.kategori_risiko === "KBR"
    ).length ?? 0;

  const krr =
    data?.filter(
      (d) => d.kategori_risiko === "KRR"
    ).length ?? 0;

  const krt =
    data?.filter(
      (d) => d.kategori_risiko === "KRT"
    ).length ?? 0;

  const krst =
    data?.filter(
      (d) => d.kategori_risiko === "KRST"
    ).length ?? 0;

  const hipertensi =
    data?.filter(
      (d) =>
        d.tekanan_darah_sistol >= 140 ||
        d.tekanan_darah_diastol >= 90
    ).length ?? 0;

  return {
    total,
    kbr,
    krr,
    krt,
    krst,
    hipertensi,
  };
}

export default async function ReportsPage() {
  const report =
    await getReportData();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <Navbar />

        <div className="rounded-xl bg-white p-8 shadow">
          <h1 className="mb-2 text-4xl font-bold text-blue-700">
            Laporan Analisis Keseluruhan
            Skrining Kehamilan
          </h1>

          <p className="mb-8 text-gray-600">
            Sistem Monitoring Kehamilan
            Berdasarkan Skor Poedji
            Rochjati.
          </p>

          <hr className="mb-8" />

          <h2 className="mb-4 text-2xl font-bold text-blue-700">
            1. Ringkasan Eksekutif
          </h2>

          <p className="mb-8 leading-7">
            Berdasarkan analisis terhadap{" "}
            <strong>
              {report.total}
            </strong>{" "}
            data ibu hamil, ditemukan
            bahwa sebagian besar ibu
            hamil berada pada kategori
            risiko tinggi dan risiko
            sangat tinggi sehingga
            memerlukan pemantauan
            berkelanjutan oleh kader
            Posyandu dan tenaga
            kesehatan.
          </p>

          <h2 className="mb-4 text-2xl font-bold text-blue-700">
            2. Distribusi Risiko
          </h2>

          <table className="mb-8 w-full border">
            <thead>
              <tr className="bg-blue-700 text-white">
                <th className="p-3 text-left">
                  Kategori
                </th>

                <th className="p-3 text-left">
                  Jumlah
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-3">
                  KBR
                </td>
                <td className="border p-3">
                  {report.kbr}
                </td>
              </tr>

              <tr>
                <td className="border p-3">
                  KRR
                </td>
                <td className="border p-3">
                  {report.krr}
                </td>
              </tr>

              <tr>
                <td className="border p-3">
                  KRT
                </td>
                <td className="border p-3">
                  {report.krt}
                </td>
              </tr>

              <tr>
                <td className="border p-3">
                  KRST
                </td>
                <td className="border p-3">
                  {report.krst}
                </td>
              </tr>

              <tr>
                <td className="border p-3">
                  Hipertensi
                </td>
                <td className="border p-3">
                  {report.hipertensi}
                </td>
              </tr>
            </tbody>
          </table>

          <h2 className="mb-4 text-2xl font-bold text-blue-700">
            3. Faktor Risiko Dominan
          </h2>

          <ul className="mb-8 list-disc pl-8">
            <li>
              Hipertensi:
              {" "}
              {report.hipertensi}
              {" "}
              kasus
            </li>

            <li>
              Risiko Tinggi (KRT):
              {" "}
              {report.krt}
              {" "}
              kasus
            </li>

            <li>
              Risiko Sangat Tinggi
              (KRST):
              {" "}
              {report.krst}
              {" "}
              kasus
            </li>
          </ul>

          <h2 className="mb-4 text-2xl font-bold text-blue-700">
            4. Rekomendasi Program
          </h2>

          <ul className="list-disc pl-8">
            <li>
              Pemantauan berkala ibu
              hamil kategori KRST.
            </li>

            <li>
              Peningkatan skrining
              hipertensi.
            </li>

            <li>
              Penguatan edukasi kader
              Posyandu.
            </li>

            <li>
              Optimalisasi rujukan
              dini bagi ibu hamil
              berisiko.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}