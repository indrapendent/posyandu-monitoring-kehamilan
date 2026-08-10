"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Dashboard Monitoring Kehamilan
        </h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Login dengan Google
        </button>
      </div>
    </main>
  );
}