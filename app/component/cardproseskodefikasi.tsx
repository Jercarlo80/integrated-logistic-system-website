// cardproseskodefikasi.tsx
"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, FolderOpen, Table2 } from "lucide-react";
import ProsesKodefikasiTabel, { PengajuanGroup } from "./proseskodefikasitabel";
import Gambar from "../image/PHOTO-2026-05-12-15-59-43.jpg";

// ======================== DUMMY DATA ========================
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
        gambar: Gambar.src,
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
        status: "Menunggu",
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
        status: "Menunggu",
      },
    ],
  },
];

// ======================== DATA UNIT (RAW) ========================
const rawData: { code: number[]; name: string }[] = [
  { code: [1, 3, 1, 1, 0, 0], name: "UNSUR PIMPINAN" },
  { code: [1, 3, 1, 2, 1, 0], name: "SOPS" },
  { code: [1, 3, 1, 2, 2, 0], name: "SMIN" },
  { code: [1, 3, 1, 3, 1, 0], name: "SEKRETARIAT" },
  { code: [1, 3, 1, 3, 2, 0], name: "KOMPI MARKAS" },
  { code: [1, 3, 1, 4, 1, 0], name: "DISKOM" },
  { code: [1, 3, 1, 4, 2, 0], name: "DISLEK" },
  { code: [1, 3, 1, 4, 3, 0], name: "DISPERNIKA" },
  { code: [1, 3, 1, 4, 4, 0], name: "DENKOMYANLAP" },
  { code: [1, 3, 1, 4, 5, 0], name: "DENKOMLAOPS" },
  { code: [1, 3, 1, 4, 6, 0], name: "DENPERNIKA" },
  { code: [1, 3, 1, 4, 7, 0], name: "DENKONHARSTAL" },
  { code: [1, 3, 1, 4, 8, 0], name: "DENGUDBEK" },
  { code: [1, 3, 1, 4, 9, 0], name: "DENKOMSAT" },
  { code: [1, 3, 1, 4, 10, 0], name: "DENKOMLEKSTRADA BANDA ACEH" },
  { code: [1, 3, 1, 4, 11, 0], name: "SUBDEN LHOKSEUMAWE" },
  { code: [1, 3, 1, 4, 12, 0], name: "SUBDEN MEULABOH" },
  { code: [1, 3, 1, 4, 13, 0], name: "SUBDEN SABANG" },
  { code: [1, 3, 1, 4, 14, 0], name: "DENKOMLEKSTRADA MEDAN" },
  { code: [1, 3, 1, 4, 15, 0], name: "SUBDEN PADANG" },
  { code: [1, 3, 1, 4, 16, 0], name: "SUBDEN PEKANBARU" },
  { code: [1, 3, 1, 4, 17, 0], name: "SUBDEN TANJUNG PINANG" },
  { code: [1, 3, 1, 4, 18, 0], name: "DENKOMLEKSTRADA PALEMBANG" },
  { code: [1, 3, 1, 4, 19, 0], name: "DENKOMLEKSTRADA BANDUNG" },
  { code: [1, 3, 1, 4, 20, 0], name: "DENKOMLEKSTRADA SEMARANG" },
  { code: [1, 3, 1, 4, 21, 0], name: "SUBDEN YOGYAKARTA" },
  { code: [1, 3, 1, 4, 22, 0], name: "DENKOMLEKSTRADA SURABAYA" },
  { code: [1, 3, 1, 4, 23, 0], name: "SUBDEN MADIUN" },
  { code: [1, 3, 1, 4, 24, 0], name: "SUBDEN MALANG" },
  { code: [1, 3, 1, 4, 25, 0], name: "DENKOMLEKSTRADA BALIKPAPAN" },
  { code: [1, 3, 1, 4, 26, 0], name: "SUBDEN BANJARMASIN" },
  { code: [1, 3, 1, 4, 27, 0], name: "DENKOMLEKSTRADA PONTIANAK" },
  { code: [1, 3, 1, 4, 28, 0], name: "DENKOMLEKSTRADA MAKASSAR" },
  { code: [1, 3, 1, 4, 29, 0], name: "DENKOMLEKSTRADA MANADO" },
  { code: [1, 3, 1, 4, 30, 0], name: "DENKOMLEKSTRADA DENPASAR" },
  { code: [1, 3, 1, 4, 31, 0], name: "SUBDEN KUPANG" },
  { code: [1, 3, 1, 4, 32, 0], name: "SUBDEN ATAMBUA" },
  { code: [1, 3, 1, 4, 33, 0], name: "DENKOMLEKSTRADA AMBON" },
  { code: [1, 3, 1, 4, 34, 0], name: "DENKOMLEKSTRADA JAYAPURA" },
  { code: [1, 3, 1, 4, 35, 0], name: "SUBDEN SENTANI" },
  { code: [1, 3, 1, 4, 36, 0], name: "SUBDEN BIAK" },
  { code: [1, 3, 1, 4, 37, 0], name: "DENKOMLEKSTRADA SORONG" },
];

const formatKode = (code: number[]) => code.join(".");
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};
const getRandomDate = (seed: number) => {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + seededRandom(seed) * (end.getTime() - start.getTime()));
  return randomDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};
const getSektorName = (subBid: number) => {
  switch (subBid) {
    case 1: return "Pimpinan Satkomlek TNI";
    case 2: return "Pembantu Satkomlek TNI";
    case 3: return "Pelayanan Satkomlek TNI";
    case 4: return "Pelaksana Satkomlek TNI";
    default: return "-";
  }
};

type Unit = {
  id: string;
  code: number[];
  title: string;
  sektorName: string;
  date: string;
};

const buildUnitsData = (): Unit[] =>
  rawData.map((item, index) => ({
    id: `unit-${index}`,
    code: item.code,
    title: item.name,
    sektorName: getSektorName(item.code[3]),
    date: getRandomDate(index + 1),
  }));

// ========== PROPS UNTUK UNITITEM ==========
interface UnitItemProps {
  unit: Unit;
  isExpanded: boolean;
  onToggle: () => void;
  badgeCount: number;
  pengajuanData: PengajuanGroup[];
  onDataChange: (newData: PengajuanGroup[]) => void;
}

function UnitItem({ 
  unit, 
  isExpanded, 
  onToggle, 
  badgeCount,
  pengajuanData,
  onDataChange
}: UnitItemProps) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 to-slate-800/60 backdrop-blur-md overflow-hidden shadow-lg transition-all duration-300 hover:border-cyan-400/40 hover:shadow-cyan-500/10">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-4 py-4 md:px-6 md:py-5 text-left transition-all">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <FolderOpen size={22} className="text-cyan-400 shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-sm md:text-base lg:text-lg font-semibold text-slate-100 truncate">{unit.title}</h3>
              {/* BADGE: muncul untuk semua card, dengan warna berbeda jika >0 */}
              <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full shadow-md ${
                badgeCount > 0 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gray-600 text-gray-300'
              }`}>
                {badgeCount}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 text-[11px] md:text-xs text-slate-400">
              <div><span className="text-slate-500">Kode :</span> {formatKode(unit.code)}</div>
              <div><span className="text-slate-500">Sektor :</span> {unit.sektorName}</div>
              <div><span className="text-slate-500">Diperbarui :</span> {unit.date}</div>
            </div>
          </div>
        </div>
        <div className="ml-4 shrink-0">
          {isExpanded ? <ChevronDown className="text-cyan-400" size={20} /> : <ChevronRight className="text-slate-400" size={20} />}
        </div>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-cyan-500/20 bg-slate-900/40 px-4 py-4 md:px-6">
          <div className="flex items-center gap-2 mb-4">
            <Table2 size={18} className="text-cyan-400" />
            <span className="text-cyan-300 font-medium">Proses Kodefikasi</span>
          </div>
          <div className="w-full max-h-[70vh] overflow-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50">
            <ProsesKodefikasiTabel 
              data={pengajuanData} 
              onDataChange={onDataChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CardProsesKodefikasi() {
  const unitsData = useMemo(() => buildUnitsData(), []);
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [pengajuanData, setPengajuanData] = useState<PengajuanGroup[]>(dummyPengajuanData);

  const getTotalQuantityBySubBid = (subBid: number): number => {
    let total = 0;
    for (const group of pengajuanData) {
      for (const item of group.items) {
        if (Number(item.subBid) === subBid) {
          total += item.jumlah ?? 1;
        }
      }
    }
    return total;
  };

  const toggleUnit = (id: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#020617] px-4 py-4 md:px-6 lg:px-8 xl:px-10">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto">
        <div className="space-y-4 lg:space-y-5">
          {unitsData.map((unit) => {
            const subBid = unit.code[3];
            const badgeCount = getTotalQuantityBySubBid(subBid);
            return (
              <Fragment key={unit.id}>
                <UnitItem
                  unit={unit}
                  isExpanded={expandedUnits.has(unit.id)}
                  onToggle={() => toggleUnit(unit.id)}
                  badgeCount={badgeCount}
                  pengajuanData={pengajuanData}
                  onDataChange={setPengajuanData}
                />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}