import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Mother {
  mother_id: string;
}

interface Examination {
  status_risiko: string;
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
    `${process.env.NEXT_PUBLIC_APP_URL}/api/examinations`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  return response.json();
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const mothers = await getMothers();
  const examinations =
    await getExaminations();

  const totalMothers =
    mothers.length;

  const totalExaminations =
    examinations.length;

  const risikoRendah =
    examinations.filter(
      (e) =>
        e.status_risiko ===
        "Risiko Rendah"
    ).length;

  const risikoTinggi =
    examinations.filter(
      (e) =>
        e.status_risiko ===
        "Risiko Tinggi"
    ).length;

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

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Ibu Hamil
            </p>
            <h2 className="text-3xl font-bold text-green-700">
              {totalMothers}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Total Pemeriksaan
            </p>
            <h2 className="text-3xl font-bold text-blue-600">
              {totalExaminations}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Risiko Rendah
            </p>
            <h2 className="text-3xl font-bold text-green-600">
              {risikoRendah}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-sm text-gray-500">
              Risiko Tinggi
            </p>
            <h2 className="text-3xl font-bold text-red-600">
              {risikoTinggi}
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