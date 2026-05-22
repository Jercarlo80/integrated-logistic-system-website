"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Users,
  Workflow,
  Database,
  MonitorSmartphone,
  ClipboardList,
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  X,
  Building,
} from "lucide-react";

type OrgLevel = 1 | 2 | 3 | 4;

type OrgNodeProps = {
  title: string;
  icon: React.ReactNode;
  level?: OrgLevel;
  description?: string;
};

function OrgNode({ title, icon, level = 1, description }: OrgNodeProps) {
  const styles: Record<OrgLevel, string> = {
    1: "bg-indigo-900/40 border-indigo-500/40 text-indigo-200",
    2: "bg-emerald-900/40 border-emerald-500/40 text-emerald-200",
    3: "bg-gray-900 border-gray-700 text-gray-200",
    4: "bg-gray-800 border-gray-700 text-gray-300 text-xs",
  };

  return (
    <div className="group relative">
      <div
        className={`
          relative z-10 min-w-[240px] rounded-lg border px-4 py-3 text-center
          shadow-[0_8px_25px_rgba(0,0,0,0.5)]
          transition-all duration-200 ease-out
          hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-xl
          ${styles[level]}
        `}
      >
        <div className="flex items-center justify-center gap-2">
          {icon}
          <h3 className="font-semibold tracking-wide">{title}</h3>
        </div>
      </div>

      {description && (
        <div className="absolute bottom-full mb-2 hidden whitespace-nowrap rounded bg-gray-800 px-3 py-2 text-xs text-gray-300 shadow-lg group-hover:block">
          {description}
        </div>
      )}
    </div>
  );
}

type LineProps = {
  className?: string;
};

function Line({ className = "" }: LineProps) {
  return (
    <div
      className={`absolute bg-gradient-to-b from-gray-500 to-gray-700 shadow-[0_0_6px_rgba(255,255,255,0.1)] ${className}`}
    />
  );
}

type StructureDiagramProps = {
  scale: number;
};

function StructureDiagram({ scale }: StructureDiagramProps) {
  return (
    <div
      className="relative mx-auto h-[850px] w-[1100px]"
      style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
    >
      <div className="absolute left-1/2 top-4 -translate-x-1/2">
        <OrgNode
          title="Penanggung Jawab"
          icon={<ShieldCheck size={18} />}
          level={1}
          description="Pimpinan tertinggi organisasi"
        />
      </div>

      <Line className="left-1/2 top-[60px] h-[80px] w-[2px] -translate-x-1/2" />

      <Line className="left-1/2 top-[140px] h-[2px] w-[200px]" />
      <div className="absolute left-[calc(50%+200px)] top-[120px]">
        <OrgNode
          title="Pengawas"
          icon={<Users size={16} />}
          level={2}
          description="Fungsi pengawasan"
        />
      </div>

      <Line className="left-1/2 top-[140px] h-[80px] w-[2px] -translate-x-1/2" />
      <div className="absolute left-1/2 top-[200px] -translate-x-1/2">
        <OrgNode
          title="Ketua Pelaksana"
          icon={<Workflow size={16} />}
          level={2}
          description="Koordinator pelaksanaan"
        />
      </div>

      <Line className="left-[100px] top-[320px] h-[2px] w-[900px]" />
      <Line className="left-1/2 top-[260px] h-[60px] w-[2px] -translate-x-1/2" />

      <Line className="left-[180px] top-[320px] h-[40px] w-[2px]" />
      <Line className="left-[420px] top-[320px] h-[40px] w-[2px]" />
      <Line className="left-[660px] top-[320px] h-[40px] w-[2px]" />
      <Line className="left-[900px] top-[320px] h-[40px] w-[2px]" />

      <div className="absolute left-[120px] top-[360px]">
        <OrgNode
          title="Kabid Perencanaan"
          icon={<ClipboardList size={16} />}
          level={3}
        />
      </div>

      <div className="absolute left-[360px] top-[360px]">
        <OrgNode
          title="Kabid Data & Kodefikasi"
          icon={<Database size={16} />}
          level={3}
        />
      </div>

      <div className="absolute left-[600px] top-[360px]">
        <OrgNode
          title="Kabid Sistem Informasi"
          icon={<MonitorSmartphone size={16} />}
          level={3}
        />
      </div>

      <div className="absolute left-[840px] top-[360px]">
        <OrgNode
          title="Kabid Pembinaan"
          icon={<Network size={16} />}
          level={3}
        />
      </div>

      <Line className="left-[420px] top-[420px] h-[100px] w-[2px]" />
      <div className="absolute left-[350px] top-[520px]">
        <OrgNode
          title="Unit Kodefikasi"
          icon={<ClipboardList size={14} />}
          level={4}
        />
      </div>
    </div>
  );
}

type CardPopupProps = {
  onClose: () => void;
};

function CardPopup({ onClose }: CardPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-800 bg-gray-900/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Building size={20} className="text-indigo-400" />
            <h2 className="text-xl font-bold text-white">Struktur Organisasi</h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-gray-800 p-2 text-gray-300 transition hover:bg-gray-700 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-md">
              <div className="rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-gray-900 p-5 text-center shadow-lg">
                <div className="mb-3 flex justify-center">
                  <div className="rounded-full bg-indigo-900/50 p-3">
                    <ShieldCheck className="h-7 w-7 text-indigo-300" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">Penanggung Jawab</h3>
                <p className="text-sm text-indigo-300">Pimpinan Tertinggi</p>
              </div>
            </div>

            <div className="h-6 w-px bg-gray-600" />

            <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8">
              <div className="flex-1">
                <div className="rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-950/40 to-gray-900 p-4 text-center shadow-lg">
                  <div className="mb-2 flex justify-center">
                    <div className="rounded-full bg-yellow-900/50 p-2">
                      <Users className="h-5 w-5 text-yellow-300" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white">Pengawas</h3>
                  <p className="text-xs text-yellow-300">Fungsi Pengawasan</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 to-gray-900 p-4 text-center shadow-lg">
                  <div className="mb-2 flex justify-center">
                    <div className="rounded-full bg-emerald-900/50 p-2">
                      <Workflow className="h-5 w-5 text-emerald-300" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-white">Ketua Pelaksana</h3>
                  <p className="text-xs text-emerald-300">Koordinasi Pelaksana</p>
                </div>
              </div>
            </div>

            <div className="h-6 w-px bg-gray-600" />

            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 to-gray-900 p-4 text-center shadow">
                <div className="mb-2 flex justify-center">
                  <ClipboardList className="h-6 w-6 text-blue-300" />
                </div>
                <h4 className="font-semibold text-white">Kabid Perencanaan</h4>
                <p className="text-xs text-blue-300/70">Perencanaan Program</p>
              </div>

              <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-gray-900 p-4 text-center shadow">
                <div className="mb-2 flex justify-center">
                  <Database className="h-6 w-6 text-purple-300" />
                </div>
                <h4 className="font-semibold text-white">Kabid Data & Kodefikasi</h4>
                <p className="text-xs text-purple-300/70">Pengelolaan Data</p>
              </div>

              <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 to-gray-900 p-4 text-center shadow">
                <div className="mb-2 flex justify-center">
                  <MonitorSmartphone className="h-6 w-6 text-cyan-300" />
                </div>
                <h4 className="font-semibold text-white">Kabid Sistem Informasi</h4>
                <p className="text-xs text-cyan-300/70">Pengembangan SI</p>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-gradient-to-br from-rose-950/40 to-gray-900 p-4 text-center shadow">
                <div className="mb-2 flex justify-center">
                  <Network className="h-6 w-6 text-rose-300" />
                </div>
                <h4 className="font-semibold text-white">Kabid Pembinaan</h4>
                <p className="text-xs text-rose-300/70">Pembinaan & Evaluasi</p>
              </div>
            </div>

            <div className="relative flex w-full justify-center pt-2">
              <div className="absolute -top-3 h-6 w-px bg-gray-600" />
              <div className="mt-4 w-full max-w-xs rounded-xl border border-gray-700 bg-gray-800/90 p-4 text-center shadow-md">
                <div className="mb-1 flex justify-center">
                  <ClipboardList className="h-5 w-5 text-gray-300" />
                </div>
                <h4 className="font-medium text-gray-200">Unit Kodefikasi</h4>
                <p className="text-xs text-gray-400">
                  Bawahan Kabid Data & Kodefikasi
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
            Siskomlek Satkomlek TNI
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StrukturOrganisasi() {
  const [scale, setScale] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.1, 2));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));
  const resetZoom = () => setScale(1);

  return (
    <div className="w-full bg-gray-950 p-6 text-gray-100">
      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="font-semibold">Struktur Organisasi</h1>
          <p className="text-xs text-gray-400">Siskomlek</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 rounded bg-indigo-600 px-3 py-2 text-sm"
          >
            <Eye size={16} />
            View
          </button>

          <button
            onClick={zoomOut}
            className="rounded bg-gray-800 p-2"
          >
            <ZoomOut size={16} />
          </button>

          <button
            onClick={resetZoom}
            className="rounded bg-gray-800 p-2"
          >
            <RotateCcw size={16} />
          </button>

          <button
            onClick={zoomIn}
            className="rounded bg-gray-800 p-2"
          >
            <ZoomIn size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded-xl border border-gray-800">
        <StructureDiagram scale={scale} />
      </div>

      {open && <CardPopup onClose={() => setOpen(false)} />}
    </div>
  );
}