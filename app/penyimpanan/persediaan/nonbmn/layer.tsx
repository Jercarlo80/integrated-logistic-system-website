"use client";

import React, { useState, useEffect } from "react";
import SearchBar from "../../../../component/searchbar";
import { FaChevronDown } from "react-icons/fa";
import { TbHexagonNumber1Filled, TbHexagonNumber2Filled } from "react-icons/tb";
import MaterilTable, { MaterilGroup, MaterilItem } from "@/app/component/materiltable"; // sesuaikan path
// Jika diperlukan, impor juga komponen tabel lain (TabelAlkomlekDanAlduk, TabelSukuCadang) sudah tidak digunakan.

// Data satuan dari soal (kolom ke-6 adalah nama satuan)
const SATUAN_LIST = [
  { kode: "1.3.1.4.1.0", nama: "DISKOM" },
  { kode: "1.3.1.4.2.0", nama: "DISLEK" },
  { kode: "1.3.1.4.3.0", nama: "DISPERNIKA" },
  { kode: "1.3.1.4.4.0", nama: "DENKOMYANLAP" },
  { kode: "1.3.1.4.5.0", nama: "DENKOMLAOPS" },
  { kode: "1.3.1.4.6.0", nama: "DENPERNIKA" },
  { kode: "1.3.1.4.7.0", nama: "DENKONHARSTAL" },
  { kode: "1.3.1.4.8.0", nama: "DENGUDBEK" },
  { kode: "1.3.1.4.9.0", nama: "DENKOMSAT" },
  { kode: "1.3.1.4.10.0", nama: "DENKOMLEKSTRADA BANDA ACEH" },
  { kode: "1.3.1.4.11.0", nama: "SUBDEN LHOKSEUMAWE" },
  { kode: "1.3.1.4.12.0", nama: "SUBDEN MEULABOH" },
  { kode: "1.3.1.4.13.0", nama: "SUBDEN SABANG" },
  { kode: "1.3.1.4.14.0", nama: "DENKOMLEKSTRADA MEDAN" },
  { kode: "1.3.1.4.15.0", nama: "SUBDEN PADANG" },
  { kode: "1.3.1.4.16.0", nama: "SUBDEN PEKANBARU" },
  { kode: "1.3.1.4.17.0", nama: "SUBDEN TANJUNG PINANG" },
  { kode: "1.3.1.4.18.0", nama: "DENKOMLEKSTRADA PALEMBANG" },
  { kode: "1.3.1.4.19.0", nama: "DENKOMLEKSTRADA BANDUNG" },
  { kode: "1.3.1.4.20.0", nama: "DENKOMLEKSTRADA SEMARANG" },
  { kode: "1.3.1.4.21.0", nama: "SUBDEN YOGYAKARTA" },
  { kode: "1.3.1.4.22.0", nama: "DENKOMLEKSTRADA SURABAYA" },
  { kode: "1.3.1.4.23.0", nama: "SUBDEN MADIUN" },
  { kode: "1.3.1.4.24.0", nama: "SUBDEN MALANG" },
  { kode: "1.3.1.4.25.0", nama: "DENKOMLEKSTRADA BALIKPAPAN" },
  { kode: "1.3.1.4.26.0", nama: "SUBDEN BANJARMASIN" },
  { kode: "1.3.1.4.27.0", nama: "DENKOMLEKSTRADA PONTIANAK" },
  { kode: "1.3.1.4.28.0", nama: "DENKOMLEKSTRADA MAKASAR" },
  { kode: "1.3.1.4.29.0", nama: "DENKOMLEKSTRADA MANADO" },
  { kode: "1.3.1.4.30.0", nama: "DENKOMLEKSTRADA DENPASAR" },
  { kode: "1.3.1.4.31.0", nama: "SUBDEN KUPANG" },
  { kode: "1.3.1.4.32.0", nama: "SUBDEN ATAMBUA" },
  { kode: "1.3.1.4.33.0", nama: "DENKOMLEKSTRADA AMBON" },
  { kode: "1.3.1.4.34.0", nama: "DENKOMLEKSTRADA JAYAPURA" },
  { kode: "1.3.1.4.35.0", nama: "SUBDEN SENTANI" },
  { kode: "1.3.1.4.36.0", nama: "SUBDEN BIAK" },
  { kode: "1.3.1.4.37.0", nama: "DENKOMLEKSTRADA SORONG" },
];

export default function Layer() {
  const [selectedSatuan, setSelectedSatuan] = useState<string>(SATUAN_LIST[0]?.nama || "");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [now, setNow] = useState(new Date());
  const [openWeek, setOpenWeek] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  // State untuk data MaterilTable (bisa diisi dari API nantinya)
  const [materilData, setMaterilData] = useState<MaterilGroup[]>([]);

  useEffect(() => {
    const i = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(i);
  }, []);

  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const weeks: { index: number; start: number; end: number }[] = [];
  let day = 1;
  let weekIndex = 1;

  while (day <= daysInMonth) {
    const start = day;
    const end = Math.min(
      day + 6 - (weekIndex === 1 ? firstDay : 0),
      daysInMonth,
    );
    weeks.push({ index: weekIndex, start, end });
    day = end + 1;
    weekIndex++;
  }

  const today = now.getDate();
  const currentWeek =
    weeks.find((w) => today >= w.start && today <= w.end)?.index || 1;

  useEffect(() => {
    setSelectedWeek(currentWeek);
  }, [currentWeek]);

  // Fungsi untuk mengambil data Materiil berdasarkan satuan (simulasi)
  // Ganti dengan panggilan API nyata jika diperlukan
  const fetchMaterilData = (satuan: string) => {
    // Contoh: return data dummy sesuai satuan
    // Di sini bisa dilakukan fetch ke backend
    console.log("Fetch data untuk satuan:", satuan);
    // Untuk demo, kita buat data dummy
    const dummyData: MaterilGroup[] = [
      {
        romawi: "I",
        title: `Kelompok Alat Berat - ${satuan}`,
        items: [
          {
            name: "Excavator",
            merkType: "Komatsu",
            serialNumbers: ["SN12345"],
            jumlah: 1,
            satuan: "unit",
            kondisiB: "Baik",
            rr: "5%",
            rb: "10%",
            persen: "100%",
            keterangan: "Contoh data",
            updateTanggal: "2025-01-01",
            konseptor: "Admin",
            gambar: "",
            qrCode: "",
            bag: "1.0",
            unsr: "3.0",
            bid: "1.0",
            subBid: "4.0",
            subSubBid: "9.0",
            gol: "3.0",
            bidKlasifikasi: "6.0",
            kel: "3.0",
            subKel: "10.0",
            subSubKel: "0.0",
            jenis: "1.0",
            tipe: "1.0",
            urut: "1.0",
            negaraPembuat: "Jepang",
            tahunPembuatan: "2021",
            tahunPemakaian: "2022",
          },
        ],
      },
    ];
    setMaterilData(dummyData);
  };

  // Panggil fetch ketika selectedSatuan berubah
  useEffect(() => {
    if (selectedSatuan) {
      fetchMaterilData(selectedSatuan);
    }
  }, [selectedSatuan]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-xl md:text-2xl text-black font-bold mb-4">
        Data Total Materiil
      </h1>
      <div className="w-full flex flex-col gap-y-6 mt-4 md:mt-6 mb-6">
        <div className="w-full flex flex-col bg-white shadow-lg rounded-xl overflow-visible">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-6 py-4 border-b">
            <h1 className="text-base md:text-lg text-black font-bold">
              MAT ALKOM SATKOMLEK TNI
            </h1>
            <div className="w-full md:w-auto">
              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Cari item..."
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 md:py-6 px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
              <div className="flex items-center gap-4 bg-white border rounded-xl px-5 py-4 shadow-sm">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#EAF4EF]">
                  <TbHexagonNumber1Filled size={40} color="#328E6E" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">300</span>
                  <span className="text-sm text-gray-500">
                    MAT ALKOM SATKOMLEK TNI
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white border rounded-xl px-5 py-4 shadow-sm">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-[#EAF4EF]">
                  <TbHexagonNumber2Filled size={40} color="#328E6E" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900">300</span>
                  <span className="text-sm text-gray-500">
                    Total Suku Cadang
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setOpenWeek(!openWeek)}
                className="flex items-center justify-between gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm text-gray-600">
                  Minggu ke-{selectedWeek}
                </span>
                <FaChevronDown className="text-[#328E6E]" />
              </button>
              {openWeek && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                  {weeks.map((w) => (
                    <div
                      key={w.index}
                      onClick={() => {
                        setSelectedWeek(w.index);
                        setOpenWeek(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        selectedWeek === w.index
                          ? "bg-[#EAF4EF] text-[#328E6E]"
                          : "text-gray-700"
                      }`}
                    >
                      Minggu ke-{w.index} ({w.start}-{w.end})
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dropdown Satuan Kerja (Pengganti Tab) */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Satuan Kerja
            </label>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:w-80 flex items-center justify-between gap-2 px-4 py-2 border rounded-lg bg-white hover:bg-gray-50"
              >
                <span className="text-sm text-gray-700">{selectedSatuan}</span>
                <FaChevronDown className="text-[#328E6E]" />
              </button>
              {isOpen && (
                <div className="absolute left-0 mt-2 w-full md:w-80 bg-white border rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                  {SATUAN_LIST.map((satuan) => (
                    <div
                      key={satuan.kode}
                      onClick={() => {
                        setSelectedSatuan(satuan.nama);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        selectedSatuan === satuan.nama
                          ? "bg-[#EAF4EF] text-[#328E6E]"
                          : "text-gray-700"
                      }`}
                    >
                      {satuan.nama}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Menampilkan MaterilTable untuk satuan yang dipilih */}
          {selectedSatuan && (
            <div className="mt-6">
              <MaterilTable
                title={`Data Materiil - ${selectedSatuan}`}
                exportFileName={`materiil_${selectedSatuan.replace(/\s/g, "_")}`}
                year={year}
                month={month}
                selectedWeek={selectedWeek}
                data={materilData}
                setData={setMaterilData}
                // onDeleteMateril dapat ditambahkan jika perlu
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}