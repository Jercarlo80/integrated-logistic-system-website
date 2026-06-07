"use client";

import { useCallback, useEffect, useState } from "react";
import { TOKEN_KEY, EXPIRES_KEY, AUTH_EVENT } from "./useAuth";

type Session = { token: string; expiresAt: number };

function readSession(): Session {
  if (typeof window === "undefined") return { token: "", expiresAt: 0 };
  return {
    token: localStorage.getItem(TOKEN_KEY) ?? "",
    expiresAt: Number(localStorage.getItem(EXPIRES_KEY) ?? 0),
  };
}

export function useToken() {
  const [{ token, expiresAt }, setSession] = useState<Session>({
    token: "",
    expiresAt: 0,
  });

  useEffect(() => {
    const sync = () => setSession(readSession());
    sync(); // baca nilai awal setelah mount
    // 'storage' -> berubah dari tab lain; AUTH_EVENT -> berubah di tab ini.
    window.addEventListener("storage", sync);
    window.addEventListener(AUTH_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(AUTH_EVENT, sync);
    };
  }, []);

  // expires_at dari backend = UNIX detik. Date.now() = milidetik.
  const isExpired = expiresAt > 0 && expiresAt * 1000 <= Date.now();

  const setToken = useCallback((newToken: string, newExpiresAt?: number) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    if (typeof newExpiresAt === "number") {
      localStorage.setItem(EXPIRES_KEY, String(newExpiresAt));
    }
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  const clearToken = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT));
  }, []);

  return {
    /** Token siap pakai (kosong bila kedaluwarsa). */
    token: isExpired ? "" : token,
    /** Token mentah tanpa cek expiry. */
    rawToken: token,
    expiresAt,
    isExpired,
    setToken,
    clearToken,
  };
}