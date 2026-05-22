// app/component/tabinformasi.tsx
import { useState } from "react";
import StrukturOrganisasi from "@/app/component/strukturorganisasi"; // Import komponen struktur organisasi

type MainTab = "ketentuan" | "organisasi";
type SubTabKetentuan = "tujuan" | "sasaran" | "asas" | "prinsip" | "lain";
type SubTabOrganisasi = "struktur" | "tugas";

export default function TabInformasi() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("ketentuan");
  const [activeSubTab, setActiveSubTab] = useState<SubTabKetentuan | SubTabOrganisasi>("tujuan");

  // Konten dinamis berdasarkan main tab dan sub tab
  const renderContent = () => {
    if (activeMainTab === "ketentuan") {
      switch (activeSubTab as SubTabKetentuan) {
        case "tujuan":
          return (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-200">Tujuan</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Memberikan gambaran umum tentang tujuan dari sistem informasi ini, 
                seperti meningkatkan efisiensi pengelolaan barang milik negara (BMN) 
                dan non-BMN, serta mendukung pengambilan keputusan yang transparan.
              </p>
            </div>
          );
        case "sasaran":
          return (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-200">Sasaran</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Mencapai kesiapan BMN minimal 90% pada akhir tahun.</li>
                <li>Meningkatkan akurasi data inventaris hingga 99%.</li>
                <li>Mempercepat proses pelaporan aset secara digital.</li>
              </ul>
            </div>
          );
        case "asas":
          return (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-200">Asas-Asas</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Asas Kepastian Hukum</li>
                <li>Asas Transparansi</li>
                <li>Asas Akuntabilitas</li>
                <li>Asas Efisiensi dan Efektivitas</li>
              </ul>
            </div>
          );
        case "prinsip":
          return (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-200">Prinsip</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Prinsip pengelolaan aset meliputi: keterpaduan, profesionalisme, 
                kemandirian, dan berkelanjutan.
              </p>
            </div>
          );
        case "lain":
          return (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-200">Ketentuan Lain</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Ketentuan lain yang berlaku diatur dalam peraturan pemerintah 
                tentang pengelolaan barang milik daerah/negara.
              </p>
            </div>
          );
        default:
          return null;
      }
    } else {
      switch (activeSubTab as SubTabOrganisasi) {
        case "struktur":
          // Menggunakan komponen StrukturOrganisasi yang sudah dibuat
          return <StrukturOrganisasi />;
        case "tugas":
          return (
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-200">Tugas & Tanggung Jawab</h4>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                <li>Melakukan inventarisasi BMN dan Non BMN secara berkala.</li>
                <li>Menyusun laporan kesiapan aset setiap bulan.</li>
                <li>Mengupdate data perubahan status barang.</li>
                <li>Memberikan rekomendasi pemanfaatan aset.</li>
              </ul>
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl border border-gray-700/50 shadow-lg p-5 flex flex-col backdrop-blur-sm">
      {/* Tab Utama */}
      <div className="flex gap-2 mb-4 border-b border-gray-700">
        <button
          onClick={() => {
            setActiveMainTab("ketentuan");
            setActiveSubTab("tujuan");
          }}
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
            activeMainTab === "ketentuan"
              ? "bg-gray-700 text-gray-100 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Ketentuan
        </button>
        <button
          onClick={() => {
            setActiveMainTab("organisasi");
            setActiveSubTab("struktur");
          }}
          className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
            activeMainTab === "organisasi"
              ? "bg-gray-700 text-gray-100 border-b-2 border-blue-500"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          Organisasi
        </button>
      </div>

      {/* Sub Tab */}
      <div className="flex flex-wrap gap-2 mb-4 pb-2 border-b border-gray-700/50">
        {activeMainTab === "ketentuan" ? (
          <>
            <button
              onClick={() => setActiveSubTab("tujuan")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeSubTab === "tujuan"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              }`}
            >
              Tujuan
            </button>
            <button
              onClick={() => setActiveSubTab("sasaran")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeSubTab === "sasaran"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              }`}
            >
              Sasaran
            </button>
            <button
              onClick={() => setActiveSubTab("asas")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeSubTab === "asas"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              }`}
            >
              Asas-Asas
            </button>
            <button
              onClick={() => setActiveSubTab("prinsip")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeSubTab === "prinsip"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              }`}
            >
              Prinsip
            </button>
            <button
              onClick={() => setActiveSubTab("lain")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeSubTab === "lain"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              }`}
            >
              Ketentuan Lain
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveSubTab("struktur")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeSubTab === "struktur"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              }`}
            >
              Struktur Organisasi
            </button>
            <button
              onClick={() => setActiveSubTab("tugas")}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                activeSubTab === "tugas"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/50"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"
              }`}
            >
              Tugas & Tanggung Jawab
            </button>
          </>
        )}
      </div>

      {/* Konten Informasi */}
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-500 border-t border-gray-700/50 pt-2">
        Referensi: Peraturan Pemerintah No. 27 Tahun 2014
      </div>
    </div>
  );
}