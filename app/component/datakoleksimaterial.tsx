"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  Boxes,
  Building2,
  Database,
  ShieldCheck,
  Hash,
  Layers3,
  Network,
} from "lucide-react";
import MaterilTable, {
  MaterilGroup,
  MaterilItem,
} from "@/app/component/materiltable";
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
            item.jenis === targetJenis,
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [fullData, activeNode, activeMainTab, activeSubTab]);

  const initialKodefikasi = useMemo(
    () => buildKodefikasiFromNode(activeNode),
    [activeNode],
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

  const levelLabel =
    activeNode.depth === 1
      ? "BAGIAN"
      : activeNode.depth === 2
        ? "UNSUR"
        : "SUB BIDANG";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-cyan-500/10 bg-linear-to-b from-[#07152b] to-[#08111f] shadow-[0_24px_70px_-35px_rgba(0,0,0,0.85)] md:rounded-3xl">
      {/* Aksen atas */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* HEADER */}
      <div className="border-b border-white/[0.06] bg-linear-to-r from-cyan-500/[0.06] via-slate-900/30 to-cyan-500/[0.06] px-4 py-4 md:px-6 md:py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 text-cyan-400">
              <Database size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] md:text-xs md:tracking-[0.25em]">
                Tabel Koleksi Material
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-white md:mt-3 md:text-2xl">
              Sistem Kodefikasi Material
            </h2>
           
          </div>

          {/* INFO PANEL */}
          <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-3 lg:w-auto lg:min-w-[520px]">
            <InfoCard
              icon={Hash}
              label="Kode Identifikasi"
              value={slug}
              valueClass="font-mono text-cyan-300 break-all"
            />
            <InfoCard
              icon={Network}
              label="Node Aktif"
              value={activeNode.title}
              valueClass="text-white truncate"
            />
            <InfoCard
              icon={Layers3}
              label="Level Struktur"
              value={levelLabel}
              valueClass="text-emerald-400"
            />
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
        className="border-x-0"
      />

      {/* CONTENT */}
      <div className="p-3 md:p-6">
        <div className="overflow-hidden rounded-2xl border border-cyan-500/10 bg-linear-to-br from-[#0b1d35] to-[#081321] md:rounded-3xl">
          {/* TOP SECTION */}
          <div className="border-b border-white/[0.06] p-4 md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 shadow-inner md:h-14 md:w-14 md:rounded-2xl">
                  <MainIcon size={20} className="md:size-6" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <h3 className="text-lg font-bold text-white md:text-2xl">
                      {currentMainTab.title}
                    </h3>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-300 md:px-3 md:py-1 md:text-[11px] md:tracking-[0.2em]">
                      {currentSubTab.title}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-400 md:mt-3 md:text-sm">
                    {currentMainTab.description}
                  </p>
                </div>
              </div>

              <div className="w-full rounded-xl border border-cyan-500/10 bg-[#08192f] px-4 py-3 md:w-auto md:max-w-sm md:rounded-2xl md:px-5 md:py-4">
                <div className="flex items-center gap-2 text-cyan-300">
                  <ShieldCheck size={14} className="md:size-4" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] md:text-xs md:tracking-[0.2em]">
                    Status Integrasi
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 md:mt-3 md:text-sm">
                  {currentSubTab.badge}
                </p>
              </div>
            </div>
          </div>

          {/* STATISTIK KARTU */}
          <div className="grid gap-3 p-4 md:gap-5 md:p-6 lg:grid-cols-3">
            <StatCard
              icon={Network}
              label="Struktur Aktif"
              value={activeNode.title}
              valueClass="text-white break-words"
              note="Node organisasi aktif berdasarkan layer identifikasi material."
            />
            <StatCard
              icon={MainIcon}
              accent="cyan"
              label="Kategori Material"
              value={currentMainTab.title}
              valueClass="text-cyan-300"
              note={currentSubTab.description}
            />
            <StatCard
              icon={Hash}
              accent="emerald"
              label="Kode Identifikasi"
              value={slug}
              valueClass="font-mono uppercase tracking-wide text-emerald-300 break-all"
              note="Kode klasifikasi digunakan untuk integrasi data dan referensi sistem."
            />
          </div>

          {/* TABEL */}
          <div className="border-t border-white/[0.06] p-1">
            <div className="w-full overflow-x-auto p-2 md:p-4 lg:p-6">
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

/* ---------- Sub-komponen presentasional (tanpa logika data) ---------- */

function InfoCard({
  icon: Icon,
  label,
  value,
  valueClass = "",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-cyan-500/10 bg-[#08192f]/80 px-3.5 py-3 transition-colors hover:border-cyan-500/20 md:rounded-2xl">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 ring-1 ring-inset ring-cyan-400/20">
        <Icon size={14} />
      </span>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
          {label}
        </div>
        <div className={`mt-1 text-xs font-semibold md:text-sm ${valueClass}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  note,
  valueClass = "",
  accent = "slate",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  note: string;
  valueClass?: string;
  accent?: "slate" | "cyan" | "emerald";
}) {
  const accentRing =
    accent === "cyan"
      ? "text-cyan-300 ring-cyan-400/20 bg-cyan-500/10"
      : accent === "emerald"
        ? "text-emerald-300 ring-emerald-400/20 bg-emerald-500/10"
        : "text-slate-300 ring-white/10 bg-white/[0.05]";

  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#071524] p-4 transition-colors hover:border-cyan-500/20 md:rounded-2xl md:p-5">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ring-1 ring-inset ${accentRing}`}
        >
          <Icon size={15} />
        </span>
        <span className="text-[9px] uppercase tracking-[0.18em] text-slate-500 md:text-[11px] md:tracking-[0.2em]">
          {label}
        </span>
      </div>
      <div className={`mt-3 text-base font-semibold md:text-lg ${valueClass}`}>
        {value}
      </div>
      <div className="mt-1.5 text-xs leading-relaxed text-slate-400 md:text-sm">
        {note}
      </div>
    </div>
  );
}
