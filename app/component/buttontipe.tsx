// components/Buttontipe.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaTags } from "react-icons/fa";
import { ItemState } from "@/app/component/tambahmaterial"; // sesuaikan path

type tipeProps = {
  item: Pick<ItemState, 'tipe'>;
  updateItem: (index: number, field: keyof ItemState, value: any) => void;
  idx: number;
};

const tipeOptions = [
  { value: "1", label: "Aset Tetap" },
  { value: "2", label: "Habis Pakai" },
];

export default function ButtonTipe({ item, updateItem, idx }: tipeProps) {
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
    updateItem(idx, "tipe", value);
    setIsOpen(false);
  };

  const currentLabel = tipeOptions.find(opt => opt.value === item.tipe)?.label || "Pilih tipe Barang";

  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-gray-300">
        <FaTags /> Tipe Barang
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-left text-sm text-gray-800 dark:text-gray-200 outline-none transition-all focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20 flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <FaTags className="text-[#328E6E]" />
            {currentLabel}
          </span>
          <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute left-0 z-50 mt-2 w-full min-w-[200px] rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="max-h-80 overflow-y-auto p-1">
              {tipeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value, option.label)}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
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