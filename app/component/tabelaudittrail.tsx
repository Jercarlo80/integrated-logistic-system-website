"use client";

import {
  Pencil,
  CheckCircle2,
  Database,
  UploadCloud,
  RefreshCw,
  Trash2,
  XCircle,
  LogIn,
  LogOut,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";

/* ============================================================
 * Tipe data
 * ========================================================== */

export type Role = "Admin DB" | "Validator" | "Admin SI" | "Operator" | "System";

export type StatusAudit = "SUCCESS" | "FAILED";

export type AktivitasType =
  | "update"
  | "validasi"
  | "backup"
  | "upload"
  | "sinkronisasi"
  | "delete"
  | "tolak"
  | "login"
  | "logout"
  | "restore";

export interface PerubahanData {
  field: string;
  sebelum: string;
  sesudah: string;
  deskripsi: string;
  idReferensi: string;
}

export interface AuditLog {
  id: string; // ID Log, mis. LOG-20260602-00024582
  tanggal: string; // 02/06/2026
  jam: string; // 09:14:02
  user: string;
  role: Role;
  aktivitas: string;
  aktivitasType: AktivitasType;
  modul: string;
  referensi?: string; // tampil sebagai link bila ada
  ipAddress: string;
  status: StatusAudit;
  browser?: string;
  device?: string;
  perubahan?: PerubahanData;
}

/* ============================================================
 * Konfigurasi tampilan (badge + ikon)
 * ========================================================== */

export const ROLE_BADGE: Record<Role, string> = {
  "Admin DB": "bg-purple-500/15 text-purple-300 ring-purple-500/30",
  Validator: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  "Admin SI": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  Operator: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  System: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
};

interface AktivitasConfig {
  icon: LucideIcon;
  color: string; // warna ikon
  destructive: boolean; // aksi negatif (delete/tolak) → status diwarnai merah
}

export const AKTIVITAS_CONFIG: Record<AktivitasType, AktivitasConfig> = {
  update: { icon: Pencil, color: "text-emerald-400", destructive: false },
  validasi: { icon: CheckCircle2, color: "text-blue-400", destructive: false },
  backup: { icon: Database, color: "text-indigo-400", destructive: false },
  upload: { icon: UploadCloud, color: "text-sky-400", destructive: false },
  sinkronisasi: { icon: RefreshCw, color: "text-emerald-400", destructive: false },
  delete: { icon: Trash2, color: "text-rose-400", destructive: true },
  tolak: { icon: XCircle, color: "text-rose-400", destructive: true },
  login: { icon: LogIn, color: "text-emerald-400", destructive: false },
  logout: { icon: LogOut, color: "text-rose-400", destructive: false },
  restore: { icon: Database, color: "text-emerald-400", destructive: false },
};

/** Tentukan warna badge status. Aksi destruktif tetap berlabel SUCCESS tapi merah. */
function statusTone(log: AuditLog): "success" | "danger" {
  if (log.status === "FAILED") return "danger";
  return AKTIVITAS_CONFIG[log.aktivitasType].destructive ? "danger" : "success";
}

/* ============================================================
 * Komponen badge kecil
 * ========================================================== */

function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${ROLE_BADGE[role]}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ log }: { log: AuditLog }) {
  const tone = statusTone(log);
  const cls =
    tone === "success"
      ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30"
      : "bg-rose-500/10 text-rose-400 ring-rose-500/30";
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide ring-1 ring-inset ${cls}`}
    >
      {log.status}
    </span>
  );
}

function AktivitasCell({ log }: { log: AuditLog }) {
  const { icon: Icon, color } = AKTIVITAS_CONFIG[log.aktivitasType];
  return (
    <div className="flex items-center gap-2.5">
      <Icon className={`h-4 w-4 shrink-0 ${color}`} />
      <span className="text-slate-200">{log.aktivitas}</span>
    </div>
  );
}

/* ============================================================
 * Data contoh (sesuai screenshot)
 * ========================================================== */

export const SAMPLE_AUDIT_LOGS: AuditLog[] = [
  {
    id: "LOG-20260602-00024582",
    tanggal: "02/06/2026",
    jam: "09:14:02",
    user: "admin_db",
    role: "Admin DB",
    aktivitas: "Update Data Material",
    aktivitasType: "update",
    modul: "Master Data",
    referensi: "MAT-000123",
    ipAddress: "10.10.20.11",
    status: "SUCCESS",
    browser: "Chrome 138.0.0.0",
    device: "Windows 11",
    perubahan: {
      field: "Nama Material",
      sebelum: "Radio Tactical AN/PRC-77",
      sesudah: "Radio Tactical AN/PRC-152",
      deskripsi: "Mengubah data material dengan ID MAT-000123",
      idReferensi: "MAT-000123",
    },
  },
  {
    id: "LOG-20260602-00024581",
    tanggal: "02/06/2026",
    jam: "09:12:45",
    user: "validator_1",
    role: "Validator",
    aktivitas: "Validasi Usulan Kodefikasi",
    aktivitasType: "validasi",
    modul: "Usulan Kodefikasi",
    referensi: "USL-0456",
    ipAddress: "10.10.20.16",
    status: "SUCCESS",
    browser: "Chrome 138.0.0.0",
    device: "Windows 11",
  },
  {
    id: "LOG-20260602-00024580",
    tanggal: "02/06/2026",
    jam: "09:10:11",
    user: "admin_si",
    role: "Admin SI",
    aktivitas: "Backup Database",
    aktivitasType: "backup",
    modul: "Sistem",
    ipAddress: "10.10.20.10",
    status: "SUCCESS",
    browser: "Firefox 126.0",
    device: "Ubuntu 24.04",
  },
  {
    id: "LOG-20260602-00024579",
    tanggal: "02/06/2026",
    jam: "09:08:34",
    user: "operator_kodik",
    role: "Operator",
    aktivitas: "Upload Dokumen",
    aktivitasType: "upload",
    modul: "Usulan Kodefikasi",
    referensi: "DOC-00123",
    ipAddress: "10.10.20.15",
    status: "SUCCESS",
    browser: "Chrome 138.0.0.0",
    device: "Windows 10",
  },
  {
    id: "LOG-20260602-00024578",
    tanggal: "02/06/2026",
    jam: "09:05:20",
    user: "system",
    role: "System",
    aktivitas: "Sinkronisasi Data",
    aktivitasType: "sinkronisasi",
    modul: "Sistem",
    ipAddress: "10.10.20.1",
    status: "SUCCESS",
    device: "Server",
  },
  {
    id: "LOG-20260602-00024577",
    tanggal: "02/06/2026",
    jam: "09:02:11",
    user: "admin_db",
    role: "Admin DB",
    aktivitas: "Delete Data Material",
    aktivitasType: "delete",
    modul: "Master Data",
    referensi: "MAT-000110",
    ipAddress: "10.10.20.11",
    status: "SUCCESS",
    browser: "Chrome 138.0.0.0",
    device: "Windows 11",
    perubahan: {
      field: "Status Material",
      sebelum: "Aktif",
      sesudah: "Terhapus",
      deskripsi: "Menghapus data material dengan ID MAT-000110",
      idReferensi: "MAT-000110",
    },
  },
  {
    id: "LOG-20260602-00024576",
    tanggal: "02/06/2026",
    jam: "08:59:44",
    user: "validator_2",
    role: "Validator",
    aktivitas: "Tolak Usulan Kodefikasi",
    aktivitasType: "tolak",
    modul: "Usulan Kodefikasi",
    referensi: "USL-0452",
    ipAddress: "10.10.20.17",
    status: "SUCCESS",
    browser: "Edge 124.0",
    device: "Windows 11",
  },
  {
    id: "LOG-20260602-00024575",
    tanggal: "02/06/2026",
    jam: "08:56:31",
    user: "operator_komac",
    role: "Operator",
    aktivitas: "Login ke Sistem",
    aktivitasType: "login",
    modul: "Auth",
    ipAddress: "10.10.20.15",
    status: "SUCCESS",
    browser: "Chrome 138.0.0.0",
    device: "Windows 10",
  },
  {
    id: "LOG-20260602-00024574",
    tanggal: "02/06/2026",
    jam: "08:55:10",
    user: "operator_komac",
    role: "Operator",
    aktivitas: "Logout dari Sistem",
    aktivitasType: "logout",
    modul: "Auth",
    ipAddress: "10.10.20.15",
    status: "SUCCESS",
    browser: "Chrome 138.0.0.0",
    device: "Windows 10",
  },
  {
    id: "LOG-20260602-00024573",
    tanggal: "02/06/2026",
    jam: "08:50:02",
    user: "admin_si",
    role: "Admin SI",
    aktivitas: "Restore Database",
    aktivitasType: "restore",
    modul: "Sistem",
    ipAddress: "10.10.20.10",
    status: "SUCCESS",
    browser: "Firefox 126.0",
    device: "Ubuntu 24.04",
  },
];

/* ============================================================
 * Props komponen tabel
 * ========================================================== */

interface TabelAuditTrailProps {
  data?: AuditLog[];
  total?: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onDetail?: (log: AuditLog) => void;
}

/* ============================================================
 * Komponen utama: Tabel Audit Trail
 * ========================================================== */

export default function TabelAuditTrail({
  data = SAMPLE_AUDIT_LOGS,
  total = 24582,
  page = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  onDetail,
}: TabelAuditTrailProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  // Daftar nomor halaman ringkas: 1, 2, 3, …, totalPages
  const pageNumbers: (number | "ellipsis")[] = [];
  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    pageNumbers.push(1, 2, 3, "ellipsis", totalPages);
  }

  const formatID = (n: number) => n.toLocaleString("id-ID");

  return (
    <section className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
      {/* Header tabel */}
      <div className="px-5 py-4">
        <h2 className="text-lg font-semibold text-slate-100">
          Audit Trail{" "}
          <span className="font-normal text-slate-400">
            ({formatID(total)} Data)
          </span>
        </h2>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-sm">
          <thead>
            <tr className="border-y border-white/5 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-5 py-3">
                <span className="inline-flex items-center gap-1">
                  Waktu <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
                </span>
              </th>
              <th className="px-5 py-3">User</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Aktivitas</th>
              <th className="px-5 py-3">Modul</th>
              <th className="px-5 py-3">Referensi</th>
              <th className="px-5 py-3">IP Address</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((log) => (
              <tr
                key={log.id}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
              >
                <td className="whitespace-nowrap px-5 py-4 align-top text-slate-300">
                  <div>{log.tanggal}</div>
                  <div className="text-slate-500">{log.jam}</div>
                </td>
                <td className="px-5 py-4 align-top text-slate-200">{log.user}</td>
                <td className="px-5 py-4 align-top">
                  <RoleBadge role={log.role} />
                </td>
                <td className="px-5 py-4 align-top">
                  <AktivitasCell log={log} />
                </td>
                <td className="px-5 py-4 align-top text-slate-300">{log.modul}</td>
                <td className="px-5 py-4 align-top">
                  {log.referensi ? (
                    <button className="font-medium text-sky-400 hover:text-sky-300 hover:underline">
                      {log.referensi}
                    </button>
                  ) : (
                    <span className="text-slate-600">-</span>
                  )}
                </td>
                <td className="whitespace-nowrap px-5 py-4 align-top text-slate-300">
                  {log.ipAddress}
                </td>
                <td className="px-5 py-4 align-top">
                  <StatusBadge log={log} />
                </td>
                <td className="px-5 py-4 align-top text-center">
                  <button
                    onClick={() => onDetail?.(log)}
                    title="Lihat detail"
                    aria-label="Lihat detail"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-4 px-5 py-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <span>
          Menampilkan {formatID(start)} - {formatID(end)} dari {formatID(total)} data
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => onPageChange?.(page - 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {pageNumbers.map((p, i) =>
            p === "ellipsis" ? (
              <span key={`e-${i}`} className="px-2 text-slate-500">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange?.(p)}
                className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2 text-sm transition-colors ${
                  p === page
                    ? "border-emerald-500/40 bg-emerald-500/15 font-semibold text-emerald-300"
                    : "border-white/10 text-slate-300 hover:bg-white/5"
                }`}
              >
                {formatID(p)}
              </button>
            )
          )}

          <button
            disabled={page >= totalPages}
            onClick={() => onPageChange?.(page + 1)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="relative ml-2">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="h-9 cursor-pointer appearance-none rounded-md border border-white/10 bg-transparent py-0 pl-3 pr-9 text-sm text-slate-200 outline-none transition-colors hover:bg-white/5 focus:border-emerald-500/40"
            >
              {[10, 20, 50, 100].map((s) => (
                <option key={s} value={s} className="bg-slate-900">
                  {s} / halaman
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </div>
      </div>
    </section>
  );
}