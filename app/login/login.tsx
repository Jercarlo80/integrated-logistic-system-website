"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import LoginImage from "../image/login_image.png";
import SatkomlekLogo from "../image/satkomlekLogo.png";
import Button from "../component/button";
import { useAuth } from "@/app/hooks/useAuth";
import Turnstile, { TurnstileHandle } from "../component/turnstile";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error: apiError, locked, resetError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientError, setClientError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileRef = useRef<TurnstileHandle>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const displayError = clientError || apiError;

  useEffect(() => {
    if (clientError) setClientError("");
    if (apiError) resetError();
  }, [email, password, turnstileToken, apiError, resetError]);

  const handleLogin = async () => {
    if (locked || isLoading) return;

    if (!email.trim()) {
      setClientError("email harus diisi.");
      return;
    }
    if (!password.trim()) {
      setClientError("Password harus diisi.");
      return;
    }
    if (!turnstileToken) {
      setClientError("Verifikasi keamanan belum selesai.");
      return;
    }

    const result = await login({ email, password, captcha_token:turnstileToken }, turnstileToken);

    if (!result.success) {
      if (result.mfa_required && result.challenge_id) {
        setClientError("MFA diperlukan, namun belum diimplementasikan.");
      } else if (result.error) {
        setClientError(result.error);
      }
      // Token Turnstile sekali pakai → reset setelah gagal.
      turnstileRef.current?.reset();
      setTurnstileToken("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  const isDisabled = locked || isLoading || !turnstileToken;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Image
        src={LoginImage}
        alt="Satkomlek Image"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/50 to-black/70 z-10" />
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 py-8">
        <div className="w-full max-w-xl backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl rounded-3xl">
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11">
                <Image src={SatkomlekLogo} alt="Satkomlek Logo" fill className="object-contain" />
              </div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-wide text-white">Satkomlek TNI</h1>
            </div>
            <span className="text-white/80 font-medium text-sm sm:text-base">Masuk</span>
          </div>
          <div className="px-6 sm:px-10 py-8 sm:py-10">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">Selamat Datang</h2>
              <p className="text-white/60 text-sm mt-2">Silakan masuk ke Sistem E-Kodefikasi</p>
            </div>
            {/* email Field */}
            <div className="relative mb-5 group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors duration-200" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="email"
                autoComplete="email"
                className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-200 focus:bg-white/10 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            {/* Password Field */}
            <div className="relative mb-3 group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors duration-200" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Kata Sandi"
                autoComplete="current-password"
                className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 outline-none transition-all duration-200 focus:bg-white/10 focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => router.push("/lupakatasandi/email")}
                className="text-sm text-blue-300 hover:text-blue-200 font-medium"
              >
                Lupa kata sandi?
              </button>
            </div>

            {/* Turnstile */}
            <div className="mb-5 flex justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={siteKey}
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken("")}
                onError={() => setTurnstileToken("")}
                theme="auto"
              />
            </div>

            {displayError && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
                <p className="text-red-300 text-sm text-center">{displayError}</p>
              </div>
            )}

            <Button
              text={locked ? "Akses Dikunci" : isLoading ? "Memproses..." : "Masuk"}
              onClick={handleLogin}
              disabled={isDisabled}
              styleButton={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                isDisabled
                  ? "bg-gray-600 cursor-not-allowed opacity-60"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 shadow-lg hover:shadow-blue-500/25 active:scale-[0.98]"
              }`}
              styleText="text-white text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}