"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function RiskChart({
  kbr,
  krr,
  krt,
  krst,
}: {
  kbr: number;
  krr: number;
  krt: number;
  krst: number;
}) {
  const data = [
    {
      name: "KBR",
      value: kbr,
    },
    {
      name: "KRR",
      value: krr,
    },
    {
      name: "KRT",
      value: krt,
    },
    {
      name: "KRST",
      value: krst,
    },
  ];

  const COLORS = [
    "#15803d",
    "#22c55e",
    "#eab308",
    "#dc2626",
  ];

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">
        Distribusi Risiko Kehamilan
      </h2>

      <p className="mb-4 text-sm text-gray-500">
        Berdasarkan klasifikasi Skor Poedji Rochjati
      </p>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label={({ percent }) =>
              `${((percent ?? 0) * 100).toFixed(1)}%`
            }
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => [
              value,
              "Jumlah Bumil",
            ]}
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}