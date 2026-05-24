"use client";

import { useMemo, useState } from "react";
import { Archive, Boxes, Building2, Database, ShieldCheck } from "lucide-react";
import MaterilTable, { MaterilGroup, MaterilItem } from "@/app/component/materiltable";
import { dummyMaterilData } from "@/app/dummyData/dummymateriildata";
import TabMaterial from "@/app/component/tabmateril"; // sesuaikan path import

export type TreeNode = {
  id: string;
  title: string;
  code: number[];
  depth: number;
  route: string;
  children: TreeNode[];
};

interface DataKoleksiMaterialProps {
  slug: string;
  activeNode: TreeNode;
}

type MainTab = "aset" | "Habis Pakai";
type SubTab = "bmn" | "nonbmn";

// Helper: konversi kode array ke objek kodefikasi
function buildKodefikasiFromNode(node: TreeNode) {
  const [bag, unsr, bid, subBid, subSubBid, gol] = node.code;
  return {
    bag: bag?.toString() || "",
    unsr: unsr?.toString() || "",
    bid: bid?.toString() || "",
    subBid: subBid?.toString() || "",
    subSubBid: subSubBid?.toString() || "",
    gol: gol?.toString() || "",
    bidKlasifikasi: bid?.toString() || "",
    kel: subBid?.toString() || "",
    subKel: subSubBid?.toString() || "",
    subSubKel: "",
  };
}

// Fungsi untuk mengecek apakah suatu item cocok dengan node
function isItemMatchNode(item: MaterilItem, nodeCode: number[]): boolean {
  const fields = [
    { key: "bag", value: item.bag },
    { key: "unsr", value: item.unsr },
    { key: "bid", value: item.bid },
    { key: "subBid", value: item.subBid },
    { key: "subSubBid", value: item.subSubBid },
    { key: "gol", value: item.gol },
  ];

  for (let i = 0; i < nodeCode.length; i++) {
    const nodeVal = nodeCode[i];
    if (nodeVal === 0 || nodeVal === undefined) continue;
    const fieldVal = fields[i]?.value;
    if (Number(fieldVal) !== nodeVal) return false;
  }
  return true;
}

export default function DataKoleksiMaterial({
  slug,
  activeNode,
}: DataKoleksiMaterialProps) {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("aset");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("bmn");

  const fullData = dummyMaterilData;

  // Filter data berdasarkan node, main tab, dan sub tab
  const filteredData = useMemo(() => {
    if (!activeNode) return [];

    // Tentukan nilai target dari tab aktif
    const targetTipe = activeMainTab === "aset" ? "1" : "2";
    const targetJenis = activeSubTab === "bmn" ? "1" : "2";

    return fullData
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            isItemMatchNode(item, activeNode.code) &&
            item.tipe === targetTipe &&
            item.jenis === targetJenis
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [fullData, activeNode, activeMainTab, activeSubTab]);

  const initialKodefikasi = useMemo(
    () => buildKodefikasiFromNode(activeNode),
    [activeNode]
  );

  const currentMainTab = useMemo(() => {
    return activeMainTab === "aset"
      ? {
          key: "aset",
          title: "Aset Tetap",
          description: "Pengelolaan data aset inventaris permanen.",
          icon: Building2,
        }
      : {
          key: "Habis Pakai",
          title: "Habis Pakai",
          description: "Pengelolaan data material dan stok operasional.",
          icon: Boxes,
        };
  }, [activeMainTab]);

  const currentSubTab = useMemo(() => {
    return activeSubTab === "bmn"
      ? {
          title: "BMN",
          description: "Barang Milik Negara yang terdaftar dalam sistem.",
          badge: "Terintegrasi dengan identifikasi struktur organisasi.",
        }
      : {
          title: "Non BMN",
          description: "Material non inventaris atau non kepemilikan negara.",
          badge: "Data non-BMN untuk kebutuhan administrasi internal.",
        };
  }, [activeSubTab]);

  const MainIcon = currentMainTab.icon;

  // Konfigurasi untuk komponen TabMaterial
  const mainTabsConfig = [
    {
      key: "aset",
      label: "Aset Tetap",
      description: "Inventaris permanen",
      icon: Building2,
    },
    {
      key: "Habis Pakai",
      label: "Habis Pakai",
      description: "Material operasional",
      icon: Archive,
    },
  ];

  const subTabsConfig = [
    {
      key: "bmn",
      label: "BMN",
      description: "Barang Milik Negara yang terdaftar dalam sistem.",
      badge: "Terintegrasi dengan identifikasi struktur organisasi.",
    },
    {
      key: "nonbmn",
      label: "Non BMN",
      description: "Material non inventaris atau non kepemilikan negara.",
      badge: "Data non-BMN untuk kebutuhan administrasi internal.",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-cyan-500/10 bg-linear-to-b from-[#07152b] to-[#08111f] shadow-[0_0_0_1px_rgba(34,211,238,0.04)]">
      {/* HEADER - Responsive */}
      <div className="border-b border-white/5 bg-linear-to-r from-cyan-500/5 via-slate-900 to-cyan-500/5 px-4 py-4 md:px-6 md:py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400">
              <Database size={14} className="md:size-16" />
              <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] md:tracking-[0.25em]">
                Data Koleksi Material
              </span>
            </div>
            <h2 className="mt-2 md:mt-3 text-xl md:text-2xl font-bold tracking-tight text-white">
              Sistem Data Material
            </h2>
            <p className="mt-1 md:mt-2 max-w-2xl text-xs md:text-sm leading-relaxed text-slate-400">
              Monitoring dan pengelolaan data material berdasarkan kategori
              aset, kepemilikan, dan struktur identifikasi organisasi.
            </p>
          </div>

          {/* INFO PANEL - Responsive grid */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            <div className="rounded-xl md:rounded-2xl border border-cyan-500/10 bg-[#08192f] px-3 py-2 md:px-4 md:py-3">
              <div className="text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500">
                Kode Identifikasi
              </div>
              <div className="mt-1 md:mt-2 font-mono text-xs md:text-sm font-semibold text-cyan-300 break-all">
                {slug}
              </div>
            </div>
            <div className="rounded-xl md:rounded-2xl border border-cyan-500/10 bg-[#08192f] px-3 py-2 md:px-4 md:py-3">
              <div className="text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500">
                Node Aktif
              </div>
              <div className="mt-1 md:mt-2 text-xs md:text-sm font-semibold text-white truncate">
                {activeNode.title}
              </div>
            </div>
            <div className="rounded-xl md:rounded-2xl border border-cyan-500/10 bg-[#08192f] px-3 py-2 md:px-4 md:py-3">
              <div className="text-[9px] md:text-[11px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500">
                Level Struktur
              </div>
              <div className="mt-1 md:mt-2 text-xs md:text-sm font-semibold text-emerald-400">
                {activeNode.depth === 1
                  ? "BAGIAN"
                  : activeNode.depth === 2
                  ? "UNSUR"
                  : "SUB BIDANG"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TAB COMPONENT - Reusable */}
      <TabMaterial
        mainTabs={mainTabsConfig}
        activeMainTab={activeMainTab}
        onMainTabChange={(key) => setActiveMainTab(key as MainTab)}
        subTabs={subTabsConfig}
        activeSubTab={activeSubTab}
        onSubTabChange={(key) => setActiveSubTab(key as SubTab)}
      />

      {/* CONTENT */}
      <div className="p-3 md:p-6">
        <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-cyan-500/10 bg-linear-to-br from-[#0b1d35] to-[#081321]">
          {/* TOP SECTION - Responsive */}
          <div className="border-b border-white/5 p-4 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300">
                  <MainIcon size={20} className="md:size-6.5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <h3 className="text-lg md:text-2xl font-bold text-white">
                      {currentMainTab.title}
                    </h3>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] text-emerald-300">
                      {currentSubTab.title}
                    </span>
                  </div>
                  <p className="mt-2 md:mt-3 max-w-2xl text-xs md:text-sm leading-relaxed text-slate-400">
                    {currentMainTab.description}
                  </p>
                </div>
              </div>
              <div className="rounded-xl md:rounded-2xl border border-cyan-500/10 bg-[#08192f] px-3 py-2 md:px-5 md:py-4">
                <div className="flex items-center gap-2 text-cyan-300">
                  <ShieldCheck size={14} className="md:size-[16px]" />
                  <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em]">
                    Status Integrasi
                  </span>
                </div>
                <p className="mt-2 md:mt-3 max-w-sm text-xs md:text-sm leading-relaxed text-slate-400">
                  {currentSubTab.badge}
                </p>
              </div>
            </div>
          </div>

          {/* STATISTIK KARTU - Responsive Grid */}
          <div className="grid gap-3 p-4 md:gap-5 md:p-6 lg:grid-cols-3">
            <div className="rounded-xl md:rounded-2xl border border-white/5 bg-[#071524] p-3 md:p-5">
              <div className="text-[9px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500">
                Struktur Aktif
              </div>
              <div className="mt-2 md:mt-3 text-base md:text-lg font-semibold text-white wrap-break-word">
                {activeNode.title}
              </div>
              <div className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                Node organisasi aktif berdasarkan layer identifikasi material.
              </div>
            </div>
            <div className="rounded-xl md:rounded-2xl border border-white/5 bg-[#071524] p-3 md:p-5">
              <div className="text-[9px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500">
                Kategori Material
              </div>
              <div className="mt-2 md:mt-3 text-base md:text-lg font-semibold text-cyan-300">
                {currentMainTab.title}
              </div>
              <div className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                {currentSubTab.description}
              </div>
            </div>
            <div className="rounded-xl md:rounded-2xl border border-white/5 bg-[#071524] p-3 md:p-5">
              <div className="text-[9px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-slate-500">
                Kode Identifikasi
              </div>
              <div className="mt-2 md:mt-3 font-mono text-sm md:text-lg font-semibold text-emerald-300 uppercase tracking-wide break-all">
                {slug}
              </div>
              <div className="mt-1 md:mt-2 text-xs md:text-sm text-slate-400">
                Kode klasifikasi digunakan untuk integrasi data dan referensi sistem.
              </div>
            </div>
          </div>

          {/* TABEL - Responsive overflow */}
          <div className="border-t border-white/5 p-1">
            <div className="w-full p-2 md:p-4 lg:p-6 overflow-x-auto">
              <MaterilTable
                title="Data Materiil"
                exportFileName="materil"
                year={2025}
                month={1}
                selectedWeek={1}
                data={filteredData}
                setData={() => {}} // read‑only
                initialKodefikasi={initialKodefikasi}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}