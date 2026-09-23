import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/LogoutButton";
import RiskChart from "@/components/RiskChart";

async function getStatistics() {
  const { data, error } = await supabase
    .from("bumil_dataset")
    .select("*");

  if (error) {
    throw error;
  }

  const totalBumil = data.length;

  const kbr = data.filter(
    (item) => item.kategori_risiko === "KBR"
  ).length;

  const krr = data.filter(
    (item) => item.kategori_risiko === "KRR"
  ).length;

  const krt = data.filter(
    (item) => item.kategori_risiko === "KRT"
  ).length;

  const krst = data.filter(
    (item) => item.kategori_risiko === "KRST"
  ).length;

  const hipertensi = data.filter(
    (item) =>
      item.tekanan_darah_sistol >= 140 ||
      item.tekanan_darah_diastol >= 90
  ).length;

  const kbrPercent =
    totalBumil > 0
      ? ((kbr / totalBumil) * 100).toFixed(1)
      : "0";

  const krrPercent =
    totalBumil > 0
      ? ((krr / totalBumil) * 100).toFixed(1)
      : "0";

  const krtPercent =
    totalBumil > 0
      ? ((krt / totalBumil) * 100).toFixed(1)
      : "0";

  const krstPercent =
    totalBumil > 0
      ? ((krst / totalBumil) * 100).toFixed(1)
      : "0";

  const highRiskMothers = data
    .filter(
      (item) =>
        item.kategori_risiko === "KRST"
    )
    .sort(
      (a, b) =>
        b.skor_poedji_rochjati -
        a.skor_poedji_rochjati
    )
    .slice(0, 10);

  return {
    totalBumil,
    hipertensi,

    kbr,
    krr,
    krt,
    krst,

    kbrPercent,
    krrPercent,
    krtPercent,
    krstPercent,

    highRiskMothers,
  };
}

export default async function DashboardPage() {
  const session =
    await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const stats =
    await getStatistics();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <Navbar />

        <h1 className="mb-2 text-3xl font-bold text-green-700">
          Dashboard Monitoring Kehamilan
        </h1>

        <p className="mb-8 text-gray-600">
          Dashboard berbasis data riil
          Posyandu dan klasifikasi
          Poedji Rochjati.
        </p>

        <div className="mb-8 grid gap-4 md:grid-cols-6">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Bumil
            </p>

            <h2 className="text-3xl font-bold text-green-700">
              {stats.totalBumil}
            </h2>
          </div>

          <div className="rounded-xl border-l-4 border-green-700 bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Kehamilan Biasa Risiko
            </p>

            <p className="text-xs text-green-700">
              (KBR)
            </p>

            <h2 className="text-3xl font-bold text-green-700">
              {stats.kbr}
            </h2>

            <p className="mt-2 text-xs text-green-700">
              {stats.kbrPercent}%
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-green-500 bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Kehamilan Risiko Rendah
            </p>

            <p className="text-xs text-green-600">
              (KRR)
            </p>

            <h2 className="text-3xl font-bold text-green-500">
              {stats.krr}
            </h2>

            <p className="mt-2 text-xs text-green-600">
              {stats.krrPercent}%
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-yellow-500 bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Kehamilan Risiko Tinggi
            </p>

            <p className="text-xs text-yellow-600">
              (KRT)
            </p>

            <h2 className="text-3xl font-bold text-yellow-500">
              {stats.krt}
            </h2>

            <p className="mt-2 text-xs text-yellow-600">
              {stats.krtPercent}%
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-red-500 bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Kehamilan Risiko Sangat Tinggi
            </p>

            <p className="text-xs text-red-600">
              (KRST)
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {stats.krst}
            </h2>

            <p className="mt-2 text-xs text-red-600">
              {stats.krstPercent}%
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-purple-500 bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Hipertensi
            </p>

            <h2 className="text-3xl font-bold text-purple-600">
              {stats.hipertensi}
            </h2>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <RiskChart
            kbr={stats.kbr}
            krr={stats.krr}
            krt={stats.krt}
            krst={stats.krst}
          />

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold text-red-600">
              ⚠️ Perlu Perhatian
            </h2>

            <p className="mb-4 text-sm text-gray-500">
              10 ibu hamil dengan skor
              Poedji Rochjati tertinggi.
            </p>

            <div className="space-y-3">
              {stats.highRiskMothers.map(
                (mother) => (
                  <div
                    key={mother.id}
                    className="rounded-lg border border-red-200 p-3"
                  >
                    <div className="font-medium text-red-700">
                      {mother.nama_ibu}
                    </div>

                    <div className="text-sm text-gray-600">
                      Skor:
                      {" "}
                      {mother.skor_poedji_rochjati}
                    </div>

                    <div className="text-sm text-gray-600">
                      {mother.alamat}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Informasi Pengguna
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Nama:</strong>{" "}
              {session.user?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {session.user?.email}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Link href="/mothers">
            <button className="rounded-xl bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              Lihat Data Ibu Hamil
            </button>
          </Link>

          <LogoutButton />
        </div>
      </div>
    </main>
  );
}