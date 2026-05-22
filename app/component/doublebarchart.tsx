"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const sampleData = [
  { month: "Jan", bmn: 85, nonBmn: 72 },
  { month: "Feb", bmn: 87, nonBmn: 74 },
  { month: "Mar", bmn: 88, nonBmn: 75 },
  { month: "Apr", bmn: 86, nonBmn: 73 },
  { month: "May", bmn: 89, nonBmn: 77 },
  { month: "Jun", bmn: 90, nonBmn: 78 },
  { month: "Jul", bmn: 88, nonBmn: 80 },
  { month: "Aug", bmn: 91, nonBmn: 82 },
  { month: "Sep", bmn: 92, nonBmn: 83 },
  { month: "Oct", bmn: 93, nonBmn: 85 },
  { month: "Nov", bmn: 94, nonBmn: 86 },
  { month: "Dec", bmn: 95, nonBmn: 88 },
];

interface BarChartProps {
  data?: Array<{
    month: string;
    bmn: number;
    nonBmn: number;
  }>;
}

export default function DoubleBarChart({ data = sampleData }: BarChartProps) {
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">(
    "desktop",
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setScreen("mobile");
      } else if (width < 1024) {
        setScreen("tablet");
      } else {
        setScreen("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screen === "mobile";
  const isTablet = screen === "tablet";

  const avgBMN = useMemo(() => {
    return data.reduce((sum, item) => sum + item.bmn, 0) / data.length;
  }, [data]);

  const avgNonBMN = useMemo(() => {
    return data.reduce((sum, item) => sum + item.nonBmn, 0) / data.length;
  }, [data]);

  const overallAvg = useMemo(() => {
    return (avgBMN + avgNonBMN) / 2;
  }, [avgBMN, avgNonBMN]);

  const barSize = isMobile ? 8 : isTablet ? 14 : 26;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="rounded-xl border border-white/10 bg-slate-950/95 px-3 py-2 shadow-xl backdrop-blur-md">
        <p className="mb-2 text-sm font-semibold text-slate-100">{label}</p>

        {payload.map((entry: any, index: number) => (
          <div
            key={index}
            className="text-xs leading-5"
            style={{ color: entry.color }}
          >
            <span className="font-medium">{entry.name}</span>: {entry.value}%
          </div>
        ))}

        <div className="mt-2 border-t border-white/10 pt-2 text-[11px] text-slate-400">
          Rata-rata: {overallAvg.toFixed(1)}%
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full min-h-105 w-full flex-col rounded-2xl border border-white/10 bg-linear-to-br from-slate-900/70 to-slate-950/80 p-3 shadow-lg backdrop-blur-sm sm:p-4">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-100 sm:text-base">
            Kesiapan Bulanan
          </h3>
          <p className="text-xs text-slate-400">
            Persentase kesiapan BMN vs Non BMN
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="text-[11px] text-slate-400">BMN</p>
            <p className="text-sm font-semibold text-blue-400 sm:text-base">
              {avgBMN.toFixed(1)}%
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="text-[11px] text-slate-400">Non BMN</p>
            <p className="text-sm font-semibold text-emerald-400 sm:text-base">
              {avgNonBMN.toFixed(1)}%
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2">
            <p className="text-[11px] text-amber-200/70">Target</p>
            <p className="text-sm font-semibold text-amber-300 sm:text-base">
              90%
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-65 sm:min-h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart
            data={data}
            margin={{
              top: 16,
              right: isMobile ? 0 : 16,
              left: isMobile ? -12 : 0,
              bottom: isMobile ? 6 : 10,
            }}
            barCategoryGap={isMobile ? "18%" : "12%"}
            barGap={isMobile ? 2 : 6}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(148,163,184,0.18)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              interval={isMobile ? 1 : 0}
              tickMargin={8}
              axisLine={{ stroke: "rgba(148,163,184,0.25)" }}
              tickLine={false}
              tick={{
                fill: "#cbd5e1",
                fontSize: isMobile ? 10 : 12,
              }}
            />

            <YAxis
              domain={[0, 100]}
              width={isMobile ? 28 : 40}
              tickFormatter={(value) => `${value}%`}
              axisLine={{ stroke: "rgba(148,163,184,0.25)" }}
              tickLine={false}
              tick={{
                fill: "#cbd5e1",
                fontSize: isMobile ? 10 : 12,
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />

            <ReferenceLine
              y={90}
              stroke="#f59e0b"
              strokeDasharray="5 5"
              strokeOpacity={0.9}
              label={
                isMobile
                  ? undefined
                  : {
                      value: "Target 90%",
                      position: "right",
                      fill: "#f59e0b",
                      fontSize: 11,
                    }
              }
            />

            <Bar
              dataKey="bmn"
              name="BMN"
              fill="#3b82f6"
              radius={[6, 6, 0, 0]}
              barSize={barSize}
              animationDuration={700}
              animationEasing="ease-out"
            />

            <Bar
              dataKey="nonBmn"
              name="Non BMN"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              barSize={barSize}
              animationDuration={700}
              animationEasing="ease-out"
            />
          </ReBarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-slate-400">
          Tren kesiapan cenderung meningkat menjelang akhir tahun.
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
            BMN
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Non BMN
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            Target 90%
          </span>
        </div>
      </div>
    </div>
  );
}
