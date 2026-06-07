"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Severity = "error" | "warning" | "info";

type PendingItem = { id: string; createdAt: string | Date };

type Props = {
  /** null untuk menyembunyikan alert login. */
  loginFail?: { attempts: number; ip: string; at?: string | Date } | null;
  /** Daftar data pending; alert muncul bila ada yang >= ambang hari. */
  pendingItems?: PendingItem[];
  pendingThresholdDays?: number;
  /** null untuk menyembunyikan alert backup. */
  backup?: { success: boolean; at?: string | Date } | null;
  href?: string;
};

const DAY_MS = 86_400_000;
const toMs = (d: string | Date) =>
  d instanceof Date ? d.getTime() : new Date(d).getTime();

function formatRelative(diffMs: number) {
  const s = Math.max(0, Math.floor(diffMs / 1000));
  if (s < 10) return "baru saja";
  if (s < 60) return `${s} detik lalu`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  return `${d} hari lalu`;
}

const severityStyles: Record<Severity, { box: string; icon: string }> = {
  error: {
    box: "bg-red-500/15 text-red-400 ring-red-500/25",
    icon: "text-red-400",
  },
  warning: {
    box: "bg-amber-500/15 text-amber-400 ring-amber-500/25",
    icon: "text-amber-400",
  },
  info: {
    box: "bg-blue-500/15 text-blue-400 ring-blue-500/25",
    icon: "text-blue-400",
  },
};

function AlertIcon({ severity }: { severity: Severity }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (severity === "error") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </svg>
    );
  }
  if (severity === "warning") {
    return (
      <svg {...common}>
        <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export default function CardAlert({
  loginFail,
  pendingItems,
  pendingThresholdDays = 7,
  backup,
  href = "#",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  // Waktu acuan tetap (1x), agar stempel waktu default tidak ikut bergeser tiap render.
  const [base] = useState(() => Date.now());

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const alerts = useMemo(() => {
    const list: {
      id: string;
      severity: Severity;
      title: string;
      detail: string;
      firedAt: number;
    }[] = [];

    // 1) Login gagal berulang
    if (loginFail !== null) {
      const data = loginFail ?? { attempts: 5, ip: "103.28.XX.XX" };
      list.push({
        id: "login",
        severity: "error",
        title: "Login Gagal Berulang",
        detail: `Terdapat ${data.attempts} percobaan login gagal dari IP ${data.ip}`,
        firedAt: toMs(loginFail?.at ?? new Date(base - 4 * 60_000)),
      });
    }

    // 2) Data pending > ambang hari (realtime)
    const items: PendingItem[] = pendingItems ?? [
      { id: "p1", createdAt: new Date(base - 8 * DAY_MS) },
    ];
    const thresholdMs = pendingThresholdDays * DAY_MS;
    const overdue = items.filter((it) => now - toMs(it.createdAt) >= thresholdMs);
    if (overdue.length > 0) {
      // alert dianggap "aktif" sejak item tertua melewati ambang
      const firedAt = Math.min(
        ...overdue.map((it) => toMs(it.createdAt) + thresholdMs)
      );
      list.push({
        id: "pending",
        severity: "warning",
        title: "Data Pending Melebihi Batas Waktu",
        detail: `Terdapat ${overdue.length} data pending lebih dari ${pendingThresholdDays} hari`,
        firedAt,
      });
    }

    // 3) Backup database
    if (backup !== null) {
      const data = backup ?? { success: true };
      list.push({
        id: "backup",
        severity: "info",
        title: data.success
          ? "Backup Database Berhasil"
          : "Backup Database Gagal",
        detail: data.success
          ? "Backup database harian berhasil"
          : "Backup database harian gagal dijalankan",
        firedAt: toMs(backup?.at ?? new Date(base - 6 * 3_600_000)),
      });
    }

    return list;
  }, [loginFail, pendingItems, pendingThresholdDays, backup, base, now]);

  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-white/[0.07] bg-slate-900/50 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
          Alert Sistem
        </h2>
      </div>

      {/* Daftar alert */}
      <div className="flex-1 space-y-2.5 p-4 sm:p-5">
        {alerts.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">
            Tidak ada alert aktif.
          </p>
        ) : (
          alerts.map((a) => {
            const styles = severityStyles[a.severity];
            return (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.04]"
              >
                {/* Posisi 1: Ikon */}
                <span
                  className={`mt-0.5 inline-flex shrink-0 items-center justify-center rounded-lg p-2 ring-1 ring-inset ${styles.box}`}
                >
                  <AlertIcon severity={a.severity} />
                </span>

                {/* Posisi 2: Pesan + Detail */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-200">{a.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                    {a.detail}
                  </p>
                </div>

                {/* Stempel waktu real-time */}
                <span className="shrink-0 whitespace-nowrap text-[11px] tabular-nums text-slate-500">
                  {mounted ? formatRelative(now - a.firedAt) : ""}
                </span>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-white/[0.06] px-4 py-3 sm:px-5">
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          Lihat Semua Alert
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}