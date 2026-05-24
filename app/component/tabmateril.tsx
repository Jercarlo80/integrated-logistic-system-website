"use client";

import React from "react";
import { Building2, Archive } from "lucide-react";

export type MainTabOption = {
  key: string;
  label: string;
  description: string;
  icon?: React.ElementType;
};

export type SubTabOption = {
  key: string;
  label: string;
  description: string;
  badge: string;
};

interface TabMaterialProps {
  // Main tabs configuration
  mainTabs: MainTabOption[];
  activeMainTab: string;
  onMainTabChange: (key: string) => void;
  // Sub tabs configuration
  subTabs: SubTabOption[];
  activeSubTab: string;
  onSubTabChange: (key: string) => void;
  // Optional className for container
  className?: string;
}

export default function TabMaterial({
  mainTabs,
  activeMainTab,
  onMainTabChange,
  subTabs,
  activeSubTab,
  onSubTabChange,
  className = "",
}: TabMaterialProps) {
  return (
    <div className={className}>
      {/* MAIN TAB BUTTONS */}
      <div className="flex border-b border-white/5 bg-[#081426] rounded-t-lg">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMainTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onMainTabChange(tab.key)}
              className={`group relative flex flex-1 items-center justify-center gap-2 md:gap-3 px-2 py-3 md:px-5 md:py-5 transition-all duration-300 rounded-t-lg ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-300"
                  : "text-slate-500 hover:bg-white/2 hover:text-slate-300"
              }`}
            >
              {Icon && <Icon size={16} className="md:size-[18px]" />}
              <div className="text-left">
                <div className="text-xs md:text-sm font-semibold">
                  {tab.label}
                </div>
                <div className="hidden sm:block text-[10px] md:text-[11px] text-slate-500">
                  {tab.description}
                </div>
              </div>
              {isActive && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-cyan-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* SUB TAB BUTTONS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 bg-[#07111f] px-4 py-3 md:px-6 md:py-4">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSubTabChange(tab.key)}
              className={`rounded-lg md:rounded-xl px-3 py-1.5 md:px-5 md:py-2.5 text-xs md:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "border border-cyan-400/30 bg-cyan-500/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                  : "border border-transparent bg-white/[0.03] text-slate-400 hover:border-white/10 hover:bg-white/[0.05] hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
