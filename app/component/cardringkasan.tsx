"use client";

import { useEffect, useState } from "react";

type Accent = "teal" | "emerald" | "blue" | "amber" | "violet" | "rose";
type StatKey =
  | "total"
  | "tambah"
  | "perubahan"
  | "penghapusan"
  | "persetujuan"
  | "penolakan";

type Props = {
  totalAktivitas?: number;
  tambahData?: number;
  perubahanData?: number;
  penghapusanData?: number;
  persetujuan?: number;
  penolakan?: number;
};

const fmt = (n: number) => n.toLocaleString("id-ID");

const accentStyles: Record<Accent, string> = {
  teal: "bg-teal-500/15 text-teal-300 ring-teal-500/25",
  emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25",
  blue: "bg-blue-500/15 text-blue-300 ring-blue-500/25",
  amber: "bg-amber-500/15 text-amber-300 ring-amber-500/25",
  violet: "bg-violet-500/15 text-violet-300 ring-violet-500/25",
  rose: "bg-rose-500/15 text-rose-300 ring-rose-500/25",
};

function StatIcon({ name }: { name: StatKey }) {
  const c = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "total": // clipboard-list
      return (
        <svg {...c}>
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M9 12h6" />
          <path d="M9 16h6" />
        </svg>
      );
    case "tambah": // plus
      return (
        <svg {...c}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );
    case "perubahan": // pencil
      return (
        <svg {...c}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      );
    case "penghapusan": // trash
      return (
        <svg {...c}>
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      );
    case "persetujuan": // check-circle
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "penolakan": // x-circle
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      );
  }
}

export default function CardRingkasan({
  totalAktivitas = 256,
  tambahData = 72,
  perubahanData = 96,
  penghapusanData = 8,
  persetujuan = 64,
  penolakan = 16,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Tanggal & jam WIB (Asia/Jakarta), contoh: "Jumat, 29 Mei 2026 - 12:00 WIB"
  const tanggal = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(now);
  const jam = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(now);
  const waktu = `${tanggal} - ${jam} WIB`;

  const stats: {
    key: StatKey;
    label: string;
    value: number;
    accent: Accent;
  }[] = [
    { key: "total", label: "Total Aktivitas", value: totalAktivitas, accent: "teal" },
    { key: "tambah", label: "Tambah Data", value: tambahData, accent: "emerald" },
    { key: "perubahan", label: "Perubahan Data", value: perubahanData, accent: "blue" },
    { key: "penghapusan", label: "Penghapusan Data", value: penghapusanData, accent: "amber" },
    { key: "persetujuan", label: "Persetujuan", value: persetujuan, accent: "violet" },
    { key: "penolakan", label: "Penolakan", value: penolakan, accent: "rose" },
  ];

  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-white/[0.07] bg-slate-900/50 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-white/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
          Ringkasan Audit Trail
        </h2>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium tabular-nums text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {mounted ? waktu : ""}
        </span>
      </div>

      {/* Tile statistik */}
      <div className="grid flex-1 grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:p-5 lg:grid-cols-6">
        {stats.map((s) => (
          <div
            key={s.key}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-2 py-4 text-center transition-colors hover:bg-white/[0.04]"
          >
            <span
              className={`inline-flex items-center justify-center rounded-lg p-2 ring-1 ring-inset ${accentStyles[s.accent]}`}
            >
              <StatIcon name={s.key} />
            </span>
            <span className="text-xs font-medium leading-tight text-slate-400">
              {s.label}
            </span>
            <span className="text-2xl font-bold tabular-nums text-white">
              {fmt(s.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}