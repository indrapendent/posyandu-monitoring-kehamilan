import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const revalidate = 300;

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("examinations")
      .select("*")
      .order("tanggal_pemeriksaan", {
        ascending: false,
      });

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
      .from("examinations")
      .insert([
        {
          mother_id: body.mother_id,
          tanggal_pemeriksaan:
            body.tanggal_pemeriksaan,
          usia_kehamilan:
            body.usia_kehamilan,
          berat_badan: body.berat_badan,
          tekanan_darah:
            body.tekanan_darah,
          lila: body.lila,
          keluhan: body.keluhan,
          catatan: body.catatan,
          status_risiko:
            body.status_risiko,
        },
      ])
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