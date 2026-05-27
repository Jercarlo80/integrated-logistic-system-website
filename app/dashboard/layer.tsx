import CardInformasi from "@/app/component/cardinformasi";
import TabChart from "@/app/component/tabchart";

export default function Layer() {
  const data = {
    totalBMN: 1234,
    totalNonBMN: 567,
    persenBMN: 60,
    persenNonBMN: 40,
  };

  return (
    <div className=" min-h-screen w-full overflow-hidden bg-[#020617]">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,.10),transparent_30%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,.10),transparent_30%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="mx-auto w-full max-w-400 px-8 py-5 sm:px-6 lg:px-6">
        {/* Header */}

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
              Dashboard
            </p> */}
            <h1 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Data Dashboard
            </h1>

            {/* <p className="mt-2 text-sm text-slate-400">
              Monitoring data BMN, Non BMN dan statistik kesiapan
            </p> */}
          </div>

          {/* Quick Summary */}

          <div className="grid grid-cols-2 gap-3 sm:flex">
            {/* <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
              <p className="text-xs text-slate-400">Total Barang</p>

              <p className="text-lg font-bold text-white">
                {(data.totalBMN + data.totalNonBMN).toLocaleString()}
              </p>
            </div> */}

            {/* <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
              <p className="text-xs text-slate-400">Kesiapan</p>

              <p className="text-lg font-bold text-emerald-400">
                {((data.persenBMN + data.persenNonBMN) / 2).toFixed(1)}%
              </p>
            </div> */}
          </div>
        </div>

        {/* Main Container */}

        <div className="rounded-3xl border border-white/10 bg-slate-900/30 p-4 shadow-xl backdrop-blur-xl sm:p-5 lg:p-6">
          <div className="flex flex-col gap-5">
            {/* Card section */}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CardInformasi
                mode="detail"
                leftIcon="📦"
                leftLabel="Jumlah BMN"
                leftValue={data.totalBMN}
                rightIcon="📦"
                rightLabel="Jumlah Non BMN"
                rightValue={data.totalNonBMN}
                totalLabel="Total Barang"
                totalIcon="📊"
                valueSuffix=""
              />

              <CardInformasi
                mode="detail"
                leftIcon="⚙️"
                leftLabel="Kesiapan BMN"
                leftValue={data.persenBMN}
                rightIcon="⚙️"
                rightLabel="Kesiapan Non BMN"
                rightValue={data.persenNonBMN}
                totalLabel="Rata-rata Kesiapan"
                totalIcon="🎯"
                valueSuffix="%"
              />
            </div>

            {/* Chart */}

            <div className="rounded-3xl border border-white/10 bg-black/10 p-2 sm:p-4">
              <div
                className="
              min-h-[450px]
              h-[450px]
              sm:h-[550px]
              lg:h-[700px]
              "
              >
                <TabChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
