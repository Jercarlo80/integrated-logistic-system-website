"use client";

import React, { useState, useEffect, useMemo } from "react";
import MaterilTable, { MaterilGroup } from "@/app/component/materiltable";
import DropDownKode, { BaseItem } from "@/app/component/dropdownkode";

// ======================== TYPE DEFINITIONS ========================
type BidItem = BaseItem & { golonganKode: string };
type KelompokItem = BaseItem & { golonganKode: string; bidKode: string };
type SubKelItem = BaseItem & {
  golonganKode: string;
  bidKode: string;
  kelKode: string;
};
type SubSubKelItem = BaseItem & {
  golonganKode: string;
  bidKode: string;
  kelKode: string;
  subKelKode: string;
};

export default function Layer() {
  // Data Materiil (biasanya berasal dari API)
  const [fullData, setFullData] = useState<MaterilGroup[]>([]);

  // Data Master (untuk dropdown) — semuanya kosong, bisa diisi dari API
  const [satuanList, setSatuanList] = useState<BaseItem[]>([]);
  const [golonganList, setGolonganList] = useState<BaseItem[]>([]);
  const [bidList, setBidList] = useState<BidItem[]>([]);
  const [kelompokList, setKelompokList] = useState<KelompokItem[]>([]);
  const [subKelList, setSubKelList] = useState<SubKelItem[]>([]);
  const [subSubKelList, setSubSubKelList] = useState<SubSubKelItem[]>([]);

  // State pilihan dropdown
  const [selectedSatuan, setSelectedSatuan] = useState<BaseItem | null>(null);
  const [selectedGolongan, setSelectedGolongan] = useState<BaseItem | null>(null);
  const [selectedBid, setSelectedBid] = useState<BidItem | null>(null);
  const [selectedKelompok, setSelectedKelompok] = useState<KelompokItem | null>(null);
  const [selectedSubKel, setSelectedSubKel] = useState<SubKelItem | null>(null);
  const [selectedSubSubKel, setSelectedSubSubKel] = useState<SubSubKelItem | null>(null);

  const [open, setOpen] = useState({
    satuan: false,
    golongan: false,
    bid: false,
    kelompok: false,
    subKel: false,
    subSubKel: false,
  });

  // Filter data materiil berdasarkan pilihan klasifikasi
  const filteredData = useMemo(() => {
    if (!selectedGolongan) return fullData;

    return fullData
      .map((group) => {
        const filteredItems = group.items.filter((item) => {
          let match = true;
          if (selectedGolongan && item.gol !== selectedGolongan.kode) match = false;
          if (selectedBid && item.bidKlasifikasi !== selectedBid.kode) match = false;
          if (selectedKelompok && item.kel !== selectedKelompok.kode) match = false;
          if (selectedSubKel && item.subKel !== selectedSubKel.kode) match = false;
          if (selectedSubSubKel && item.subSubKel !== selectedSubSubKel.kode) match = false;
          return match;
        });
        if (filteredItems.length > 0) {
          return { ...group, items: filteredItems };
        }
        return null;
      })
      .filter((group) => group !== null) as MaterilGroup[];
  }, [fullData, selectedGolongan, selectedBid, selectedKelompok, selectedSubKel, selectedSubSubKel]);

  // Filter data untuk dropdown (hierarkis)
  const filteredBid = useMemo(() => {
    return selectedGolongan
      ? bidList.filter((b) => b.golonganKode === selectedGolongan.kode)
      : [];
  }, [selectedGolongan, bidList]);

  const filteredKelompok = useMemo(() => {
    return selectedBid
      ? kelompokList.filter(
          (k) =>
            k.golonganKode === selectedGolongan?.kode &&
            k.bidKode === selectedBid.kode,
        )
      : [];
  }, [selectedBid, selectedGolongan, kelompokList]);

  const filteredSubKel = useMemo(() => {
    return selectedKelompok
      ? subKelList.filter(
          (sk) =>
            sk.golonganKode === selectedGolongan?.kode &&
            sk.bidKode === selectedBid?.kode &&
            sk.kelKode === selectedKelompok.kode,
        )
      : [];
  }, [selectedGolongan, selectedBid, selectedKelompok, subKelList]);

  const filteredSubSubKel = useMemo(() => {
    return selectedSubKel
      ? subSubKelList.filter(
          (ssk) =>
            ssk.golonganKode === selectedGolongan?.kode &&
            ssk.bidKode === selectedBid?.kode &&
            ssk.kelKode === selectedKelompok?.kode &&
            ssk.subKelKode === selectedSubKel.kode,
        )
      : [];
  }, [selectedGolongan, selectedBid, selectedKelompok, selectedSubKel, subSubKelList]);

  // Reset child dropdown ketika parent berubah
  useEffect(() => {
    setSelectedBid(null);
    setSelectedKelompok(null);
    setSelectedSubKel(null);
    setSelectedSubSubKel(null);
  }, [selectedGolongan]);

  useEffect(() => {
    setSelectedKelompok(null);
    setSelectedSubKel(null);
    setSelectedSubSubKel(null);
  }, [selectedBid]);

  useEffect(() => {
    setSelectedSubKel(null);
    setSelectedSubSubKel(null);
  }, [selectedKelompok]);

  useEffect(() => {
    setSelectedSubSubKel(null);
  }, [selectedSubKel]);

  // Objek kodefikasi untuk diisi otomatis ke FormTambahMateriil (jika digunakan)
  const initialKodefikasi = useMemo(
    () => ({
      bag: selectedSatuan?.kode || "",
      unsr: selectedSatuan?.kode || "",
      bid: selectedBid?.kode || "",
      subBid: selectedKelompok?.kode || "",
      subSubBid: selectedSubKel?.kode || "",
      gol: selectedGolongan?.kode || "",
      bidKlasifikasi: selectedBid?.kode || "",
      kel: selectedKelompok?.kode || "",
      subKel: selectedSubKel?.kode || "",
      subSubKel: selectedSubSubKel?.kode || "",
    }),
    [
      selectedSatuan,
      selectedBid,
      selectedKelompok,
      selectedSubKel,
      selectedSubSubKel,
      selectedGolongan,
    ],
  );

  const tableTitle = `${selectedGolongan?.nama ?? "-"} - ${selectedBid?.nama ?? "-"} - ${selectedKelompok?.nama ?? "-"} - ${selectedSubKel?.nama ?? "-"} - ${selectedSubSubKel?.nama ?? "-"}`;

  const toggleOpen = (key: keyof typeof open) => {
    setOpen((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const closeAllDropdowns = () => {
    setOpen({
      satuan: false,
      golongan: false,
      bid: false,
      kelompok: false,
      subKel: false,
      subSubKel: false,
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 p-4 md:p-6">
      <div className="w-full">
        <div className="mb-6 w-full rounded-2xl border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur">
          <h1 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">
            Sistem Kodefikasi Data Materiil Satkomlek TNI
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Pilih struktur kodefikasi secara bertahap dari identifikasi hingga
            klasifikasi.
          </p>
        </div>

        <div className="space-y-6 w-full">
          {/* IDENTIFIKASI */}
          <section className="w-full rounded-2xl border border-gray-200 bg-white shadow-md">
            <div className="border-b border-gray-100 px-5 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4EF] text-[#328E6E] font-bold">
                  1
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900 md:text-lg">
                    Identifikasi
                  </h2>
                  <p className="text-sm text-gray-500">
                    Menentukan satuan kerja sebagai dasar identifikasi data.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-5 md:p-6">
              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <DropDownKode
                  label="Satuan"
                  data={satuanList}
                  selected={selectedSatuan}
                  setSelected={setSelectedSatuan}
                  isOpen={open.satuan}
                  setIsOpen={() => toggleOpen("satuan")}
                />
              </div>
            </div>
          </section>

          {/* KLASIFIKASI */}
          <section className="w-full rounded-2xl border border-gray-200 bg-white shadow-md">
            <div className="border-b border-gray-100 px-5 py-4 md:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4EF] text-[#328E6E] font-bold">
                  2
                </div>
                <div>
                  <h2 className="text-base font-semibold text-gray-900 md:text-lg">
                    Klasifikasi
                  </h2>
                  <p className="text-sm text-gray-500">
                    Susun klasifikasi secara hierarkis: golongan, bidang,
                    kelompok, sub kelompok, dan sub sub kelompok.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-5 md:p-6">
              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                <DropDownKode
                  label="Golongan"
                  data={golonganList}
                  selected={selectedGolongan}
                  setSelected={setSelectedGolongan}
                  isOpen={open.golongan}
                  setIsOpen={() => toggleOpen("golongan")}
                />

                <DropDownKode
                  label="Bidang"
                  data={filteredBid}
                  selected={selectedBid}
                  setSelected={setSelectedBid}
                  isOpen={open.bid}
                  setIsOpen={() => toggleOpen("bid")}
                  disabled={!filteredBid.length}
                />

                <DropDownKode
                  label="Kelompok"
                  data={filteredKelompok}
                  selected={selectedKelompok}
                  setSelected={setSelectedKelompok}
                  isOpen={open.kelompok}
                  setIsOpen={() => toggleOpen("kelompok")}
                  disabled={!filteredKelompok.length}
                />

                <DropDownKode
                  label="Sub Kelompok"
                  data={filteredSubKel}
                  selected={selectedSubKel}
                  setSelected={setSelectedSubKel}
                  isOpen={open.subKel}
                  setIsOpen={() => toggleOpen("subKel")}
                  disabled={!filteredSubKel.length}
                />

                <DropDownKode
                  label="Sub Sub Kelompok"
                  data={filteredSubSubKel}
                  selected={selectedSubSubKel}
                  setSelected={setSelectedSubSubKel}
                  isOpen={open.subSubKel}
                  setIsOpen={() => toggleOpen("subSubKel")}
                  disabled={!filteredSubSubKel.length}
                />
              </div>

              <div className="mt-6 w-full rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-4">
                <p className="text-sm font-medium text-gray-700">
                  Hierarki aktif:
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-full bg-white px-3 py-1 text-gray-700 border border-gray-200">
                    {selectedSatuan
                      ? `${selectedSatuan.kode} | ${selectedSatuan.nama}`
                      : "Satuan belum dipilih"}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-gray-700 border border-gray-200">
                    {selectedGolongan
                      ? `${selectedGolongan.kode} | ${selectedGolongan.nama}`
                      : "Golongan belum dipilih"}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-gray-700 border border-gray-200">
                    {selectedBid
                      ? `${selectedBid.kode} | ${selectedBid.nama}`
                      : "Bidang belum dipilih"}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-gray-700 border border-gray-200">
                    {selectedKelompok
                      ? `${selectedKelompok.kode} | ${selectedKelompok.nama}`
                      : "Kelompok belum dipilih"}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-gray-700 border border-gray-200">
                    {selectedSubKel
                      ? `${selectedSubKel.kode} | ${selectedSubKel.nama}`
                      : "Sub Kelompok belum dipilih"}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-gray-700 border border-gray-200">
                    {selectedSubSubKel
                      ? `${selectedSubSubKel.kode} | ${selectedSubSubKel.nama}`
                      : "Sub Sub Kelompok belum dipilih"}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 w-full rounded-2xl border border-gray-200 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 md:px-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Hasil Data Materiil
              </h3>
              <p className="text-sm text-gray-500">
                {!selectedGolongan
                  ? "Menampilkan semua data (belum ada filter klasifikasi)"
                  : `Filter: ${tableTitle}`}
              </p>
            </div>
            <button
              type="button"
              onClick={closeAllDropdowns}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-[#328E6E] hover:text-[#328E6E]"
            >
              Tutup Semua Dropdown
            </button>
          </div>

          <div className="w-full p-4 md:p-6">
            <MaterilTable
              title="Data Materiil"
              exportFileName="materil"
              year={2025}
              month={1}
              selectedWeek={1}
              data={filteredData}
              setData={setFullData} // Karena kita menggunakan state fullData, setData bisa digunakan untuk update dari dalam tabel (misalnya hapus/edit)
              initialKodefikasi={initialKodefikasi}
            />
          </div>
        </div>
      </div>
    </div>
  );
}