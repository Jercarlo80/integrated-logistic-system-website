"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Database,
  Layers3,
  ShieldCheck,
  Network,
  FileSearch,
} from "lucide-react";
import DataKoleksiMaterial from "@/app/component/datakoleksimaterial";
import {
  parseTree,
  findNodeBySlug,
  getLevelLabel,
  RAW_IDENTIFIKASI,
} from "@/app/identifikasidata"; // atau '@/lib/identifikasiData', sesuaikan

interface LayerProps {
  slug: string; // ⬅️ sekarang hanya string, bukan params
}

export default function Layer({ slug }: LayerProps) {
  const router = useRouter();

  const treeData = useMemo(() => parseTree(RAW_IDENTIFIKASI), []);
  const activeNode = useMemo(
    () => findNodeBySlug(treeData, slug),
    [treeData, slug]
  );

  if (!activeNode) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#020617] p-4 md:p-6">
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 p-8 text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/20 bg-rose-500/10 text-rose-300">
            <FileSearch size={26} />
          </div>
          <h1 className="text-xl font-bold text-white md:text-2xl">
            Data tidak ditemukan
          </h1>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
            Path identifikasi yang dibuka tidak tersedia di data tree.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const currentCode = activeNode.code.filter((n) => n !== 0).join(" • ");
  const codeSegments = activeNode.code.filter((n) => n !== 0);

  return (
    <div className="min-h-screen overflow-hidden bg-[#020617] text-slate-100">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,black,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] p-4 md:p-6">
        {/* HEADER CARD */}
        <div className="relative mb-5 overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl md:mb-6">
          {/* Aksen atas */}
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-400/50 to-transparent" />

          <div className="border-b border-slate-800 bg-linear-to-r from-cyan-500/10 to-blue-500/10 px-4 py-5 md:px-6">
            {/* Toolbar: kembali + level */}
            <div className="mb-4 flex items-center justify-between gap-3">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/40 hover:bg-slate-800 md:rounded-2xl md:px-5 md:py-2.5"
              >
                <ArrowLeft size={16} className="md:size-[18px]" />
                Kembali
              </button>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-300 md:text-[11px] md:tracking-[0.2em]">
                <Layers3 size={12} />
                {getLevelLabel(activeNode.depth)}
              </span>
            </div>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-cyan-300 md:text-xs">
                  <ShieldCheck size={14} />
                  IDENTIFIKASI MATERIAL
                </div>
                <h1 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                  DATA KOLEKSI MATERIAL
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                  Halaman layer identifikasi material berdasarkan struktur
                  kodefikasi organisasi TNI.
                </p>
              </div>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid gap-4 border-t border-slate-800 bg-slate-950/70 p-4 md:grid-cols-3 md:p-6">
            {/* Kode identifikasi sebagai rangkaian chip */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-5">
              <div className="mb-2.5 flex items-center gap-2 text-slate-400">
                <Database size={15} />
                <span className="text-[11px] font-medium tracking-[0.15em]">
                  KODE IDENTIFIKASI
                </span>
              </div>
              {codeSegments.length > 0 ? (
                <div className="flex flex-wrap items-center gap-1.5">
                  {codeSegments.map((seg, i) => (
                    <span
                      key={i}
                      className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 font-mono text-sm font-bold tracking-wider text-cyan-300"
                    >
                      {seg}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="font-mono text-lg font-black tracking-widest text-cyan-300">
                  {currentCode || "—"}
                </div>
              )}
            </div>

            {/* Path aktif */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-5">
              <div className="mb-2.5 flex items-center gap-2 text-slate-400">
                <Network size={15} />
                <span className="text-[11px] font-medium tracking-[0.15em]">
                  PATH AKTIF
                </span>
              </div>
              <div className="text-sm font-semibold uppercase leading-snug tracking-wide text-slate-100">
                {activeNode.title}
              </div>
            </div>

            {/* Level struktur */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 md:p-5">
              <div className="mb-2.5 flex items-center gap-2 text-slate-400">
                <Layers3 size={15} />
                <span className="text-[11px] font-medium tracking-[0.15em]">
                  LEVEL STRUKTUR
                </span>
              </div>
              <div className="text-lg font-bold uppercase tracking-wide text-emerald-300">
                {getLevelLabel(activeNode.depth)}
              </div>
            </div>
          </div>
        </div>

        {/* DATA KOLEKSI MATERIAL — tanpa pembungkus kartu ganda */}
        <DataKoleksiMaterial slug={slug} activeNode={activeNode} />
      </div>
    </div>
  );
}