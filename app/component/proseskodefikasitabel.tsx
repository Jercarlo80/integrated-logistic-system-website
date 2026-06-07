"use client";

import React, { useState, useEffect } from "react";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Gambar from "../image/PHOTO-2026-05-12-15-59-43.jpg";
import ModalDetailBarang from "@/app/component/modaldetailbarang";

// ======================== TYPE DEFINITIONS ========================
// Mendukung number atau string (untuk kompatibilitas)
export type PengajuanItem = {
  id: string;
  bag?: number | string;
  unsr?: number | string;
  bid?: number | string;
  subBid?: number | string;
  subSubBid?: number | string;
  gol?: number | string;
  bidKlasifikasi?: number | string;
  kel?: number | string;
  subKel?: number | string;
  subSubKel?: number | string;
  jenis?: string;  // "1" / "2"
  tipe?: string;   // "1" / "2"
  urut?: number | string;
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

export type PengajuanGroup = {
  romawi: string;
  title: string;
  items: PengajuanItem[];
};

// ======================== PROPS ========================
type ProsesKodefikasiTabelProps = {
  data: PengajuanGroup[];
  onDataChange: (newData: PengajuanGroup[]) => void;
};

// ======================== FUNGSI PEMBANTU ========================
// Mengubah nilai (number, string, undefined) menjadi string tanpa leading zero
const formatCodeValue = (value: any): string => {
  if (value === undefined || value === null || value === "") return "-";
  
  if (typeof value === "number") return value.toString();
  
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return "-";
    const num = Number(trimmed);
    if (!isNaN(num)) return num.toString();
    return trimmed;
  }
  
  return "-";
};

const getField = (value: any): string => {
  if (value === undefined || value === null || value === "") return "-";
  return String(value);
};

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

// ======================== MODAL PENOLAKAN ========================
function ModalPenolakan({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (isOpen) setReason("");
  }, [isOpen]);

  const handleConfirm = () => {
    if (reason.trim() === "") {
      alert("Harap masukkan alasan penolakan.");
      return;
    }
    onConfirm(reason);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 pt-20">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#07111c] p-5 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-3">Tolak Pengajuan</h3>
        <p className="text-sm text-slate-300 mb-4">
          Berikan alasan penolakan atau catatan perbaikan:
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-[#0a1a2f] p-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          placeholder="Alasan penolakan..."
          autoFocus
        />
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onCancel}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-black hover:bg-red-600"
          >
            Konfirmasi Tolak
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================== KOMPONEN UTAMA ========================
export default function ProsesKodefikasiTabel({
  data,
  onDataChange,
}: ProsesKodefikasiTabelProps) {
  const [viewingItem, setViewingItem] = useState<PengajuanItem | null>(null);
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<{
    groupIdx: number;
    itemIdx: number;
  } | null>(null);

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const today = new Date();
  const formattedDate = `${today.getDate()} • ${monthNames[today.getMonth()]} • ${today.getFullYear()}`;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Menunggu":
        return (
          <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-300">
            Menunggu
          </span>
        );
      case "Disetujui":
        return (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
            Disetujui
          </span>
        );
      case "Ditolak":
        return (
          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-300">
            Ditolak
          </span>
        );
      default:
        return status;
    }
  };

  const handleApprove = (groupIdx: number, itemIdx: number) => {
    const itemName = data[groupIdx].items[itemIdx].name;
    if (
      window.confirm(
        `Setujui pengajuan "${itemName}"? Item akan dipindahkan ke Data Material.`,
      )
    ) {
      const updated = [...data];
      updated[groupIdx].items.splice(itemIdx, 1);
      const filteredGroups = updated.filter((group) => group.items.length > 0);
      onDataChange(filteredGroups);
      console.log(`Item disetujui: ${itemName}`);
    }
  };

  const handleRejectClick = (groupIdx: number, itemIdx: number) => {
    setRejectTarget({ groupIdx, itemIdx });
    setRejectModalOpen(true);
  };

  const confirmReject = (reason: string) => {
    if (rejectTarget) {
      const { groupIdx, itemIdx } = rejectTarget;
      const itemName = data[groupIdx].items[itemIdx].name;
      console.log(`Penolakan: ${reason} untuk item ${itemName}`);
      const updated = [...data];
      updated[groupIdx].items.splice(itemIdx, 1);
      const filteredGroups = updated.filter((group) => group.items.length > 0);
      onDataChange(filteredGroups);
      setRejectModalOpen(false);
      setRejectTarget(null);
    }
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
    setRejectTarget(null);
  };

  const handleViewItem = (item: PengajuanItem) => {
    setViewingItem(item);
  };

  const openImageModal = (gambarUrl: string | undefined) => {
    if (gambarUrl) setImageModalUrl(gambarUrl);
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-cyan-500/10 bg-[#07111c] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        <div className="border-b border-white/5 bg-gradient-to-r from-[#08192f] to-[#071624] px-4 py-4 md:px-6 md:py-5">
          <div>
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">
              Tabel Usulan Pengajuan Kodefikasi
            </h2>
            <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
              {formattedDate} • Data pengajuan kodefikasi material
            </p>
          </div>
        </div>

        <div className="p-3 md:p-6">
          <div className="overflow-x-auto rounded-xl md:rounded-2xl border border-white/5">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead className="sticky top-0 z-20 bg-[#08192f]">
                <tr className="text-[10px] md:text-xs uppercase tracking-wide">
                  <th rowSpan={2} className="border border-white/10 px-2 py-3 md:px-4 md:py-4 text-center text-cyan-300 font-semibold">No</th>
                  <th colSpan={5} className="border border-white/10 bg-cyan-900/30 px-2 py-3 text-center text-cyan-200 font-semibold">Identifikasi</th>
                  <th colSpan={5} className="border border-white/10 bg-purple-900/30 px-2 py-3 text-center text-purple-200 font-semibold">Klasifikasi</th>
                  <th colSpan={3} className="border border-white/10 px-2 py-3 text-center font-semibold">Jenis</th>
                  <th colSpan={6} className="border border-white/10 px-2 py-3 text-center font-semibold">Data Barang</th>
                  <th colSpan={2} className="border border-white/10 px-2 py-3 text-center font-semibold">Satuan</th>
                  <th colSpan={4} className="border border-white/10 px-2 py-3 text-center font-semibold">Kondisi</th>
                  <th rowSpan={2} className="border border-white/10 px-2 py-3 text-center font-semibold min-w-[120px]">Keterangan</th>
                  <th rowSpan={2} className="border border-white/10 px-2 py-3 text-center font-semibold min-w-[80px]">Gambar</th>
                  <th rowSpan={2} className="border border-white/10 px-2 py-3 text-center font-semibold min-w-[110px]">Tgl Pengajuan</th>
                  <th rowSpan={2} className="border border-white/10 px-2 py-3 text-center font-semibold min-w-[90px]">Status</th>
                  <th rowSpan={2} className="border border-white/10 px-2 py-3 text-center font-semibold min-w-[160px]">Aksi</th>
                </tr>
                <tr className="bg-[#0b213b] text-[9px] md:text-xs text-slate-300">
                  <th className="border border-white/10 bg-cyan-900/20 px-2 py-2 text-center text-cyan-200">BAG</th>
                  <th className="border border-white/10 bg-cyan-900/20 px-2 py-2 text-center text-cyan-200">UNSR</th>
                  <th className="border border-white/10 bg-cyan-900/20 px-2 py-2 text-center text-cyan-200">BID</th>
                  <th className="border border-white/10 bg-cyan-900/20 px-2 py-2 text-center text-cyan-200">SUB BID</th>
                  <th className="border border-white/10 bg-cyan-900/20 px-2 py-2 text-center text-cyan-200">SUB SUB BID</th>
                  <th className="border border-white/10 bg-purple-900/20 px-2 py-2 text-center text-purple-200">GOL</th>
                  <th className="border border-white/10 bg-purple-900/20 px-2 py-2 text-center text-purple-200">BID</th>
                  <th className="border border-white/10 bg-purple-900/20 px-2 py-2 text-center text-purple-200">KEL</th>
                  <th className="border border-white/10 bg-purple-900/20 px-2 py-2 text-center text-purple-200">SUB KEL</th>
                  <th className="border border-white/10 bg-purple-900/20 px-2 py-2 text-center text-purple-200">SUB SUB KEL</th>
                  <th className="border border-white/10 px-2 py-2 text-center">JENIS</th>
                  <th className="border border-white/10 px-2 py-2 text-center">TIPE</th>
                  <th className="border border-white/10 px-2 py-2 text-center">URUT</th>
                  <th className="border border-white/10 px-2 py-2 text-center min-w-[180px]">NAMA BARANG</th>
                  <th className="border border-white/10 px-2 py-2 text-center min-w-[150px]">MERK/TYPE</th>
                  <th className="border border-white/10 px-2 py-2 text-center min-w-[100px]">NOMOR SERI</th>
                  <th className="border border-white/10 px-2 py-2 text-center min-w-[120px]">NEGARA PEMBUAT</th>
                  <th className="border border-white/10 px-2 py-2 text-center min-w-[110px]">THN PEMBUATAN</th>
                  <th className="border border-white/10 px-2 py-2 text-center min-w-[110px]">THN PEMAKAIAN</th>
                  <th className="border border-white/10 px-2 py-2 text-center">JUMLAH</th>
                  <th className="border border-white/10 px-2 py-2 text-center">SAT</th>
                  <th className="border border-white/10 px-2 py-2 text-center">B</th>
                  <th className="border border-white/10 px-2 py-2 text-center">RR</th>
                  <th className="border border-white/10 px-2 py-2 text-center">RB</th>
                  <th className="border border-white/10 px-2 py-2 text-center">%</th>
                </tr>
              </thead>
              <tbody>
                {data.map((group, groupIdx) => {
                  let rowCounter = 1;
                  return (
                    <React.Fragment key={`${group.romawi}-${groupIdx}`}>
                      <tr className="bg-gradient-to-r from-cyan-500/10 to-transparent">
                        <td colSpan={31} className="border border-cyan-500/10 px-4 py-2 text-xs font-bold tracking-wide text-cyan-300 md:px-5 md:py-3 md:text-sm">
                          {group.romawi}. {group.title}
                        </td>
                      </tr>
                      {group.items.map((item, itemIdx) => {
                        const qty = item.jumlah ?? 1;
                        const rows = [];
                        for (let unit = 1; unit <= qty; unit++) {
                          const serial = item.serialNumbers?.[unit - 1] ?? "-";
                          const itemName = qty > 1 ? `${item.name} - ${unit}` : item.name;
                          rows.push(
                            <tr
                              key={`${groupIdx}-${itemIdx}-${unit}`}
                              className="border-b border-white/5 bg-[#07111c] text-xs md:text-sm text-slate-300 transition hover:bg-cyan-500/5"
                            >
                              <td className="border border-white/10 px-2 py-2 text-center text-slate-400">{rowCounter++}</td>
                              <td className="border border-white/10 bg-cyan-900/10 px-2 py-2 text-center">{formatCodeValue(item.bag)}</td>
                              <td className="border border-white/10 bg-cyan-900/10 px-2 py-2 text-center">{formatCodeValue(item.unsr)}</td>
                              <td className="border border-white/10 bg-cyan-900/10 px-2 py-2 text-center">{formatCodeValue(item.bid)}</td>
                              <td className="border border-white/10 bg-cyan-900/10 px-2 py-2 text-center">{formatCodeValue(item.subBid)}</td>
                              <td className="border border-white/10 bg-cyan-900/10 px-2 py-2 text-center">{formatCodeValue(item.subSubBid)}</td>
                              <td className="border border-white/10 bg-purple-900/10 px-2 py-2 text-center">{formatCodeValue(item.gol)}</td>
                              <td className="border border-white/10 bg-purple-900/10 px-2 py-2 text-center">{formatCodeValue(item.bidKlasifikasi)}</td>
                              <td className="border border-white/10 bg-purple-900/10 px-2 py-2 text-center">{formatCodeValue(item.kel)}</td>
                              <td className="border border-white/10 bg-purple-900/10 px-2 py-2 text-center">{formatCodeValue(item.subKel)}</td>
                              <td className="border border-white/10 bg-purple-900/10 px-2 py-2 text-center">{formatCodeValue(item.subSubKel)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{getJenisLabel(item.jenis)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{getTipeLabel(item.tipe)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{formatCodeValue(item.urut)}</td>
                              <td className="border border-white/10 px-2 py-2 font-medium text-white min-w-[200px]">{itemName}</td>
                              <td className="border border-white/10 px-2 py-2 text-center min-w-[150px]">{getField(item.merkType)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center font-mono text-xs">{serial}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{getField(item.negaraPembuat)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{getField(item.tahunPembuatan)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{getField(item.tahunPemakaian)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">1</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{getField(item.satuan)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center text-emerald-300">{getField(item.kondisiB)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center text-yellow-300">{getField(item.rr)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center text-red-300">{getField(item.rb)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{getField(item.persen)}</td>
                              <td className="border border-white/10 px-2 py-2 min-w-[160px]">{getField(item.keterangan)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">
                                {unit === 1 && item.gambar ? (
                                  <button onClick={() => openImageModal(item.gambar)} className="text-cyan-300 hover:text-cyan-200 transition" title="Lihat gambar">
                                    <FaEye size={16} />
                                  </button>
                                ) : unit === 1 && !item.gambar ? (
                                  "-"
                                ) : (
                                  <span className="text-[10px] text-slate-500">Lihat di atas</span>
                                )}
                              </td>
                              <td className="border border-white/10 px-2 py-2 text-center whitespace-nowrap">{item.tanggalPengajuan}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">{getStatusBadge(item.status)}</td>
                              <td className="border border-white/10 px-2 py-2 text-center">
                                <div className="flex flex-col items-center justify-center gap-2">
                                  <button onClick={() => handleViewItem(item)} className="flex items-center gap-1 rounded-md bg-blue-800/50 px-2 py-1 text-xs font-medium text-white transition hover:bg-blue-800/50" title="Detail">
                                    <FaEye size={14} /> Lihat Detail
                                  </button>
                                  <button onClick={() => handleApprove(groupIdx, itemIdx)} className="flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/30">
                                    <FaCheck size={10} /> Diterima
                                  </button>
                                  <button onClick={() => handleRejectClick(groupIdx, itemIdx)} className="flex items-center gap-1 rounded-md bg-red-500/20 px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/30">
                                    <FaTimes size={10} /> Ditolak
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                        return rows;
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL BARANG - cast as any untuk mengatasi perbedaan tipe */}
      {viewingItem && (
        <ModalDetailBarang
          item={viewingItem as any}
          onClose={() => setViewingItem(null)}
        />
      )}

      {/* MODAL GAMBAR */}
      {imageModalUrl && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 pt-20">
          <div className="relative max-w-3xl w-full rounded-2xl bg-[#07111c] p-2">
            <button onClick={() => setImageModalUrl(null)} className="absolute -top-3 -right-3 rounded-full bg-red-500 p-1 text-white hover:bg-red-600">
              <FaTimes size={16} />
            </button>
            <img src={imageModalUrl} alt="Preview" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}

      {/* MODAL PENOLAKAN */}
      <ModalPenolakan
        isOpen={rejectModalOpen}
        onConfirm={confirmReject}
        onCancel={closeRejectModal}
      />
    </>
  );
}