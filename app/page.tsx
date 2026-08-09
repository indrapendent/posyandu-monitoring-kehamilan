import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Dashboard Monitoring Kehamilan
        </h1>

        <p className="mb-8 text-gray-600">
          Sistem digital untuk membantu kader Posyandu mencatat,
          memantau, dan melakukan deteksi dini risiko kehamilan.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="rounded-xl bg-green-600 px-6 py-3 text-white font-medium transition hover:bg-green-700"
          >
            Login Google
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700"
          >
            Demo Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
