"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

/* Key penyimpanan dipakai bersama oleh useAuth & useToken. */
export const TOKEN_KEY = "access_token";
export const EXPIRES_KEY = "token_expires_at";
/** Event internal agar useToken langsung tahu token berubah (tanpa reload). */
export const AUTH_EVENT = "auth-token-changed";

/** Batas percobaan gagal sebelum akses dikunci sementara. */
const MAX_ATTEMPTS = 3;

type LoginCredentials = {
  email: string;
  password: string;
  captcha_token: string;
};

type LoginResult = {
  token?: string;
  expires_at?: number;
  success: boolean;
  error?: string;
  mfa_required?: boolean;
  challenge_id?: string;
};

type LoginResponse = {
  token?: string;
  role?: string;
  mfa_required?: boolean;
  challenge_id?: string;
  expires_at?: number;
  message?: string;
};

/** Simpan token + expires_at lalu beri tahu listener (useToken). */
function persistSession(token: string, expiresAt?: number) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  if (typeof expiresAt === "number") {
    localStorage.setItem(EXPIRES_KEY, String(expiresAt));
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export const useAuth = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const resetError = useCallback(() => setError(""), []);

  /**
   * Hanya kegagalan kredensial/verifikasi (4xx) yang dihitung untuk lock.
   * Pakai bentuk updater agar tidak bergantung nilai `attempts` yang basi.
   */
  const registerAuthFailure = useCallback((message: string) => {
    setAttempts((prev) => {
      const next = prev + 1;
      if (next >= MAX_ATTEMPTS) {
        setLocked(true);
        setError("Anda telah gagal login 3 kali. Akses sementara dikunci.");
      } else {
        setError(message || `Login gagal. Percobaan ${next}/${MAX_ATTEMPTS}`);
      }
      return next;
    });
  }, []);

  const login = useCallback(
    async (
      credentials: LoginCredentials,
      turnstileToken: string,
    ): Promise<LoginResult> => {
      if (locked || isLoading) {
        return {
          success: false,
          error: locked
            ? "Akses terkunci sementara karena terlalu banyak percobaan login gagal."
            : "Login sedang diproses. Mohon tunggu.",
        };
      }

      try {
        setIsLoading(true);
        setError("");

        // Path relatif -> Route Handler menjalankan failover (PRIMARY -> FALLBACK).
        // turnstileToken diutamakan; captcha_token ikut terkirim untuk kompatibilitas.
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...credentials, turnstileToken }),
        });

        const data: LoginResponse = await response.json().catch(() => ({}));

        if (!response.ok) {
          // 5xx (mis. 503 = semua upstream mati / failover habis) -> bukan salah user.
          // Tampilkan pesan saja, JANGAN tambah attempts / kunci akses.
          if (response.status >= 500) {
            const message =
              data.message ||
              "Server sedang tidak dapat dihubungi. Coba lagi nanti.";
            setError(message);
            return { success: false, error: message };
          }

          // 4xx = kredensial / verifikasi ditolak -> hitung untuk lock.
          registerAuthFailure(data.message || "Login gagal");
          return {
            success: false,
            error: data.message || "Login gagal",
            mfa_required: data.mfa_required,
            challenge_id: data.challenge_id,
          };
        }

        // Butuh MFA: jangan simpan token dulu, serahkan ke alur verifikasi MFA.
        if (data.mfa_required) {
          return {
            success: false,
            mfa_required: true,
            challenge_id: data.challenge_id,
          };
        }

        // Sukses: simpan token + expires_at.
        if (data.token) {
          persistSession(data.token, data.expires_at);
        }

        router.push("/dashboard");

        return {
          success: true,
          token: data.token,
          expires_at: data.expires_at,
        };
      } catch {
        // Error jaringan di sisi client (server Next tak terjangkau) -> jangan lock.
        setError("Terjadi kesalahan jaringan. Periksa koneksi Anda.");
        return { success: false, error: "Terjadi kesalahan jaringan." };
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, locked, registerAuthFailure, router],
  );

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(EXPIRES_KEY);
      window.dispatchEvent(new Event(AUTH_EVENT));
    }
    router.push("/login");
  }, [router]);

  return { login, logout, isLoading, error, locked, resetError };
};