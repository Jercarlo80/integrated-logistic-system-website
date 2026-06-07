"use client";

import { useState, useEffect } from "react";
import { useToken } from "@/app/hooks/useToken";

// Ikon untuk tipe barang (variatif)
const IkonElektronik = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 8h6M9 12h4M9 16h2" strokeLinecap="round" />
  </svg>
);
const IkonFurniture = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 18h16M6 14h12M8 10h8M10 6h4" strokeLinecap="round" />
    <rect x="6" y="10" width="12" height="8" rx="1" />
  </svg>
);
const IkonKendaraan = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M3 11h18l-2 5H5L3 11z" strokeLinecap="round" />
    <path d="M7 7h10l3 4" strokeLinecap="round" />
  </svg>
);
const IkonAlatTulis = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeLinejoin="round" />
  </svg>
);
const IkonLainnya = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v4l3 3" strokeLinecap="round" />
  </svg>
);

// Data dummy (nanti bisa fetch dari API)
const dummyTipe = [
  { id: 1, nama: "Elektronik", deskripsi: "Perangkat elektronik, komputer, gadget, dan komponen digital.", ikon: "elektronik", totalItem: 342, active: true },
  { id: 2, nama: "Furniture", deskripsi: "Meja, kursi, lemari, dan perlengkapan kantor/rumah tangga.", ikon: "furniture", totalItem: 178, active: true },
  { id: 3, nama: "Kendaraan", deskripsi: "Mobil, motor, alat berat, dan kendaraan operasional.", ikon: "kendaraan", totalItem: 56, active: true },
  { id: 4, nama: "Alat Tulis", deskripsi: "ATK, kertas, pena, dan perlengkapan kantor habis pakai.", ikon: "alatTulis", totalItem: 421, active: false },
  { id: 5, nama: "Peralatan Medis", deskripsi: "Alat kesehatan, diagnostic, dan laboratorium.", ikon: "lainnya", totalItem: 89, active: true },
  { id: 6, nama: "Bahan Baku", deskripsi: "Material mentah untuk produksi dan konstruksi.", ikon: "lainnya", totalItem: 213, active: false },
];

const pilihIkon = (tipe: string) => {
  switch (tipe) {
    case "elektronik": return <IkonElektronik />;
    case "furniture": return <IkonFurniture />;
    case "kendaraan": return <IkonKendaraan />;
    case "alatTulis": return <IkonAlatTulis />;
    default: return <IkonLainnya />;
  }
};

export default function TipeBarang() {
  const { token, isExpired } = useToken();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tipeList, setTipeList] = useState(dummyTipe);

  // Simulasi fetch data (seperti komponen lain)
  useEffect(() => {
    const fetchTipe = async () => {
      setLoading(true);
      try {
        // Ganti dengan panggilan API nyata jika tersedia
        // const res = await fetch("/api/v1/tipe-barang", { headers: { Authorization: `Bearer ${token}` } });
        // const data = await res.json();
        await new Promise(resolve => setTimeout(resolve, 800));
        setTipeList(dummyTipe);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTipe();
  }, [token]);

  const filtered = tipeList.filter(t => 
    t.nama.toLowerCase().includes(search.toLowerCase()) ||
    t.deskripsi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans text-slate-200">
      {/* Header dengan gaya uppercase */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <h1 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Tipe Barang
          </h1>
        </div>
        <div className="text-xs text-slate-500">
          {filtered.length} tipe tersedia
        </div>
      </div>

      {/* Search bar (sama dengan Jenis & Identifikasi) */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0a0f0d] px-4 py-2.5 transition-all focus-within:border-emerald-500/60 focus-within:shadow-[0_0_0_1px_rgba(16,185,129,0.2)]">
          <svg className="h-5 w-5 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari tipe barang (elektronik, furniture, kendaraan)..."
            className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-200">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Konten: loading, error, atau grid kartu */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="rounded-2xl border border-white/10 bg-[#0a0f0d] p-5 animate-pulse">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 rounded bg-white/10" />
                  <div className="h-4 w-full rounded bg-white/5" />
                  <div className="h-4 w-2/3 rounded bg-white/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-slate-300">Tidak ada tipe barang yang cocok</p>
          <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tipe) => (
            <div
              key={tipe.id}
              className="group rounded-2xl border border-white/10 bg-[#0a0f0d] p-5 transition-all duration-200 hover:border-emerald-500/40 hover:shadow-[0_0_20px_-8px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-xl p-2.5 ${tipe.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                  {pilihIkon(tipe.ikon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-100">
                      {tipe.nama}
                    </h2>
                    {tipe.active && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                    {tipe.deskripsi}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 12v8H4v-8M12 2v12m-3-3 3 3 3-3" strokeLinecap="round" />
                      </svg>
                      {tipe.totalItem} item terkait
                    </span>
                    <button className="rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-300 transition-all hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300">
                      Lihat detail
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Peringatan sesi kadaluwarsa */}
      {isExpired && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          ⚠️ Sesi Anda telah berakhir. Silakan login ulang untuk mengakses data terkini.
        </div>
      )}
    </div>
  );
}