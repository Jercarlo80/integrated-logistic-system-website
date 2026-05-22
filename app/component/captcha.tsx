"use client";

import { useEffect, useRef, useState } from "react";
import { FaRotateRight } from "react-icons/fa6";

type Props = {
  onValidate: (value: boolean) => void;
};

export default function Captcha({ onValidate }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [captchaText, setCaptchaText] = useState<string>("");
  const [input, setInput] = useState<string>("");

  const [timeLeft, setTimeLeft] = useState(30);

  function generateText(length: number = 6): string {
    const chars =
      "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

    let result = "";

    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
  }

  function drawCaptcha(text: string) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

    ctx.font = "28px monospace";
    ctx.textBaseline = "middle";

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      const x = 20 + i * 28;
      const y = height / 2 + (Math.random() * 8 - 4);

      const angle = (Math.random() - 0.5) * 0.6;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.fillStyle = `rgb(${100 + Math.random() * 150}, ${
        100 + Math.random() * 150
      }, ${100 + Math.random() * 150})`;

      ctx.fillText(char, 0, 0);

      ctx.restore();
    }

    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.5})`;

      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }
  }

  function refreshCaptcha() {
    const text = generateText();

    setCaptchaText(text);
    setInput("");
    setTimeLeft(30);

    setTimeout(() => {
      drawCaptcha(text);
    }, 0);
  }

  useEffect(() => {
    refreshCaptcha();
  }, []);

  useEffect(() => {
    const valid = input.toLowerCase() === captchaText.toLowerCase();
    onValidate(valid);
  }, [input, captchaText, onValidate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          refreshCaptcha();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full flex flex-col gap-3">

      {/* Label */}
      <div className="text-sm text-white/80 font-medium tracking-wide">
        Verifikasi Keamanan
      </div>

      {/* Captcha Container */}
      <div
        className="
        flex flex-col md:flex-row
        items-center
        gap-3
        p-3
        rounded-xl
        bg-white/5
        border border-white/20
        backdrop-blur-md
        "
      >

        {/* Canvas Wrapper */}
        <div className="w-full md:w-auto flex justify-center">
          <canvas
            ref={canvasRef}
            width={200}
            height={60}
            className="
            rounded-lg
            border border-white/20
            shadow-inner
            max-w-full
            "
          />
        </div>

        {/* Controls */}
        <div className="flex gap-3 w-full md:w-auto justify-center">

          {/* Refresh */}
          <button
            type="button"
            onClick={refreshCaptcha}
            className="
            flex items-center justify-center
            w-10 h-10
            rounded-lg
            bg-white/10
            hover:bg-white/20
            border border-white/20
            text-white
            transition
            "
          >
            <FaRotateRight />
          </button>

          {/* Countdown */}
          <div
            className="
            flex items-center justify-center
            min-w-[100px]
            h-10
            px-3
            rounded-lg
            bg-white/10
            border border-white/20
            text-sm
            text-white
            font-semibold
            "
          >
            {timeLeft} detik
          </div>

        </div>

      </div>

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Masukkan kode captcha"
        className="
        w-full
        px-4 py-3
        bg-white/10
        border border-white/20
        rounded-xl
        text-white
        placeholder:text-white/60
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400/60
        transition
        "
      />

    </div>
  );
}