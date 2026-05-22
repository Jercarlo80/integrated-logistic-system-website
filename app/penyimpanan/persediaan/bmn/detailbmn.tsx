"use client";

import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import { MaterilItem } from "@/app/component/materiltable"; // Sesuaikan path import

type DetailBarangProps = {
  item: MaterilItem;
  onClose: () => void;
};

const getField = (value: any) => (value && value !== "" ? value : "-");

export default function DetailBMN({ item, onClose }: DetailBarangProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(0,0,0,0.1)" }}
      onClick={onClose} // Tutup jika klik background
    >
      <div
        className="bg-black rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Mencegah penutupan saat klik di dalam modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detail Barang</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Identifikasi */}
          <div className="border rounded p-3">
            <h3 className="font-semibold bg-gray-100 p-2 mb-2">Identifikasi</h3>
            <div><span className="font-medium">BAG:</span> {getField(item.bag)}</div>
            <div><span className="font-medium">UNSR:</span> {getField(item.unsr)}</div>
            <div><span className="font-medium">BID:</span> {getField(item.bid)}</div>
            <div><span className="font-medium">SUB BID:</span> {getField(item.subBid)}</div>
            <div><span className="font-medium">SUB SUB BID:</span> {getField(item.subSubBid)}</div>
          </div>
          {/* Klasifikasi */}
          <div className="border rounded p-3">
            <h3 className="font-semibold bg-gray-100 p-2 mb-2">Klasifikasi</h3>
            <div><span className="font-medium">GOL:</span> {getField(item.gol)}</div>
            <div><span className="font-medium">BID:</span> {getField(item.bidKlasifikasi)}</div>
            <div><span className="font-medium">KEL:</span> {getField(item.kel)}</div>
            <div><span className="font-medium">SUB KEL:</span> {getField(item.subKel)}</div>
            <div><span className="font-medium">SUB SUB KEL:</span> {getField(item.subSubKel)}</div>
          </div>
          {/* Jenis */}
          <div className="border rounded p-3">
            <h3 className="font-semibold bg-gray-100 p-2 mb-2">Jenis</h3>
            <div><span className="font-medium">JENIS:</span> {getField(item.jenis)}</div>
            <div><span className="font-medium">TIPE:</span> {getField(item.tipe)}</div>
            <div><span className="font-medium">URUT:</span> {getField(item.urut)}</div>
          </div>
          {/* Data Barang */}
          <div className="border rounded p-3">
            <h3 className="font-semibold bg-gray-100 p-2 mb-2">Data Barang</h3>
            <div><span className="font-medium">Nama Barang:</span> {item.name}</div>
            <div><span className="font-medium">Merk/Type:</span> {getField(item.merkType)}</div>
            <div><span className="font-medium">Nomor Seri:</span> {item.serialNumbers?.join(", ") || "-"}</div>
            <div><span className="font-medium">Negara Pembuat:</span> {getField(item.negaraPembuat)}</div>
            <div><span className="font-medium">Tahun Pembuatan:</span> {getField(item.tahunPembuatan)}</div>
            <div><span className="font-medium">Tahun Pemakaian:</span> {getField(item.tahunPemakaian)}</div>
          </div>
          {/* Satuan & Kondisi */}
          <div className="border rounded p-3">
            <h3 className="font-semibold bg-gray-100 p-2 mb-2">Satuan & Kondisi</h3>
            <div><span className="font-medium">Jumlah:</span> {item.jumlah ?? 1}</div>
            <div><span className="font-medium">Satuan:</span> {getField(item.satuan)}</div>
            <div><span className="font-medium">Kondisi B:</span> {getField(item.kondisiB)}</div>
            <div><span className="font-medium">RR:</span> {getField(item.rr)}</div>
            <div><span className="font-medium">RB:</span> {getField(item.rb)}</div>
            <div><span className="font-medium">Persen:</span> {getField(item.persen)}</div>
          </div>
          {/* Informasi Lain */}
          <div className="border rounded p-3">
            <h3 className="font-semibold bg-gray-100 p-2 mb-2">Informasi Lain</h3>
            <div><span className="font-medium">Keterangan:</span> {getField(item.keterangan)}</div>
            <div><span className="font-medium">Update Tanggal:</span> {getField(item.updateTanggal)}</div>
            <div><span className="font-medium">Konseptor:</span> {getField(item.konseptor)}</div>
          </div>
          {/* Gambar */}
          {item.gambar && (
            <div className="border rounded p-3 col-span-2">
              <h3 className="font-semibold bg-gray-100 p-2 mb-2">Gambar</h3>
              <img src={item.gambar} alt="barang" className="max-w-full max-h-64 object-contain" />
            </div>
          )}
          {/* QR Code */}
          {item.qrCode && (
            <div className="border rounded p-3 col-span-2 text-center">
              <h3 className="font-semibold bg-gray-100 p-2 mb-2">QR Code</h3>
              <QRCodeCanvas value={item.qrCode} size={128} />
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white rounded">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}