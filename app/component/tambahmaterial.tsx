// app/tambah-materiil/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaSave,
  FaTimes,
  FaBarcode,
  FaBoxes,
  FaClipboardList,
  FaInfoCircle,
  FaImage,
  FaCalendarAlt,
  FaUserCog,
} from "react-icons/fa";
import QRCode from "qrcode";
import { useRouter } from "next/navigation";
import ButtonJenis from "./buttonjenis";
import ButtonTipe from "./buttontipe";
import { dummyKlasifikasiData } from "@/app/dummyData/dummyklasifikasidata";
import {
  PengajuanGroup,
  PengajuanItem,
} from "@/app/component/proseskodefikasitabel";
import Identifikasi from "../kodefikasi/identifikasi";
import Klasifikasi from "../kodefikasi/klasifikasi";

type SubComponent = {
  name: string;
  jumlah: number;
  serialNumber: string;
};

type SubGroup = {
  label: string;
  components: SubComponent[];
};

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

type Props = {
  onAjukanUsulan?: (group: PengajuanGroup) => void;
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
  defaultJenis?: string;
  defaultTipe?: string;
};

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 2000; y <= currentYear + 5; y++) {
    years.push(y.toString());
  }
  return years;
};

const getDefaultKode = () => "0";

const hitungPersen = (b: number, rr: number, rb: number): string => {
  const total = b + rr + rb;
  if (total === 0) return "0";
  return Math.round((b / total) * 100).toString();
};

const integerFields = [
  "bag", "unsr", "bid", "subBid", "subSubBid", "gol", "bidKlasifikasi",
  "kel", "subKel", "subSubKel", "jenis", "tipe", "urut",
];

// --- Styling konsisten dengan bg-gray-950 ---
const inputBaseClass = "w-full rounded-xl border border-white/10 bg-gray-950 px-3.5 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/20";
const inputNumberClass = inputBaseClass + " [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const textareaClass = inputBaseClass + " resize-y";
const selectClass = inputBaseClass + " cursor-pointer";
const badgeSectionClass = "inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-gray-800 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 dark:text-gray-300";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400";
const cardClass = "overflow-hidden rounded-2xl border border-white/10 bg-gray-950 shadow-sm";
const cardHeaderClass = "flex flex-col gap-3 border-b border-white/10 bg-gray-950 px-5 py-4 md:flex-row md:items-center md:justify-between";
const cardBodyClass = "space-y-6 px-4 py-5 md:px-5 md:py-6";
const sectionDividerClass = "space-y-3";
const chipInfoClass = "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300";

export default function TambahMateriilPage({
  onAjukanUsulan,
  initialData,
  initialKodefikasi,
  onBack,
  defaultJenis,
  defaultTipe,
}: Props) {
  const router = useRouter();
  const [items, setItems] = useState<ItemState[]>([]);
  const [serialNumbers, setSerialNumbers] = useState<string[][]>([]);
  const [qrItems, setQrItems] = useState<Record<number, string[]>>({});
  const [qrSets, setQrSets] = useState<Record<string, string>>({});
  const [qrComponents, setQrComponents] = useState<Record<string, string>>({});
  const [romawi, setRomawi] = useState("");
  const [title, setTitle] = useState("");
  const [authToken, setAuthToken] = useState<string | undefined>();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) setAuthToken(token);
    else console.warn("Token autentikasi tidak ditemukan.");
  }, []);

  const yearOptions = getYearOptions();
  const today = new Date().toISOString().slice(0, 10);

  const getUniqueOptions = (
    level: "gol" | "bid" | "kel" | "subKel" | "subSubKel",
    filters: { gol?: string; bid?: string; kel?: string; subKel?: string }
  ) => {
    let filtered = dummyKlasifikasiData;
    if (filters.gol && filters.gol !== "0") filtered = filtered.filter(item => item.gol.toString() === filters.gol);
    if (filters.bid && filters.bid !== "0") filtered = filtered.filter(item => item.bid.toString() === filters.bid);
    if (filters.kel && filters.kel !== "0") filtered = filtered.filter(item => item.kel.toString() === filters.kel);
    if (filters.subKel && filters.subKel !== "0") filtered = filtered.filter(item => item.subKel.toString() === filters.subKel);

    if (level === "gol") filtered = filtered.filter(item => item.gol !== 0 && item.bid === 0 && item.kel === 0 && item.subKel === 0 && item.subSubKel === 0);
    else if (level === "bid") filtered = filtered.filter(item => item.bid !== 0 && item.kel === 0 && item.subKel === 0 && item.subSubKel === 0);
    else if (level === "kel") filtered = filtered.filter(item => item.kel !== 0 && item.subKel === 0 && item.subSubKel === 0);
    else if (level === "subKel") filtered = filtered.filter(item => item.subKel !== 0 && item.subSubKel === 0);
    else filtered = filtered.filter(item => item.subSubKel !== 0);

    const unique = new Map();
    filtered.forEach(item => {
      let value, label;
      if (level === "gol") { value = item.gol; label = `${item.gol} - ${item.uraian}`; }
      else if (level === "bid") { value = item.bid; label = `${item.bid} - ${item.uraian}`; }
      else if (level === "kel") { value = item.kel; label = `${item.kel} - ${item.uraian}`; }
      else if (level === "subKel") { value = item.subKel; label = `${item.subKel} - ${item.uraian}`; }
      else { value = item.subSubKel; label = `${item.subSubKel} - ${item.uraian}`; }
      if (!unique.has(value)) unique.set(value, { value: value.toString(), label });
    });
    return Array.from(unique.values());
  };

  const createItemFromKodefikasi = (overrides?: Partial<ItemState>): ItemState => ({
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
    jenis: defaultJenis ?? getDefaultKode(),
    tipe: defaultTipe ?? getDefaultKode(),
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

  const ensureInteger = (value: any): string => {
    const intVal = parseInt(String(value), 10);
    return isNaN(intVal) ? "0" : intVal.toString();
  };

  useEffect(() => {
    if (initialData) {
      setItems(initialData.items.map((item: any) => {
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
          bidKlasifikasi: ensureInteger(item.bidKlasifikasi ?? getDefaultKode()),
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
      }));
    } else {
      setItems([createItemFromKodefikasi()]);
    }
  }, [initialData, defaultJenis, defaultTipe]);

  useEffect(() => {
    setSerialNumbers(prev => items.map((it, idx) => {
      const qty = Math.max(0, Number(it.jumlah) || 0);
      const existing = prev[idx] ?? [];
      return Array.from({ length: qty }, (_, j) => existing[j] ?? "");
    }));
  }, [items]);

  useEffect(() => {
    const generateItemQR = async () => {
      const map: Record<number, string[]> = {};
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const qty = item.jumlah || 0;
        const list: string[] = [];
        for (let j = 0; j < qty; j++) {
          const payload = { type: "item", name: item.name, merkType: item.merkType, jumlah: item.jumlah, satuan: item.satuan, unit: j + 1, serial: serialNumbers[i]?.[j] ?? "", uid: crypto.randomUUID() };
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
          const payload = { type: "set", parent: item.name, setIndex: g + 1, uid: crypto.randomUUID() };
          setMap[key] = await QRCode.toDataURL(JSON.stringify(payload));
          for (let c = 0; c < group.components.length; c++) {
            const comp = group.components[c];
            const compKey = `${i}-${g}-${c}`;
            const compPayload = { type: "component", parent: item.name, component: comp.name, serial: comp.serialNumber, uid: crypto.randomUUID() };
            compMap[compKey] = await QRCode.toDataURL(JSON.stringify(compPayload));
          }
        }
      }
      setQrSets(setMap);
      setQrComponents(compMap);
    };
    generateSetQR();
  }, [items]);

  const addItem = () => setItems(prev => [...prev, createItemFromKodefikasi()]);
  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
    setSerialNumbers(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof ItemState, value: any) => {
    setItems(prev => {
      const updated = [...prev];
      const item = { ...updated[index] };
      let processedValue = value;
      if (integerFields.includes(field)) processedValue = ensureInteger(value);
      (item as any)[field] = processedValue;

      if (field === "kondisiB" || field === "rr" || field === "rb") {
        const b = Number(field === "kondisiB" ? processedValue : item.kondisiB) || 0;
        const rr = Number(field === "rr" ? processedValue : item.rr) || 0;
        const rb = Number(field === "rb" ? processedValue : item.rb) || 0;
        item.persen = hitungPersen(b, rr, rb);
      }

      if (field === "satuan" && value === "set") {
        const qty = item.jumlah || 1;
        item.subGroups = Array.from({ length: qty }, (_, i) => ({ label: `${item.name || "Set"} ${i + 1}`, components: [{ name: "", jumlah: 1, serialNumber: "" }] }));
      } else if (field === "jumlah" && item.satuan === "set") {
        const newQty = Number(value);
        const existing = item.subGroups || [];
        const newGroups = Array.from({ length: newQty }, (_, i) => existing[i] || { label: `${item.name || "Set"} ${i + 1}`, components: [{ name: "", jumlah: 1, serialNumber: "" }] });
        item.subGroups = newGroups;
      }

      updated[index] = item;
      return updated;
    });
  };

  const updateSerialNumber = (itemIndex: number, snIndex: number, value: string) => {
    setSerialNumbers(prev => {
      const next = [...prev];
      const row = [...(next[itemIndex] || [])];
      row[snIndex] = value;
      next[itemIndex] = row;
      return next;
    });
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateItem(index, "gambar", reader.result as string);
    reader.readAsDataURL(file);
  };

  const addComponentToGroup = (itemIndex: number, groupIndex: number) => {
    setItems(prev => {
      const updated = [...prev];
      const item = { ...updated[itemIndex] };
      if (!item.subGroups) return prev;
      const group = { ...item.subGroups[groupIndex] };
      group.components = [...group.components, { name: "", jumlah: 1, serialNumber: "" }];
      item.subGroups[groupIndex] = group;
      updated[itemIndex] = item;
      return updated;
    });
  };

  const removeComponentFromGroup = (itemIndex: number, groupIndex: number, compIndex: number) => {
    setItems(prev => {
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

  const updateSubComponent = (itemIndex: number, groupIndex: number, compIndex: number, field: keyof SubComponent, value: string | number) => {
    setItems(prev => {
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

  const convertToPengajuanItems = (item: ItemState, snList: string[]): PengajuanItem[] => {
    const qty = item.jumlah;
    const result: PengajuanItem[] = [];
    for (let u = 0; u < qty; u++) {
      result.push({
        id: crypto.randomUUID(),
        bag: item.bag,
        unsr: item.unsr,
        bid: item.bid,
        subBid: item.subBid,
        subSubBid: item.subSubBid,
        gol: item.gol,
        bidKlasifikasi: item.bidKlasifikasi,
        kel: item.kel,
        subKel: item.subKel,
        subSubKel: item.subSubKel,
        jenis: item.jenis,
        tipe: item.tipe,
        urut: item.urut,
        name: qty > 1 ? `${item.name} - ${u + 1}` : item.name,
        merkType: item.merkType,
        serialNumbers: [snList[u] || ""],
        negaraPembuat: item.negaraPembuat,
        tahunPembuatan: item.tahunPembuatan,
        tahunPemakaian: item.tahunPemakaian,
        jumlah: 1,
        satuan: item.satuan,
        kondisiB: item.kondisiB,
        rr: item.rr,
        rb: item.rb,
        persen: item.persen,
        keterangan: item.keterangan,
        gambar: item.gambar,
        tanggalPengajuan: new Date().toISOString().slice(0, 10),
        status: "Menunggu",
      });
    }
    return result;
  };

  const handleAjukanUsulan = () => {
    if (!romawi.trim()) { alert("Harap isi Romawi (contoh: I, II, A)"); return; }
    if (!title.trim()) { alert("Harap isi Judul Kelompok"); return; }
    if (items.length === 0) { alert("Tidak ada item yang diajukan"); return; }

    const allPengajuanItems: PengajuanItem[] = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (!item.name.trim()) { alert(`Item #${i + 1} belum memiliki Nama Barang`); return; }
      const sns = serialNumbers[i] || [];
      const converted = convertToPengajuanItems(item, sns);
      allPengajuanItems.push(...converted);
    }

    const newGroup: PengajuanGroup = { romawi: romawi.trim(), title: title.trim(), items: allPengajuanItems };
    if (onAjukanUsulan) onAjukanUsulan(newGroup);
    if (onBack) onBack();
    else router.push("/pengajuan");
  };

  const handleCancel = () => {
    if (onBack) onBack();
    else router.back();
  };

  const totalUnits = items.reduce((sum, item) => sum + item.jumlah, 0);
  const tokenWarning = !authToken && (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
      ⚠️ Token autentikasi tidak ditemukan. Silakan login ulang agar data identifikasi dapat dimuat.
    </div>
  );

  return (
    <div className="w-full rounded-2xl bg-gray-950 shadow-xl overflow-hidden transition-all duration-300">
      {/* Header Form */}
      <div className="relative border-b border-white/10 bg-gray-950 px-5 py-4 md:px-7 md:py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
              <div className="flex flex-wrap gap-2 mt-2">
              <span className={chipInfoClass}><FaBoxes className="text-[11px]" /> Total Item: {items.length}</span>
              <span className={chipInfoClass}><FaBarcode /> Total Unit: {totalUnits}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex gap-2">
              <input type="text" placeholder="Romawi (I, II, A)" value={romawi} onChange={e => setRomawi(e.target.value)} className={inputBaseClass + " w-28"} />
              <input type="text" placeholder="Judul Kelompok" value={title} onChange={e => setTitle(e.target.value)} className={inputBaseClass + " flex-1"} />
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="max-h-[calc(100vh-240px)] overflow-y-auto px-4 py-5 md:px-7 md:py-6 custom-scrollbar">
        <div className="space-y-6">
          {tokenWarning}
          {items.map((item, idx) => (
            <div key={idx} className={cardClass}>
              <div className={cardHeaderClass}>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 font-bold shadow-sm">{idx + 1}</div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-100">Item #{idx + 1}</h3>
                    <p className="text-xs text-slate-500">Lengkapi seluruh komponen data barang pada item ini</p>
                  </div>
                </div>
                <button onClick={() => removeItem(idx)} className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-sm font-medium text-red-300 transition-all hover:border-red-500/50 hover:bg-red-500/20">
                  <FaTrash /> Hapus
                </button>
              </div>

              <div className={cardBodyClass}>
                {/* Identifikasi */}
                <div className={sectionDividerClass}>
                  <Identifikasi />
                </div>

                {/* Klasifikasi */}
                <div className={sectionDividerClass}>
                  <Klasifikasi />
                </div>

                {/* Jenis, Tipe, Urutan */}
                <div className={sectionDividerClass}>
                  <div className={badgeSectionClass}><FaBarcode /> Jenis & Tipe</div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-1">
                    <ButtonJenis item={item} updateItem={updateItem} idx={idx} />
                    <ButtonTipe item={item} updateItem={updateItem} idx={idx} />
                    <div className={badgeSectionClass}>Urutan</div>
                    <input type="number" step="1" min="0" placeholder="URUT" value={item.urut} onChange={e => updateItem(idx, "urut", e.target.value)} className={inputNumberClass} />
                  </div>
                </div>

                {/* Data Barang */}
                <div className={sectionDividerClass}>
                  <div className={badgeSectionClass}><FaBoxes /> Data Barang</div>
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
                    <input placeholder="Nama Barang *" value={item.name} onChange={e => updateItem(idx, "name", e.target.value)} className={inputBaseClass} required />
                    <input placeholder="Merk / Type" value={item.merkType} onChange={e => updateItem(idx, "merkType", e.target.value)} className={inputBaseClass} />
                    <input placeholder="Negara Pembuat" value={item.negaraPembuat} onChange={e => updateItem(idx, "negaraPembuat", e.target.value)} className={inputBaseClass} />
                    <select value={item.tahunPembuatan} onChange={e => updateItem(idx, "tahunPembuatan", e.target.value)} className={selectClass}><option value="">-- Tahun Buat --</option>{yearOptions.map(y => <option key={y}>{y}</option>)}</select>
                    <select value={item.tahunPemakaian} onChange={e => updateItem(idx, "tahunPemakaian", e.target.value)} className={selectClass}><option value="">-- Tahun Pakai --</option>{yearOptions.map(y => <option key={y}>{y}</option>)}</select>
                  </div>
                </div>

                {/* Satuan & Kondisi */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-gray-950 p-4">
                    <label className={labelClass}>Satuan</label>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <input type="number" min="1" value={item.jumlah} onChange={e => updateItem(idx, "jumlah", Number(e.target.value))} className={inputNumberClass + " w-full sm:w-28"} />
                      <select value={item.satuan} onChange={e => updateItem(idx, "satuan", e.target.value)} className={selectClass + " w-full sm:flex-1"}>
                        <option value="unit">Unit</option><option value="buah">Buah</option><option value="set">Set</option>
                      </select>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gray-950 p-4">
                    <label className={labelClass}>Kondisi</label>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      <input type="number" placeholder="B" value={item.kondisiB} onChange={e => updateItem(idx, "kondisiB", e.target.value)} className={inputNumberClass} />
                      <input type="number" placeholder="RR" value={item.rr} onChange={e => updateItem(idx, "rr", e.target.value)} className={inputNumberClass} />
                      <input type="number" placeholder="RB" value={item.rb} onChange={e => updateItem(idx, "rb", e.target.value)} className={inputNumberClass} />
                      <input type="text" placeholder="%" value={item.persen} readOnly className="cursor-not-allowed rounded-xl border border-white/10 bg-gray-950/50 px-3.5 py-2.5 text-sm text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Serial Numbers */}
                {item.jumlah > 0 && (
                  <div className="rounded-2xl border border-white/10 bg-gray-950 p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <label className={labelClass}><FaBarcode /> Nomor Seri per Unit</label>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-400">{item.jumlah} input</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {Array.from({ length: item.jumlah }).map((_, j) => (
                        <input key={j} type="text" placeholder={`Serial ${j + 1}`} value={serialNumbers[idx]?.[j] || ""} onChange={e => updateSerialNumber(idx, j, e.target.value)} className={inputBaseClass} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Keterangan & Gambar */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-gray-950 p-4">
                    <label className={labelClass}><FaInfoCircle /> Keterangan</label>
                    <textarea rows={3} value={item.keterangan} onChange={e => updateItem(idx, "keterangan", e.target.value)} className={textareaClass} />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gray-950 p-4">
                    <label className={labelClass}><FaImage /> Gambar</label>
                    <div className="flex flex-col gap-3">
                      <input type="file" accept="image/*" onChange={e => handleImageUpload(idx, e)} className="block w-full text-sm text-slate-400 file:mr-4 file:rounded-xl file:border-0 file:bg-emerald-500/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-emerald-300 hover:file:bg-emerald-500/20" />
                      {item.gambar && <div className="flex items-center gap-4"><img src={item.gambar} className="h-20 w-20 rounded-2xl border border-white/10 object-cover shadow-sm" alt="Preview" /><p className="text-xs text-slate-500">Preview gambar tersimpan.</p></div>}
                    </div>
                  </div>
                </div>

                {/* Tanggal & Konseptor */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-gray-950 p-4">
                    <label className={labelClass}><FaCalendarAlt /> Tanggal Update</label>
                    <input type="date" value={item.updateTanggal} onChange={e => updateItem(idx, "updateTanggal", e.target.value)} className={inputBaseClass} />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gray-950 p-4">
                    <label className={labelClass}><FaUserCog /> Konseptor</label>
                    <input type="text" value={item.konseptor} onChange={e => updateItem(idx, "konseptor", e.target.value)} className={inputBaseClass} />
                  </div>
                </div>

                {/* QR Preview */}
                {(qrItems[idx]?.[0] || qrSets) && (
                  <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-dashed border-white/10 bg-gray-950 p-4">
                    {qrItems[idx]?.[0] && <div className="rounded-2xl border border-white/10 bg-gray-950 p-2 shadow-sm"><img src={qrItems[idx][0]} className="h-14 w-14 rounded-xl object-contain" alt="QR Item" /></div>}
                  </div>
                )}

                {/* Set components */}
                {item.satuan === "set" && item.subGroups && (
                  <div className="space-y-4 rounded-2xl border border-white/10 bg-gray-950 p-4 md:p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-200"><FaBoxes /> Komponen dalam Set</h4>
                        <p className="text-xs text-slate-500">Kelola kelompok komponen dan nomor seri masing-masing.</p>
                      </div>
                      <span className="rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-400">{item.subGroups.length} grup</span>
                    </div>
                    <div className="space-y-4">
                      {item.subGroups.map((group, gIdx) => (
                        <div key={gIdx} className="overflow-hidden rounded-2xl border border-white/10 bg-gray-950 shadow-sm">
                          <div className="flex flex-col gap-3 border-b border-white/10 bg-gray-950 px-4 py-3 md:flex-row md:items-center md:justify-between">
                            <h5 className="text-sm font-semibold text-slate-200">{group.label}</h5>
                            <button onClick={() => addComponentToGroup(idx, gIdx)} className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20">
                              <FaPlus /> Tambah Komponen
                            </button>
                          </div>
                          <div className="space-y-3 p-4">
                            {group.components.map((comp, cIdx) => {
                              const compKey = `${idx}-${gIdx}-${cIdx}`;
                              return (
                                <div key={cIdx} className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-gray-950 p-3 md:grid-cols-12 md:items-center">
                                  <input placeholder="Nama Komponen" value={comp.name} onChange={e => updateSubComponent(idx, gIdx, cIdx, "name", e.target.value)} className={inputBaseClass + " md:col-span-5"} />
                                  <input type="number" min="1" value={comp.jumlah} onChange={e => updateSubComponent(idx, gIdx, cIdx, "jumlah", Number(e.target.value))} className={inputNumberClass + " md:col-span-2"} />
                                  <input placeholder="Serial" value={comp.serialNumber} onChange={e => updateSubComponent(idx, gIdx, cIdx, "serialNumber", e.target.value)} className={inputBaseClass + " md:col-span-4"} />
                                  <div className="flex items-center justify-between gap-3 md:col-span-1 md:justify-end">
                                    {qrComponents[compKey] && <img src={qrComponents[compKey]} className="h-10 w-10 rounded-xl border border-white/10 object-contain" alt="QR" />}
                                    <button onClick={() => removeComponentFromGroup(idx, gIdx, cIdx)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20"><FaTrash /></button>
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
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-dashed border-white/10 bg-gray-950 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Tambah Barang</h4>
              <p className="text-xs text-slate-500">Menambahkan item baru ke dalam struktur materiil.</p>
            </div>
            <button onClick={addItem} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-emerald-600 hover:to-emerald-700">
              <FaPlus /> Tambah Barang
            </button>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-white/10 bg-gray-950 px-5 py-4 md:px-7">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button onClick={handleCancel} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-gray-950 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-white/20 hover:bg-white/5 active:scale-95">
            <FaTimes /> Batal
          </button>
          <button onClick={handleAjukanUsulan} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-emerald-500 hover:to-emerald-600 hover:shadow-lg active:scale-95">
            <FaSave /> Ajukan Usulan
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1e1e1e; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #666; }
      `}</style>
    </div>
  );
}