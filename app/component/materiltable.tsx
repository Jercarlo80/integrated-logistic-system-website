"use client";

import React, { useState } from "react";
import { FaTrash, FaFilePdf, FaFileExcel, FaEdit, FaEye } from "react-icons/fa";
import DetailBarang from "@/app/detailpenyimpanan/detailbarang";

// ======================== TYPE DEFINITIONS ========================

export type MaterilItem = {
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
  updateTanggal?: string;
  konseptor?: string;
  subGroups?: any[];
  tanggal_masuk?: string;
  qrCode?: string;
  kategoriDetail?: "bmn" | "nonBmn" | "persediaanBmn" | "persediaanNonBmn";
};

export type MaterilGroup = {
  romawi: string;
  title: string;
  items: MaterilItem[];
};

export type DeletedItemRecord = {
  id: string;
  groupRomawi: string;
  groupTitle: string;
  item: MaterilItem;
  deletedBy: string;
  deletedAt: string;
  subGroups?: any[];
};

type Props = {
  title: string;
  exportFileName: string;
  year: number;
  month: number;
  selectedWeek: number;
  data?: MaterilGroup[];
  setData: React.Dispatch<React.SetStateAction<MaterilGroup[]>>;
  onDeleteMateril?: (items: DeletedItemRecord[]) => void;
  initialKodefikasi?: {
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
  };
};

// ======================== DUMMY ========================
const dummyMaterilData: MaterilGroup[] = [];

// ======================== COMPONENT ========================

export default function MaterilTable({
  title,
  exportFileName,
  year,
  month,
  selectedWeek,
  data = dummyMaterilData,
  setData,
  onDeleteMateril,
  initialKodefikasi,
}: Props) {
  const [editingItem, setEditingItem] = useState<{
    groupIdx: number;
    itemIdx: number;
    item: MaterilItem;
  } | null>(null);

  const [viewingItem, setViewingItem] = useState<{
    groupIdx: number;
    itemIdx: number;
    item: MaterilItem;
  } | null>(null);

  const [imageModal, setImageModal] = useState<{ gambar: string } | null>(null);

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];

  const formattedDate = (() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    return `${day} • ${monthNames[month]} • ${year}`;
  })();

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

  // ======================== CRUD ========================
  const handleDeleteItem = (groupIdx: number, itemIdx: number) => {
    const updated = [...data];
    updated[groupIdx].items = updated[groupIdx].items.filter((_, i) => i !== itemIdx);
    setData(updated);
  };

  const handleEditItem = (groupIdx: number, itemIdx: number, item: MaterilItem) => {
    setEditingItem({ groupIdx, itemIdx, item: { ...item } });
  };

  const handleViewItem = (groupIdx: number, itemIdx: number, item: MaterilItem) => {
    setViewingItem({ groupIdx, itemIdx, item: { ...item } });
  };

  const handleUpdateItem = (updatedItem: MaterilItem) => {
    if (!editingItem) return;
    const updated = [...data];
    const { groupIdx, itemIdx } = editingItem;
    updated[groupIdx].items[itemIdx] = updatedItem;
    setData(updated);
    setEditingItem(null);
  };

  // ======================== RENDER ========================
  // Set untuk melacak gambar yang sudah ditampilkan thumbnail
  const shownGambarSet = new Set<string>();

  return (
    <>
      <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-cyan-500/10 bg-[#07111c] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
        {/* HEADER */}
        <div className="border-b border-white/5 bg-gradient-to-r from-[#08192f] to-[#071624] px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg md:text-xl font-bold tracking-tight text-white">{title}</h2>
              <p className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                {formattedDate} • Minggu ke-{selectedWeek}
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
                {/* HEADER GROUP */}
                <tr className="bg-[#08192f] text-[9px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.15em]">
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 md:px-3 md:py-4 text-center text-cyan-300">No</th>
                  <th colSpan={5} className="border border-white/5 bg-cyan-900/30 px-1 py-2 text-center text-cyan-200 md:px-3 md:py-4"><span>🔍</span> Identifikasi</th>
                  <th colSpan={5} className="border border-white/5 bg-purple-900/30 px-1 py-2 text-center text-purple-200 md:px-3 md:py-4"><span>🏷️</span> Klasifikasi</th>
                  <th colSpan={3} className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-4">Jenis</th>
                  <th colSpan={6} className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-4">Data Barang</th>
                  <th colSpan={2} className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-4">Satuan</th>
                  <th colSpan={4} className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-4">Kondisi</th>
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-4">Keterangan</th>
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-4">Gambar</th>
                  <th colSpan={2} className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-4">Update</th>
                  <th rowSpan={2} className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-4">Aksi</th>
                </tr>
                {/* SUB HEADER */}
                <tr className="bg-[#0b213b] text-[9px] text-slate-300 md:text-[11px]">
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200 md:px-3 md:py-3">BAG</th>
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200 md:px-3 md:py-3">UNSR</th>
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200 md:px-3 md:py-3">BID</th>
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200 md:px-3 md:py-3">SUB BID</th>
                  <th className="border border-white/5 bg-cyan-900/20 px-1 py-2 text-center text-cyan-200 md:px-3 md:py-3">SUB SUB BID</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200 md:px-3 md:py-3">GOL</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200 md:px-3 md:py-3">BID</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200 md:px-3 md:py-3">KEL</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200 md:px-3 md:py-3">SUB KEL</th>
                  <th className="border border-white/5 bg-purple-900/20 px-1 py-2 text-center text-purple-200 md:px-3 md:py-3">SUB SUB KEL</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">JENIS</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">TIPE</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">URUT</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">NAMA BARANG</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">MERK/TYPE</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">NOMOR SERI</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">NEGARA PEMBUAT</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">THN PEMBUATAN</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">THN PEMAKAIAN</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">JUMLAH</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">SAT</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">B</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">RR</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">RB</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">%</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">TANGGAL</th>
                  <th className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">KONSEPTOR</th>
                </tr>
              </thead>

              <tbody>
                {data.map((group, groupIdx) => {
                  let rowCounter = 1;
                  return (
                    <React.Fragment key={`${group.romawi}-${groupIdx}`}>
                      <tr className="bg-gradient-to-r from-cyan-500/10 to-transparent">
                        <td colSpan={30} className="border border-cyan-500/10 px-3 py-2 text-xs font-bold tracking-wide text-cyan-300 md:px-5 md:py-3 md:text-sm">
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
                            <tr key={`${groupIdx}-${itemIdx}-${unit}`} className="border-b border-white/[0.03] bg-[#07111c] text-xs text-slate-300 transition hover:bg-cyan-500/[0.03] md:text-sm">
                              <td className="border border-white/5 px-1 py-2 text-center text-slate-400 md:px-3 md:py-3">{rowCounter++}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.bag)}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.unsr)}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.bid)}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.subBid)}</td>
                              <td className="border border-white/5 bg-cyan-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.subSubBid)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.gol)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.bidKlasifikasi)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.kel)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.subKel)}</td>
                              <td className="border border-white/5 bg-purple-900/10 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.subSubKel)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getJenisLabel(item.jenis)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getTipeLabel(item.tipe)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.urut)}</td>
                              <td className="min-w-[200px] border border-white/5 px-1 py-2 font-medium text-white md:min-w-[260px] md:px-3 md:py-3">{itemName}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.merkType)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{serial}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.negaraPembuat)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.tahunPembuatan)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.tahunPemakaian)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">1</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.satuan)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center text-emerald-300 md:px-3 md:py-3">{getField(item.kondisiB)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center text-yellow-300 md:px-3 md:py-3">{getField(item.rr)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center text-red-300 md:px-3 md:py-3">{getField(item.rb)}</td>
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.persen)}</td>
                              <td className="min-w-[160px] border border-white/5 px-1 py-2 md:min-w-[220px] md:px-3 md:py-3">{getField(item.keterangan)}</td>
                              
                              {/* KOLOM GAMBAR dengan deduplikasi & error handling */}
                              <td className="border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">
                                {(() => {
                                  if (!item.gambar) {
                                    return <span className="text-slate-500">-</span>;
                                  }
                                  if (!shownGambarSet.has(item.gambar)) {
                                    shownGambarSet.add(item.gambar);
                                    return (
                                      <img
                                        src={item.gambar}
                                        alt="gambar"
                                        className="mx-auto h-10 w-10 rounded-lg object-cover md:h-14 md:w-14 md:rounded-xl"
                                        onError={(e) => {
                                          // Jika gambar gagal dimuat, tampilkan placeholder
                                          const target = e.currentTarget;
                                          target.style.display = "none";
                                          const parent = target.parentElement;
                                          if (parent) {
                                            const span = document.createElement("span");
                                            span.className = "text-red-400 text-xs";
                                            span.innerText = "❌";
                                            parent.appendChild(span);
                                          }
                                        }}
                                      />
                                    );
                                  } else {
                                    return (
                                      <button
                                        onClick={() => setImageModal({ gambar: item.gambar! })}
                                        className="text-cyan-300 transition hover:text-cyan-200"
                                      >
                                        <FaEye size={20} />
                                      </button>
                                    );
                                  }
                                })()}
                              </td>

                              <td className="whitespace-nowrap border border-white/5 px-1 py-2 text-center md:px-3 md:py-3">{getField(item.updateTanggal)}</td>
                              <td className="border border-white/5 px-1 py-2 md:px-3 md:py-3">{getField(item.konseptor)}</td>
                              <td className="border border-white/5 px-1 py-2 md:px-3 md:py-3">
                                <div className="flex items-center justify-center gap-2 md:gap-3">
                                  <button onClick={() => handleViewItem(groupIdx, itemIdx, item)} className="text-cyan-300 transition hover:text-cyan-200"><FaEye /></button>
                                  <button onClick={() => handleEditItem(groupIdx, itemIdx, item)} className="text-yellow-300 transition hover:text-yellow-200"><FaEdit /></button>
                                  <button onClick={() => handleDeleteItem(groupIdx, itemIdx)} className="text-red-300 transition hover:text-red-200"><FaTrash /></button>
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

      {/* MODAL EDIT */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-2xl md:rounded-3xl border border-cyan-500/10 bg-[#07111c] p-4 md:p-6 shadow-2xl">
            <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold text-white">Edit Item</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateItem(editingItem.item); }}>
              <div className="grid grid-cols-1 gap-4 md:gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-1 md:mb-2 block text-xs md:text-sm font-medium text-slate-300">Nama Barang</label>
                  <input type="text" value={editingItem.item.name} onChange={(e) => setEditingItem(prev => prev ? { ...prev, item: { ...prev.item, name: e.target.value } } : prev)} className="w-full rounded-lg md:rounded-xl border border-white/10 bg-[#0b1727] px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white outline-none transition focus:border-cyan-400" />
                </div>
                <div>
                  <label className="mb-1 md:mb-2 block text-xs md:text-sm font-medium text-slate-300">Merk / Type</label>
                  <input type="text" value={editingItem.item.merkType || ""} onChange={(e) => setEditingItem(prev => prev ? { ...prev, item: { ...prev.item, merkType: e.target.value } } : prev)} className="w-full rounded-lg md:rounded-xl border border-white/10 bg-[#0b1727] px-3 py-2 md:px-4 md:py-3 text-sm md:text-base text-white outline-none transition focus:border-cyan-400" />
                </div>
              </div>
              <div className="mt-6 md:mt-8 flex justify-end gap-2 md:gap-3">
                <button type="button" onClick={() => setEditingItem(null)} className="rounded-lg md:rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm text-slate-300 transition hover:bg-white/10">Batal</button>
                <button type="submit" className="rounded-lg md:rounded-xl bg-cyan-500 px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-black transition hover:bg-cyan-400">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL BARANG */}
      {viewingItem && <DetailBarang item={viewingItem.item} onClose={() => setViewingItem(null)} />}

      {/* MODAL GAMBAR POPUP */}
      {imageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setImageModal(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setImageModal(null)} className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300">×</button>
            <img src={imageModal.gambar} alt="Preview" className="w-full h-auto rounded-lg shadow-2xl" />
          </div>
        </div>
      )}
    </>
  );
}