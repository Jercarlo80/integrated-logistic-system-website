"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

type Lokasi = {
  name: string;
  /** [longitude, latitude] */
  coordinates: [number, number];
  /** Intensitas data 0..1 (opsional) untuk ukuran/warna titik. */
  value?: number;
};

type Props = {
  data?: Lokasi[];
  /** TopoJSON/GeoJSON peta Indonesia. */
  geoUrl?: string;
  /** Tujuan tombol "Detail Peta". */
  href?: string;
  /** Penyetelan proyeksi bila perlu menyesuaikan posisi peta. */
  scale?: number;
  center?: [number, number];
};

// Koordinat 30 satuan (perkiraan) — [lng, lat]
const LOKASI: Lokasi[] = [
  { name: "DKI Jakarta", coordinates: [106.8456, -6.2088] },
  { name: "Bekasi, Jawa Barat", coordinates: [106.9896, -6.2383] },
  { name: "Banda Aceh", coordinates: [95.3222, 5.5483] },
  { name: "Lhokseumawe", coordinates: [97.1413, 5.1801] },
  { name: "Meulaboh", coordinates: [96.1265, 4.1366] },
  { name: "Sabang", coordinates: [95.3137, 5.8945] },
  { name: "Medan", coordinates: [98.6722, 3.5952] },
  { name: "Padang", coordinates: [100.3543, -0.9471] },
  { name: "Pekanbaru", coordinates: [101.4478, 0.5071] },
  { name: "Tanjung Pinang", coordinates: [104.4485, 0.9186] },
  { name: "Palembang", coordinates: [104.7458, -2.9761] },
  { name: "Bandung", coordinates: [107.6098, -6.9175] },
  { name: "Semarang", coordinates: [110.4203, -6.9667] },
  { name: "Yogyakarta", coordinates: [110.3695, -7.7956] },
  { name: "Surabaya", coordinates: [112.7521, -7.2575] },
  { name: "Madiun", coordinates: [111.5239, -7.6298] },
  { name: "Malang", coordinates: [112.6304, -7.9666] },
  { name: "Balikpapan", coordinates: [116.8312, -1.2379] },
  { name: "Banjarmasin", coordinates: [114.5908, -3.3186] },
  { name: "Pontianak", coordinates: [109.3333, -0.0263] },
  { name: "Makassar", coordinates: [119.4221, -5.1477] },
  { name: "Manado", coordinates: [124.8455, 1.4748] },
  { name: "Denpasar", coordinates: [115.2126, -8.6705] },
  { name: "Kupang", coordinates: [123.607, -10.1772] },
  { name: "Atambua", coordinates: [124.8925, -9.1061] },
  { name: "Ambon", coordinates: [128.1908, -3.6954] },
  { name: "Jayapura", coordinates: [140.7181, -2.5337] },
  { name: "Sentani", coordinates: [140.4882, -2.5749] },
  { name: "Biak", coordinates: [136.0735, -1.181] },
  { name: "Sorong", coordinates: [131.2558, -0.8762] },
];

// Peta Indonesia (GeoJSON publik). Ganti/host sendiri bila perlu.
const DEFAULT_GEO_URL =
  "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia.geojson";

export default function CardLokasi({
  data = LOKASI,
  geoUrl = DEFAULT_GEO_URL,
  href = "#",
  scale = 1100,
  center = [118, -2.2],
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-white/[0.07] bg-slate-900/50 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
          Peta Sebaran Data Per Satuan
        </h2>
        {hovered && (
          <span className="hidden truncate rounded-md bg-white/[0.06] px-2 py-1 text-xs font-medium text-emerald-300 sm:inline">
            {hovered}
          </span>
        )}
      </div>

      {/* Peta */}
      <div className="relative flex-1 px-2 py-3 sm:px-3">
        {/* Legenda intensitas */}
        <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-col items-center gap-1 sm:left-4 sm:top-4">
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Tinggi
          </span>
          <div className="h-20 w-2 rounded-full bg-gradient-to-b from-red-500 via-amber-400 to-emerald-500" />
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Rendah
          </span>
        </div>

        <div className="h-64 w-full sm:h-72">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale, center }}
            width={820}
            height={380}
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="rgba(148,163,184,0.10)"
                    stroke="rgba(148,163,184,0.25)"
                    strokeWidth={0.4}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: "rgba(148,163,184,0.16)" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {data.map((loc) => {
              const isHover = hovered === loc.name;
              return (
                <Marker
                  key={loc.name}
                  coordinates={loc.coordinates}
                  onMouseEnter={() => setHovered(loc.name)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ default: { cursor: "pointer" } }}
                >
                  {/* halo */}
                  <circle
                    r={isHover ? 9 : 7}
                    fill="rgba(16,185,129,0.20)"
                    style={{ transition: "r .15s ease" }}
                  />
                  {/* titik */}
                  <circle
                    r={isHover ? 4 : 3}
                    fill="#34d399"
                    stroke="#0f172a"
                    strokeWidth={1}
                    style={{ transition: "r .15s ease" }}
                  />
                </Marker>
              );
            })}
          </ComposableMap>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] px-4 py-3 sm:px-5">
        <p className="text-sm text-slate-400">
          Total Satuan Aktif:{" "}
          <span className="font-semibold tabular-nums text-white">
            {data.length}
          </span>
        </p>
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          Detail Peta
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}