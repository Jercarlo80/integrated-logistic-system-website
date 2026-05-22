// TabChart.tsx

"use client";

import { useState } from "react";
import DoubleBarChart from "@/app/component/doublebarchart";
import PieChart from "@/app/component/piechart";

const pieData = {
  bmn: 1234,
  nonBmn: 567,
};

export default function TabChart() {
  const [activeTab, setActiveTab] = useState<"pie" | "bar">("pie");

  const tabs = [
    {
      id: "pie",
      title: "Materiil",
      icon: "📊",
      description: "Total BMN & Non BMN",
    },
    {
      id: "bar",
      title: "Kesiapan",
      icon: "📈",
      description: "Statistik bulanan",
    },
  ];

  return (
    <div className="w-full h-full rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3 sm:p-4 overflow-hidden">

      {/* Tab Header */}

      <div className="mb-4">

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as "pie" | "bar"
                )
              }
              className={`
                min-w-[150px]
                sm:min-w-[180px]
                rounded-xl
                border
                px-4
                py-3
                text-left
                transition-all
                duration-300
                flex-shrink-0

                ${
                  activeTab === tab.id
                    ? `
                    border-blue-500/30
                    bg-blue-500/15
                    shadow-lg
                    shadow-blue-500/10
                  `
                    : `
                    border-white/5
                    bg-white/[0.02]
                    hover:bg-white/[0.05]
                  `
                }
              `}
            >
              <div className="flex items-center gap-3">

                <span className="text-lg">
                  {tab.icon}
                </span>

                <div>

                  <h3
                    className={`
                    text-sm
                    font-medium

                    ${
                      activeTab === tab.id
                        ? "text-white"
                        : "text-slate-300"
                    }
                  `}
                  >
                    {tab.title}
                  </h3>

                  <p className="text-[11px] text-slate-500">
                    {tab.description}
                  </p>

                </div>

              </div>
            </button>
          ))}

        </div>

      </div>

      {/* Chart Container */}

      <div className="h-[420px] sm:h-[520px] lg:h-full rounded-xl border border-white/5 bg-black/10 p-2 sm:p-3">

        {activeTab === "pie" ? (
          <PieChart
            bmnValue={pieData.bmn}
            nonBmnValue={pieData.nonBmn}
            bmnLabel="BMN"
            nonBmnLabel="Non BMN"
            title="Total Materiil"
          />
        ) : (
          <DoubleBarChart />
        )}

      </div>
    </div>
  );
}