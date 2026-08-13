import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold text-green-700">
          Dashboard Monitoring Kehamilan
        </h1>

        <p className="mb-8 text-gray-600">
          Selamat datang di aplikasi monitoring ibu hamil.
        </p>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">
            Informasi Pengguna
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Nama:</strong> {session.user?.name}
            </p>

            <p>
              <strong>Email:</strong> {session.user?.email}
            </p>
          </div>
        </div>
        <div className="mt-6">
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