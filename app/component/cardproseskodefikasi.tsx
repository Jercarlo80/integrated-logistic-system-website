"use client";

import { Fragment, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  FolderOpen,
  Table2,
} from "lucide-react";
import ProsesKodefikasiTabel from "./proseskodefikasitabel";

type Message = {
  id: number;
  title: string;
  file: string;
};

type Unit = {
  id: string;
  code: number[];
  title: string;
  date: string;
  messages: Message[];
};

type Sektor = {
  sektorName: string;
  units: Unit[];
};

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
  { code: [1, 3, 1, 4, 28, 0], name: "DENKOMLEKSTRADA MAKASAR" },
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

const formatKode = (code: number[]) => code.map((n) => String(n)).join(" ");

const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

const getRandomDate = (seed: number) => {
  const start = new Date(2025, 0, 1);
  const end = new Date();
  const rand = seededRandom(seed);
  const randomDate = new Date(
    start.getTime() + rand * (end.getTime() - start.getTime()),
  );
  return randomDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getDummyMessages = (unitName: string, idx: number): Message[] => {
  const count = (Math.floor(seededRandom(idx + 1) * 3) % 3) + 1;
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Dokumen ${String.fromCharCode(65 + i)} - ${unitName}`,
    file: `/files/${unitName.replace(/\s/g, "_")}_${idx}_${i + 1}.pdf`,
  }));
};

const buildSektorData = (): Sektor[] => {
  const sektorMap = new Map<number, { name: string; units: Unit[] }>();

  for (let i = 0; i < rawData.length; i++) {
    const item = rawData[i];
    const subBid = item.code[3];

    let sektorName = "";
    if (subBid === 1) sektorName = "Pimpinan Satkomlek TNI";
    else if (subBid === 2) sektorName = "Pembantu Satkomlek TNI";
    else if (subBid === 3) sektorName = "Pelayanan Satkomlek TNI";
    else if (subBid === 4) sektorName = "Pelaksana Satkomlek TNI";
    else continue;

    if (!sektorMap.has(subBid)) {
      sektorMap.set(subBid, { name: sektorName, units: [] });
    }

    const unit: Unit = {
      id: `${subBid}-${i}`,
      code: item.code,
      title: item.name,
      date: getRandomDate(i + 1),
      messages: getDummyMessages(item.name, i),
    };

    sektorMap.get(subBid)!.units.push(unit);
  }

  return Array.from(sektorMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, value]) => ({
      sektorName: value.name,
      units: value.units,
    }));
};

interface UnitItemProps {
  unit: Unit;
  isExpanded: boolean;
  onToggle: () => void;
}

function UnitItem({ unit, isExpanded, onToggle }: UnitItemProps) {
  return (
    <div className="border-b border-slate-700/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-slate-800/30 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <FolderOpen size={18} className="text-cyan-400" />
          <div>
            <div className="text-sm font-medium text-slate-200">
              {unit.title}
            </div>
            <div className="text-xs text-slate-500">
              Diperbarui: {unit.date}
            </div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown size={16} className="text-slate-400" />
        ) : (
          <ChevronRight size={16} className="text-slate-400" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-3 pt-0 bg-slate-900/30 rounded-b-lg">
          <div className="text-xs font-semibold text-cyan-300 mb-2 flex items-center gap-1">
            <FileText size={12} /> Dokumen Terkait
          </div>

          {unit.messages.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Tidak ada dokumen</p>
          ) : (
            <ul className="space-y-1">
              {unit.messages.map((msg) => (
                <li
                  key={msg.id}
                  className="text-xs text-slate-300 flex items-center gap-2"
                >
                  <span className="text-cyan-400">📄</span>
                  <span>{msg.title}</span>
                  <span className="text-slate-500 text-[10px]">
                    ({msg.file})
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

interface CardSektorProps {
  sektorName: string;
  units: Unit[];
}

function CardSektor({ sektorName, units }: CardSektorProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());

  const toggleUnit = (unitId: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      if (next.has(unitId)) next.delete(unitId);
      else next.add(unitId);
      return next;
    });
  };

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 to-slate-800/40 backdrop-blur-sm overflow-hidden shadow-lg">
      <div className="bg-cyan-500/10 px-5 py-3 border-b border-cyan-500/20">
        <h3 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
          <span className="w-1.5 h-5 bg-cyan-400 rounded-full" />
          {sektorName}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {units.length} unit organisasi
        </p>
      </div>

      <div className="divide-y divide-slate-700/30">
        {units.map((unit) => (
          <UnitItem
            key={unit.id}
            unit={unit}
            isExpanded={expandedUnits.has(unit.id)}
            onToggle={() => toggleUnit(unit.id)}
          />
        ))}
      </div>

      <div className="border-t border-cyan-500/20 p-4 h-150 overflow-y-scroll">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-cyan-300">
          <Table2 size={16} />
          Proses Kodefikasi Tabel
        </div>
        {/* Perbaikan: hapus props karena komponen ProsesKodefikasiTabel tidak menerima props */}
        <ProsesKodefikasiTabel />
      </div>
    </div>
  );
}

export default function CardProsesKodefikasi() {
  const sektorData = useMemo(() => buildSektorData(), []);

  return (
    <div className="w-full min-h-screen bg-[#020617] p-4 md:p-6">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px]" />
      </div>

      <div className="relative z-10">
        <div className="w-full flex flex-col gap-6">
          {sektorData.map((sektor, idx) => (
            <Fragment key={idx}>
              <CardSektor sektorName={sektor.sektorName} units={sektor.units} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}