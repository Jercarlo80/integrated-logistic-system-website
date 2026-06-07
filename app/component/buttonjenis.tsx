// components/ButtonJenis.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaTags } from "react-icons/fa";
import { ItemState } from "@/app/component/tambahmaterial"; // sesuaikan path

type JenisProps = {
  item: Pick<ItemState, 'jenis'>;
  updateItem: (index: number, field: keyof ItemState, value: any) => void;
  idx: number;
};

const jenisOptions = [
  { value: "1", label: "BMN" },
  { value: "2", label: "Non BMN" },
];

export default function ButtonJenis({ item, updateItem, idx }: JenisProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string, label: string) => {
    updateItem(idx, "jenis", value);
    setIsOpen(false);
  };

  const currentLabel = jenisOptions.find(opt => opt.value === item.jenis)?.label || "Pilih Jenis Barang";

  return (
    <div className="space-y-3">
      {/* Badge section konsisten dengan Identifikasi */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-300">
        <FaTags /> Jenis Barang
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-xl border border-white/10 bg-gray-950 px-3.5 py-2.5 text-left text-sm text-slate-200 outline-none transition-all duration-200 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/20 flex items-center justify-between hover:border-white/20"
        >
          <span className="flex items-center gap-2">
            <FaTags className="text-emerald-400" />
            {currentLabel}
          </span>
          <FaChevronDown className={`text-xs text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 z-50 mt-2 w-full min-w-[200px] rounded-xl border border-white/10 bg-gray-950 shadow-xl">
            <div className="max-h-80 overflow-y-auto p-1">
              {jenisOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value, option.label)}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-slate-100"
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}