import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/LogoutButton";

async function getStatistics() {
  const { data: mothers, error: mothersError } =
    await supabase
      .from("mothers")
      .select("id");

  const {
    data: examinations,
    error: examinationsError,
  } = await supabase
    .from("examinations")
    .select("status_risiko");

  if (mothersError) {
    throw mothersError;
  }

  if (examinationsError) {
    throw examinationsError;
  }

  const totalMothers = mothers.length;

  const totalExaminations =
    examinations.length;

  const risikoRendah =
    examinations.filter(
      (e) =>
        e.status_risiko ===
        "Risiko Rendah"
    ).length;

  const risikoSedang =
    examinations.filter(
      (e) =>
        e.status_risiko ===
        "Risiko Sedang"
    ).length;

  const risikoTinggi =
    examinations.filter(
      (e) =>
        e.status_risiko ===
        "Risiko Tinggi"
    ).length;

  return {
    totalMothers,
    totalExaminations,
    risikoRendah,
    risikoSedang,
    risikoTinggi,
  };
}

export default async function DashboardPage() {
  const session = await getServerSession(
    authOptions
  );

  if (!session) {
    redirect("/login");
  }

  const stats = await getStatistics();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-6xl">
        <Navbar />

        <h1 className="mb-2 text-3xl font-bold text-green-700">
          Dashboard Monitoring Kehamilan
        </h1>

        <p className="mb-8 text-gray-600">
          Selamat datang di aplikasi
          monitoring ibu hamil.
        </p>

        <div className="mb-8 grid gap-4 md:grid-cols-5">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Ibu Hamil
            </p>

            <h2 className="text-3xl font-bold text-green-700">
              {stats.totalMothers}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Pemeriksaan
            </p>

            <h2 className="text-3xl font-bold text-blue-600">
              {stats.totalExaminations}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Risiko Rendah
            </p>

            <h2 className="text-3xl font-bold text-green-600">
              {stats.risikoRendah}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Risiko Sedang
            </p>

            <h2 className="text-3xl font-bold text-yellow-500">
              {stats.risikoSedang}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Risiko Tinggi
            </p>

            <h2 className="text-3xl font-bold text-red-600">
              {stats.risikoTinggi}
            </h2>
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
                <button className="rounded-xl bg-green-600 px-4 py-2 text-white">
                  Lihat Data Ibu Hamil
                </button>
              </Link>
    
              <LogoutButton />
            </div>
          </div>
        </main>
      );
    }