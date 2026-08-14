interface Mother {
  mother_id: string;
  nama: string;
  tanggal_lahir: string;
  nomor_hp: string;
  alamat: string;
  hpht: string;
  hpl: string;
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
    "http://localhost:3000/api/mothers",
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export default async function MotherDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const mothers = await getMothers();

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

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
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
                {formatDate(mother.tanggal_lahir)}
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
          </div>
        </div>
      </div>
    </main>
  );
}