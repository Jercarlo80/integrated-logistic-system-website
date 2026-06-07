"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataPoint = {
  label: string; // mis. "Mei 2026"
  input: number;
  tervalidasi: number;
  ditolak: number;
};

type Props = {
  /** Urutkan dari paling lama ke paling baru. Default: 12 bulan contoh. */
  data?: DataPoint[];
};

const SERIES = [
  { key: "input", name: "Input Data", color: "#3b82f6" },
  { key: "tervalidasi", name: "Tervalidasi", color: "#22c55e" },
  { key: "ditolak", name: "Ditolak", color: "#ef4444" },
] as const;

// Data contoh — ganti via prop `data`
const SAMPLE: DataPoint[] = [
  { label: "Jun 2025", input: 540, tervalidasi: 220, ditolak: 40 },
  { label: "Jul 2025", input: 610, tervalidasi: 300, ditolak: 45 },
  { label: "Agu 2025", input: 680, tervalidasi: 360, ditolak: 50 },
  { label: "Sep 2025", input: 720, tervalidasi: 410, ditolak: 55 },
  { label: "Okt 2025", input: 760, tervalidasi: 450, ditolak: 58 },
  { label: "Nov 2025", input: 800, tervalidasi: 500, ditolak: 60 },
  { label: "Des 2025", input: 820, tervalidasi: 540, ditolak: 62 },
  { label: "Jan 2026", input: 1050, tervalidasi: 700, ditolak: 90 },
  { label: "Feb 2026", input: 1320, tervalidasi: 920, ditolak: 110 },
  { label: "Mar 2026", input: 1720, tervalidasi: 1180, ditolak: 120 },
  { label: "Apr 2026", input: 1920, tervalidasi: 1480, ditolak: 130 },
  { label: "Mei 2026", input: 2050, tervalidasi: 1690, ditolak: 142 },
];

const fmt = (n: number) => n.toLocaleString("id-ID");

/** Hitung domain & tick sumbu Y dalam kelipatan ratusan, mulai dari 0. */
function buildYAxis(rows: DataPoint[]) {
  const values = rows.flatMap((d) => [d.input, d.tervalidasi, d.ditolak]);
  const rawMax = Math.max(1, ...values);
  const targetTicks = 5;
  // step = kelipatan 100 terdekat ke atas
  const step = Math.max(100, Math.ceil(rawMax / targetTicks / 100) * 100);
  const max = Math.ceil(rawMax / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= max; v += step) ticks.push(v);
  return { domain: [0, max] as [number, number], ticks };
}

type TooltipEntry = {
  dataKey?: string | number;
  name?: string;
  value?: number;
  color?: string;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
};

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-md">
      <p className="mb-1.5 text-xs font-semibold text-slate-200">{label}</p>
      <div className="space-y-1">
        {payload.map((p) => (
          <div
            key={p.dataKey as string}
            className="flex items-center justify-between gap-4 text-xs"
          >
            <span className="flex items-center gap-1.5 text-slate-400">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: p.color }}
              />
              {p.name}
            </span>
            <span className="font-medium tabular-nums text-white">
              {fmt(Number(p.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Pantau lebar elemen secara live (responsif terhadap kontainer, bukan hanya layar). */
function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

export default function LineChart({ data = SAMPLE }: Props) {
  const [months, setMonths] = useState<3 | 6 | 12>(6);
  const [chartRef, chartWidth] = useContainerWidth<HTMLDivElement>();

  const rows = useMemo(() => data.slice(-months), [data, months]);
  const { domain, ticks } = useMemo(() => buildYAxis(rows), [rows]);

  // Adaptasi sesuai lebar kontainer aktual
  const compact = chartWidth > 0 && chartWidth < 440;
  const axisFont = compact ? 10 : 12;

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-white/[0.07] bg-slate-900/50 p-4 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-5">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
          Grafik Input Data ({months} Bulan Terakhir)
        </h2>

        <div className="relative self-start sm:self-auto">
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value) as 3 | 6 | 12)}
            aria-label="Pilih rentang waktu"
            className="cursor-pointer appearance-none rounded-lg border border-white/10 bg-white/[0.04] py-1.5 pl-3 pr-8 text-xs font-medium text-slate-200 outline-none transition-colors hover:border-white/20 focus-visible:ring-2 focus-visible:ring-emerald-500/50"
          >
            <option value={3} className="bg-slate-900">
              3 Bulan
            </option>
            <option value={6} className="bg-slate-900">
              6 Bulan
            </option>
            <option value={12} className="bg-slate-900">
              12 Bulan
            </option>
          </select>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      {/* Chart — mengisi sisa tinggi kartu, dengan tinggi minimum */}
      <div ref={chartRef} className="min-h-[14rem] w-full flex-1 sm:min-h-[16rem]">
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart
            data={rows}
            margin={{
              top: 8,
              right: compact ? 4 : 8,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="label"
              tick={{ fill: "#94a3b8", fontSize: axisFont }}
              // di lebar sempit, ringkas label "Mei 2026" -> "Mei" agar tidak tumpang-tindih
              tickFormatter={(v) =>
                compact ? String(v).split(" ")[0] : String(v)
              }
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
              tickMargin={compact ? 6 : 10}
              interval="preserveStartEnd"
              minTickGap={compact ? 24 : 16}
            />
            <YAxis
              domain={domain}
              ticks={ticks}
              tickFormatter={fmt}
              tick={{ fill: "#94a3b8", fontSize: axisFont }}
              tickLine={false}
              axisLine={false}
              width={compact ? 42 : 50}
            />
            <Tooltip
              content={<ChartTooltip />}
              cursor={{ stroke: "rgba(255,255,255,0.15)", strokeWidth: 1 }}
            />
            {SERIES.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color}
                strokeWidth={compact ? 2 : 2.5}
                // sembunyikan titik statis saat sempit agar tidak ramai; tetap muncul saat hover
                dot={compact ? false : { r: 3, fill: s.color, strokeWidth: 0 }}
                activeDot={{
                  r: compact ? 4 : 5,
                  fill: s.color,
                  stroke: "#0f172a",
                  strokeWidth: 2,
                }}
                animationDuration={700}
              />
            ))}
          </ReLineChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {SERIES.map((s) => (
          <span
            key={s.key}
            className="flex items-center gap-2 text-xs font-medium text-slate-400"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}