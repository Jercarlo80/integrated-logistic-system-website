"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  FaFilePdf,
  FaFileExcel,
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Gambar from "../image/PHOTO-2026-05-12-15-59-43.jpg";

// ======================== TYPE DEFINITIONS ========================
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
  gambar?: string; // hanya string atau undefined
  tanggalPengajuan: string;
  status: "Menunggu" | "Disetujui" | "Ditolak";
};

export type PengajuanGroup = {
  romawi: string;
  title: string;
  items: PengajuanItem[];
};

// ======================== DUMMY DATA (dengan gambar dummy) ========================
const dummyPengajuanData: PengajuanGroup[] = [
  {
    romawi: "I",
    title: "Pengajuan Kodefikasi Barang Elektronik",
    items: [
      {
        id: "P001",
        bag: "1",
        unsr: "3",
        bid: "1",
        subBid: "4",
        subSubBid: "4",
        gol: "01",
        bidKlasifikasi: "01",
        kel: "01",
        subKel: "01",
        subSubKel: "01",
        jenis: "1",
        tipe: "1",
        urut: "001",
        name: "Laptop Dell Latitude 5420",
        merkType: "Dell Latitude 5420",
        serialNumbers: ["SN12345"],
        negaraPembuat: "China",
        tahunPembuatan: "2023",
        tahunPemakaian: "2024",
        jumlah: 1,
        satuan: "Unit",
        kondisiB: "Baik",
        rr: "0",
        rb: "0",
        persen: "100",
        keterangan: "Laptop untuk staf",
        tanggalPengajuan: "2025-03-15",
        status: "Menunggu",
        gambar: Gambar.src, // ✅ gunakan string URL dari gambar statis
      },
      {
        id: "P002",
        bag: "1",
        unsr: "3",
        bid: "1",
        subBid: "4",
        subSubBid: "5",
        gol: "02",
        bidKlasifikasi: "02",
        kel: "02",
        subKel: "02",
        subSubKel: "02",
        jenis: "1",
        tipe: "1",
        urut: "002",
        name: "Printer HP LaserJet",
        merkType: "HP LaserJet M404",
        serialNumbers: ["SN67890", "SN67891"],
        negaraPembuat: "Vietnam",
        tahunPembuatan: "2022",
        tahunPemakaian: "2023",
        jumlah: 2,
        satuan: "Unit",
        kondisiB: "Baik",
        rr: "0",
        rb: "0",
        persen: "95",
        keterangan: "Printer untuk ruang administrasi",
        tanggalPengajuan: "2025-03-20",
        status: "Disetujui",
        gambar: "https://picsum.photos/id/1/100/100",
      },
    ],
  },
  {
    romawi: "II",
    title: "Pengajuan Kodefikasi Alat Tulis Kantor",
    items: [
      {
        id: "P003",
        bag: "1",
        unsr: "3",
        bid: "1",
        subBid: "4",
        subSubBid: "6",
        gol: "03",
        bidKlasifikasi: "03",
        kel: "03",
        subKel: "03",
        subSubKel: "03",
        jenis: "2",
        tipe: "2",
        urut: "003",
        name: "Kertas HVS A4",
        merkType: "Sidney",
        serialNumbers: [],
        negaraPembuat: "Indonesia",
        tahunPembuatan: "2025",
        tahunPemakaian: "2025",
        jumlah: 50,
        satuan: "Rim",
        kondisiB: "Baik",
        rr: "0",
        rb: "0",
        persen: "100",
        keterangan: "Kertas untuk keperluan cetak",
        tanggalPengajuan: "2025-03-25",
        status: "Ditolak",
        // gambar tidak disertakan (undefined)
      },
    ],
  },
];

// ======================== KOMPONEN UTAMA ========================
export default function ProsesKodefikasiTabel() {
  const [data, setData] = useState<PengajuanGroup[]>(dummyPengajuanData);
  const [viewingItem, setViewingItem] = useState<PengajuanItem | null>(null);
  const [imageModalUrl, setImageModalUrl] = useState<string | null>(null);

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

  const updateItemStatus = (
    groupIdx: number,
    itemIdx: number,
    newStatus: "Disetujui" | "Ditolak",
  ) => {
    const updated = [...data];
    updated[groupIdx].items[itemIdx].status = newStatus;
    setData(updated);
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
        {/* HEADER (sama seperti sebelumnya) */}
        <div className="border-b border-white/5 bg-gradient-to-r from-[#08192f] to-[#071624] px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">
                Tabel Proses Pengajuan Kodefikasi
              </h2>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                {formattedDate} • Data pengajuan kodefikasi material
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <button className="flex items-center gap-1 md:gap-2 rounded-lg md:rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-1.5 md:px-4 md:py-2.5 text-xs md:text-sm font-medium text-red-300 transition hover:bg-red-500/20">
                <FaFilePdf size={12} className="md:size-[14px]" /> Export PDF
              </button>
              <button className="flex items-center gap-1 md:gap-2 rounded-lg md:rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 md:px-4 md:py-2.5 text-xs md:text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20">
                <FaFileExcel size={12} className="md:size-[14px]" /> Export Excel
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 md:p-6">
          <div className="overflow-x-auto rounded-xl md:rounded-2xl border border-white/5">
            <table className="min-w-[3800px] md:min-w-full w-full border-collapse">
              <thead className="sticky top-0 z-20">
                {/* Header utama (rowspan 2) */}
                <tr className="bg-[#08192f] text-[9px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.15em]">
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 md:px-3 md:py-4 text-center text-cyan-300">No</th>
                  <th colSpan={5} className="border border-white/5 bg-cyan-900/30 px-1 py-2 text-center text-cyan-200">Identifikasi</th>
                  <th colSpan={5} className="border border-white/5 bg-purple-900/30 px-1 py-2 text-center text-purple-200">Klasifikasi</th>
                  <th colSpan={3} className="border border-white/5 px-1 py-2 text-center">Jenis</th>
                  <th colSpan={6} className="border border-white/5 px-1 py-2 text-center">Data Barang</th>
                  <th colSpan={2} className="border border-white/5 px-1 py-2 text-center">Satuan</th>
                  <th colSpan={4} className="border border-white/5 px-1 py-2 text-center">Kondisi</th>
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 text-center">Keterangan</th>
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 text-center">Gambar</th>
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 text-center">Tgl Pengajuan</th>
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 text-center">Status</th>
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 text-center">Aksi</th>
                </tr>
                {/* Sub header */}
                <tr className="bg-[#0b213b] text-[9px] text-slate-300 md:text-[11px]">
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200">BAG</th>
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200">UNSR</th>
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200">BID</th>
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200">SUB BID</th>
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200">SUB SUB BID</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200">GOL</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200">BID</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200">KEL</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200">SUB KEL</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200">SUB SUB KEL</th>
                  <th className="border border-white/5 px-1 py-2 text-center">JENIS</th>
                  <th className="border border-white/5 px-1 py-2 text-center">TIPE</th>
                  <th className="border border-white/5 px-1 py-2 text-center">URUT</th>
                  <th className="border border-white/5 px-1 py-2 text-center">NAMA BARANG</th>
                  <th className="border border-white/5 px-1 py-2 text-center">MERK/TYPE</th>
                  <th className="border border-white/5 px-1 py-2 text-center">NOMOR SERI</th>
                  <th className="border border-white/5 px-1 py-2 text-center">NEGARA PEMBUAT</th>
                  <th className="border border-white/5 px-1 py-2 text-center">THN PEMBUATAN</th>
                  <th className="border border-white/5 px-1 py-2 text-center">THN PEMAKAIAN</th>
                  <th className="border border-white/5 px-1 py-2 text-center">JUMLAH</th>
                  <th className="border border-white/5 px-1 py-2 text-center">SAT</th>
                  <th className="border border-white/5 px-1 py-2 text-center">B</th>
                  <th className="border border-white/5 px-1 py-2 text-center">RR</th>
                  <th className="border border-white/5 px-1 py-2 text-center">RB</th>
                  <th className="border border-white/5 px-1 py-2 text-center">%</th>
                </tr>
              </thead>
              <tbody>
                {data.map((group, groupIdx) => {
                  let rowCounter = 1;
                  return (
                    <React.Fragment key={`${group.romawi}-${groupIdx}`}>
                      <tr className="bg-gradient-to-r from-cyan-500/10 to-transparent">
                        <td colSpan={31} className="border border-cyan-500/10 px-3 py-2 text-xs font-bold tracking-wide text-cyan-300 md:px-5 md:py-3 md:text-sm">
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
                            <tr key={`${groupIdx}-${itemIdx}-${unit}`} className="border-b border-white/5 bg-[#07111c] text-xs text-slate-300 transition hover:bg-cyan-500/5 md:text-sm">
                              <td className="border border-white/5 px-1 py-2 text-center text-slate-400">{rowCounter++}</td>
                              {/* Identifikasi */}
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center">{getField(item.bag)}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center">{getField(item.unsr)}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center">{getField(item.bid)}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center">{getField(item.subBid)}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center">{getField(item.subSubBid)}</td>
                              {/* Klasifikasi */}
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center">{getField(item.gol)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center">{getField(item.bidKlasifikasi)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center">{getField(item.kel)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center">{getField(item.subKel)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center">{getField(item.subSubKel)}</td>
                              {/* Jenis, Tipe, Urut */}
                              <td className="border border-white/5 px-1 py-2 text-center">{getJenisLabel(item.jenis)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{getTipeLabel(item.tipe)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{getField(item.urut)}</td>
                              {/* Data Barang */}
                              <td className="min-w-[200px] border border-white/5 px-1 py-2 font-medium text-white">{itemName}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{getField(item.merkType)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{serial}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{getField(item.negaraPembuat)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{getField(item.tahunPembuatan)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{getField(item.tahunPemakaian)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">1</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{getField(item.satuan)}</td>
                              {/* Kondisi */}
                              <td className="border border-white/5 px-1 py-2 text-center text-emerald-300">{getField(item.kondisiB)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center text-yellow-300">{getField(item.rr)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center text-red-300">{getField(item.rb)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center">{getField(item.persen)}</td>
                              {/* Keterangan */}
                              <td className="min-w-[160px] border border-white/5 px-1 py-2">{getField(item.keterangan)}</td>
                              {/* GAMBAR */}
                              <td className="border border-white/5 px-1 py-2 text-center">
                                {unit === 1 && item.gambar ? (
                                  <button
                                    onClick={() => openImageModal(item.gambar)}
                                    className="text-cyan-300 hover:text-cyan-200 transition"
                                    title="Lihat gambar"
                                  >
                                    <FaEye size={16} />
                                  </button>
                                ) : unit === 1 && !item.gambar ? (
                                  "-"
                                ) : (
                                  <span className="text-[10px] text-slate-500">Lihat di atas</span>
                                )}
                              </td>
                              {/* Tanggal pengajuan */}
                              <td className="border border-white/5 px-1 py-2 text-center whitespace-nowrap">{item.tanggalPengajuan}</td>
                              {/* Status */}
                              <td className="border border-white/5 px-1 py-2 text-center">{getStatusBadge(item.status)}</td>
                              {/* Aksi */}
                              <td className="border border-white/5 px-1 py-2 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => updateItemStatus(groupIdx, itemIdx, "Disetujui")}
                                    className="flex items-center gap-1 rounded-md bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/30"
                                    disabled={item.status === "Disetujui"}
                                  >
                                    <FaCheck size={10} /> Diterima
                                  </button>
                                  <button
                                    onClick={() => updateItemStatus(groupIdx, itemIdx, "Ditolak")}
                                    className="flex items-center gap-1 rounded-md bg-red-500/20 px-2 py-1 text-xs font-medium text-red-300 transition hover:bg-red-500/30"
                                    disabled={item.status === "Ditolak"}
                                  >
                                    <FaTimes size={10} /> Ditolak
                                  </button>
                                  <button
                                    onClick={() => handleViewItem(item)}
                                    className="text-cyan-300 transition hover:text-cyan-200"
                                    title="Detail"
                                  >
                                    <FaEye size={14} />
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

      {/* MODAL VIEW DETAIL */}
      {viewingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-cyan-500/10 bg-[#07111c] p-4 md:p-6 shadow-2xl">
            <h2 className="mb-4 text-xl font-bold text-white">Detail Pengajuan</h2>
            <div className="space-y-2 text-sm text-slate-300">
              <p><span className="font-semibold text-cyan-300">Nama Barang:</span> {viewingItem.name}</p>
              <p><span className="font-semibold text-cyan-300">Merk/Type:</span> {viewingItem.merkType || "-"}</p>
              <p><span className="font-semibold text-cyan-300">Jumlah:</span> {viewingItem.jumlah} {viewingItem.satuan}</p>
              <p><span className="font-semibold text-cyan-300">Tanggal Pengajuan:</span> {viewingItem.tanggalPengajuan}</p>
              <p><span className="font-semibold text-cyan-300">Status:</span> {viewingItem.status}</p>
              <p><span className="font-semibold text-cyan-300">Keterangan:</span> {viewingItem.keterangan || "-"}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setViewingItem(null)} className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL GAMBAR */}
      {imageModalUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-3xl w-full rounded-2xl bg-[#07111c] p-2">
            <button
              onClick={() => setImageModalUrl(null)}
              className="absolute -top-3 -right-3 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <FaTimes size={16} />
            </button>
            <img src={imageModalUrl} alt="Preview" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}
    </>
  );
}