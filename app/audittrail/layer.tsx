"use client";

import { useMemo, useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Calendar,
  Search,
  RotateCcw,
  RefreshCw,
  FileSpreadsheet,
  FileText,
  X,
  ArrowDown,
} from "lucide-react";
import TabelAuditTrail, {
  SAMPLE_AUDIT_LOGS,
  ROLE_BADGE,
  type AuditLog,
} from "@/app/component/tabelaudittrail";

/* ============================================================
 * Komponen kecil reusable untuk filter
 * ========================================================== */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-medium text-slate-400">
      {children}
    </label>
  );
}

function SelectField({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-white/[0.03] px-3.5 pr-10 text-sm text-slate-200 outline-none transition-colors hover:bg-white/[0.05] focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-900">
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

function DateField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="dd/mm/yyyy"
        className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 pr-10 text-sm text-slate-200 outline-none transition-colors hover:bg-white/[0.05] focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20"
      />
      <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
    </div>
  );
}

/* ============================================================
 * State filter
 * ========================================================== */

const DEFAULT_FILTER = {
  dariTanggal: "01/06/2026",
  sampaiTanggal: "02/06/2026",
  pengguna: "Semua Pengguna",
  role: "Semua Role",
  aktivitas: "Semua Aktivitas",
  modul: "Semua Modul",
  status: "Semua Status",
  kataKunci: "",
};

/* ============================================================
 * Panel Detail Aktivitas (drawer kanan)
 * ========================================================== */

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[110px_12px_1fr] items-start gap-2 py-2 text-sm">
      <span className="text-slate-400">{label}</span>
      <span className="text-slate-500">:</span>
      <span className="text-slate-200">{children}</span>
    </div>
  );
}

function DetailPanel({
  log,
  onClose,
}: {
  log: AuditLog | null;
  onClose: () => void;
}) {
  const open = !!log;

  return (
    <>
      {/* Overlay (mobile/tablet) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-md transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header panel */}
        <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h3 className="text-lg font-semibold text-slate-100">
            Detail Aktivitas
          </h3>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Isi panel */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {log && (
            <>
              <DetailRow label="ID Log">{log.id}</DetailRow>
              <DetailRow label="Waktu">
                {log.tanggal.replaceAll("/", " ")} {log.jam} WIB
              </DetailRow>
              <DetailRow label="Pengguna">{log.user}</DetailRow>
              <DetailRow label="Role">
                <span
                  className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${ROLE_BADGE[log.role]}`}
                >
                  {log.role}
                </span>
              </DetailRow>
              <DetailRow label="Aktivitas">{log.aktivitas}</DetailRow>
              <DetailRow label="Modul">{log.modul}</DetailRow>
              <DetailRow label="Referensi">{log.referensi ?? "-"}</DetailRow>
              <DetailRow label="IP Address">{log.ipAddress}</DetailRow>
              <DetailRow label="Browser">{log.browser ?? "-"}</DetailRow>
              <DetailRow label="Device / OS">{log.device ?? "-"}</DetailRow>
              <DetailRow label="Status">
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                  {log.status}
                </span>
              </DetailRow>

              {/* Perubahan Data */}
              {log.perubahan && (
                <div className="mt-6 border-t border-white/5 pt-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-base font-semibold text-slate-100">
                      Perubahan Data
                    </h4>
                  </div>

                  <DetailRow label="Field">
                    <span className="inline-block rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm">
                      {log.perubahan.field}
                    </span>
                  </DetailRow>

                  <div className="mt-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Sebelum
                    </p>
                    <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-center text-sm text-rose-200">
                      {log.perubahan.sebelum}
                    </div>
                  </div>

                  <div className="my-2 flex justify-center text-blue-400">
                    <ArrowDown className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Sesudah
                    </p>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-200">
                      {log.perubahan.sesudah}
                    </div>
                  </div>

                  <div className="mt-4">
                    <DetailRow label="Deskripsi">
                      {log.perubahan.deskripsi}
                    </DetailRow>
                    <DetailRow label="ID Referensi">
                      {log.perubahan.idReferensi}
                    </DetailRow>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer panel */}
        <div className="border-t border-white/5 px-5 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.06]"
          >
            Tutup
          </button>
        </div>
      </aside>
    </>
  );
}

/* ============================================================
 * Halaman utama: Layer (Audit Trail)
 * ========================================================== */

export default function Layer() {
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [selected, setSelected] = useState<AuditLog | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const setF = (key: keyof typeof DEFAULT_FILTER, value: string) =>
    setFilter((prev) => ({ ...prev, [key]: value }));

  // Filter ringan sisi-klien untuk data contoh (kata kunci, role, status, modul, pengguna)
  const filtered = useMemo(() => {
    const kw = filter.kataKunci.trim().toLowerCase();
    return SAMPLE_AUDIT_LOGS.filter((log) => {
      if (filter.pengguna !== "Semua Pengguna" && log.user !== filter.pengguna)
        return false;
      if (filter.role !== "Semua Role" && log.role !== filter.role) return false;
      if (filter.modul !== "Semua Modul" && log.modul !== filter.modul)
        return false;
      if (filter.status !== "Semua Status" && log.status !== filter.status)
        return false;
      if (kw) {
        const hay = `${log.aktivitas} ${log.modul} ${log.ipAddress} ${
          log.referensi ?? ""
        }`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });
  }, [filter]);

  const handleReset = () => {
    setFilter(DEFAULT_FILTER);
    setPage(1);
  };

  return (
    <div className=" min-h-screen w-full bg-gray-950 p-4 text-slate-100 md:p-6">
      {/* Background gelap */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-5">
        {/* ===== Header ===== */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 md:text-3xl">
              Audit Trail
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Riwayat aktivitas pengguna dalam sistem E-Kodefikasi
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400">
              <span className="hover:text-slate-200">Dashboard</span>
              <ChevronRight className="h-4 w-4 text-slate-600" />
              <span className="text-slate-200">Audit Trail</span>
            </nav>

            {/* Tombol aksi */}
            <div className="flex flex-wrap gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500">
                <FileSpreadsheet className="h-4 w-4" />
                Export Excel
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                <FileText className="h-4 w-4" />
                Export PDF
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.06]">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* ===== Filter Audit ===== */}
        <section className="rounded-xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-100">
            Filter Audit
          </h2>

          {/* Baris 1: 6 kolom */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <div>
              <FieldLabel>Dari Tanggal</FieldLabel>
              <DateField
                value={filter.dariTanggal}
                onChange={(v) => setF("dariTanggal", v)}
              />
            </div>
            <div>
              <FieldLabel>Sampai Tanggal</FieldLabel>
              <DateField
                value={filter.sampaiTanggal}
                onChange={(v) => setF("sampaiTanggal", v)}
              />
            </div>
            <div>
              <FieldLabel>Pengguna</FieldLabel>
              <SelectField
                value={filter.pengguna}
                onChange={(v) => setF("pengguna", v)}
                options={[
                  "Semua Pengguna",
                  "admin_db",
                  "admin_si",
                  "validator_1",
                  "validator_2",
                  "operator_kodik",
                  "operator_komac",
                  "system",
                ]}
              />
            </div>
            <div>
              <FieldLabel>Role</FieldLabel>
              <SelectField
                value={filter.role}
                onChange={(v) => setF("role", v)}
                options={[
                  "Semua Role",
                  "Admin DB",
                  "Admin SI",
                  "Validator",
                  "Operator",
                  "System",
                ]}
              />
            </div>
            <div>
              <FieldLabel>Aktivitas</FieldLabel>
              <SelectField
                value={filter.aktivitas}
                onChange={(v) => setF("aktivitas", v)}
                options={[
                  "Semua Aktivitas",
                  "Login",
                  "Logout",
                  "Update",
                  "Delete",
                  "Upload",
                  "Validasi",
                  "Backup",
                  "Restore",
                ]}
              />
            </div>
            <div>
              <FieldLabel>Modul</FieldLabel>
              <SelectField
                value={filter.modul}
                onChange={(v) => setF("modul", v)}
                options={[
                  "Semua Modul",
                  "Master Data",
                  "Usulan Kodefikasi",
                  "Sistem",
                  "Auth",
                ]}
              />
            </div>
          </div>

          {/* Baris 2: Status + Kata Kunci + tombol */}
          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr_auto]">
            <div>
              <FieldLabel>Status</FieldLabel>
              <SelectField
                value={filter.status}
                onChange={(v) => setF("status", v)}
                options={["Semua Status", "SUCCESS", "FAILED"]}
              />
            </div>

            <div>
              <FieldLabel>Kata Kunci</FieldLabel>
              <div className="relative">
                <input
                  type="text"
                  value={filter.kataKunci}
                  onChange={(e) => setF("kataKunci", e.target.value)}
                  placeholder="Cari berdasarkan aktivitas, modul, IP, referensi..."
                  className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3.5 pr-10 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-500 hover:bg-white/[0.05] focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20"
                />
                <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              </div>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={handleReset}
                className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/[0.06]"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                onClick={() => setPage(1)}
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-emerald-600 px-6 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
              >
                <Search className="h-4 w-4" />
                Cari
              </button>
            </div>
          </div>
        </section>

        {/* ===== Tabel Audit Trail ===== */}
        <TabelAuditTrail
          data={filtered}
          total={24582}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(s) => {
            setPageSize(s);
            setPage(1);
          }}
          onDetail={setSelected}
        />
      </div>

      {/* ===== Panel Detail (drawer) ===== */}
      <DetailPanel log={selected} onClose={() => setSelected(null)} />
    </div>
  );
}