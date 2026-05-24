"use client";

import { useState } from "react";
import { Building2, Archive } from "lucide-react";
import TabMaterial from "../component/tabmateril";
import CardIdentifikasi from "../component/cardidentifikasi";
import CardProsesKodefikasi from "../component/cardproseskodefikasi";

type MainTab = "aset" | "Habis Pakai";
type SubTab = "bmn" | "nonbmn";

export default function Layer() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("aset");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("bmn");

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
    <div className="w-full min-h-screen bg-[#020617] p-4 md:p-6">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[48px_48px]" />
      </div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-100 mb-6">
        Proses Kodefikasi
      </h1>
      <TabMaterial
        mainTabs={mainTabsConfig}
        activeMainTab={activeMainTab}
        onMainTabChange={(key) => setActiveMainTab(key as MainTab)}
        subTabs={subTabsConfig}
        activeSubTab={activeSubTab}
        onSubTabChange={(key) => setActiveSubTab(key as SubTab)}
      />
      <CardProsesKodefikasi  />
    </div>
  );
}