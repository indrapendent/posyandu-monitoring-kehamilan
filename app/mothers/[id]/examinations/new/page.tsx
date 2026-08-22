"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function NewExaminationPage() {
  const params = useParams();
  const motherId = params.id as string;

  const [tanggalPemeriksaan, setTanggalPemeriksaan] =
    useState("");

  const [beratBadan, setBeratBadan] =
    useState("");

  const [tekananDarah, setTekananDarah] =
    useState("");

  const [lila, setLila] =
    useState("");

  const [keluhan, setKeluhan] =
    useState("");

  const [catatan, setCatatan] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const payload = {
      examination_id: `E${Date.now()}`,
      mother_id: motherId,
      tanggal_pemeriksaan: tanggalPemeriksaan,
      berat_badan: beratBadan,
      tekanan_darah: tekananDarah,
      lila,
      keluhan,
      catatan,
      status_risiko: "Belum Dinilai",
    };

    try {
      const response = await fetch(
        "/api/examinations",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      alert(
        JSON.stringify(result, null, 2)
      );
    } catch (error) {
      alert(String(error));
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-green-700">
          Tambah Pemeriksaan Kehamilan
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Mother ID: {motherId}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-white p-6 shadow"
        >
          <div>
            <label className="mb-2 block font-medium">
              Tanggal Pemeriksaan
            </label>

            <input
              type="date"
              value={tanggalPemeriksaan}
              onChange={(e) =>
                setTanggalPemeriksaan(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Berat Badan (kg)
            </label>

            <input
              type="number"
              value={beratBadan}
              onChange={(e) =>
                setBeratBadan(e.target.value)
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Tekanan Darah
            </label>

            <input
              type="text"
              placeholder="120/80"
              value={tekananDarah}
              onChange={(e) =>
                setTekananDarah(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              LILA (cm)
            </label>

            <input
              type="number"
              step="0.1"
              value={lila}
              onChange={(e) =>
                setLila(e.target.value)
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Keluhan
            </label>

            <textarea
              value={keluhan}
              onChange={(e) =>
                setKeluhan(e.target.value)
              }
              rows={3}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Catatan
            </label>

            <textarea
              value={catatan}
              onChange={(e) =>
                setCatatan(e.target.value)
              }
              rows={3}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-green-600 px-6 py-3 text-white"
          >
            Simpan Pemeriksaan
          </button>
        </form>
      </div>
    </main>
  );
}