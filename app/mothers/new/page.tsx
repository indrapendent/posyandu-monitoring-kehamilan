"use client";

import { useState } from "react";

export default function NewMotherPage() {
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [hpht, setHpht] = useState("");
  const [hpl, setHpl] = useState("");

  function calculateHPL(date: string) {
    if (!date) return "";

    const hphtDate = new Date(date);
    hphtDate.setDate(hphtDate.getDate() + 280);

    return hphtDate.toISOString().split("T")[0];
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const payload = {
      mother_id: `M${Date.now()}`,
      nama,
      tanggal_lahir: tanggalLahir,
      nomor_hp: nomorHp,
      alamat,
      hpht,
      hpl,
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxW2lxx4EVW4a8SowECKtCOJTtNk3rUUJt4BRSd66Nok8Majlat0qft2qdq1gID2cKy/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Data ibu hamil berhasil disimpan");

        setNama("");
        setTanggalLahir("");
        setNomorHp("");
        setAlamat("");
        setHpht("");
        setHpl("");
      } else {
        alert("Gagal menyimpan data");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold text-green-700">
          Tambah Data Ibu Hamil
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-xl bg-white p-6 shadow"
        >
          <div>
            <label className="mb-2 block font-medium">
              Nama
            </label>

            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Tanggal Lahir
            </label>

            <input
              type="date"
              value={tanggalLahir}
              onChange={(e) =>
                setTanggalLahir(e.target.value)
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Nomor HP
            </label>

            <input
              type="text"
              value={nomorHp}
              onChange={(e) =>
                setNomorHp(e.target.value)
              }
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Alamat
            </label>

            <textarea
              value={alamat}
              onChange={(e) =>
                setAlamat(e.target.value)
              }
              className="w-full rounded-lg border p-3"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              HPHT
            </label>

            <input
              type="date"
              value={hpht}
              onChange={(e) => {
                setHpht(e.target.value);
                setHpl(
                  calculateHPL(e.target.value)
                );
              }}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              HPL
            </label>

            <input
              type="date"
              value={hpl}
              readOnly
              className="w-full rounded-lg border bg-gray-100 p-3"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
          >
            Simpan
          </button>
        </form>
      </div>
    </main>
  );
}