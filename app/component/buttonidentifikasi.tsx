// components/buttonidentifikasi.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaSitemap } from "react-icons/fa";
import { ItemState } from "@/app/component/tambahmaterial"; // pastikan path ini benar

type IdentifikasiProps = {
  item: Pick<ItemState, "bag" | "unsr" | "bid" | "subBid" | "subSubBid">;
  updateItem: (index: number, field: keyof ItemState, value: any) => void;
  idx: number;
};

// Data struktur lengkap (sesuai input)
const strukturData = [
  { bag: 1, unsr: 3, bid: 1, subBid: 1, subSubBid: 0, nama: "UNSUR PIMPINAN" },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 2,
    subSubBid: 0,
    nama: "UNSUR PEMBANTU PIMPINAN",
  },
  { bag: 1, unsr: 3, bid: 1, subBid: 2, subSubBid: 1, nama: "SOPS" },
  { bag: 1, unsr: 3, bid: 1, subBid: 2, subSubBid: 2, nama: "SMIN" },
  { bag: 1, unsr: 3, bid: 1, subBid: 3, subSubBid: 0, nama: "UNSUR PELAYANAN" },
  { bag: 1, unsr: 3, bid: 1, subBid: 3, subSubBid: 1, nama: "SEKRETARIAT" },
  { bag: 1, unsr: 3, bid: 1, subBid: 3, subSubBid: 2, nama: "KOMPI MARKAS" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 0, nama: "UNSUR PELAKSANA" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 1, nama: "DISKOM" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 2, nama: "DISLEK" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 3, nama: "DISPERNIKA" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 4, nama: "DENKOMYANLAP" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 5, nama: "DENKOMLAOPS" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 6, nama: "DENPERNIKA" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 7, nama: "DENKONHARSTAL" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 8, nama: "DENGUDBEK" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 9, nama: "DENKOMSAT" },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 10,
    nama: "DENKOMLEKSTRADA BANDA ACEH",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 11,
    nama: "SUBDEN LHOKSEUMAWE",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 12,
    nama: "SUBDEN MEULABOH",
  },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 13, nama: "SUBDEN SABANG" },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 14,
    nama: "DENKOMLEKSTRADA MEDAN",
  },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 15, nama: "SUBDEN PADANG" },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 16,
    nama: "SUBDEN PEKANBARU",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 17,
    nama: "SUBDEN TANJUNG PINANG",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 18,
    nama: "DENKOMLEKSTRADA PALEMBANG",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 19,
    nama: "DENKOMLEKSTRADA BANDUNG",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 20,
    nama: "DENKOMLEKSTRADA SEMARANG",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 21,
    nama: "SUBDEN YOGYAKARTA",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 22,
    nama: "DENKOMLEKSTRADA SURABAYA",
  },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 23, nama: "SUBDEN MADIUN" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 24, nama: "SUBDEN MALANG" },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 25,
    nama: "DENKOMLEKSTRADA BALIKPAPAN",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 26,
    nama: "SUBDEN BANJARMASIN",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 27,
    nama: "DENKOMLEKSTRADA PONTIANAK",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 28,
    nama: "DENKOMLEKSTRADA MAKASAR",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 29,
    nama: "DENKOMLEKSTRADA MANADO",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 30,
    nama: "DENKOMLEKSTRADA DENPASAR",
  },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 31, nama: "SUBDEN KUPANG" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 32, nama: "SUBDEN ATAMBUA" },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 33,
    nama: "DENKOMLEKSTRADA AMBON",
  },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 34,
    nama: "DENKOMLEKSTRADA JAYAPURA",
  },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 35, nama: "SUBDEN SENTANI" },
  { bag: 1, unsr: 3, bid: 1, subBid: 4, subSubBid: 36, nama: "SUBDEN BIAK" },
  {
    bag: 1,
    unsr: 3,
    bid: 1,
    subBid: 4,
    subSubBid: 37,
    nama: "DENKOMLEKSTRADA SORONG",
  },
];

type MenuItem = {
  id: string;
  label: string;
  bag: number;
  unsr: number;
  bid: number;
  subBid: number;
  subSubBid: number;
  children?: MenuItem[];
};

// Format kode tanpa spasi: 131100
const formatKode = (
  bag: number,
  unsr: number,
  bid: number,
  subBid: number,
  subSubBid: number,
) => {
  return `${bag}${unsr}${bid}${subBid}${subSubBid}0`;
};

const buildMenu = (): MenuItem[] => {
  const map = new Map<string, MenuItem>();
  strukturData.forEach((item) => {
    const id = `${item.bag}-${item.unsr}-${item.bid}-${item.subBid}-${item.subSubBid}`;
    const menuItem: MenuItem = {
      id,
      label: item.nama,
      bag: item.bag,
      unsr: item.unsr,
      bid: item.bid,
      subBid: item.subBid,
      subSubBid: item.subSubBid,
      children: [],
    };
    map.set(id, menuItem);
  });
  const roots: MenuItem[] = [];
  map.forEach((item) => {
    if (item.subSubBid === 0 && item.subBid !== 0) {
      roots.push(item);
    } else if (item.subSubBid !== 0) {
      const parentKey = `${item.bag}-${item.unsr}-${item.bid}-${item.subBid}-0`;
      const parent = map.get(parentKey);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(item);
      } else {
        roots.push(item);
      }
    }
  });
  return roots;
};

export default function ButtonIdentifikasi({
  item,
  updateItem,
  idx,
}: IdentifikasiProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State untuk mengontrol parent mana yang sedang terbuka (accordion)
  const [expandedParents, setExpandedParents] = useState<Set<string>>(
    new Set(),
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuItems = buildMenu();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setExpandedParents(new Set()); // tutup semua saat dropdown tertutup
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleParent = (id: string) => {
    setExpandedParents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelect = (selected: MenuItem) => {
    updateItem(idx, "bag", selected.bag.toString());
    updateItem(idx, "unsr", selected.unsr.toString());
    updateItem(idx, "bid", selected.bid.toString());
    updateItem(idx, "subBid", selected.subBid.toString());
    updateItem(idx, "subSubBid", selected.subSubBid.toString());
    setIsDropdownOpen(false);
    setExpandedParents(new Set());
  };

  const found = strukturData.find(
    (s) =>
      s.bag === Number(item.bag) &&
      s.unsr === Number(item.unsr) &&
      s.bid === Number(item.bid) &&
      s.subBid === Number(item.subBid) &&
      s.subSubBid === Number(item.subSubBid),
  );
  const currentKode = formatKode(
    Number(item.bag),
    Number(item.unsr),
    Number(item.bid),
    Number(item.subBid),
    Number(item.subSubBid),
  );
  const currentNama = found ? found.nama : "Pilih Identifikasi Struktur";
  const displayLabel = found ? `${currentKode} ${currentNama}` : currentNama;

  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-gray-300">
        <FaSitemap /> Identifikasi Struktur
      </div>
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-left text-sm text-gray-800 dark:text-gray-200 outline-none transition-all focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20 flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <FaSitemap className="text-[#328E6E]" />
            {displayLabel}
          </span>
          <FaChevronDown
            className={`text-xs transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute left-0 z-50 mt-2 w-full min-w-[300px] rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="max-h-80 overflow-y-auto p-1">
              {menuItems.map((root) => {
                const hasChildren = root.children && root.children.length > 0;
                const isExpanded = expandedParents.has(root.id);
                return (
                  <div key={root.id} className="mb-1">
                    {/* Parent button */}
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          toggleParent(root.id);
                        } else {
                          handleSelect(root);
                        }
                      }}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    >
                      <span className="font-mono text-xs">
                        {formatKode(
                          root.bag,
                          root.unsr,
                          root.bid,
                          root.subBid,
                          root.subSubBid,
                        )}{" "}
                        {root.label}
                      </span>
                      {hasChildren && (
                        <FaChevronRight
                          className={`text-xs transition-transform ${isExpanded ? "rotate-90" : ""}`}
                        />
                      )}
                    </button>
                    {/* Children list (accordion) - tampil di bawah parent */}
                    {hasChildren && isExpanded && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                        {root.children!.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => handleSelect(child)}
                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            <span className="font-mono text-xs">
                              {formatKode(
                                child.bag,
                                child.unsr,
                                child.bid,
                                child.subBid,
                                child.subSubBid,
                              )}{" "}
                              {child.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Menampilkan kode yang dipilih */}
      <div className="grid grid-cols-5 gap-2 text-xs text-gray-500 dark:text-gray-400">
        <div>BAG: {item.bag}</div>
        <div>UNSR: {item.unsr}</div>
        <div>BID: {item.bid}</div>
        <div>SUB BID: {item.subBid}</div>
        <div>SUB SUB BID: {item.subSubBid}</div>
      </div>
    </div>
  );
}
