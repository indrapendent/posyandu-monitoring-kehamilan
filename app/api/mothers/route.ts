import { NextResponse } from "next/server";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxW2lxx4EVW4a8SowECKtCOJTtNk3rUUJt4BRSd66Nok8Majlat0qft2qdq1gID2cKy/exec";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const response = await fetch(
      APPS_SCRIPT_URL,
      {
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();

    return NextResponse.json({
      success: true,
      appsScriptResponse: text,
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
