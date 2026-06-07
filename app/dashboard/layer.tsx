import CardInformasi from "@/app/component/cardinformasi";
import LineChart from "@/app/component/linechart";
import PieChartKomposisi from "@/app/component/piechartkomposisi";
import PieChartValidasi from "@/app/component/piechartvalidasi";
import CardAktivitas from "../component/cardaktivitas";
import CardLokasi from "../component/cardlokasi";
import CardAlert from "../component/cardalert";
import CardRingkasan from "../component/cardringkasan";
import CardTrackPengguna from "../component/cardtrackpengguna";

type Trend = {
  direction: "up" | "down";
  percentage: number;
};

export default function Layer() {
  const dashboardData = {
    totalMaterial: 12458,
    trendMaterial: { direction: "up", percentage: 8.45 } as Trend,
    dataTervalidasi: 10325,
    trendTervalidasi: { direction: "up", percentage: 5.2 } as Trend,
    persenTervalidasiDariTotal: 82.87,
    dataPending: 1256,
    dataDitolak: 877,
    totalUser: 142,
  };

  const cards: React.ComponentProps<typeof CardInformasi>[] = [
    {
      title: "Total Material",
      value: dashboardData.totalMaterial,
      accentColor: "teal",
      trend: dashboardData.trendMaterial,
      description: "Semua item terdaftar di sistem",
    },
    {
      title: "Data Tervalidasi",
      value: dashboardData.dataTervalidasi,
      valueSuffix: "Data",
      accentColor: "blue",
      trend: dashboardData.trendTervalidasi,
      extraInfo: `${dashboardData.persenTervalidasiDariTotal}% dari total data`,
    },
    {
      title: "Data Pending",
      value: dashboardData.dataPending,
      valueSuffix: "Data",
      accentColor: "amber",
      description: "Dalam proses validasi",
    },
    {
      title: "Data Ditolak",
      value: dashboardData.dataDitolak,
      valueSuffix: "Data",
      accentColor: "coral",
      description: "Perlu perbaikan",
    },
    {
      title: "Total Pengguna",
      value: dashboardData.totalUser,
      valueSuffix: "User",
      accentColor: "purple",
      description: "Aktif di sistem",
    },
  ];

  // Data chart — sesuaikan dengan sumber data sebenarnya
  const lineData = [
    { label: "Des 2025", input: 820, tervalidasi: 540, ditolak: 62 },
    { label: "Jan 2026", input: 1050, tervalidasi: 700, ditolak: 90 },
    { label: "Feb 2026", input: 1320, tervalidasi: 920, ditolak: 110 },
    { label: "Mar 2026", input: 1720, tervalidasi: 1180, ditolak: 120 },
    { label: "Apr 2026", input: 1920, tervalidasi: 1480, ditolak: 130 },
    { label: "Mei 2026", input: 2050, tervalidasi: 1690, ditolak: 142 },
  ];

  const komposisiData = [
    { name: "Sistem Komunikasi", value: 5245, color: "#3b82f6" },
    { name: "Sistem Elektronika", value: 3210, color: "#22c55e" },
    { name: "Perangkat Pendukung", value: 2450, color: "#f59e0b" },
    { name: "Antenna dan Aksesoris", value: 1553, color: "#ef4444" },
  ];

  const validasiData = [
    { name: "Tervalidasi", value: 10325, color: "#22c55e" },
    { name: "Pending", value: 1256, color: "#f59e0b" },
    { name: "Ditolak", value: 877, color: "#ef4444" },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      {/* Entrance motion (hormati prefers-reduced-motion) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes dashRise {
              from { opacity: 0; transform: translateY(14px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .dash-rise { opacity: 0; animation: dashRise .5s cubic-bezier(.22,1,.36,1) forwards; }
            .dash-stagger > * { opacity: 0; animation: dashRise .5s cubic-bezier(.22,1,.36,1) forwards; }
            .dash-stagger > *:nth-child(1) { animation-delay: .04s; }
            .dash-stagger > *:nth-child(2) { animation-delay: .09s; }
            .dash-stagger > *:nth-child(3) { animation-delay: .14s; }
            .dash-stagger > *:nth-child(4) { animation-delay: .19s; }
            .dash-stagger > *:nth-child(5) { animation-delay: .24s; }
            @media (prefers-reduced-motion: reduce) {
              .dash-rise, .dash-stagger > * { opacity: 1 !important; animation: none !important; }
            }
          `,
        }}
      />

      {/* Background berlapis */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_50%_-10%,rgba(16,185,129,0.10),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_85%_10%,rgba(59,130,246,0.06),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_90%_70%_at_50%_0%,black,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-slate-950 to-transparent" />
      </div>

      {/*
        @container: kunci responsivitas terhadap sidebar.
        Saat sidebar collapse, lebar <main> bertambah -> grid memakai breakpoint
        container (@...), bukan breakpoint layar, sehingga jumlah kolom menyesuaikan
        ruang yang benar-benar tersedia. Fluid (tanpa max-w-7xl) agar memakai ruang.
      */}
      <main className="@container relative z-10 mx-auto flex w-full max-w-450 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <header className="dash-rise flex flex-col gap-3 @lg:flex-row @lg:items-end @lg:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Data Dashboard
            </h1>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm @lg:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-slate-300">
              Diperbarui baru saja
            </span>
          </div>
        </header>

        {/* Baris 1: Kartu metrik — kolom mengikuti lebar konten (container) */}
        <section
          aria-label="Ringkasan statistik"
          className="dash-stagger grid grid-cols-1 gap-3 @sm:grid-cols-2 @sm:gap-4 @3xl:grid-cols-3 @5xl:grid-cols-5"
        >
          {cards.map((card) => (
            <CardInformasi key={card.title} {...card} />
          ))}
        </section>

        {/* Baris 2: Line chart + 2 donut — 3 kolom saat konten cukup lebar */}
        <section
          aria-label="Grafik data"
          className="grid grid-cols-1 gap-4 @5xl:grid-cols-3 @5xl:items-stretch"
        >
          <div className="dash-rise min-w-0">
            <LineChart data={lineData} />
          </div>
          <div className="dash-rise min-w-0" style={{ animationDelay: ".06s" }}>
            <PieChartKomposisi data={komposisiData} />
          </div>
          <div className="dash-rise min-w-0" style={{ animationDelay: ".1s" }}>
            <PieChartValidasi data={validasiData} />
          </div>
        </section>

        {/* Baris 3: Aktivitas + Peta + Alert */}
        <section
          aria-label="Aktivitas, peta, dan alert"
          className="grid grid-cols-1 gap-4 @5xl:grid-cols-3 @5xl:items-stretch"
        >
          <div className="dash-rise min-w-0">
            <CardAktivitas />
          </div>
          <div className="dash-rise min-w-0" style={{ animationDelay: ".06s" }}>
            <CardLokasi />
          </div>
          <div className="dash-rise min-w-0" style={{ animationDelay: ".1s" }}>
            <CardAlert />
          </div>
        </section>

        {/* Baris 4: Ringkasan (lebar) + Pengguna Online */}
        <section
          aria-label="Ringkasan audit & pengguna online"
          className="grid grid-cols-1 gap-4 @5xl:grid-cols-5 @5xl:items-stretch"
        >
          <div className="dash-rise min-w-0 @5xl:col-span-3">
            <CardRingkasan />
          </div>
          <div
            className="dash-rise min-w-0 @5xl:col-span-2"
            style={{ animationDelay: ".06s" }}
          >
            <CardTrackPengguna />
          </div>
        </section>
      </main>
    </div>
  );
}