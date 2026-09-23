"use client";

interface Bumil {
  nama_ibu: string;
  kategori_risiko: string;
  skor_poedji_rochjati: number;
}

interface RiskListProps {
  title: string;
  data: Bumil[];
}

export default function RiskList({
  title,
  data,
}: RiskListProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-500">
          Tidak ada data.
        </p>
      ) : (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={`${item.nama_ibu}-${index}`}
              className="rounded-lg border p-3"
            >
              <p className="font-medium">
                {item.nama_ibu}
              </p>

              <p className="text-sm text-gray-600">
                Risiko: {item.kategori_risiko}
              </p>

              <p className="text-sm text-gray-600">
                Skor Poedji Rochjati:{" "}
                {item.skor_poedji_rochjati}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}