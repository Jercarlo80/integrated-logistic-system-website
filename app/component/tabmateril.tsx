"use client";

import React, { useMemo, useState } from "react";

type MainTabKey = "aset_tetap" | "habis_pakai";
type SubTabKey = "bmn" | "non_bmn";

type TabMaterialProps = {
  asetTetapContent?: Record<SubTabKey, React.ReactNode>;
  habisPakaiContent?: Record<SubTabKey, React.ReactNode>;
  className?: string;
};

type TabButtonProps = {
  active: boolean;
  label: string;
  onClick: () => void;
};

function TabButton({ active, label, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ${
        active
          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
          : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {label}
    </button>
  );
}

function PanelCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}

export default function TabMaterial({
  asetTetapContent,
  habisPakaiContent,
  className = "",
}: TabMaterialProps) {
  const [mainTab, setMainTab] = useState<MainTabKey>("aset_tetap");
  const [subTab, setSubTab] = useState<SubTabKey>("bmn");

  const content = useMemo(() => {
    const defaultEmpty = (
      <PanelCard>
        <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
          <div>
            <p className="text-sm font-semibold text-slate-900">Konten belum tersedia</p>
            <p className="mt-1 text-sm text-slate-500">
              Silakan isi konten untuk tab ini dari parent component.
            </p>
          </div>
        </div>
      </PanelCard>
    );

    if (mainTab === "aset_tetap") {
      return asetTetapContent?.[subTab] ?? defaultEmpty;
    }

    return habisPakaiContent?.[subTab] ?? defaultEmpty;
  }, [asetTetapContent, habisPakaiContent, mainTab, subTab]);

  const handleMainTabChange = (tab: MainTabKey) => {
    setMainTab(tab);
    setSubTab("bmn");
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-4 shadow-sm sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Material Management
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Tab Material
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Pengelompokan material berdasarkan kategori utama dan sub kategori BMN / Non BMN.
            </p>
          </div>

          <div className="inline-flex rounded-2xl bg-slate-100 p-1">
            <TabButton
              active={mainTab === "aset_tetap"}
              label="Aset Tetap"
              onClick={() => handleMainTabChange("aset_tetap")}
            />
            <TabButton
              active={mainTab === "habis_pakai"}
              label="Habis Pakai"
              onClick={() => handleMainTabChange("habis_pakai")}
            />
          </div>
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          <TabButton
            active={subTab === "bmn"}
            label="BMN"
            onClick={() => setSubTab("bmn")}
          />
          <TabButton
            active={subTab === "non_bmn"}
            label="Non BMN"
            onClick={() => setSubTab("non_bmn")}
          />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
          {content}
        </div>
      </div>
    </div>
  );
}

export type { MainTabKey, SubTabKey, TabMaterialProps };
