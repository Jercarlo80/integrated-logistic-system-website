"use client";

import { useState, useEffect } from "react";
import { useToken } from "@/app/hooks/useToken";

// Ikon untuk masing-masing jenis (sesuaikan kebutuhan)
const IkonBarang = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.59 13.41 12 22l-9-9V3h9z" strokeLinejoin="round" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const IkonKlasifikasi = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 6h18M3 12h18M3 18h12" strokeLinecap="round" />
  </svg>
);
const IkonIdentifikasi = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" strokeLinecap="round" />
  </svg>
);
const IkonLainnya = () => (
  <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 8v4l3 3M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" />
  </svg>
);

// Data dummy (nanti bisa diambil dari API)
const dummyJenis = [
  { id: 1, nama: "Barang", deskripsi: "Klasifikasi untuk barang inventaris, aset tetap, dan persediaan.", ikon: "barang", totalItem: 1243, active: true },
  { id: 2, nama: "Jasa", deskripsi: "Kodefikasi untuk layanan, kontrak, dan pekerjaan non-fisik.", ikon: "lainnya", totalItem: 567, active: true },
  { id: 3, nama: "Konstruksi", deskripsi: "Pekerjaan bangunan, infrastruktur, dan proyek fisik.", ikon: "lainnya", totalItem: 892, active: true },
  { id: 4, nama: "Peralatan Khusus", deskripsi: "Alat berat, kendaraan, dan peralatan dengan karakteristik unik.", ikon: "barang", totalItem: 234, active: false },
];

const pilihIkon = (jenis: string) => {
  switch (jenis) {
    case "barang": return <IkonBarang />;
    case "klasifikasi": return <IkonKlasifikasi />;
    case "identifikasi": return <IkonIdentifikasi />;
    default: return <IkonLainnya />;
  }
};

export default function JenisKodefikasi() {
  const { token, isExpired } = useToken();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [jenisList, setJenisList] = useState(dummyJenis); // nanti fetch dari API

  // Simulasi fetch data (seperti komponen lain)
  useEffect(() => {
    const fetchJenis = async () => {
      setLoading(true);
      try {
        // Ganti dengan panggilan API nyata jika perlu
        // const res = await fetch("/api/v1/jenis", { headers: { Authorization: `Bearer ${token}` } });
        // const data = await res.json();
        await new Promise(resolve => setTimeout(resolve, 800)); // simulasi delay
        setJenisList(dummyJenis);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJenis();
  }, [token]);

  const filtered = jenisList.filter(j => 
    j.nama.toLowerCase().includes(search.toLowerCase()) ||
    j.deskripsi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 font-sans text-slate-200">
      {/* Header dengan gaya label uppercase */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <h1 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Jenis Kodefikasi
          </h1>
        </div>
        {/* Info jumlah total */}
        <div className="text-xs text-slate-500">
          {filtered.length} jenis tersedia
        </div>
      </div>

      {/* Search bar (mirip komponen Identifikasi) */}
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
            placeholder="Cari jenis kodefikasi (barang, jasa, konstruksi)..."
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
          {[1,2,3,4].map(i => (
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
          <p className="text-slate-300">Tidak ada jenis kodefikasi yang cocok</p>
          <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((jenis) => (
            <div
              key={jenis.id}
              className="group rounded-2xl border border-white/10 bg-[#0a0f0d] p-5 transition-all duration-200 hover:border-emerald-500/40 hover:shadow-[0_0_20px_-8px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-xl p-2.5 ${jenis.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                  {pilihIkon(jenis.ikon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-100">
                      {jenis.nama}
                    </h2>
                    {jenis.active && (
                      <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-400 leading-relaxed">
                    {jenis.deskripsi}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 12v8H4v-8M12 2v12m-3-3 3 3 3-3" strokeLinecap="round" />
                      </svg>
                      {jenis.totalItem} item terkait
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

      {/* Peringatan sesi kadaluwarsa (jika perlu) */}
      {isExpired && (
        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          ⚠️ Sesi Anda telah berakhir. Silakan login ulang untuk mengakses data terkini.
        </div>
      )}
    </div>
  );
}