export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dashboard Monitoring Kehamilan
        </h1>

        <p className="text-gray-600 mb-8">
          Sistem digital untuk membantu kader Posyandu mencatat, memantau,
          dan melakukan deteksi dini risiko kehamilan.
        </p>

        <button className="rounded-xl bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition">
          Login Google
        </button>
      </div>
    </main>
  );
}