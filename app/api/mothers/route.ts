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
      .insert([
        {
          nama: body.nama,
          tanggal_lahir: body.tanggal_lahir,
          nomor_hp: body.nomor_hp,
          alamat: body.alamat,
          hpht: body.hpht,
          hpl: body.hpl,
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