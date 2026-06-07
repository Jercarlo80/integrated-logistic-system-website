// app/api/v1/auth/login/route.ts
import { NextResponse } from "next/server";
import { fetchWithFailover } from "@/app/lib/api-failover"; // pastikan path/alias ini benar

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;
    const password = body.password;
    const turnstileToken = body.turnstileToken ?? body.captcha_token;

    if (!turnstileToken) {
      return NextResponse.json({ message: "Token verifikasi tidak ada." }, { status: 400 });
    }

    const { response: backendRes, baseUsed } = await fetchWithFailover(
      "/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password, captcha_token: turnstileToken }),
      },
    );

    const raw = await backendRes.text();
    let data: unknown;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      console.error("Backend non-JSON:", baseUsed, backendRes.status, raw.slice(0, 800));
      return NextResponse.json(
        { message: `Backend tidak membalas JSON (status ${backendRes.status}).`, bodyPreview: raw.slice(0, 800) },
        { status: 502 },
      );
    }

    const res = NextResponse.json(data, { status: backendRes.status });
    res.headers.set("x-api-base", baseUsed);
    return res;
  } catch (error) {
    // Cetak stack lengkap ke TERMINAL dev.
    console.error("LOGIN ROUTE ERROR:", error);
    return NextResponse.json(
      {
        message: "Semua server API sedang tidak dapat dihubungi. Coba lagi nanti.",
        // Hanya untuk debugging lokal — hapus di produksi:
        debug: process.env.NODE_ENV !== "production"
          ? (error instanceof Error ? error.message : String(error))
          : undefined,
      },
      { status: 503 },
    );
  }
}