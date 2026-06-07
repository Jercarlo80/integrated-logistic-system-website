import React from "react";
import {
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  type LucideIcon,
} from "lucide-react";

export interface CardInformasiProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  trend?: {
    direction: "up" | "down";
    percentage: number;
    text?: string;
  };
  description?: string;
  extraInfo?: string;
  valueSuffix?: string;
  accentColor?: "teal" | "blue" | "amber" | "coral" | "purple" | "green";
  className?: string;
}

type AccentKey = NonNullable<CardInformasiProps["accentColor"]>;

const ACCENT: Record<
  AccentKey,
  { bar: string; iconBg: string; iconColor: string }
> = {
  teal:   { bar: "#1D9E75", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400" },
  blue:   { bar: "#378ADD", iconBg: "bg-blue-500/10",    iconColor: "text-blue-400"    },
  amber:  { bar: "#EF9F27", iconBg: "bg-amber-500/10",   iconColor: "text-amber-400"   },
  coral:  { bar: "#D85A30", iconBg: "bg-orange-500/10",  iconColor: "text-orange-400"  },
  purple: { bar: "#7F77DD", iconBg: "bg-violet-500/10",  iconColor: "text-violet-400"  },
  green:  { bar: "#639922", iconBg: "bg-lime-500/10",    iconColor: "text-lime-400"    },
};

const DEFAULT_ICONS: [string, LucideIcon][] = [
  ["total material", Package],
  ["tervalidasi",    CheckCircle2],
  ["pending",        Clock],
  ["ditolak",        XCircle],
  ["pengguna",       Users],
  ["user",           Users],
];

const CardInformasi: React.FC<CardInformasiProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  extraInfo,
  valueSuffix = "",
  accentColor = "teal",
  className = "",
}) => {
  const accent = ACCENT[accentColor];

  const resolveIcon = (): React.ReactNode => {
    if (icon) return icon;
    const lower = title.toLowerCase();
    const Found = DEFAULT_ICONS.find(([k]) => lower.includes(k))?.[1] ?? BarChart3;
    return <Found className="h-4.5 w-4.5" strokeWidth={1.75} />;
  };

  const formattedValue = value.toLocaleString("id-ID");

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl
        bg-white dark:bg-slate-900
        border border-slate-200/80 dark:border-slate-800
        transition-all duration-200
        hover:border-slate-300 dark:hover:border-slate-700
        hover:shadow-sm
        ${className}
      `}
    >
      {/* Top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: accent.bar }}
      />

      <div className="p-5 pt-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
              {title}
            </p>

            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[28px] font-semibold leading-none tracking-tight tabular-nums text-slate-900 dark:text-white">
                {formattedValue}
              </span>
              {valueSuffix && (
                <span className="text-sm text-slate-400 dark:text-slate-500">
                  {valueSuffix}
                </span>
              )}
            </div>
          </div>

          {/* Icon — colored, minimal, no border */}
          <div
            className={`
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-lg ${accent.iconBg} ${accent.iconColor}
              transition-transform duration-200 group-hover:scale-105
            `}
          >
            {resolveIcon()}
          </div>
        </div>

        {/* Trend */}
        {trend && (
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span
              className={`
                inline-flex items-center gap-1 rounded-full px-2.5 py-0.5
                text-xs font-semibold
                ${
                  trend.direction === "up"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                }
              `}
            >
              {trend.direction === "up" ? (
                <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
              ) : (
                <TrendingDown className="h-3 w-3" strokeWidth={2.5} />
              )}
              {Math.abs(trend.percentage)}%
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {trend.text ?? "dibanding periode sebelumnya"}
            </span>
          </div>
        )}

        {/* Footer */}
        {(description || extraInfo) && (
          <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
            <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-500">
              {extraInfo ?? description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardInformasi;