"use client";

import { FolderOpen } from "lucide-react";

// Data unit dari soal
const units = [
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

function formatCode(code: number[]): string {
  return code.join(".");
}

export default function Layer() {
  return (
    <div className="w-full min-h-screen bg-[#020617] text-slate-100 p-4 md:p-6">
      {/* Background gelap (opsional) */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px]" />
      </div>

      <h1 className="text-xl md:text-2xl font-bold text-gray-100 mb-6">
        Laporan
      </h1>

      {/* Grid card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {units.map((unit, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-4 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
          >
            <div className="flex items-start gap-3">
              <FolderOpen className="h-8 w-8 text-cyan-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm md:text-base text-slate-100 break-words">
                  {unit.name}
                </h3>
                <p className="text-[11px] md:text-xs text-slate-400 font-mono mt-1">
                  {formatCode(unit.code)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}