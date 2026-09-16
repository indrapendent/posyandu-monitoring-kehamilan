"use client";

import { useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NewExaminationPage() {
  const params = useParams();
  const router = useRouter();

  const motherId = params.id as string;

  const [
    tanggalPemeriksaan,
    setTanggalPemeriksaan,
  ] = useState("");

  const [beratBadan, setBeratBadan] =
    useState("");

  const [
    tekananDarah,
    setTekananDarah,
  ] = useState("");

  const [lila, setLila] =
    useState("");

  const [keluhan, setKeluhan] =
    useState("");

  const [catatan, setCatatan] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  function calculateRisk() {
    const lilaValue = parseFloat(lila);

    const tekananParts =
      tekananDarah.split("/");

    const sistolik = parseInt(
      tekananParts[0] || "0"
    );

    const diastolik = parseInt(
      tekananParts[1] || "0"
    );

    if (
      lilaValue < 23.5 ||
      sistolik >= 140 ||
      diastolik >= 90
    ) {
      return "Risiko Tinggi";
    }

    return "Risiko Rendah";
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setIsLoading(true);

    const payload = {
      mother_id: motherId,
      tanggal_pemeriksaan:
        tanggalPemeriksaan,
      berat_badan:
        Number(beratBadan),
      tekanan_darah:
        tekananDarah,
      lila: Number(lila),
      keluhan,
      catatan,
      status_risiko:
        calculateRisk(),
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
          body: JSON.stringify(
            payload
          ),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Gagal menyimpan pemeriksaan"
        );
      }

      alert(
        `✅ Pemeriksaan berhasil disimpan\n\nStatus Risiko: ${payload.status_risiko}`
      );

      router.push(
        `/mothers/${motherId}`
      );

      router.refresh();
    } catch (error) {
      alert(String(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <Navbar />

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
              value={
                tanggalPemeriksaan
              }
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
                setBeratBadan(
                  e.target.value
                )
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
                setLila(
                  e.target.value
                )
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
                setKeluhan(
                  e.target.value
                )
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
                setCatatan(
                  e.target.value
                )
              }
              rows={3}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading
              ? "Menyimpan..."
              : "Simpan Pemeriksaan"}
          </button>
        </form>
      </div>
    </main>
  );
}