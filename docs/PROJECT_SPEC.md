# PROJECT SPECIFICATION

## Nama Proyek

Dashboard Monitoring Kehamilan

## Deskripsi

Aplikasi web untuk membantu kader Posyandu melakukan pencatatan digital, monitoring pemeriksaan, dan deteksi dini risiko kehamilan.

Aplikasi digunakan sebagai alat bantu monitoring dan bukan alat diagnosis medis.

## Tujuan

1. Digitalisasi pencatatan ibu hamil
2. Menyimpan riwayat pemeriksaan
3. Mempermudah monitoring kehamilan
4. Menyediakan dashboard visual
5. Menyediakan early warning sederhana

---

## Teknologi

Frontend:
- Next.js
- TypeScript
- Tailwind CSS

Authentication:
- Google Login

Database:
- Google Spreadsheet

Deployment:
- Vercel

---

## User

Kader Posyandu

---

## Fitur Utama

### Login

- Login menggunakan Google
- Hanya email yang terdaftar dapat mengakses aplikasi

### Data Ibu Hamil

Data yang disimpan:

- Nama
- Tanggal Lahir
- Nomor HP
- Alamat
- HPHT
- HPL (otomatis dihitung)

### Data Pemeriksaan

Data yang disimpan:

- Tanggal Pemeriksaan
- Usia Kehamilan
- Berat Badan
- Tekanan Darah
- LILA
- Keluhan
- Catatan

### Riwayat Pemeriksaan

Menampilkan seluruh riwayat pemeriksaan per ibu hamil.

### Dashboard

Menampilkan:

- Total Ibu Hamil
- Trimester 1
- Trimester 2
- Trimester 3
- Risiko Rendah
- Risiko Sedang
- Risiko Tinggi

### Early Warning

Kategori:

- Risiko Rendah
- Risiko Sedang
- Risiko Tinggi

Sistem hanya sebagai alat bantu monitoring.

Bukan diagnosis medis.

---

## Non Scope

Tidak termasuk:

- WhatsApp
- QR Code
- Export PDF
- Mobile App
- Firebase
- PostgreSQL
- MySQL

---

## Keputusan Arsitektur Final

- Next.js
- TypeScript
- Tailwind
- Google Spreadsheet
- Google Login
- Vercel

Tidak boleh diubah tanpa persetujuan pemilik proyek.