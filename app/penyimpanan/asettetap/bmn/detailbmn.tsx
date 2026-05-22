"use client";

import { QRCodeCanvas } from "qrcode.react";
import { MaterilItem } from "@/app/component/materiltable";
import {
  X,
  Hash,
  Layers,
  Package,
  Box,
  BarChart3,
  Info,
  Image as ImageIcon,
  QrCode,
  Building2,
  Tag,
  Calendar,
  User,
  Globe,
  Cpu,
  HardDrive,
} from "lucide-react";

type DetailBarangProps = {
  item: MaterilItem;
  onClose: () => void;
};

const getField = (value: any) => (value && value !== "" ? value : "-");

const generateKodefikasiString = (item: MaterilItem): string => {
  const identifikasi = [
    item.bag || "0",
    item.unsr || "0",
    item.bid || "0",
    item.subBid || "0",
    item.subSubBid || "0",
  ].join(".");
  const klasifikasi = [
    item.gol || "0",
    item.bidKlasifikasi || "0",
    item.kel || "0",
    item.subKel || "0",
    item.subSubKel || "0",
  ].join(".");
  const detail = [item.jenis || "0", item.tipe || "0", item.urut || "0"].join(
    "."
  );
  return `${identifikasi}-${klasifikasi}-${detail}`;
};

export default function DetailBMN({ item, onClose }: DetailBarangProps) {
  const kodefikasi = generateKodefikasiString(item);

  // Helper untuk render baris info dengan ikon
  const InfoRow = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: string;
  }) => (
    <div className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
      <Icon size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <p className="text-sm text-white font-mono break-all mt-0.5">
          {value}
        </p>
      </div>
    </div>
  );

  const SectionCard = ({
    title,
    icon: Icon,
    children,
  }: {
    title: string;
    icon: any;
    children: React.ReactNode;
  }) => (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500/10 to-transparent border-b border-white/10">
        <Icon size={18} className="text-cyan-400" />
        <h3 className="text-sm font-semibold text-white tracking-wide">
          {title}
        </h3>
      </div>
      <div className="p-4 space-y-1">{children}</div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backdropFilter: "blur(12px)",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-[#0a0f1a] to-[#06090f] shadow-2xl shadow-cyan-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-slate-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 via-transparent to-cyan-500/5 px-6 py-5 pr-12">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <Package size={24} className="text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Detail Materiil
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Informasi lengkap aset dan identifikasi
              </p>
            </div>
          </div>
        </div>

        {/* Body grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Identifikasi */}
            <SectionCard title="Identifikasi" icon={Hash}>
              <InfoRow icon={Building2} label="BAG" value={getField(item.bag)} />
              <InfoRow icon={Layers} label="UNSR" value={getField(item.unsr)} />
              <InfoRow icon={Tag} label="BID" value={getField(item.bid)} />
              <InfoRow
                icon={HardDrive}
                label="SUB BID"
                value={getField(item.subBid)}
              />
              <InfoRow
                icon={Cpu}
                label="SUB SUB BID"
                value={getField(item.subSubBid)}
              />
            </SectionCard>

            {/* Klasifikasi */}
            <SectionCard title="Klasifikasi" icon={BarChart3}>
              <InfoRow icon={Hash} label="GOL" value={getField(item.gol)} />
              <InfoRow
                icon={Tag}
                label="BID (Klasifikasi)"
                value={getField(item.bidKlasifikasi)}
              />
              <InfoRow
                icon={Layers}
                label="KEL"
                value={getField(item.kel)}
              />
              <InfoRow
                icon={HardDrive}
                label="SUB KEL"
                value={getField(item.subKel)}
              />
              <InfoRow
                icon={Cpu}
                label="SUB SUB KEL"
                value={getField(item.subSubKel)}
              />
            </SectionCard>

            {/* Jenis */}
            <SectionCard title="Jenis & Tipe" icon={Box}>
              <InfoRow icon={Tag} label="JENIS" value={getField(item.jenis)} />
              <InfoRow icon={Cpu} label="TIPE" value={getField(item.tipe)} />
              <InfoRow icon={Hash} label="URUT" value={getField(item.urut)} />
            </SectionCard>

            {/* Data Barang */}
            <SectionCard title="Data Barang" icon={Package}>
              <InfoRow
                icon={Package}
                label="Nama Barang"
                value={item.name || "-"}
              />
              <InfoRow
                icon={HardDrive}
                label="Merk / Type"
                value={getField(item.merkType)}
              />
              <InfoRow
                icon={Hash}
                label="Nomor Seri"
                value={item.serialNumbers?.join(", ") || "-"}
              />
              <InfoRow
                icon={Globe}
                label="Negara Pembuat"
                value={getField(item.negaraPembuat)}
              />
              <InfoRow
                icon={Calendar}
                label="Tahun Pembuatan"
                value={getField(item.tahunPembuatan)}
              />
              <InfoRow
                icon={Calendar}
                label="Tahun Pemakaian"
                value={getField(item.tahunPemakaian)}
              />
            </SectionCard>

            {/* Satuan & Kondisi */}
            <SectionCard title="Satuan & Kondisi" icon={BarChart3}>
              <InfoRow
                icon={Hash}
                label="Jumlah"
                value={(item.jumlah ?? 1).toString()}
              />
              <InfoRow icon={Box} label="Satuan" value={getField(item.satuan)} />
              <InfoRow
                icon={Tag}
                label="Kondisi B"
                value={getField(item.kondisiB)}
              />
              <InfoRow icon={Cpu} label="RR" value={getField(item.rr)} />
              <InfoRow icon={HardDrive} label="RB" value={getField(item.rb)} />
              <InfoRow
                icon={BarChart3}
                label="Persen"
                value={getField(item.persen)}
              />
            </SectionCard>

            {/* Informasi Lain */}
            <SectionCard title="Informasi Lain" icon={Info}>
              <InfoRow
                icon={Info}
                label="Keterangan"
                value={getField(item.keterangan)}
              />
              <InfoRow
                icon={Calendar}
                label="Update Tanggal"
                value={getField(item.updateTanggal)}
              />
              <InfoRow
                icon={User}
                label="Konseptor"
                value={getField(item.konseptor)}
              />
            </SectionCard>

            {/* Gambar jika ada */}
            {item.gambar && (
              <div className="md:col-span-2">
                <SectionCard title="Gambar Barang" icon={ImageIcon}>
                  <div className="flex justify-center p-2">
                    <img
                      src={item.gambar}
                      alt="barang"
                      className="max-w-full max-h-64 rounded-lg border border-white/10 shadow-lg object-contain"
                    />
                  </div>
                </SectionCard>
              </div>
            )}

            {/* QR Code - full width */}
            <div className="md:col-span-2">
              <SectionCard title="QR Code Kodefikasi" icon={QrCode}>
                <div className="flex flex-col items-center gap-3 py-2">
                  <div className="bg-white p-3 rounded-xl">
                    <QRCodeCanvas value={kodefikasi} size={140} />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-xs font-mono text-cyan-300 break-all bg-black/40 px-3 py-1.5 rounded-full inline-block">
                      {kodefikasi}
                    </p>
                    <p className="text-xs text-slate-400">
                      Scan QR untuk melihat kodefikasi lengkap
                    </p>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4 flex justify-end bg-white/5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-cyan-500 focus:outline-none"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}