"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import LoginImage from "../image/login_image.png";
import SatkomlekLogo from "../image/satkomlekLogo.png";
import Button from "../component/button";
import Captcha from "../component/captcha";

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);

  const [captchaValid, setCaptchaValid] = useState(false);

  const validationRegex =
    /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*()_\-+=<>?/{}[\]|.,:;"'`~]{8,50}$/;

  const users = [
    { username: "SuperAdmin", password: "Password123!", role: "superadmin" },
    { username: "AdminGudang1", password: "Password123!", role: "admin", gudang: 1 },
    { username: "AdminGudang2", password: "Password123!", role: "admin", gudang: 2 },
    { username: "AdminGudang3", password: "Password123!", role: "admin", gudang: 3 },
    { username: "AdminGudang4", password: "Password123!", role: "admin", gudang: 4 },
    { username: "AdminGudang5", password: "Password123!", role: "admin", gudang: 5 },
    { username: "AdminGudang6", password: "Password123!", role: "admin", gudang: 6 },
    { username: "AdminGudang7", password: "Password123!", role: "admin", gudang: 7 },
    { username: "AdminGudang8", password: "Password123!", role: "admin", gudang: 8 },
    { username: "AdminGudang9", password: "Password123!", role: "admin", gudang: 9 },
    { username: "AdminGudang10", password: "Password123!", role: "admin", gudang: 10 },
    { username: "AdminGudang11", password: "Password123!", role: "admin", gudang: 11 },
  ];

  // Clear error when user modifies username or password
  useEffect(() => {
    if (error && !locked) {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, password]);

  // Clear error when captcha becomes valid
  useEffect(() => {
    if (error && captchaValid && !locked) {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captchaValid]);

  const handleLogin = () => {
    if (locked) return;

    if (!validationRegex.test(username) || !validationRegex.test(password)) {
      setError("Data yang anda masukkan tidak sesuai");
      return;
    }

    if (!captchaValid) {
      setError("Captcha tidak valid.");
      return;
    }

    const user = users.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      localStorage.setItem("role", user.role);

      if (user.role === "admin") {
        localStorage.setItem("selectedGudang", String(user.gudang));
      } else {
        localStorage.setItem("selectedGudang", "1");
      }

      router.push("/dashboard");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        setLocked(true);
        setError("Anda telah gagal login 3 kali. Akses sementara dikunci.");
      } else {
        setError(`Username atau password salah. Percobaan ${newAttempts}/3`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image with improved overlay gradient */}
      <Image
        src={LoginImage}
        alt="Satkomlek Image"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70 z-10" />

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 py-8">
        <div className="w-full max-w-xl backdrop-blur-2xl bg-white/5 border border-white/20 shadow-2xl rounded-3xl transition-all duration-300 hover:shadow-white/5">
          {/* Header */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11">
                <Image
                  src={SatkomlekLogo}
                  alt="Satkomlek Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-wide text-white">
                Satkomlek TNI
              </h1>
            </div>
            <span className="text-white/80 font-medium text-sm sm:text-base">
              Masuk
            </span>
          </div>

          {/* Form Body */}
          <div className="px-6 sm:px-10 py-8 sm:py-10">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                Selamat Datang
              </h2>
              <p className="text-white/60 text-sm mt-2">
                Silakan masuk ke Sistem E-Kodefikasi
              </p>
            </div>

            {/* Username Field */}
            <div className="relative mb-5 group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-blue-400 transition-colors duration-200" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Username"
                autoComplete="username"
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
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors duration-200"
                aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mb-6">
              <button
                onClick={() => router.push("/lupakatasandi/email")}
                className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                Lupa kata sandi?
              </button>
            </div>

            {/* Captcha */}
            <div className="mb-5">
              <Captcha onValidate={setCaptchaValid} />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-sm">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <Button
              text={locked ? "Akses Dikunci" : "Masuk"}
              onClick={handleLogin}
              disabled={locked}
              styleButton={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                locked
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