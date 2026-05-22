// components/TambahMateriilPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaSave,
  FaTimes,
  FaBarcode,
  FaLayerGroup,
  FaBoxes,
  FaClipboardList,
  FaInfoCircle,
  FaImage,
  FaCalendarAlt,
  FaUserCog,
  FaQrcode,
  FaTags,
} from "react-icons/fa";
import QRCode from "qrcode";
import { MaterilItem } from "./materiltable";
import { useRouter } from "next/navigation";
import ButtonIdentifikasi from "./buttonidentifikasi";
import ButtonJenis from "./buttonjenis";
import ButtonTipe from "./buttontipe";

type Props = {
  onSubmit: (romawi: string, title: string, items: MaterilItem[]) => void;
  initialData?: any;
  initialKodefikasi?: {
    bag?: string;
    unsr?: string;
    bid?: string;
    subBid?: string;
    subSubBid?: string;
    gol?: string;
    bidKlasifikasi?: string;
    kel?: string;
    subKel?: string;
    subSubKel?: string;
  };
  onBack?: () => void;
};

type SubComponent = {
  name: string;
  jumlah: number;
  serialNumber: string;
};

type SubGroup = {
  label: string;
  components: SubComponent[];
};

// EXPORT type ItemState agar dapat diimport oleh buttonidentifikasi.tsx
export type ItemState = {
  bag: string;
  unsr: string;
  bid: string;
  subBid: string;
  subSubBid: string;
  gol: string;
  bidKlasifikasi: string;
  kel: string;
  subKel: string;
  subSubKel: string;
  jenis: string;
  tipe: string;
  urut: string;
  name: string;
  merkType: string;
  negaraPembuat: string;
  tahunPembuatan: string;
  tahunPemakaian: string;
  jumlah: number;
  satuan: string;
  kondisiB: string;
  rr: string;
  rb: string;
  persen: string;
  keterangan: string;
  gambar?: string;
  updateTanggal: string;
  konseptor: string;
  subGroups?: SubGroup[];
};

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 2000; y <= currentYear + 5; y++) {
    years.push(y.toString());
  }
  return years;
};

// Semua kode sekarang integer, default "0"
const getDefaultKode = () => "0";

const hitungPersen = (b: number, rr: number, rb: number): string => {
  const total = b + rr + rb;
  if (total === 0) return "0";
  return Math.round((b / total) * 100).toString();
};

// Daftar field yang harus berupa integer
const integerFields = [
  "bag",
  "unsr",
  "bid",
  "subBid",
  "subSubBid",
  "gol",
  "bidKlasifikasi",
  "kel",
  "subKel",
  "subSubKel",
  "jenis",
  "tipe",
  "urut",
];

export default function TambahMateriilPage({
  onSubmit,
  initialData,
  initialKodefikasi,
  onBack,
}: Props) {
  const router = useRouter();
  const [items, setItems] = useState<ItemState[]>([]);
  const [serialNumbers, setSerialNumbers] = useState<string[][]>([]);
  const [qrItems, setQrItems] = useState<Record<number, string[]>>({});
  const [qrSets, setQrSets] = useState<Record<string, string>>({});
  const [qrComponents, setQrComponents] = useState<Record<string, string>>({});

  const yearOptions = getYearOptions();
  const today = new Date().toISOString().slice(0, 10);

  // Styling yang ditingkatkan
  const inputClass =
    "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all duration-200 focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20 hover:shadow-sm";
  const inputNumberClass =
    "w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all duration-200 focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20 hover:shadow-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
  const inputSoftClass =
    "w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all duration-200 focus:border-[#328E6E] focus:bg-white dark:focus:bg-gray-900 focus:ring-4 focus:ring-[#328E6E]/20 hover:shadow-sm";
  const labelClass =
    "mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400";
  const sectionBadgeClass =
    "inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-gray-300";

  const createItemFromKodefikasi = (
    overrides?: Partial<ItemState>,
  ): ItemState => ({
    bag: initialKodefikasi?.bag ?? getDefaultKode(),
    unsr: initialKodefikasi?.unsr ?? getDefaultKode(),
    bid: initialKodefikasi?.bid ?? getDefaultKode(),
    subBid: initialKodefikasi?.subBid ?? getDefaultKode(),
    subSubBid: initialKodefikasi?.subSubBid ?? getDefaultKode(),
    gol: initialKodefikasi?.gol ?? getDefaultKode(),
    bidKlasifikasi: initialKodefikasi?.bidKlasifikasi ?? getDefaultKode(),
    kel: initialKodefikasi?.kel ?? getDefaultKode(),
    subKel: initialKodefikasi?.subKel ?? getDefaultKode(),
    subSubKel: initialKodefikasi?.subSubKel ?? getDefaultKode(),
    jenis: getDefaultKode(),
    tipe: getDefaultKode(),
    urut: getDefaultKode(),
    name: "",
    merkType: "",
    negaraPembuat: "",
    tahunPembuatan: "",
    tahunPemakaian: "",
    jumlah: 1,
    satuan: "unit",
    kondisiB: "",
    rr: "",
    rb: "",
    persen: "0",
    keterangan: "",
    gambar: "",
    updateTanggal: today,
    konseptor: "",
    subGroups: undefined,
    ...overrides,
  });

  // Helper untuk memastikan nilai integer pada field tertentu
  const ensureInteger = (value: any): string => {
    const intVal = parseInt(String(value), 10);
    return isNaN(intVal) ? "0" : intVal.toString();
  };

  useEffect(() => {
    if (initialData) {
      setItems(
        (initialData.items ?? []).map((item: any) => {
          const b = Number(item.kondisiB) || 0;
          const rr = Number(item.rr) || 0;
          const rb = Number(item.rb) || 0;
          const persen = hitungPersen(b, rr, rb);
          return {
            bag: ensureInteger(item.bag ?? getDefaultKode()),
            unsr: ensureInteger(item.unsr ?? getDefaultKode()),
            bid: ensureInteger(item.bid ?? getDefaultKode()),
            subBid: ensureInteger(item.subBid ?? getDefaultKode()),
            subSubBid: ensureInteger(item.subSubBid ?? getDefaultKode()),
            gol: ensureInteger(item.gol ?? getDefaultKode()),
            bidKlasifikasi: ensureInteger(
              item.bidKlasifikasi ?? getDefaultKode(),
            ),
            kel: ensureInteger(item.kel ?? getDefaultKode()),
            subKel: ensureInteger(item.subKel ?? getDefaultKode()),
            subSubKel: ensureInteger(item.subSubKel ?? getDefaultKode()),
            jenis: ensureInteger(item.jenis ?? getDefaultKode()),
            tipe: ensureInteger(item.tipe ?? getDefaultKode()),
            urut: ensureInteger(item.urut ?? getDefaultKode()),
            name: item.name ?? "",
            merkType: item.merkType ?? "",
            negaraPembuat: item.negaraPembuat ?? "",
            tahunPembuatan: item.tahunPembuatan ?? "",
            tahunPemakaian: item.tahunPemakaian ?? "",
            jumlah: item.jumlah ?? 1,
            satuan: item.satuan ?? "unit",
            kondisiB: item.kondisiB ?? "",
            rr: item.rr ?? "",
            rb: item.rb ?? "",
            persen: item.persen ?? persen,
            keterangan: item.keterangan ?? "",
            gambar: item.gambar ?? "",
            updateTanggal: item.updateTanggal ?? today,
            konseptor: item.konseptor ?? "",
            subGroups: item.subGroups,
          };
        }),
      );
    } else {
      setItems([createItemFromKodefikasi()]);
    }
  }, [initialData]);

  useEffect(() => {
    setSerialNumbers((prev) => {
      return items.map((it, idx) => {
        const qty = Math.max(0, Number(it.jumlah) || 0);
        const existing = prev[idx] ?? [];
        return Array.from({ length: qty }, (_, j) => existing[j] ?? "");
      });
    });
  }, [items]);

  useEffect(() => {
    const generateItemQR = async () => {
      const map: Record<number, string[]> = {};
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const qty = item.jumlah || 0;
        const list: string[] = [];
        for (let j = 0; j < qty; j++) {
          const payload = {
            type: "item",
            name: item.name,
            merkType: item.merkType,
            jumlah: item.jumlah,
            satuan: item.satuan,
            unit: j + 1,
            serial: serialNumbers[i]?.[j] ?? "",
            uid: crypto.randomUUID(),
          };
          list.push(await QRCode.toDataURL(JSON.stringify(payload)));
        }
        map[i] = list;
      }
      setQrItems(map);
    };
    generateItemQR();
  }, [items, serialNumbers]);

  useEffect(() => {
    const generateSetQR = async () => {
      const setMap: Record<string, string> = {};
      const compMap: Record<string, string> = {};

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.satuan !== "set" || !item.subGroups) continue;

        for (let g = 0; g < item.subGroups.length; g++) {
          const group = item.subGroups[g];
          const key = `${i}-${g}`;
          const payload = {
            type: "set",
            parent: item.name,
            setIndex: g + 1,
            uid: crypto.randomUUID(),
          };
          setMap[key] = await QRCode.toDataURL(JSON.stringify(payload));

          for (let c = 0; c < group.components.length; c++) {
            const comp = group.components[c];
            const compKey = `${i}-${g}-${c}`;
            const compPayload = {
              type: "component",
              parent: item.name,
              component: comp.name,
              serial: comp.serialNumber,
              uid: crypto.randomUUID(),
            };
            compMap[compKey] = await QRCode.toDataURL(
              JSON.stringify(compPayload),
            );
          }
        }
      }

      setQrSets(setMap);
      setQrComponents(compMap);
    };

    generateSetQR();
  }, [items]);

  const addItem = () => {
    setItems((prev) => [...prev, createItemFromKodefikasi()]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setSerialNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof ItemState, value: any) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[index] };

      // Konversi integer untuk field tertentu
      let processedValue = value;
      if (integerFields.includes(field)) {
        processedValue = ensureInteger(value);
      }

      (item as any)[field] = processedValue;

      if (field === "kondisiB" || field === "rr" || field === "rb") {
        const b =
          Number(field === "kondisiB" ? processedValue : item.kondisiB) || 0;
        const rr = Number(field === "rr" ? processedValue : item.rr) || 0;
        const rb = Number(field === "rb" ? processedValue : item.rb) || 0;
        item.persen = hitungPersen(b, rr, rb);
      }

      if (field === "satuan" && value === "set") {
        const qty = item.jumlah || 1;
        item.subGroups = Array.from({ length: qty }, (_, i) => ({
          label: `${item.name || "Set"} ${i + 1}`,
          components: [{ name: "", jumlah: 1, serialNumber: "" }],
        }));
      } else if (field === "jumlah" && item.satuan === "set") {
        const newQty = Number(value);
        const existing = item.subGroups || [];
        const newGroups = Array.from(
          { length: newQty },
          (_, i) =>
            existing[i] || {
              label: `${item.name || "Set"} ${i + 1}`,
              components: [{ name: "", jumlah: 1, serialNumber: "" }],
            },
        );
        item.subGroups = newGroups;
      }

      updated[index] = item;
      return updated;
    });
  };

  const updateSerialNumber = (
    itemIndex: number,
    snIndex: number,
    value: string,
  ) => {
    setSerialNumbers((prev) => {
      const next = [...prev];
      const row = [...(next[itemIndex] || [])];
      row[snIndex] = value;
      next[itemIndex] = row;
      return next;
    });
  };

  const handleImageUpload = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateItem(index, "gambar", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addComponentToGroup = (itemIndex: number, groupIndex: number) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[itemIndex] };
      if (!item.subGroups) return prev;
      const group = { ...item.subGroups[groupIndex] };
      group.components = [
        ...group.components,
        { name: "", jumlah: 1, serialNumber: "" },
      ];
      item.subGroups[groupIndex] = group;
      updated[itemIndex] = item;
      return updated;
    });
  };

  const removeComponentFromGroup = (
    itemIndex: number,
    groupIndex: number,
    compIndex: number,
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[itemIndex] };
      if (!item.subGroups) return prev;
      const group = { ...item.subGroups[groupIndex] };
      group.components = group.components.filter((_, i) => i !== compIndex);
      item.subGroups[groupIndex] = group;
      updated[itemIndex] = item;
      return updated;
    });
  };

  const updateSubComponent = (
    itemIndex: number,
    groupIndex: number,
    compIndex: number,
    field: keyof SubComponent,
    value: string | number,
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      const item = { ...updated[itemIndex] };
      if (!item.subGroups) return prev;
      const group = { ...item.subGroups[groupIndex] };
      const comps = [...group.components];
      const comp = { ...comps[compIndex] };
      (comp as any)[field] = value;
      comps[compIndex] = comp;
      group.components = comps;
      item.subGroups[groupIndex] = group;
      updated[itemIndex] = item;
      return updated;
    });
  };

  const handleSubmit = () => {
    // Romawi dan title dihilangkan dari form, dikirim kosong
    onSubmit("", "", items as MaterilItem[]);
  };

  const handleCancel = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Menghitung total unit barang
  const totalUnits = items.reduce((sum, item) => sum + item.jumlah, 0);

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
      {/* Header dengan ringkasan */}
      <div className="relative border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 px-5 py-4 md:px-7 md:py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-2xl flex items-center gap-2">
              <FaClipboardList className="text-[#328E6E]" /> Form Usulan
              Kodefikasi
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 md:text-[15px]">
              Lengkapi data dengan struktur identifikasi, klasifikasi, dan
              detail barang secara presisi.
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <FaBoxes className="text-[11px]" /> Total Item: {items.length}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                <FaBarcode /> Total Unit: {totalUnits}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Form body dengan scroll halus */}
      <div className="max-h-[calc(100vh-240px)] overflow-y-auto bg-slate-50/70 dark:bg-gray-900/50 px-4 py-5 md:px-7 md:py-6 custom-scrollbar">
        <div className="space-y-6">
          {/* Items */}
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col gap-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-white to-slate-50 dark:from-gray-900 dark:to-gray-800/50 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EAF4EF] to-[#d4e8e0] dark:from-[#1E3A2F] dark:to-[#142E24] font-bold text-[#328E6E] dark:text-[#3BAF87] shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      Item #{idx + 1}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Lengkapi seluruh komponen data barang pada item ini
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(idx)}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 px-3.5 py-2 text-sm font-medium text-red-600 dark:text-red-400 transition-all hover:border-red-300 dark:hover:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 hover:shadow-sm"
                  title="Hapus item"
                >
                  <FaTrash /> Hapus
                </button>
              </div>

              <div className="space-y-6 px-4 py-5 md:px-5 md:py-6">
                {/* Identifikasi */}
                <ButtonIdentifikasi
                  item={item}
                  updateItem={updateItem}
                  idx={idx}
                />

                {/* Klasifikasi */}
                <div className="space-y-3">
                  <div className={sectionBadgeClass}>
                    <FaClipboardList /> Klasifikasi
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      placeholder="GOL"
                      value={item.gol}
                      onChange={(e) => updateItem(idx, "gol", e.target.value)}
                      className={inputNumberClass}
                    />
                    <input
                      type="number"
                      step="1"
                      min="0"
                      placeholder="BID (Klasifikasi)"
                      value={item.bidKlasifikasi}
                      onChange={(e) =>
                        updateItem(idx, "bidKlasifikasi", e.target.value)
                      }
                      className={inputNumberClass}
                    />
                    <input
                      type="number"
                      step="1"
                      min="0"
                      placeholder="KEL"
                      value={item.kel}
                      onChange={(e) => updateItem(idx, "kel", e.target.value)}
                      className={inputNumberClass}
                    />
                    <input
                      type="number"
                      step="1"
                      min="0"
                      placeholder="SUB KEL"
                      value={item.subKel}
                      onChange={(e) =>
                        updateItem(idx, "subKel", e.target.value)
                      }
                      className={inputNumberClass}
                    />
                    <input
                      type="number"
                      step="1"
                      min="0"
                      placeholder="SUB SUB KEL"
                      value={item.subSubKel}
                      onChange={(e) =>
                        updateItem(idx, "subSubKel", e.target.value)
                      }
                      className={inputNumberClass}
                    />
                  </div>
                </div>

                {/* Jenis */}
                <div className="space-y-3">
                  <div className={sectionBadgeClass}>
                    <FaBarcode /> Jenis
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
                    <ButtonJenis
                      item={item}
                      updateItem={updateItem}
                      idx={idx}
                    />
                    <ButtonTipe item={item} updateItem={updateItem} idx={idx} />
                    {/* Input Urutan */}
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-gray-300">
                      <FaTags /> Urutan
                    </div>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      placeholder="URUT"
                      value={item.urut}
                      onChange={(e) => updateItem(idx, "urut", e.target.value)}
                      className={inputNumberClass}
                    />
                  </div>
                </div>

                {/* Data Barang */}
                <div className="space-y-3">
                  <div className={sectionBadgeClass}>
                    <FaBoxes /> Data Barang
                  </div>
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
                    <input
                      placeholder="Nama Barang *"
                      value={item.name}
                      onChange={(e) => updateItem(idx, "name", e.target.value)}
                      className={inputSoftClass}
                      required
                    />
                    <input
                      placeholder="Merk / Type"
                      value={item.merkType}
                      onChange={(e) =>
                        updateItem(idx, "merkType", e.target.value)
                      }
                      className={inputSoftClass}
                    />
                    <input
                      placeholder="Negara Pembuat"
                      value={item.negaraPembuat}
                      onChange={(e) =>
                        updateItem(idx, "negaraPembuat", e.target.value)
                      }
                      className={inputSoftClass}
                    />
                    <select
                      value={item.tahunPembuatan}
                      onChange={(e) =>
                        updateItem(idx, "tahunPembuatan", e.target.value)
                      }
                      className={inputSoftClass}
                    >
                      <option value="">-- Tahun Buat --</option>
                      {yearOptions.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                    <select
                      value={item.tahunPemakaian}
                      onChange={(e) =>
                        updateItem(idx, "tahunPemakaian", e.target.value)
                      }
                      className={inputSoftClass}
                    >
                      <option value="">-- Tahun Pakai --</option>
                      {yearOptions.map((y) => (
                        <option key={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Satuan & Kondisi */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 p-4 transition-all hover:shadow-sm">
                    <label className={labelClass}>Satuan</label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input
                        type="number"
                        min="1"
                        value={item.jumlah}
                        onChange={(e) =>
                          updateItem(idx, "jumlah", Number(e.target.value))
                        }
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20 sm:w-28"
                      />
                      <select
                        value={item.satuan}
                        onChange={(e) =>
                          updateItem(idx, "satuan", e.target.value)
                        }
                        className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20 sm:flex-1"
                      >
                        <option value="unit">Unit</option>
                        <option value="buah">Buah</option>
                        <option value="set">Set</option>
                      </select>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 p-4 transition-all hover:shadow-sm">
                    <label className={labelClass}>Kondisi</label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      <input
                        type="number"
                        placeholder="B"
                        value={item.kondisiB}
                        onChange={(e) =>
                          updateItem(idx, "kondisiB", e.target.value)
                        }
                        className={inputSoftClass}
                      />
                      <input
                        type="number"
                        placeholder="RR"
                        value={item.rr}
                        onChange={(e) => updateItem(idx, "rr", e.target.value)}
                        className={inputSoftClass}
                      />
                      <input
                        type="number"
                        placeholder="RB"
                        value={item.rb}
                        onChange={(e) => updateItem(idx, "rb", e.target.value)}
                        className={inputSoftClass}
                      />
                      <input
                        type="text"
                        placeholder="%"
                        value={item.persen}
                        readOnly
                        className="cursor-not-allowed rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-3.5 py-2.5 text-sm text-gray-700 dark:text-gray-300 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Serial Numbers */}
                {item.jumlah > 0 && (
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 transition-all hover:shadow-sm">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <label className={labelClass}>
                        <FaBarcode /> Nomor Seri per Unit
                      </label>
                      <span className="rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:text-gray-400">
                        {item.jumlah} input
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {Array.from({ length: item.jumlah }).map((_, j) => (
                        <input
                          key={j}
                          type="text"
                          placeholder={`Serial ${j + 1}`}
                          value={serialNumbers[idx]?.[j] || ""}
                          onChange={(e) =>
                            updateSerialNumber(idx, j, e.target.value)
                          }
                          className={inputSoftClass}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Keterangan & Gambar */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <label className={labelClass}>
                      <FaInfoCircle /> Keterangan
                    </label>
                    <textarea
                      rows={3}
                      value={item.keterangan}
                      onChange={(e) =>
                        updateItem(idx, "keterangan", e.target.value)
                      }
                      className={inputSoftClass}
                    />
                  </div>
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <label className={labelClass}>
                      <FaImage /> Gambar
                    </label>
                    <div className="flex flex-col gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(idx, e)}
                        className="block w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:rounded-xl file:border-0 file:bg-[#EAF4EF] dark:file:bg-[#1E3A2F] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#328E6E] dark:file:text-[#3BAF87] hover:file:bg-[#dff0e7] dark:hover:file:bg-[#2A4D3E] transition-all"
                      />
                      {item.gambar && (
                        <div className="flex items-center gap-4">
                          <img
                            src={item.gambar}
                            className="h-20 w-20 rounded-2xl border border-gray-200 dark:border-gray-700 object-cover shadow-sm"
                            alt="Preview"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Preview gambar tersimpan.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tanggal Update & Konseptor */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <label className={labelClass}>
                      <FaCalendarAlt /> Tanggal Update
                    </label>
                    <input
                      type="date"
                      value={item.updateTanggal}
                      onChange={(e) =>
                        updateItem(idx, "updateTanggal", e.target.value)
                      }
                      className={inputSoftClass}
                    />
                  </div>
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                    <label className={labelClass}>
                      <FaUserCog /> Konseptor
                    </label>
                    <input
                      type="text"
                      value={item.konseptor}
                      onChange={(e) =>
                        updateItem(idx, "konseptor", e.target.value)
                      }
                      className={inputSoftClass}
                    />
                  </div>
                </div>

                {/* QR Item preview */}
                {(qrItems[idx]?.[0] || qrSets) && (
                  <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/30 p-4 transition-all">
                    {qrItems[idx]?.[0] && (
                      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-sm hover:shadow-md transition-all">
                        <img
                          src={qrItems[idx][0]}
                          className="h-14 w-14 rounded-xl object-contain"
                          alt="QR Item"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Set components */}
                {item.satuan === "set" && item.subGroups && (
                  <div className="space-y-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/30 p-4 md:p-5 transition-all">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                          <FaBoxes /> Komponen dalam Set
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Kelola kelompok komponen dan nomor seri masing-masing.
                        </p>
                      </div>
                      <span className="rounded-full bg-white dark:bg-gray-800 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        {item.subGroups.length} grup
                      </span>
                    </div>
                    <div className="space-y-4">
                      {item.subGroups.map((group, gIdx) => (
                        <div
                          key={gIdx}
                          className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="flex flex-col gap-3 border-b border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/50 px-4 py-3 md:flex-row md:items-center md:justify-between">
                            <h5 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                              {group.label}
                            </h5>
                            <button
                              onClick={() => addComponentToGroup(idx, gIdx)}
                              className="inline-flex items-center gap-2 rounded-xl border border-[#CFE7DA] dark:border-[#2A5A48] bg-[#EAF4EF] dark:bg-[#1E3A2F] px-3 py-2 text-sm font-medium text-[#328E6E] dark:text-[#3BAF87] transition-all hover:bg-[#dff0e7] dark:hover:bg-[#2A4D3E] hover:shadow-sm"
                            >
                              <FaPlus /> Tambah Komponen
                            </button>
                          </div>
                          <div className="space-y-3 p-4">
                            {group.components.map((comp, cIdx) => {
                              const compKey = `${idx}-${gIdx}-${cIdx}`;
                              return (
                                <div
                                  key={cIdx}
                                  className="grid grid-cols-1 gap-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-800/30 p-3 md:grid-cols-12 md:items-center transition-all hover:bg-slate-100 dark:hover:bg-gray-800/50"
                                >
                                  <input
                                    placeholder="Nama Komponen"
                                    value={comp.name}
                                    onChange={(e) =>
                                      updateSubComponent(
                                        idx,
                                        gIdx,
                                        cIdx,
                                        "name",
                                        e.target.value,
                                      )
                                    }
                                    className="md:col-span-5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20"
                                  />
                                  <input
                                    type="number"
                                    min="1"
                                    value={comp.jumlah}
                                    onChange={(e) =>
                                      updateSubComponent(
                                        idx,
                                        gIdx,
                                        cIdx,
                                        "jumlah",
                                        Number(e.target.value),
                                      )
                                    }
                                    className="md:col-span-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20"
                                  />
                                  <input
                                    placeholder="Serial"
                                    value={comp.serialNumber}
                                    onChange={(e) =>
                                      updateSubComponent(
                                        idx,
                                        gIdx,
                                        cIdx,
                                        "serialNumber",
                                        e.target.value,
                                      )
                                    }
                                    className="md:col-span-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-200 outline-none transition-all focus:border-[#328E6E] focus:ring-4 focus:ring-[#328E6E]/20"
                                  />
                                  <div className="flex items-center justify-between gap-3 md:col-span-1 md:justify-end">
                                    {qrComponents[compKey] && (
                                      <img
                                        src={qrComponents[compKey]}
                                        className="h-10 w-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 object-contain shadow-sm"
                                        alt="QR"
                                      />
                                    )}
                                    <button
                                      onClick={() =>
                                        removeComponentFromGroup(
                                          idx,
                                          gIdx,
                                          cIdx,
                                        )
                                      }
                                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 transition-all hover:bg-red-100 dark:hover:bg-red-900/30 hover:shadow-sm"
                                      title="Hapus komponen"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Tombol Tambah Barang */}
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 md:flex-row md:items-center md:justify-between transition-all hover:border-[#328E6E] dark:hover:border-[#3BAF87]">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Tambah Barang
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Menambahkan item baru ke dalam struktur materiil.
              </p>
            </div>
            <button
              onClick={addItem}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#328E6E] to-[#276f56] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-[#276f56] hover:to-[#1e5a45] hover:shadow-lg active:scale-95"
            >
              <FaPlus /> Tambah Barang
            </button>
          </div>
        </div>
      </div>

      {/* Footer dengan tombol aksi */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4 md:px-7">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={handleCancel}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition-all hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-sm active:scale-95"
          >
            <FaTimes /> Batal
          </button>
          <button
            onClick={handleSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#328E6E] to-[#276f56] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-[#276f56] hover:to-[#1e5a45] hover:shadow-lg active:scale-95"
          >
            <FaSave /> Simpan
          </button>
        </div>
      </div>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d2d2d;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #555;
        }
      `}</style>
    </div>
  );
}
