// app/component/datakoleksimaterial.tsx (CardIdentifikasi)
"use client";

import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Layers3,
  ShieldCheck,
  FolderTree,
  Radar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import MABESTNI from "../image/MABESTNI.png";
import SatkomlekLogo from "../image/satkomlekLogo.png";
import {
  parseTree,
  TreeNode,
  getLevelLabel,
  RAW_IDENTIFIKASI,
} from "@/app/identifikasidata";

const LOGO_MAP: Record<string, StaticImageData> = {
  "MARKAS BESAR TNI": MABESTNI,
  "SATUAN KOMUNIKASI DAN ELEKTRONIKA TNI": SatkomlekLogo,
};

type TreeItemProps = {
  node: TreeNode;
};

function TreeItem({ node }: TreeItemProps) {
  const router = useRouter();
  const [open, setOpen] = useState(node.depth <= 2);
  const hasChildren = node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
      return;
    }
    router.push(node.route);
  };

  const indentClass =
    node.depth === 1
      ? "pl-0"
      : node.depth === 2
        ? "pl-2 sm:pl-3"
        : node.depth === 3
          ? "pl-4 sm:pl-6"
          : node.depth === 4
            ? "pl-6 sm:pl-9"
            : "pl-8 sm:pl-12";

  const logoImage = LOGO_MAP[node.title];
  const hasCustomLogo = !!logoImage;

  // Tampilkan kode dengan titik sebagai pemisah, tetap dengan semua digit
  const codeString = node.code.join(".");

  return (
    <div className={`relative ${indentClass}`}>
      <button
        type="button"
        onClick={handleClick}
        className={[
          "group relative flex w-full flex-col items-start gap-3 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-all duration-300 sm:flex-row sm:items-center sm:gap-4 sm:px-5",
          "border-slate-800 bg-linear-to-r from-slate-950 via-slate-900 to-slate-900",
          "hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)]",
          "hover:-translate-y-px",
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-y-0 left-0 w-[4px]",
            node.depth === 1
              ? "bg-cyan-400"
              : node.depth === 2
                ? "bg-blue-400"
                : node.depth === 3
                  ? "bg-indigo-400"
                  : "bg-slate-500",
          ].join(" ")}
        />

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-cyan-300 shadow-inner sm:h-14 sm:w-14">
          {hasCustomLogo ? (
            <Image
              src={logoImage}
              alt={node.title}
              width={50}
              height={50}
              className="h-9 w-9 object-contain sm:h-10 sm:w-10"
            />
          ) : (
            <Layers3 size={18} className="sm:size-5" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-semibold tracking-[0.15em] text-cyan-300 sm:text-[11px]">
              {getLevelLabel(node.depth)}
            </span>

            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[10px] font-medium tracking-wide text-slate-300 sm:text-[11px]">
              {codeString}
            </span>

            {!hasChildren && (
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-300 sm:text-[11px]">
                IDENTIFIKASI AKTIF
              </span>
            )}
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-100 break-words leading-snug sm:text-sm">
            {node.title}
          </h3>

          <p className="mt-1 hidden text-xs text-slate-500 sm:block">
            {node.route}
          </p>
        </div>

        <div className="w-full shrink-0 sm:w-auto">
          {hasChildren ? (
            <div className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-300 sm:w-auto sm:justify-start">
              <span>{node.children.length} SUB</span>
              <div className="text-cyan-300 transition-transform duration-300">
                {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
            </div>
          ) : (
            <div className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-2 text-xs font-bold tracking-wide text-slate-950 transition-all duration-300 group-hover:bg-cyan-400 sm:w-auto">
              Buka langsung
            </div>
          )}
        </div>
      </button>

      {hasChildren && open && (
        <div className="relative ml-2 mt-3 space-y-3 border-l border-dashed border-slate-700 pl-3 sm:ml-4 sm:pl-5">
          {node.children.map((child) => (
            <TreeItem key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CardIdentifikasi() {
  const data = useMemo(() => parseTree(RAW_IDENTIFIKASI), []);
  const totalNodes = useMemo(() => {
    const walk = (nodes: TreeNode[]): number =>
      nodes.reduce((acc, node) => acc + 1 + walk(node.children), 0);
    return walk(data);
  }, [data]);
  const totalRoot = data.length;

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#020617] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.55)] sm:p-5 lg:rounded-[30px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_25%)]" />
      <div className="relative z-10">
        <div className="mb-5 overflow-hidden rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl">
          <div className="border-b border-slate-800 bg-linear-to-r from-cyan-500/10 to-blue-500/10 px-4 py-5 sm:px-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-cyan-300 sm:text-xs">
                  <ShieldCheck size={14} />
                  STRUKTUR IDENTIFIKASI TNI
                </div>

                <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                  SISTEM KODEFIKASI MATERIAL TNI
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                  Kodefikasi materiil Siskomlek dilaksanakan secara sistematis
                  melalui proses identifikasi, klasifikasi, pemberian kode unik,
                  serta pengelolaan data berbasis sistem informasi.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-sm sm:p-5">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <FolderTree size={16} />
                    <span className="text-[11px] font-medium tracking-[0.15em]">
                      IDENTIFIKASI UTAMA
                    </span>
                  </div>
                  <div className="text-2xl font-black text-cyan-300 sm:text-3xl">
                    {totalRoot}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-sm sm:p-5">
                  <div className="mb-2 flex items-center gap-2 text-slate-400">
                    <Radar size={16} />
                    <span className="text-[11px] font-medium tracking-[0.15em]">
                      TOTAL IDENTIFIKASI
                    </span>
                  </div>
                  <div className="text-2xl font-black text-blue-300 sm:text-3xl">
                    {totalNodes}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-800 bg-slate-950/70 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs font-semibold tracking-[0.15em] text-emerald-300">
              SISTEM AKTIF
            </div>
          </div>
        </div>

        <div className="max-h-[72vh] space-y-3 overflow-y-auto pr-1 sm:max-h-[78vh] sm:pr-2">
          {data.map((node) => (
            <TreeItem key={node.id} node={node} />
          ))}
        </div>
      </div>
    </section>
  );
}
