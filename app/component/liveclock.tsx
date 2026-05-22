"use client";

import { useEffect, useState } from "react";
import { IoCalendarClear, IoTime } from "react-icons/io5";
import { FaBox, FaUser } from "react-icons/fa";
import { ImBoxAdd, ImBoxRemove } from "react-icons/im";
import dynamic from "next/dynamic";
import PieChart from "../component/piechart";
import BarChart from "./doublebarchart";

const Maps = dynamic(() => import("../dashboard/maps"), { ssr: false });

export default function Layer() {
  const [time, setTime] = useState<Date>(new Date());
  const [activeStat, setActiveStat] = useState(0);

  /* ================= TIME ================= */
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const jakartaTime = new Date(
    time.toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
  );

  const pad = (n: number) => n.toString().padStart(2, "0");
  const timeString = `${pad(jakartaTime.getHours())}:${pad(
    jakartaTime.getMinutes()
  )}:${pad(jakartaTime.getSeconds())} WIB`;

  const fullDate = jakartaTime.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hours = jakartaTime.getHours();
  let greeting = "";
  let status = "";

  if (hours >= 7 && hours < 12) {
    greeting = "Selamat Bekerja";
    status = "Kerja Batch 1";
  } else if (hours >= 12 && hours < 13) {
    greeting = "Selamat Istirahat";
    status = "Istirahat";
  } else if (hours >= 13 && hours < 16) {
    greeting = "Selamat Bekerja";
    status = "Kerja Batch 2";
  } else {
    greeting = "Good Bye";
    status = "Waktu Pulang";
  }

  /* ================= STATS ================= */
  const stats = [
    { icon: FaBox, value: "240 Aset", label: "Total Aset" },
    { icon: ImBoxAdd, value: "200 Aset", label: "Aset Digudang" },
    { icon: ImBoxRemove, value: "40 Aset", label: "Aset Dipinjam" },
    { icon: FaUser, value: "10 Personel", label: "Total Personel" },
  ];

  /* ================= CHART ITEMS ================= */
  const statItems = [
    {
      label: "Personel",
      chart: (
        <PieChart
          title="Komposisi Personel"
          data={[
            { label: "TNI", value: 8, color: "#328E6E" },
            { label: "PNS", value: 2, color: "#6D9E51" },
          ]}
        />
      ),
    },
    {
      label: "Status Aset",
      chart: (
        <PieChart
          title="Status Aset"
          data={[
            { label: "Digudang", value: 200, color: "#328E6E" },
            { label: "Dipinjam", value: 40, color: "#EAB308" },
          ]}
        />
      ),
    },
    {
      label: "Materil Keluar",
      chart: (
        <BarChart
          title="Materil Keluar 7 Hari Terakhir"
          unit="item"
          data={[
            { date: "2026-02-13", value: 12 },
            { date: "2026-02-14", value: 8 },
            { date: "2026-02-15", value: 20 },
            { date: "2026-02-16", value: 15 },
            { date: "2026-02-17", value: 9 },
            { date: "2026-02-18", value: 14 },
            { date: "2026-02-19", value: 11 },
          ]}
        />
      ),
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold text-black mb-6">
        Data Dashboard
      </h1>

      {/* ================= TOP SECTION ================= */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* DATE & TIME */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-[320px]">
          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <IoCalendarClear size={32} className="text-[#328E6E]" />
            <div>
              <div className="text-xs text-black/70">Hari & Tanggal</div>
              <div className="text-sm font-semibold text-black">
                {fullDate}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4">
            <IoTime size={32} className="text-[#328E6E]" />
            <div>
              <div className="text-xs text-black/70">
                {greeting} — {status}
              </div>
              <div className="text-lg font-semibold text-black">
                {timeString}
              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS CARDS (FIXED & PRESISI) ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="
                  bg-white
                  rounded-xl
                  shadow-sm
                  p-5 md:p-6
                  min-h-[140px]
                  flex flex-col
                  items-center
                  justify-center
                  text-center
                  gap-3
                "
              >
                <Icon size={30} className="text-[#328E6E]" />

                <div className="text-lg md:text-xl font-semibold text-black leading-tight">
                  {item.value}
                </div>

                <div className="text-xs md:text-sm text-black/70">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        {/* MAP */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-black mb-4">
            Peta Lokasi
          </h2>
          <div className="w-full h-[260px] md:h-[360px] lg:h-[420px]">
            <Maps />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* SELECTOR */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-semibold text-black mb-4">
              Data Statistik
            </h2>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {statItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStat(i)}
                  className={`flex-none px-4 py-2 rounded-3xl text-sm font-semibold transition ${
                    activeStat === i
                      ? "bg-[#328E6E] text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* CHART PANEL */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 flex items-center justify-center">
            {statItems[activeStat].chart}
          </div>
        </div>
      </div>
    </div>
  );
}