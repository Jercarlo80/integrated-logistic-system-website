export default function TabelPengguna() {
  const data = [
    {
      no: 1,
      nama: "Kharis Nasution, S.E., M.Si., CTMP.",
      pangkat: "Letkol Laut (E) 17709/P",
      jabatan: "Plh. Kasimatomlek Smin Satkomlek TNI",
      ket: "Ketua",
    },
    {
      no: 2,
      nama: "Yudho Kristyanto, S.Sos.",
      pangkat: "Letkol Cke 21940081790574",
      jabatan: "Kadiskom Satkomlek TNI",
      ket: "Kabid Pembinaan",
    },
    {
      no: 3,
      nama: "Ro'isul Askar, S.T., M.M.",
      pangkat: "Letkol Cke 21940082291074",
      jabatan: "Kasiminlog Smin Satkomlek TNI",
      ket: "Kabid Perencanaan",
    },
    {
      no: 4,
      nama: "Emmaloka Dwi Abdi Prapatno, S.T., M.M.",
      pangkat: "Letkol Lek 531208",
      jabatan: "Dandenkomsat Satkomlek TNI",
      ket: "Kabid Sistem Informasi",
    },
    {
      no: 5,
      nama: "Wely Yudho Pratomo",
      pangkat: "Mayor Lek 539104",
      jabatan: "Pasimatomlek Smin Satkomlek TNI",
      ket: "Kabid Data dan Kodefikasi",
    },
  ];

  // Styling untuk kolom KET (mirip dengan roleStyles)
  const ketStyles: Record<string, string> = {
    Ketua: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    "Kabid Pembinaan": "bg-blue-500/15 text-blue-300 ring-blue-500/30",
    "Kabid Perencanaan": "bg-purple-500/15 text-purple-300 ring-purple-500/30",
    "Kabid Sistem Informasi":
      "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    "Kabid Data dan Kodefikasi":
      "bg-rose-500/15 text-rose-300 ring-rose-500/30",
  };
  const defaultKet = "bg-slate-500/15 text-slate-300 ring-slate-500/30";

  return (
    <div className="flex h-full w-full min-w-0 flex-col rounded-2xl border border-white/[0.07] bg-slate-900/50 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)] backdrop-blur-md">
      {/* Header card - judul di tengah, total data di kanan */}
      <div className="flex flex-row items-center justify-between border-b border-white/[0.06] px-4 py-4 sm:px-5">
        {/* Area judul (tengah) */}
        <div className="flex-1 text-center">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
            DAFTAR NAMA PENYELENGGARA KODEFIKASI MATERIIL
          </h2>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200 sm:text-base sm:normal-case sm:tracking-tight">
            SISTEM KOMUNIKASI DAN ELEKTRONIKA (SISKOMLEK) DI LINGKUNGAN
            SATKOMLEK TNI
          </h2>
        </div>
        {/* Total data di kanan */}
        <span className="text-xs text-slate-400">
          Total Data:{" "}
          <span className="font-semibold tabular-nums text-emerald-400">
            {data.length}
          </span>{" "}
          Pengguna
        </span>
      </div>

      {/* Tabel (scroll horizontal) */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-4 py-2.5 font-medium sm:px-5">NO</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">NAMA</th>
              <th className="px-4 py-2.5 font-medium">PANGKAT/KORPS/NRP</th>
              <th className="px-4 py-2.5 font-medium">JABATAN</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">KETERANGAN</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-white/5 transition-colors hover:bg-white/[0.025]"
              >
                <td className="whitespace-nowrap px-4 py-3 text-sm tabular-nums text-slate-400 sm:px-5">
                  {row.no}
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <span className="text-sm font-medium text-slate-200">
                    {row.nama}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-400">
                  {row.pangkat}
                </td>
                <td className="px-4 py-3 text-sm text-slate-400">
                  {row.jabatan}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm sm:px-5">
                  <span
                    className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${
                      ketStyles[row.ket] ?? defaultKet
                    }`}
                  >
                    {row.ket}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}