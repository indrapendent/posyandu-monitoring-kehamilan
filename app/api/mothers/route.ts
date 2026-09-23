import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 300;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("mothers")
      .select("*")
      .order("nama");

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("mothers")
      .insert({
        nik: body.nik,
        nama: body.nama,
        nama_suami: body.nama_suami,
        tanggal_lahir: body.tanggal_lahir,
        nomor_hp: body.nomor_hp,
        alamat: body.alamat,
        tinggi_badan: body.tinggi_badan,
        riwayat_caesar: body.riwayat_caesar,
        riwayat_penyakit: body.riwayat_penyakit,
        alergi: body.alergi,
        hpht: body.hpht,
        hpl: body.hpl,
      })
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}