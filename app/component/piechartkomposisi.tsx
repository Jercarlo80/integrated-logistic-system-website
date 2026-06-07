"use client";

import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

type Slice = {
  name: string;
  value: number;
  color: string;
};

type Props = {
  /** Urutan menentukan urutan segmen & legenda. */
  data?: Slice[];
};

// Data contoh — ganti via prop `data`
const SAMPLE: Slice[] = [
  { name: "Sistem Komunikasi", value: 5245, color: "#3b82f6" },
  { name: "Sistem Elektronika", value: 3210, color: "#22c55e" },
  { name: "Perangkat Pendukung", value: 2450, color: "#f59e0b" },
  { name: "Antenna dan Aksesoris", value: 1553, color: "#ef4444" },
];

const fmtInt = (n: number) => n.toLocaleString("id-ID");
const fmtPct = (n: number) =>
  n.toLocaleString("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

type TooltipEntry = {
  name?: string;
  value?: number;
  payload?: Slice & { percent: number };
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
};

function ChartTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload;
  if (!item) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-md">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        {item.name}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        <span className="font-medium tabular-nums text-white">
          {fmtInt(item.value)}
        </span>{" "}
        Data ·{" "}
        <span className="font-medium tabular-nums text-white">
          {fmtPct(item.percent)}%
        </span>
      </p>
    </div>
  );
}

export default function PieChartKomposisi({ data = SAMPLE }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { rows, total } = useMemo(() => {
    const sum = data.reduce((acc, d) => acc + d.value, 0) || 1;
    return {
      total: sum,
      rows: data.map((d) => ({ ...d, percent: (d.value / sum) * 100 })),
    };
  }, [data]);

  return (
    <div className="@container flex h-full w-full flex-col rounded-2xl border border-white/[0.07] bg-slate-900/50 p-4 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-5">
      {/* Header */}
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
        Komposisi Klasifikasi Material
      </h2>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 @[22rem]:flex-row @[22rem]:gap-1">
        {/* Donut + total di tengah */}
        <div className="relative h-56 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={rows}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="64%"
                outerRadius="92%"
                paddingAngle={2}
                cornerRadius={3}
                stroke="none"
                startAngle={90}
                endAngle={-270}
                animationDuration={700}
                onMouseEnter={(_, i) => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {rows.map((s, i) => (
                  <Cell
                    key={s.name}
                    fill={s.color}
                    opacity={
                      activeIndex === null || activeIndex === i ? 1 : 0.35
                    }
                    style={{ transition: "opacity .2s ease" }}
                  />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Label tengah */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tabular-nums text-white">
              {fmtInt(total)}
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Total
            </span>
          </div>
        </div>

        {/* Legenda */}
        <ul className="w-full space-y-3">
          {rows.map((s, i) => (
            <li
              key={s.name}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className="flex items-start gap-2.5 rounded-lg px-1 py-0.5 transition-colors hover:bg-white/[0.03]"
            >
              <span
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-200">
                  {s.name}
                </p>
                <p className="text-xs text-slate-400">
                  <span className="tabular-nums text-slate-300">
                    {fmtInt(s.value)}
                  </span>{" "}
                  <span className="tabular-nums">({fmtPct(s.percent)}%)</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}