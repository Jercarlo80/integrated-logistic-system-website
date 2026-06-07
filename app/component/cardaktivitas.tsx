import Link from "next/link";

type Aktivitas = {
  waktu: string;
  pengguna: string;
  role: string;
  aktivitas: string;
  keterangan: string;
  status?: "success" | "warning" | "error";
};

type Props = {
  data?: Aktivitas[];
  /** Tujuan tombol "Lihat Semua Aktivitas". */
  href?: string;
};

// Data contoh — ganti via prop `data`
const SAMPLE: Aktivitas[] = [
  {
    waktu: "08:44:12",
    pengguna: "operator_komac",
    role: "Operator",
    aktivitas: "Input Data Material",
    keterangan: "Radio HF PRC-150",
  },
  {
    waktu: "08:32:45",
    pengguna: "validator_1",
    role: "Validator",
    aktivitas: "Validasi Data",
    keterangan: "Radio HF PRC-150",
  },
  {
    waktu: "08:20:31",
    pengguna: "admin_db",
    role: "Admin DB",
    aktivitas: "Sinkronisasi Data",
    keterangan: "Master Database",
  },
  {
    waktu: "08:15:22",
    pengguna: "operator_kodik",
    role: "Operator",
    aktivitas: "Upload Dokumen",
    keterangan: "Spec PRC-150.pdf",
  },
  {
    waktu: "08:05:10",
    pengguna: "admin_si",
    role: "Admin SI",
    aktivitas: "Backup Database",
    keterangan: "Backup Harian",
  },
];

// Warna badge per peran
const roleStyles: Record<string, string> = {
  Operator: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  Validator: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  "Admin DB": "bg-purple-500/15 text-purple-300 ring-purple-500/30",
  "Admin SI": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
};
const defaultRole = "bg-slate-500/15 text-slate-300 ring-slate-500/30";

const statusDot: Record<NonNullable<Aktivitas["status"]>, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
};

export default function CardAktivitas({
  data = SAMPLE,
  href = "/audittrail",
}: Props) {
  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-white/[0.07] bg-slate-900/50 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md">
      {/* Header */}
      <div className="border-b border-white/[0.06] px-4 py-4 sm:px-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
          Aktivitas Terakhir
        </h2>
      </div>

      {/* Tabel (scroll horizontal di layar sempit) */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-4 py-2.5 font-medium sm:px-5">Waktu</th>
              <th className="px-4 py-2.5 font-medium">Pengguna</th>
              <th className="px-4 py-2.5 font-medium">Aktivitas</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={`${row.waktu}-${i}`}
                className="border-t border-white/[0.05] transition-colors hover:bg-white/[0.025]"
              >
                <td className="whitespace-nowrap px-4 py-3 text-xs tabular-nums text-slate-400 sm:px-5">
                  {row.waktu}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="text-sm font-medium text-slate-200">
                      {row.pengguna}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${
                        roleStyles[row.role] ?? defaultRole
                      }`}
                    >
                      {row.role}
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-300">
                  {row.aktivitas}
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <span className="flex items-center gap-2 text-sm text-slate-400">
                    <span
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                        statusDot[row.status ?? "success"]
                      }`}
                    />
                    {row.keterangan}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer: tombol routing ke Audit Trail */}
      <div className="mt-auto border-t border-white/[0.06] px-4 py-3 sm:px-5">
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          Lihat Semua Aktivitas
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}