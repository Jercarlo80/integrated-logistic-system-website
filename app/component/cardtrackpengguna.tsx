import Link from "next/link";

type Pengguna = {
  nama: string;
  ip: string;
  role: string;
  /** "08:44" atau Date (diformat ke HH:MM WIB). */
  loginAt: string | Date;
};

type Props = {
  data?: Pengguna[];
  /** Total pengguna online (boleh berbeda dari jumlah baris tabel). */
  totalOnline?: number;
  /** Tujuan tombol "Lihat Semua Pengguna Online". */
  href?: string;
};

// Data contoh — ganti via prop `data`
const SAMPLE: Pengguna[] = [
  { nama: "operator_komac", ip: "10.10.20.15", role: "Operator", loginAt: "08:44" },
  { nama: "validator_1", ip: "10.10.20.16", role: "Validator", loginAt: "08:44" },
  { nama: "admin_db", ip: "10.10.20.11", role: "Admin DB", loginAt: "08:43" },
  { nama: "admin_si", ip: "10.10.20.10", role: "Admin SI", loginAt: "08:42" },
];

const roleStyles: Record<string, string> = {
  Operator: "bg-blue-500/15 text-blue-300 ring-blue-500/30",
  Validator: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  "Admin DB": "bg-purple-500/15 text-purple-300 ring-purple-500/30",
  "Admin SI": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
};
const defaultRole = "bg-slate-500/15 text-slate-300 ring-slate-500/30";

function formatLogin(v: string | Date) {
  if (v instanceof Date) {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(v);
  }
  return v;
}

export default function CardTrackPengguna({
  data = SAMPLE,
  totalOnline,
  href = "#",
}: Props) {
  const total = totalOnline ?? data.length;

  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-white/[0.07] bg-slate-900/50 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-white/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
          Pengguna Online
        </h2>
        <span className="text-xs text-slate-400">
          Jumlah Pengguna Online:{" "}
          <span className="font-semibold tabular-nums text-emerald-400">
            {total}
          </span>{" "}
          Pengguna
        </span>
      </div>

      {/* Tabel (scroll horizontal di layar sempit) */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-115 border-collapse text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-4 py-2.5 font-medium sm:px-5">Nama Akun</th>
              <th className="px-4 py-2.5 font-medium">IP Address</th>
              <th className="px-4 py-2.5 font-medium">Role</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Waktu Login</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u, i) => (
              <tr
                key={`${u.nama}-${i}`}
                className="border-t border-white/5 transition-colors hover:bg-white/[0.025]"
              >
                <td className="px-4 py-3 sm:px-5">
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-sm font-medium text-slate-200">
                      {u.nama}
                    </span>
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-400">
                  {u.ip}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${
                      roleStyles[u.role] ?? defaultRole
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-400 sm:px-5">
                  {formatLogin(u.loginAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-white/[0.06] px-4 py-3 sm:px-5">
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          Lihat Semua Pengguna Online
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