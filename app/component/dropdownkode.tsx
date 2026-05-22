"use client";

import React from "react";
import { FaChevronDown } from "react-icons/fa";

export type BaseItem = {
  kode: string;
  nama: string;
};

type DropDownKodeProps<T extends BaseItem> = {
  label: string;
  data: T[];
  selected: T | null;
  setSelected: (val: T) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  disabled?: boolean;
};

export default function DropDownKode<T extends BaseItem>({
  label,
  data,
  selected,
  setSelected,
  isOpen,
  setIsOpen,
  disabled = false,
}: DropDownKodeProps<T>) {
  return (
    <div className="w-full">
      {/* LABEL */}
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
        {label}
      </label>

      {/* BUTTON */}
      <div className="relative">
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border
            transition-all duration-200 group
            ${
              disabled
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : isOpen
                  ? "bg-white border-[#328E6E] shadow-md ring-2 ring-[#328E6E]/10"
                  : "bg-white border-gray-300 hover:border-[#328E6E] hover:shadow-sm"
            }
          `}
        >
          <div className="flex items-center gap-3 min-w-0">
            {selected ? (
              <>
                {/* KODE BADGE */}
                <span className="inline-flex items-center rounded-md bg-[#EAF4EF] px-2.5 py-1 text-xs font-semibold text-[#328E6E] border border-[#CFE7DA] shrink-0">
                  {selected.kode}
                </span>

                {/* NAMA */}
                <span className="text-sm font-medium text-gray-800 truncate">
                  {selected.nama}
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-400">
                {disabled ? "Tidak tersedia" : `Pilih ${label}`}
              </span>
            )}
          </div>

          {/* ICON */}
          <FaChevronDown
            className={`
              text-gray-500 transition-all duration-200
              ${isOpen ? "rotate-180 text-[#328E6E]" : ""}
            `}
          />
        </button>

        {/* DROPDOWN */}
        {isOpen && !disabled && (
          <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-2xl shadow-xl z-30 overflow-hidden animate-in fade-in zoom-in-95">
            {/* HEADER */}
            <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                Daftar {label}
              </p>
              <span className="text-xs text-gray-400">{data.length} item</span>
            </div>

            {/* LIST */}
            <div className="max-h-72 overflow-auto py-2">
              {data.map((item) => {
                const isSelected = selected?.kode === item.kode;

                return (
                  <div
                    key={item.kode}
                    onClick={() => {
                      setSelected(item);
                      setIsOpen(false);
                    }}
                    className={`
                      mx-2 my-1 rounded-xl px-4 py-3 cursor-pointer
                      transition-all duration-150 group
                      ${
                        isSelected
                          ? "bg-[#EAF4EF] border border-[#CFE7DA]"
                          : "hover:bg-gray-50"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`
                              text-xs px-2 py-0.5 rounded-md font-semibold shrink-0
                              ${
                                isSelected
                                  ? "bg-white text-[#328E6E] border border-[#CFE7DA]"
                                  : "bg-gray-100 text-gray-700 border border-gray-200"
                              }
                            `}
                          >
                            {item.kode}
                          </span>

                          <span className="text-sm font-medium text-gray-900 truncate">
                            {item.nama}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.kode} | {item.nama}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#328E6E] text-white text-xs font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {data.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-gray-400">
                Tidak ada data tersedia
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
