"use client";

import { useState } from "react";

export default function NewMotherPage() {
  const [nama, setNama] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [hpht, setHpht] = useState("");

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    alert(
      JSON.stringify(
        {
          nama,
          tanggalLahir,
          nomorHp,
          alamat,
          hpht,
        },
        null,
        2
      )
    );
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
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              HPHT
            </label>

            <input
              type="date"
              value={hpht}
              onChange={(e) => setHpht(e.target.value)}
              className="w-full rounded-lg border p-3"
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