"use client";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  X,
  Hash,
  Layers,
  Package,
  Box,
  BarChart3,
  Info,
  Image as ImageIcon,
  QrCode,
  Tag,
  Calendar,
  User,
  Globe,
  Cpu,
  HardDrive,
  ZoomIn,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

// ======================== TYPE DEFINITIONS (salin dari pengajuan) ========================
export type PengajuanItem = {
  id: string;
  bag?: string;
  unsr?: string;
  bid?: string;
  subBid?: string;
  subSubBid?: string;
  gol?: string;
  bidKlasifikasi?: string;
  kel?: string;
  subKel?: string;
  subSubKel?: string;
  jenis?: string;
  tipe?: string;
  urut?: string;
  name: string;
  merkType?: string;
  serialNumbers?: string[];
  negaraPembuat?: string;
  tahunPembuatan?: string;
  tahunPemakaian?: string;
  jumlah?: number;
  satuan?: string;
  kondisiB?: string;
  rr?: string;
  rb?: string;
  persen?: string;
  keterangan?: string;
  gambar?: string;
  tanggalPengajuan: string;
  status: "Menunggu" | "Disetujui" | "Ditolak";
};

// ======================== FUNGSI PEMBANTU (salin dari kode asli) ========================
const getField = (value: any) => (value && value !== "" ? value : "-");

const getJenisLabel = (jenis: string | undefined) => {
  if (jenis === "1") return "1 (BMN)";
  if (jenis === "2") return "2 (Non BMN)";
  return getField(jenis);
};

const getTipeLabel = (tipe: string | undefined) => {
  if (tipe === "1") return "1 (Aset Tetap)";
  if (tipe === "2") return "2 (Habis Pakai)";
  return getField(tipe);
};

const generateKodefikasiFromPengajuan = (item: PengajuanItem): string => {
  const identifikasi = [
    item.bag || "0",
    item.unsr || "0",
    item.bid || "0",
    item.subBid || "0",
    item.subSubBid || "0",
  ].join(".");
  const klasifikasi = [
    item.gol || "0",
    item.bidKlasifikasi || "0",
    item.kel || "0",
    item.subKel || "0",
    item.subSubKel || "0",
  ].join(".");
  const detail = [item.jenis || "0", item.tipe || "0", item.urut || "0"].join(".");
  return `${identifikasi}-${klasifikasi}-${detail}`;
};

// ======================== SUB-KOMPONEN PRESENTASIONAL ========================
function SectionCard({
  title,
  icon: Icon,
  children,
  className = "",
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-transparent px-4 py-3">
        <Icon size={16} className="text-cyan-400" />
        <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon?: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-white/5 py-2 last:border-0">
      {Icon && (
        <Icon size={15} className="mt-0.5 flex-shrink-0 text-slate-500" />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <p className="break-words text-sm font-medium text-white sm:text-right">
          {value}
        </p>
      </div>
    </div>
  );
}

function CodeCell({
  label,
  value,
  tone,
}: {
  label: string;
  value?: string;
  tone: "cyan" | "purple";
}) {
  const tones = {
    cyan: "border-cyan-500/20 bg-cyan-500/[0.07] text-cyan-200",
    purple: "border-purple-500/20 bg-purple-500/[0.07] text-purple-200",
  };
  return (
    <div className={`rounded-lg border px-2 py-2 text-center ${tones[tone]}`}>
      <div className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="mt-1 font-mono text-base font-bold">
        {getField(value)}
      </div>
    </div>
  );
}

function KondisiTile({
  label,
  value,
  tone,
}: {
  label: string;
  value?: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-center">
      <div className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className={`mt-1 text-lg font-bold tabular-nums ${tone}`}>
        {getField(value)}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: PengajuanItem["status"] }) {
  const map: Record<
    string,
    { cls: string; Icon: any }
  > = {
    Disetujui: {
      cls: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
      Icon: CheckCircle2,
    },
    Ditolak: {
      cls: "border-red-500/30 bg-red-500/10 text-red-300",
      Icon: XCircle,
    },
    Menunggu: {
      cls: "border-amber-500/30 bg-amber-500/10 text-amber-300",
      Icon: Clock,
    },
  };
  const s = map[status] ?? map.Menunggu;
  const Icon = s.Icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${s.cls}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

// ======================== KOMPONEN MODAL DETAIL BARANG ========================
export default function ModalDetailBarang({
  item,
  onClose,
}: {
  item: PengajuanItem;
  onClose: () => void;
}) {
  const kodefikasi = generateKodefikasiFromPengajuan(item);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
        style={{
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        onClick={onClose}
      >
        <div
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#0a0f1a] to-[#06090f] shadow-2xl shadow-cyan-500/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER (sticky) */}
          <div className="relative shrink-0 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/[0.07] via-transparent to-cyan-500/[0.07] px-4 py-4 sm:px-6 sm:py-5">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-10 rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white sm:right-4 sm:top-4"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-3 pr-10">
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2.5">
                <Package size={22} className="text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-400/80">
                  Detail Pengajuan Kodefikasi
                </p>
                <h2 className="mt-0.5 break-words text-lg font-bold tracking-tight text-white sm:text-xl">
                  {item.name || "-"}
                </h2>

                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <StatusBadge status={item.status} />
                  {item.merkType && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                      <HardDrive size={12} /> {item.merkType}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-semibold text-cyan-300">
                    <Hash size={12} /> {kodefikasi}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BODY (scroll) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar]:w-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {/* Identifikasi — sel cyan (mengikuti warna kolom tabel) */}
              <SectionCard title="Identifikasi" icon={Hash}>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  <CodeCell label="BAG" value={item.bag} tone="cyan" />
                  <CodeCell label="UNSR" value={item.unsr} tone="cyan" />
                  <CodeCell label="BID" value={item.bid} tone="cyan" />
                  <CodeCell label="SUB BID" value={item.subBid} tone="cyan" />
                  <CodeCell label="SUB SUB BID" value={item.subSubBid} tone="cyan" />
                </div>
              </SectionCard>

              {/* Klasifikasi — sel ungu (mengikuti warna kolom tabel) */}
              <SectionCard title="Klasifikasi" icon={BarChart3}>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  <CodeCell label="GOL" value={item.gol} tone="purple" />
                  <CodeCell label="BID" value={item.bidKlasifikasi} tone="purple" />
                  <CodeCell label="KEL" value={item.kel} tone="purple" />
                  <CodeCell label="SUB KEL" value={item.subKel} tone="purple" />
                  <CodeCell label="SUB SUB KEL" value={item.subSubKel} tone="purple" />
                </div>
              </SectionCard>

              {/* Jenis & Tipe */}
              <SectionCard title="Jenis & Tipe" icon={Box}>
                <InfoRow icon={Tag} label="Jenis" value={getJenisLabel(item.jenis)} />
                <InfoRow icon={Cpu} label="Tipe" value={getTipeLabel(item.tipe)} />
                <InfoRow icon={Hash} label="Urut" value={getField(item.urut)} />
              </SectionCard>

              {/* Satuan */}
              <SectionCard title="Satuan" icon={Box}>
                <InfoRow icon={Hash} label="Jumlah" value={(item.jumlah ?? 1).toString()} />
                <InfoRow icon={Box} label="Satuan" value={getField(item.satuan)} />
              </SectionCard>

              {/* Data Barang */}
              <SectionCard title="Data Barang" icon={Package}>
                <InfoRow icon={Package} label="Nama Barang" value={item.name || "-"} />
                <InfoRow icon={HardDrive} label="Merk / Type" value={getField(item.merkType)} />
                <InfoRow icon={Hash} label="Nomor Seri" value={item.serialNumbers?.join(", ") || "-"} />
                <InfoRow icon={Globe} label="Negara Pembuat" value={getField(item.negaraPembuat)} />
                <InfoRow icon={Calendar} label="Tahun Pembuatan" value={getField(item.tahunPembuatan)} />
                <InfoRow icon={Calendar} label="Tahun Pemakaian" value={getField(item.tahunPemakaian)} />
              </SectionCard>

              {/* Keterangan & Status */}
              <SectionCard title="Keterangan & Status" icon={Info}>
                <InfoRow icon={Info} label="Keterangan" value={getField(item.keterangan)} />
                <InfoRow icon={Calendar} label="Tanggal Pengajuan" value={getField(item.tanggalPengajuan)} />
                <InfoRow icon={User} label="Status" value={item.status} />
              </SectionCard>

              {/* Kondisi — kartu metrik berwarna (mengikuti warna kolom tabel) */}
              <SectionCard title="Kondisi" icon={BarChart3} className="md:col-span-2">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  <KondisiTile label="Baik (B)" value={item.kondisiB} tone="text-emerald-300" />
                  <KondisiTile label="Rusak Ringan (RR)" value={item.rr} tone="text-yellow-300" />
                  <KondisiTile label="Rusak Berat (RB)" value={item.rb} tone="text-red-300" />
                  <KondisiTile label="Persen (%)" value={item.persen} tone="text-cyan-300" />
                </div>
              </SectionCard>

              {/* Gambar */}
              <SectionCard title="Gambar Barang" icon={ImageIcon} className="md:col-span-2">
                {item.gambar && !imageError ? (
                  <div className="group relative">
                    <div className="flex justify-center">
                      <img
                        src={item.gambar}
                        alt="Barang"
                        className="max-h-64 max-w-full cursor-pointer rounded-lg border border-white/10 object-contain shadow-lg transition-transform hover:scale-[1.02]"
                        onError={() => setImageError(true)}
                        onClick={() => setIsZoomOpen(true)}
                      />
                    </div>
                    <button
                      onClick={() => setIsZoomOpen(true)}
                      className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/60 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
                      title="Perbesar gambar"
                    >
                      <ZoomIn size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 py-8 text-slate-400">
                    <ImageIcon size={44} strokeWidth={1.5} />
                    <p className="text-sm">Tidak ada gambar</p>
                    {imageError && (
                      <p className="flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle size={14} /> Gagal memuat gambar
                      </p>
                    )}
                  </div>
                )}
              </SectionCard>

              {/* QR Code */}
              <SectionCard title="QR Code Kodefikasi" icon={QrCode} className="md:col-span-2">
                <div className="flex flex-col items-center gap-3 py-2 sm:flex-row sm:justify-center sm:gap-6">
                  <div className="rounded-xl bg-white p-3">
                    <QRCodeCanvas value={kodefikasi} size={140} />
                  </div>
                  <div className="space-y-1.5 text-center sm:text-left">
                    <p className="inline-block break-all rounded-full bg-black/40 px-3 py-1.5 font-mono text-xs text-cyan-300">
                      {kodefikasi}
                    </p>
                    <p className="text-xs text-slate-400">
                      Scan QR untuk melihat kodefikasi lengkap.
                    </p>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>

          {/* FOOTER (sticky) */}
          <div className="flex shrink-0 justify-end border-t border-white/10 bg-white/5 px-4 py-3 sm:px-6 sm:py-4">
            <button
              onClick={onClose}
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-cyan-500 focus:outline-none"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>

      {isZoomOpen && item.gambar && !imageError && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={item.gambar}
              alt="Zoom Barang"
              className="max-h-[90vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}