# Architecture

## Overview

Dashboard Monitoring Kehamilan adalah aplikasi web berbasis Next.js
yang digunakan kader Posyandu untuk mencatat dan memantau kondisi ibu
hamil.

Teknologi:

- Next.js
- TypeScript
- Tailwind CSS
- Google OAuth
- Google Spreadsheet
- Vercel

---

# High Level Flow

Login Google
↓
Validasi Email
↓
Dashboard
↓
Data Ibu Hamil
↓
Pemeriksaan
↓
Perhitungan Risiko
↓
Simpan ke Spreadsheet
↓
Dashboard Monitoring

---

# Application Pages

## Login

Route:

/login

Fungsi:

- Login Google
- Validasi email kader

---

## Dashboard

Route:

/

Fungsi:

- Ringkasan data
- Statistik ibu hamil
- Risiko kehamilan

---

## Data Ibu Hamil

Route:

/mothers

Fungsi:

- Lihat daftar ibu hamil
- Tambah data
- Edit data

---

## Detail Ibu Hamil

Route:

/mothers/[id]

Fungsi:

- Informasi ibu hamil
- Riwayat pemeriksaan

---

## Pemeriksaan

Route:

/examinations

Fungsi:

- Tambah pemeriksaan
- Simpan pemeriksaan

---

# Folder Structure

src/

├── app/
├── components/
├── services/
├── lib/
├── types/
├── hooks/

---

# Components

## Layout

- Navbar
- Sidebar
- Footer

---

## Dashboard

- SummaryCard
- RiskChart
- TrimesterChart

---

## Mothers

- MotherTable
- MotherForm

---

## Examination

- ExaminationForm
- RiskBadge

---

# Services

## AuthService

Tugas:

- Login Google
- Logout
- Session

---

## SpreadsheetService

Tugas:

- Membaca data
- Menyimpan data
- Update data

---

## RiskCalculationService

Tugas:

- Menghitung kategori risiko

Output:

- Rendah
- Sedang
- Tinggi

---

# Data Sources

Google Spreadsheet

Sheet:

- users
- mothers
- examinations

---

# Risk Levels

## Rendah

Status normal

Warna:

Hijau

---

## Sedang

Perlu pemantauan

Warna:

Kuning

---

## Tinggi

Perlu perhatian lebih lanjut

Warna:

Merah

Catatan:

Bukan diagnosis medis.

---

# Sprint Plan

Sprint 1

- Login Google

Sprint 2

- Validasi Email

Sprint 3

- Data Ibu Hamil

Sprint 4

- Integrasi Spreadsheet

Sprint 5

- Pemeriksaan

Sprint 6

- Risk Calculator

Sprint 7

- Dashboard

Sprint 8

- Testing

Sprint 9

- UAT Posyandu