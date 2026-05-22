"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpenText,
  ChevronDown,
  ChevronRight,
  Command,
  FileText,
  Layers3,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  ScrollText,
  Bookmark,
  LayoutDashboard,
  Activity,
} from "lucide-react";

type SubBab = {
  nomor: string;
  judul: string;
  halaman: number;
  konten: string;
};

type Bab = {
  id: number;
  judul: string;
  subBab: SubBab[];
};

type ParsedItem = {
  label: string;
  text: string;
};

export default function BukuReferensiPremium() {
  const dataBuku: Bab[] = [
    {
      id: 1,
      judul: "BAB I PENDAHULUAN",
      subBab: [
        {
          nomor: "1",
          judul: "Umum",
          halaman: 4,
          konten: `A. Perkembangan lingkungan strategis global dan nasional yang ditandai dengan kemajuan pesat teknologi komunikasi, informasi, dan elektronika telah mendorong transformasi sistem pertahanan menuju pola operasi yang terintegrasi dan berbasis jaringan.
B. Tentara Nasional Indonesia (TNI) dituntut untuk memiliki sistem dukungan yang mampu menjamin keterpaduan data, kecepatan distribusi informasi, serta efektivitas komando dan kendali dalam pelaksanaan operasi militer, baik dalam Operasi Militer Perang (OMP) maupun Operasi Militer Selain Perang (OMSP).`,
        },
        {
          nomor: "2",
          judul: "Maksud dan Tujuan",
          halaman: 5,
          konten: `A. Menyediakan acuan baku bagi seluruh satuan kerja di lingkungan TNI dalam mengelola sistem informasi dan data pertahanan.
B. Menciptakan keseragaman interpretasi terhadap kebijakan pengelolaan data.
C. Meningkatkan efektivitas dukungan informasi bagi proses pengambilan keputusan.
D. Mewujudkan interoperabilitas sistem antar satuan.
E. Menjamin keamanan dan keutuhan data strategis.`,
        },
        {
          nomor: "3",
          judul: "Ruang Lingkup dan Tata Unit",
          halaman: 5,
          konten: `A. Ruang lingkup buku ini mencakup ketentuan umum, organisasi, tata kelola data, standarisasi, sistem informasi, pengawasan, serta pemeliharaan data.
B. Tata unit yang diatur meliputi: Staf Umum, Staf Intelijen, Staf Operasi, Staf Personel, Staf Logistik, dan Staf Perencanaan.
C. Setiap unit memiliki peran spesifik dalam siklus hidup data mulai dari akuisisi, pengolahan, penyimpanan, distribusi, hingga pemusnahan.`,
        },
        {
          nomor: "4",
          judul: "Dasar",
          halaman: 5,
          konten: `A. Undang-Undang Nomor 34 Tahun 2004 tentang Tentara Nasional Indonesia.
B. Peraturan Presiden Nomor 62 Tahun 2016 tentang Sistem Informasi Pertahanan.
C. Keputusan Panglima TNI Nomor 08/V/2020 tentang Kebijakan Pengelolaan Data Pertahanan.
D. Doktrin TNI "Tri Dharma Eka Karma" versi terbaru.
E. Standar Nasional Indonesia (SNI) terkait tata kelola data dan informasi.`,
        },
        {
          nomor: "5",
          judul: "Pengertian",
          halaman: 7,
          konten: `A. Data adalah kumpulan fakta mentah yang belum diolah.
B. Informasi adalah data yang telah diproses menjadi bentuk bermakna.
C. Sistem informasi adalah kombinasi prosedur, personel, perangkat keras, lunak, dan jaringan.
D. Interoperabilitas adalah kemampuan sistem untuk saling bertukar dan menggunakan data.
E. Keamanan data adalah upaya melindungi data dari akses, modifikasi, atau perusakan tidak sah.`,
        },
        {
          nomor: "6",
          judul: "Kedudukan",
          halaman: 7,
          konten: `A. Buku referensi ini merupakan pedoman teknis yang bersifat mengikat bagi seluruh jajaran TNI dalam melaksanakan pengelolaan data dan informasi pertahanan.
B. Kedudukannya lebih tinggi dari petunjuk teknis satuan, namun berada di bawah kebijakan strategis Panglima TNI.
C. Seluruh penyimpangan dari ketentuan buku ini harus mendapatkan persetujuan tertulis dari Mabes TNI melalui Staf Operasi.`,
        },
      ],
    },

    {
      id: 2,
      judul: "BAB II KETENTUAN-KETENTUAN",
      subBab: [
        {
          nomor: "7",
          judul: "Umum",
          halaman: 7,
          konten: `A. Setiap satuan kerja di lingkungan TNI wajib menerapkan prinsip tata kelola data yang baik (good data governance).
B. Data pertahanan diklasifikasikan menjadi data publik, data internal terbatas, data rahasia, dan data sangat rahasia.
C. Penggunaan data lintas satuan harus didasarkan pada perjanjian kerja sama yang disahkan oleh komando atas.`,
        },
        {
          nomor: "8",
          judul: "Tujuan dan Sasaran",
          halaman: 7,
          konten: `A. Tujuan operasional sistem informasi pertahanan adalah tercapainya kondisi satu data TNI.
B. Waktu respons informasi kurang dari 2 menit untuk tingkat strategis.
C. Tingkat akurasi data di atas 98%.
D. Ketersediaan sistem 99,9% per tahun.`,
        },
        {
          nomor: "9",
          judul: "Asas-asas dan Prinsip",
          halaman: 8,
          konten: `A. Asas Nusantara: kesatuan data seluruh wilayah.
B. Asas Hierarkis: sesuai rantai komando.
C. Asas Keterpaduan: integrasi antar matra.
D. Prinsip keamanan terintegrasi sejak awal (security by design).`,
        },
      ],
    },

    {
      id: 3,
      judul: "BAB III ORGANISASI, TUGAS DAN TANGGUNG JAWAB",
      subBab: [
        {
          nomor: "10",
          judul: "Struktur Organisasi",
          halaman: 12,
          konten: `A. Struktur organisasi pengelola data pertahanan terdiri atas Komite Data TNI sebagai pengarah kebijakan.
B. Pusat Data dan Informasi TNI sebagai pelaksana teknis.
C. Unit Pengelola Data di setiap Kotama.`,
        },

        {
          nomor: "11",
          judul: "Pengorganisasian",
          halaman: 14,
          konten: `A. Pengorganisasian dilakukan secara matriks.
B. Setiap UPD dipimpin oleh perwira menengah dengan kualifikasi khusus di bidang teknologi informasi.
C. Personel pelaksana terdiri dari operator data, administrator basis data, analis keamanan, dan pengembang antarmuka.`,
        },
      ],
    },

    {
      id: 4,
      judul: "BAB IV TAHAPAN PENYELENGGARAAN",
      subBab: [
        {
          nomor: "12",
          judul: "Tahap Perencanaan",
          halaman: 19,
          konten: `A. Analisis kebutuhan data setiap satuan.
B. Penyusunan blueprint sistem.
C. Identifikasi sumber daya dan pemetaan risiko.`,
        },

        {
          nomor: "13",
          judul: "Tahap Persiapan",
          halaman: 20,
          konten: `A. Pengadaan infrastruktur keras dan lunak.
B. Instalasi jaringan komunikasi khusus.
C. Pelatihan personel dan uji coba terbatas.`,
        },

        {
          nomor: "14",
          judul: "Tahap Pelaksanaan",
          halaman: 21,
          konten: `A. Operasionalisasi penuh sistem.
B. Pengolahan menggunakan algoritma dan penyimpanan terenkripsi.
C. Monitoring berkelanjutan dilakukan oleh Pusdatin.`,
        },
      ],
    },

    {
      id: 5,
      judul: "BAB V PENGAWASAN DAN PENGENDALIAN",
      subBab: [
        {
          nomor: "15",
          judul: "Pengawasan",
          halaman: 26,
          konten: `A. Audit kepatuhan.
B. Evaluasi keamanan.
C. Verifikasi data dan survey kepuasan pengguna.`,
        },

        {
          nomor: "16",
          judul: "Pengendalian",
          halaman: 28,
          konten: `A. Balance scorecard sistem informasi.
B. Pemantauan real-time melalui pusat operasi keamanan.
C. Forum rutin bulanan untuk pengambilan keputusan korektif.`,
        },
      ],
    },
  ];

  const searchRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [tocCollapsed, setTocCollapsed] = useState(false);

  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return dataBuku;

    return dataBuku
      .map((bab) => ({
        ...bab,
        subBab: bab.subBab.filter(
          (sub) =>
            sub.judul.toLowerCase().includes(q) ||
            sub.konten.toLowerCase().includes(q),
        ),
      }))
      .filter((bab) => bab.subBab.length > 0);
  }, [query]);

  const autoExpanded = useMemo(() => {
    const expanded = new Set<string>();

    filteredData.forEach((bab) => {
      bab.subBab.forEach((sub) => {
        expanded.add(`${bab.id}-${sub.nomor}`);
      });
    });

    return expanded;
  }, [filteredData]);

  const [expandedSubBab, setExpandedSubBab] =
    useState<Set<string>>(autoExpanded);

  useEffect(() => {
    if (query.trim()) {
      setExpandedSubBab(autoExpanded);
    }
  }, [query, autoExpanded]);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio ||
              a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0.1, 0.2, 0.3],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [filteredData]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleShortcut);

    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const toggleSubBab = (key: string) => {
    setExpandedSubBab((prev) => {
      const next = new Set(prev);

      if (next.has(key)) next.delete(key);
      else next.add(key);

      return next;
    });
  };

  const parseKonten = (konten: string): ParsedItem[] => {
    const lines = konten
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const regex = /^([A-Z])\.\s*(.*)$/;

    return lines
      .map((line) => {
        const match = line.match(regex);

        if (!match) return null;

        return {
          label: match[1],
          text: match[2],
        };
      })
      .filter(Boolean) as ParsedItem[];
  };

  const totalSubBab = dataBuku.reduce((acc, bab) => acc + bab.subBab.length, 0);

  return (
    <div className="min-h-screen overflow-hidden bg-[#020617] text-slate-100">
      {/* BACKGROUND */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1850px] gap-6 px-4 py-6 md:px-6">
        {/* SIDEBAR */}
        <aside
          className={`hidden xl:block transition-all duration-300 ${
            tocCollapsed ? "w-[92px]" : "w-[340px]"
          }`}
        >
          <div className="sticky top-6 overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-900/70 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            {/* HEADER */}
            <div className="border-b border-slate-800/80 p-5">
              <div className="flex items-start justify-between gap-3">
                {!tocCollapsed && (
                  <div>
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-emerald-400">
                      <Sparkles className="h-3.5 w-3.5" />
                      Navigation
                    </div>

                    <h2 className="mt-2 text-lg font-semibold text-white">
                      Table of Contents
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Struktur navigasi dokumen referensi.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setTocCollapsed((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/60 text-slate-400 transition hover:border-slate-600 hover:text-white"
                >
                  {tocCollapsed ? (
                    <PanelLeftOpen className="h-4 w-4" />
                  ) : (
                    <PanelLeftClose className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* SEARCH */}
            {!tocCollapsed && (
              <div className="border-b border-slate-800/80 p-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-700/80 bg-slate-950/60 px-4 py-3">
                  <Search className="h-4 w-4 text-slate-500" />

                  <input
                    ref={searchRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari referensi..."
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />

                  {query ? (
                    <button
                      onClick={() => setQuery("")}
                      className="text-slate-500 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : (
                    <div className="hidden items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-[10px] text-slate-500 lg:flex">
                      <Command className="h-3 w-3" />K
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* META */}
            {!tocCollapsed && (
              <div className="grid grid-cols-2 gap-3 border-b border-slate-800/80 p-4">
                <MetaCard label="BAB" value={dataBuku.length} />
                <MetaCard label="SUB BAB" value={totalSubBab} />
              </div>
            )}

            {/* TOC */}
            <div className="max-h-[calc(100vh-300px)] overflow-y-auto p-3">
              <div className="space-y-5">
                {filteredData.map((bab) => (
                  <div key={bab.id}>
                    {!tocCollapsed && (
                      <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-400">
                        {bab.judul}
                      </div>
                    )}

                    <div className="space-y-1">
                      {bab.subBab.map((sub) => {
                        const sectionId = `section-${bab.id}-${sub.nomor}`;
                        const active = activeSection === sectionId;

                        return (
                          <a
                            key={sectionId}
                            href={`#${sectionId}`}
                            className={`group flex items-start gap-3 rounded-2xl transition-all duration-200 ${
                              tocCollapsed
                                ? "justify-center px-2 py-3"
                                : "px-3 py-2.5"
                            } ${
                              active
                                ? "border border-emerald-500/20 bg-emerald-500/10"
                                : "border border-transparent hover:bg-slate-800/60"
                            }`}
                          >
                            <div
                              className={`mt-[5px] h-2.5 w-2.5 rounded-full ${
                                active
                                  ? "bg-emerald-400 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]"
                                  : "bg-slate-600"
                              }`}
                            />

                            {!tocCollapsed && (
                              <div className="min-w-0">
                                <div
                                  className={`text-sm ${
                                    active
                                      ? "text-emerald-300"
                                      : "text-slate-300"
                                  }`}
                                >
                                  {sub.judul}
                                </div>

                                <div className="mt-1 text-[11px] text-slate-500">
                                  Hal. {sub.halaman}
                                </div>
                              </div>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="min-w-0 flex-1">
          {/* HERO */}
          <div className="relative overflow-hidden rounded-[36px] border border-slate-800/80 bg-slate-900/70 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.16),transparent_28%)]" />

            <div className="relative p-6 md:p-8">
              {/* BREADCRUMB */}
              <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Dashboard</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span>Referensi</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-emerald-400">Buku Referensi</span>
              </div>

              <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
                {/* LEFT */}
                <div className="max-w-4xl">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300">
                    <BookOpenText className="h-4 w-4" />
                    Enterprise Knowledge Base
                  </div>

                  <h1 className="text-xl font-semibold leading-tight tracking-tight text-white md:text-xl">
                    PETUNJUK TEKNIS KODEFIKASI SISTEM KOMUNIKASI DAN ELEKTRONIKA
                    (SISKOMLEK)
                  </h1>

                  <p className="mt-5 max-w-3xl text-sm leading-8 text-slate-400 md:text-[15px]">
                    Platform dokumentasi teknis dengan struktur referensi
                    hierarkis, navigasi real-time, dan sistem pembacaan
                    enterprise-grade untuk kebutuhan operasional dan analisis.
                  </p>

                  {/* TAGS */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Tag label="Satkomlek TNI" />
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4 xl:min-w-[420px]">
                  <PremiumStat
                    label="BAB"
                    value={dataBuku.length}
                    icon={<Layers3 className="h-5 w-5" />}
                  />

                  <PremiumStat
                    label="SUB BAB"
                    value={totalSubBab}
                    icon={<ScrollText className="h-5 w-5" />}
                  />

                  <PremiumStat
                    label="STATUS"
                    value="AKTIF"
                    accent
                    icon={<Activity className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-6 space-y-6">
            {filteredData.map((bab) => (
              <section
                key={bab.id}
                className="overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-900/60 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              >
                {/* HEADER */}
                <div className="border-b border-slate-800/80 bg-gradient-to-r from-slate-900 to-slate-900/40 px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                      <Layers3 className="h-6 w-6" />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {bab.judul}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {bab.subBab.length} Sub Bab • Structured Documentation
                      </p>
                    </div>
                  </div>
                </div>

                {/* SUBBAB */}
                <div className="divide-y divide-slate-800/70">
                  {bab.subBab.map((sub) => {
                    const key = `${bab.id}-${sub.nomor}`;
                    const isOpen = expandedSubBab.has(key);

                    const parsed = parseKonten(sub.konten);

                    return (
                      <article
                        key={key}
                        id={`section-${bab.id}-${sub.nomor}`}
                        data-section
                        className="scroll-mt-28"
                      >
                        {/* BUTTON */}
                        <button
                          onClick={() => toggleSubBab(key)}
                          className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-200 hover:bg-slate-800/35"
                        >
                          <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70 font-mono text-sm text-slate-300 transition group-hover:border-emerald-500/30 group-hover:text-white">
                              {sub.nomor}
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-medium text-slate-100">
                                  {sub.judul}
                                </h3>

                                <span className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-[11px] text-slate-400">
                                  Halaman {sub.halaman}
                                </span>
                              </div>

                              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                                <Bookmark className="h-3.5 w-3.5 text-amber-400" />
                                Referensi teknis dan operasional
                              </div>
                            </div>
                          </div>

                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70 text-slate-400 transition-all duration-300 ${
                              isOpen
                                ? "rotate-180 border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                                : ""
                            }`}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </div>
                        </button>

                        {/* CONTENT */}
                        <div
                          className={`grid transition-all duration-500 ease-out ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t border-slate-800/80 bg-gradient-to-b from-slate-950/40 to-transparent px-6 py-6">
                              <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
                                <FileText className="h-4 w-4" />
                                Isi Dokumen
                              </div>

                              <div className="space-y-4">
                                {parsed.map((item, index) => (
                                  <div
                                    key={index}
                                    className="group rounded-3xl border border-slate-800 bg-slate-950/40 p-5 transition-all duration-200 hover:border-emerald-500/20 hover:bg-slate-950/70"
                                  >
                                    <div className="mb-4 flex items-center gap-3">
                                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-semibold text-emerald-400">
                                        {item.label}
                                      </div>

                                      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                        Poin Referensi
                                      </div>
                                    </div>

                                    <p className="text-[15px] leading-8 text-slate-300">
                                      {item.text}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-slate-700 bg-slate-950/50 px-4 py-2 text-xs text-slate-300 backdrop-blur">
      {label}
    </div>
  );
}

function MetaCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl border border-slate-700/80 bg-slate-950/60 p-4">
      <div className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
        {label}
      </div>

      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function PremiumStat({
  label,
  value,
  icon,
  accent = false,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl ${
        accent
          ? "border-emerald-500/20 bg-emerald-500/10"
          : "border-slate-800 bg-slate-900/70"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_45%)]" />

      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/60 text-slate-300">
          {icon}
        </div>

        <div className="mt-4 text-[11px] uppercase tracking-[0.24em] text-slate-500">
          {label}
        </div>

        <div
          className={`mt-1 text-2xl font-semibold ${
            accent ? "text-emerald-400" : "text-white"
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}
