// components/PieChart.tsx

"use client";

import { useState, useCallback } from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  bmnValue?: number;
  nonBmnValue?: number;
  bmnLabel?: string;
  nonBmnLabel?: string;
  title?: string;
  showTotal?: boolean;
}

export default function PieChart({
  bmnValue = 1234,
  nonBmnValue = 567,
  bmnLabel = "BMN",
  nonBmnLabel = "Non BMN",
  title = "Total Materiil",
  showTotal = true,
}: PieChartProps) {
  const data = [
    {
      name: bmnLabel,
      value: bmnValue,
      color: "#3b82f6",
    },
    {
      name: nonBmnLabel,
      value: nonBmnValue,
      color: "#10b981",
    },
  ];

  const total = bmnValue + nonBmnValue;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    []
  );

  const onPieLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const CustomTooltip = ({
    active,
    payload,
  }: any) => {
    if (!active || !payload?.length) return null;

    const item = payload[0].payload;
    const percentage = (
      (item.value / total) *
      100
    ).toFixed(1);

    return (
      <div className="rounded-xl border border-white/10 bg-slate-950/95 px-3 py-2 shadow-xl backdrop-blur-sm">

        <p className="text-sm font-semibold text-white">
          {item.name}
        </p>

        <div className="mt-2 space-y-1 text-xs">

          <p className="text-slate-300">
            Jumlah:
            <span className="ml-2 font-semibold text-white">
              {item.value.toLocaleString()}
            </span>
          </p>

          <p className="text-slate-300">
            Persentase:
            <span className="ml-2 font-semibold text-white">
              {percentage}%
            </span>
          </p>

        </div>

      </div>
    );
  };

  const renderLegend = ({ payload }: any) => {
    return (
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">

        {payload.map(
          (
            entry: any,
            index: number
          ) => {
            const percent = (
              (entry.payload.value /
                total) *
              100
            ).toFixed(1);

            return (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-white/3 px-3 py-2"
              >
                <div className="flex items-center gap-2">

                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      background:
                        entry.color,
                    }}
                  />

                  <span className="text-xs text-slate-300">
                    {entry.value}
                  </span>

                </div>

                <div className="text-right">

                  <p className="text-xs font-semibold text-white">
                    {entry.payload.value.toLocaleString()}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    {percent}%
                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-950/80 p-3 sm:p-5">

      {/* Header */}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h3 className="text-sm sm:text-base font-semibold text-white">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Distribusi BMN dan Non BMN
          </p>

        </div>

        {showTotal && (
          <div className="w-fit rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2">

            <span className="text-xs text-slate-400">
              Total
            </span>

            <span className="ml-2 text-sm font-bold text-white">
              {total.toLocaleString()}
            </span>

          </div>
        )}

      </div>

      {/* Chart */}

      <div className="h-[240px] sm:h-[320px] md:h-[380px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <RePieChart>

            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="75%"
              paddingAngle={3}
            >
              {data.map(
                (
                  item,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={item.color}
                    stroke={
                      activeIndex ===
                      index
                        ? "#fff"
                        : "none"
                    }
                    strokeWidth={
                      activeIndex ===
                      index
                        ? 2
                        : 0
                    }
                    style={{
                      cursor:
                        "pointer",
                      transition:
                        "all .2s",
                      transform:
                        activeIndex ===
                        index
                          ? "scale(1.03)"
                          : "scale(1)",
                      transformOrigin:
                        "center",
                    }}
                    onMouseEnter={() =>
                      setActiveIndex(
                        index
                      )
                    }
                    onMouseLeave={() =>
                      setActiveIndex(
                        null
                      )
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip
              content={
                <CustomTooltip />
              }
            />

            <Legend
              verticalAlign="bottom"
              content={
                renderLegend
              }
            />

          </RePieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}