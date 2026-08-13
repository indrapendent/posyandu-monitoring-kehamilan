export default function NewMotherPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-green-700">
          Tambah Data Ibu Hamil
        </h1>

        <form className="space-y-4 rounded-xl bg-white p-6 shadow">
          <div>
            <label className="mb-2 block font-medium">
              Nama
            </label>
            <input
              type="text"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Nomor HP
            </label>
            <input
              type="text"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Alamat
            </label>
            <textarea
              className="w-full rounded-lg border p-3"
              rows={3}
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              HPHT
            </label>
            <input
              type="date"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-green-600 px-6 py-3 text-white"
          >
            Simpan
          </button>
        </form>
      </div>
    </main>
  );
}