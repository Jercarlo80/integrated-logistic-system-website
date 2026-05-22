"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Database, Layers3, ShieldCheck } from "lucide-react";
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
      <div className="min-h-screen w-full bg-gray-950 p-4 md:p-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h1 className="text-2xl font-bold text-white">
            Data tidak ditemukan
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Path identifikasi yang dibuka tidak tersedia di data tree.
          </p>
          <button
            onClick={() => router.back()}
            className="mt-4 rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const currentCode = activeNode.code
    .filter((n) => n !== 0)
    .join(" • ");

  return (
    <div className="min-h-screen overflow-hidden bg-[#020617] text-slate-100">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* HEADER CARD */}
      <div className="relative z-10 p-4 md:p-6">
        <div className="mb-6 overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl">
          <div className="border-b border-slate-800 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-6 py-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold tracking-[0.15em] text-cyan-300">
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
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-cyan-500/40 hover:bg-slate-800"
              >
                <ArrowLeft size={18} />
                Kembali
              </button>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-800 bg-slate-950/70 p-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <Database size={16} />
                <span className="text-[11px] font-medium tracking-[0.15em]">
                  KODE IDENTIFIKASI
                </span>
              </div>
              <div className="text-lg font-black tracking-widest text-cyan-300">
                {currentCode}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="mb-2 flex items-center gap-2 text-slate-400">
                <Layers3 size={16} />
                <span className="text-[11px] font-medium tracking-[0.15em]">
                  PATH AKTIF
                </span>
              </div>
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                {activeNode.title}
              </div>
            </div>
          </div>
        </div>

        {/* INFORMASI LAYER */}
        <div className="mb-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-3 text-lg font-bold text-white">Informasi Layer</h2>
          <div className="space-y-3 text-sm leading-7 text-slate-400">
            <p>
              Sistem berhasil melakukan keterhubungan identifikasi berdasarkan
              kode struktur organisasi.
            </p>
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 font-mono text-cyan-300">
              {slug}
            </div>
            <p>
              Node aktif:{" "}
              <span className="font-semibold text-cyan-300">
                {activeNode.title}
              </span>
            </p>
            <p>
              Level aktif:{" "}
              <span className="font-semibold text-cyan-300">
                {getLevelLabel(activeNode.depth)}
              </span>
            </p>
          </div>
        </div>

        {/* DATA KOLEKSI MATERIAL */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-6 text-lg font-bold text-white">
            Data Koleksi Material
          </h2>
          <DataKoleksiMaterial slug={slug} activeNode={activeNode} />
        </div>
      </div>
    </div>
  );
}