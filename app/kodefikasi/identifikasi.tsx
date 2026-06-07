"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useToken } from "@/app/hooks/useToken";

// Ikon (ringan, tanpa dependency tambahan)
const SearchIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="m6 9 6 6 6-6" />
  </svg>
);
const CloseIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);
const SpinnerIcon = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
  </svg>
);
const XMarkIcon = () => (
  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const API_URL = "/api/v1/identifikasi";

interface IdentifikasiItem {
  kode: string;
  detail: string;
  depth: number;
  raw: Record<string, unknown>;
}

interface IdentifikasiProps {
  token?: string;
  apiUrl?: string;
  withCredentials?: boolean;
  /** Single selection: callback ketika item dipilih */
  onSelect?: (item: IdentifikasiItem | null) => void;
  /** Placeholder teks pencarian */
  placeholder?: string;
  /** Label di atas komponen */
  label?: string;
  /** Nilai yang dipilih (untuk controlled component) */
  selectedValue?: IdentifikasiItem | null;
}

// Helper functions (sama seperti sebelumnya)
function pick(obj: Record<string, unknown>, keys: string[]): string {
  for (const k of keys) {
    const v = obj[k];
    if (v !== undefined && v !== null && String(v).trim() !== "") return String(v).trim();
  }
  return "";
}
function getKode(item: Record<string, unknown>): string {
  return pick(item, ["kode", "code", "kode_detail", "kodeDetail", "kode_index", "kodeIndex", "id"]);
}
function getDetail(item: Record<string, unknown>): string {
  return pick(item, ["detail", "detail_nama", "detailNama", "nama", "name", "deskripsi", "description", "label", "keterangan"]);
}
function getDepth(item: Record<string, unknown>, kode: string): number {
  const raw = item.depth ?? item.level ?? item.tingkat;
  if (raw !== undefined && raw !== null && !Number.isNaN(Number(raw))) return Number(raw);
  if (!kode) return 0;
  return kode.split(".").filter(Boolean).length - 1;
}
function normalize(json: unknown): Record<string, unknown>[] {
  if (Array.isArray(json)) return json;
  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;
    const candidates = ["data", "results", "result", "identifikasi", "items", "rows"];
    for (const key of candidates) if (Array.isArray(obj[key])) return obj[key];
    const firstArray = Object.values(obj).find((v) => Array.isArray(v));
    if (firstArray) return firstArray;
    if (getKode(obj) || getDetail(obj)) return [obj];
  }
  return [];
}
function isKodeQuery(q: string): boolean {
  return /^[0-9.]+$/.test(q.trim());
}
function buildSearchUrl(base: string, search: string): string {
  const q = search.trim();
  if (!q) return base;
  const param = isKodeQuery(q) ? "kode" : "detail";
  return `${base}?${param}=${encodeURIComponent(q)}`;
}

// Depth styling (dot menggunakan bg-gray-950 agar terlihat seperti outline)
const DEPTH_STYLES = [
  { dot: "bg-gray-950", text: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { dot: "bg-gray-950", text: "text-sky-300", bg: "bg-sky-500/10", border: "border-sky-500/20" },
  { dot: "bg-gray-950", text: "text-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { dot: "bg-gray-950", text: "text-rose-300", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { dot: "bg-gray-950", text: "text-violet-300", bg: "bg-violet-500/10", border: "border-violet-500/20" },
];
function depthStyle(depth: number) {
  return DEPTH_STYLES[Math.min(Math.max(depth, 0), DEPTH_STYLES.length - 1)];
}

// Highlight teks
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-emerald-400/20 px-0.5 text-emerald-100 font-medium">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

// Skeleton
const SkeletonRow = () => (
  <div className="flex items-center gap-3 px-4 py-3">
    <div className="h-2 w-2 rounded-full bg-white/10" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
      <div className="h-3 w-2/3 rounded bg-white/5 animate-pulse" />
    </div>
  </div>
);

export default function Identifikasi({
  token,
  apiUrl = API_URL,
  withCredentials = false,
  onSelect,
  placeholder = "Cari kode (1.3.1) atau detail (satuan)...",
  label = "Identifikasi Barang",
  selectedValue: externalSelected,
}: IdentifikasiProps = {}) {
  const { token: sessionToken, isExpired } = useToken();
  const authToken = token ?? sessionToken;

  const [items, setItems] = useState<IdentifikasiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IdentifikasiItem | null>(externalSelected ?? null);

  // Sync external selected
  useEffect(() => {
    if (externalSelected !== undefined) setSelected(externalSelected);
  }, [externalSelected]);

  const fetchData = useCallback(async (search: string) => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = { Accept: "application/json", "Content-Type": "application/json" };
      if (authToken) headers.Authorization = `Bearer ${authToken}`;
      const url = buildSearchUrl(apiUrl, search);
      const res = await fetch(url, { headers, credentials: withCredentials ? "include" : "same-origin" });

      if (res.status === 401) throw new Error("401 Unauthorized — token tidak ada / kedaluwarsa.");
      if (res.status === 503) throw new Error("Semua server API sedang tidak dapat dihubungi.");
      if (!res.ok) throw new Error(`Gagal memuat data (HTTP ${res.status})`);

      const json = await res.json();
      const mapped: IdentifikasiItem[] = normalize(json).map((raw) => {
        const kode = getKode(raw);
        return { kode, detail: getDetail(raw), depth: getDepth(raw, kode), raw };
      });
      setItems(mapped);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }, [apiUrl, authToken, withCredentials]);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (open) fetchData(debounced);
  }, [fetchData, debounced, open]);

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.kode.toLowerCase().includes(q) || it.detail.toLowerCase().includes(q));
  }, [items, debounced]);

  const handleSelect = (item: IdentifikasiItem) => {
    setSelected(item);
    setQuery("");
    setOpen(false);
    onSelect?.(item);
  };

  const handleClear = () => {
    setSelected(null);
    setQuery("");
    onSelect?.(null);
  };

  const showSkeleton = loading && items.length === 0 && open;

  return (
    <div className="w-full font-sans">
      {/* Label dengan gaya yang sama seperti "JENIS BARANG" */}
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      {/* Area utama: selected tag + input search */}
      <div className="relative">
        <div
          className={`flex flex-wrap items-center gap-2 rounded-xl border bg-gray-950 px-3 py-2 transition-all duration-200 ${
            open
              ? "border-emerald-500/60 shadow-[0_0_0_1px_rgba(16,185,129,0.2)]"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          {selected ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 pl-2.5 pr-1 py-0.5 text-sm font-medium text-emerald-300">
              <span className="font-mono text-xs">{selected.kode}</span>
              <span className="text-emerald-400/70">|</span>
              <span className="max-w-[150px] truncate">{selected.detail}</span>
              <button
                onClick={handleClear}
                className="ml-1 rounded-full p-0.5 text-emerald-400/70 transition-colors hover:bg-emerald-500/20 hover:text-emerald-200"
                aria-label="Hapus pilihan"
              >
                <XMarkIcon />
              </button>
            </span>
          ) : (
            <SearchIcon />
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder={selected ? "" : placeholder}
            className="min-w-[120px] flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
            aria-label="Pencarian"
          />
          {loading && open && items.length > 0 && <SpinnerIcon />}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="rounded-md p-1 text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
            >
              <CloseIcon />
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-white/5"
          >
            <ChevronIcon open={open} />
          </button>
        </div>

        {/* Dropdown panel */}
        {open && (
          <div className="absolute left-0 right-0 z-20 mt-2 max-h-80 overflow-auto rounded-xl border border-white/10 bg-gray-950 shadow-xl backdrop-blur-sm">
            {showSkeleton ? (
              <div className="divide-y divide-white/5">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} />)}
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <p className="text-sm text-rose-300">{error}</p>
                <button
                  onClick={() => fetchData(debounced)}
                  className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-200"
                >
                  Coba lagi
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-400">
                Tidak ada data cocok
              </div>
            ) : (
              <ul className="py-1">
                {filtered.map((item, idx) => {
                  const style = depthStyle(item.depth);
                  const paddingLeft = 12 + item.depth * 16;
                  return (
                    <li
                      key={`${item.kode}-${idx}`}
                      style={{ paddingLeft }}
                      onClick={() => handleSelect(item)}
                      className="group flex cursor-pointer items-center gap-3 py-2.5 pr-3 transition-colors hover:bg-white/5"
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full ${style.dot} border border-white/20`} />
                      <div className="min-w-0 flex-1">
                        <code className={`font-mono text-sm font-semibold ${style.text}`}>
                          <Highlight text={item.kode || "—"} query={debounced} />
                        </code>
                        <p className="truncate text-sm text-slate-300">
                          <Highlight text={item.detail || "(tanpa nama)"} query={debounced} />
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded border px-1.5 py-0.5 font-mono text-xs font-medium ${style.text} ${style.bg} ${style.border}`}
                      >
                        d{item.depth}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Pesan kedaluwarsa sesi (jika perlu) */}
      {isExpired && (
        <p className="mt-2 text-xs text-amber-400">⚠️ Sesi habis, login ulang untuk mencari.</p>
      )}
    </div>
  );
}