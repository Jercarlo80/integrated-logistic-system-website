"use client";

import { useState, useEffect } from "react";
import { FaFilePdf, FaFileExcel, FaPlus } from "react-icons/fa";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import InOutForm from "./inoutform";
import InOutPopUpQR from "./inoutpopupqr";
import PopUpCardPengembalian from "./popupcardpengembalian";

export type SubComponent = {
  name: string;
  jumlah: number;
  serialNumber?: string;
  keterangan?: string;
};

export type SubGroup = {
  label: string;
  components: SubComponent[];
};

export type Item = {
  name: string;
  jumlah: number;
  satuan: "set" | "unit" | "buah";
  subGroups?: SubGroup[];
  keterangan?: string;
  image?: string | null;
};

export type InOutData = {
  id: number;
  dasar: string;
  tanggal: string;
  untuk: string;
  items: Item[];
  penerima: {
    pangkat: string;
    korps: string;
    nama: string;
    nrp: string;
  };
  peminjam: {
    pangkat: string;
    korps: string;
    nama: string;
    nrp: string;
  };
  keterangan: string;
  gambar?: string;
  serialNumbers?: string[][];
};

type Props = {
  title: string;
  exportFileName: string;
  data: InOutData[];
  mode: "peminjaman" | "pengembalian";
};

export default function InOutTable({
  title,
  exportFileName,
  data,
  mode,
}: Props) {
  const [localData, setLocalData] = useState<InOutData[]>(data);
  const [qrMap, setQrMap] = useState<Record<string, string>>({});
  const [showForm, setShowForm] = useState(false);
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Generate QR untuk setiap item utama (set atau non‑set) – tetap digunakan untuk UI
  useEffect(() => {
    const generateQR = async () => {
      const newQr: Record<string, string> = {};

      for (const row of localData) {
        for (let itemIndex = 0; itemIndex < row.items.length; itemIndex++) {
          const item = row.items[itemIndex];
          const payload = JSON.stringify({
            transaksi_id: row.id,
            nama_barang: item.name,
            tanggal: row.tanggal,
            serials: row.serialNumbers?.[itemIndex] ?? [],
          });

          const key = `${row.id}-${item.name}-${itemIndex}`;
          const qr = await QRCode.toDataURL(payload);
          newQr[key] = qr;
        }
      }

      setQrMap(newQr);
    };

    generateQR();
  }, [localData]);

  // Fungsi untuk menghasilkan data flat untuk ekspor Excel (tetap digunakan)
  const getFlatData = () => {
    const rows: any[] = [];

    localData.forEach((row) => {
      row.items.forEach((item, itemIndex) => {
        const serials = row.serialNumbers?.[itemIndex] ?? [];

        if (item.satuan === "set" && item.subGroups) {
          for (let unit = 0; unit < item.jumlah; unit++) {
            const setSerial = serials[unit] || "-";
            const group = item.subGroups[unit];
            if (group) {
              group.components.forEach((comp) => {
                rows.push({
                  Dasar: row.dasar,
                  Tanggal: row.tanggal,
                  Untuk: row.untuk,
                  NamaBarang: `${item.name} (Set ${unit + 1} - ${comp.name})`,
                  Jumlah: comp.jumlah,
                  Satuan: "unit",
                  KeteranganItem: comp.keterangan || "-",
                  SerialNumber: comp.serialNumber || "-",
                  Penerima: `${row.penerima.nama} (${row.penerima.pangkat}/${row.penerima.korps} - ${row.penerima.nrp})`,
                  Peminjam: `${row.peminjam.nama} (${row.peminjam.pangkat}/${row.peminjam.korps} - ${row.peminjam.nrp})`,
                  KeteranganGlobal: row.keterangan,
                  FotoGlobal: row.gambar || "-",
                });
              });
            }
          }
        } else {
          for (let unit = 0; unit < item.jumlah; unit++) {
            rows.push({
              Dasar: row.dasar,
              Tanggal: row.tanggal,
              Untuk: row.untuk,
              NamaBarang:
                item.jumlah > 1 ? `${item.name} - ${unit + 1}` : item.name,
              Jumlah: 1,
              Satuan: item.satuan,
              KeteranganItem: item.keterangan || "-",
              SerialNumber: serials[unit] || "-",
              Penerima: `${row.penerima.nama} (${row.penerima.pangkat}/${row.penerima.korps} - ${row.penerima.nrp})`,
              Peminjam: `${row.peminjam.nama} (${row.peminjam.pangkat}/${row.peminjam.korps} - ${row.peminjam.nrp})`,
              KeteranganGlobal: row.keterangan,
              FotoGlobal: row.gambar || "-",
            });
          }
        }
      });
    });

    return rows;
  };

  // ========== LOGIC EXPORT PDF (seperti pada MaterilTable) ==========
  const handleExportPDF = async () => {
    const { default: jsPDF } = await import("jspdf");
    const { default: autoTable } = await import("jspdf-autotable");

    const cmToPt = (cm: number) => cm * 28.346456692913385;

    const marginTop = cmToPt(2.03);
    const marginLeft = cmToPt(2.54);
    const marginRight = cmToPt(1.52);
    const marginBottom = cmToPt(1.27);

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const availableWidth = pageWidth - marginLeft - marginRight;

    const titleY = marginTop;
    const dateY = titleY + 14;
    const tableStartY = dateY + 12;

    pdf.setFontSize(13);
    pdf.setFont("helvetica", "bold");
    pdf.text(title.toUpperCase(), pageWidth / 2, titleY, { align: "center" });

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `${new Date().toLocaleDateString("id-ID")}`,
      pageWidth / 2,
      dateY,
      { align: "center" }
    );

    type RowQRMeta = { qrDataUrl?: string } | null;
    const bodyRows: any[][] = [];
    const qrMeta: RowQRMeta[] = [];

    let globalRowCounter = 1;

    for (const row of localData) {
      for (let itemIndex = 0; itemIndex < row.items.length; itemIndex++) {
        const item = row.items[itemIndex];
        const serials = row.serialNumbers?.[itemIndex] ?? [];

        if (item.satuan === "set" && item.subGroups) {
          for (let unit = 0; unit < item.jumlah; unit++) {
            const setSerial = serials[unit] || "-";
            const group = item.subGroups[unit];
            if (group) {
              // Baris utama set
              const mainRowPayload = {
                transaksi_id: row.id,
                nama_barang: item.name,
                unit: unit + 1,
                tipe: "set",
              };
              const mainQR = await QRCode.toDataURL(
                JSON.stringify(mainRowPayload)
              );
              bodyRows.push([
                { content: String(globalRowCounter++), styles: { halign: "center" } },
                { content: row.dasar },
                { content: row.tanggal },
                { content: row.untuk },
                { content: `${item.name} (Set ${unit + 1})` },
                { content: "1", styles: { halign: "center" } },
                { content: "set", styles: { halign: "center" } },
                { content: item.keterangan || "-" },
                { content: setSerial },
                {
                  content: `${row.penerima.nama} (${row.penerima.pangkat}/${row.penerima.korps} - ${row.penerima.nrp})`,
                },
                {
                  content: `${row.peminjam.nama} (${row.peminjam.pangkat}/${row.peminjam.korps} - ${row.peminjam.nrp})`,
                },
                { content: row.keterangan || "-" },
                { content: row.gambar ? "Ada gambar" : "-" },
                { content: "" }, // QR
              ]);
              qrMeta.push({ qrDataUrl: mainQR });

              // Baris komponen dalam set ini
              for (const comp of group.components) {
                const compPayload = {
                  transaksi_id: row.id,
                  nama_barang: `${item.name} - ${comp.name}`,
                  unit: unit + 1,
                  tipe: "component",
                };
                const compQR = await QRCode.toDataURL(
                  JSON.stringify(compPayload)
                );
                bodyRows.push([
                  { content: "", styles: { halign: "center" } },
                  { content: "" },
                  { content: "" },
                  { content: "" },
                  { content: `↳ ${comp.name}` },
                  { content: String(comp.jumlah), styles: { halign: "center" } },
                  { content: "unit", styles: { halign: "center" } },
                  { content: comp.keterangan || "-" },
                  { content: comp.serialNumber || "-" },
                  { content: "" },
                  { content: "" },
                  { content: "" },
                  { content: "" },
                  { content: "" },
                ]);
                qrMeta.push({ qrDataUrl: compQR });
              }
            }
          }
        } else {
          // Item biasa (bukan set)
          for (let unit = 0; unit < item.jumlah; unit++) {
            const itemPayload = {
              transaksi_id: row.id,
              nama_barang: item.name,
              unit: unit + 1,
              tipe: "item",
            };
            const itemQR = await QRCode.toDataURL(JSON.stringify(itemPayload));
            bodyRows.push([
              { content: String(globalRowCounter++), styles: { halign: "center" } },
              { content: row.dasar },
              { content: row.tanggal },
              { content: row.untuk },
              {
                content:
                  item.jumlah > 1 ? `${item.name} - ${unit + 1}` : item.name,
              },
              { content: "1", styles: { halign: "center" } },
              { content: item.satuan, styles: { halign: "center" } },
              { content: item.keterangan || "-" },
              { content: serials[unit] || "-" },
              {
                content: `${row.penerima.nama} (${row.penerima.pangkat}/${row.penerima.korps} - ${row.penerima.nrp})`,
              },
              {
                content: `${row.peminjam.nama} (${row.peminjam.pangkat}/${row.peminjam.korps} - ${row.peminjam.nrp})`,
              },
              { content: row.keterangan || "-" },
              { content: row.gambar ? "Ada gambar" : "-" },
              { content: "" }, // QR
            ]);
            qrMeta.push({ qrDataUrl: itemQR });
          }
        }
      }
    }

    // Lebar kolom proporsional (total 14 kolom)
    const colWeights = [
      0.5, // No
      1.8, // Dasar
      1.2, // Tanggal
      1.8, // Untuk
      3.0, // Nama Barang
      0.6, // Jumlah
      0.8, // Satuan
      2.0, // Keterangan
      1.5, // Serial Number
      2.5, // Penerima
      2.5, // Peminjam
      2.0, // Keterangan Global
      1.0, // Foto
      1.0, // QR
    ];

    const totalWeight = colWeights.reduce((s, w) => s + w, 0);
    const columnStyles: Record<number, any> = {};

    colWeights.forEach((weight, idx) => {
      columnStyles[idx] = {
        cellWidth: (availableWidth * weight) / totalWeight,
        halign: idx === 0 || idx === 5 || idx === 6 || idx === 13 ? "center" : "left",
        valign: "middle",
      };
    });

    autoTable(pdf, {
      startY: tableStartY,
      tableWidth: availableWidth,
      margin: { left: marginLeft, right: marginRight, bottom: marginBottom },
      head: [[
        "No", "Dasar", "Tanggal", "Untuk", "Nama Barang",
        "Jml", "Satuan", "Keterangan", "Serial Number",
        "Penerima", "Peminjam", "Keterangan Global", "Foto", "QR"
      ]],
      body: bodyRows,
      theme: "grid",
      styles: {
        fontSize: 6.4,
        cellPadding: { top: 2, right: 2, bottom: 2, left: 2 },
        lineColor: [156, 163, 175],
        lineWidth: 0.4,
        textColor: [31, 41, 55],
        font: "helvetica",
        overflow: "linebreak",
        minCellHeight: 18,
        valign: "middle",
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontStyle: "bold",
        fontSize: 6.2,
        lineColor: [107, 114, 128],
        lineWidth: 0.5,
        halign: "center",
        valign: "middle",
      },
      columnStyles,
      didDrawCell: (hookData: any) => {
        if (hookData.section !== "body") return;
        if (hookData.column.index !== 13) return; // kolom QR (index ke-13)

        const meta = qrMeta[hookData.row.index];
        if (!meta?.qrDataUrl) return;

        const { x, y, width, height } = hookData.cell;
        const size = Math.min(width - 6, height - 6, 24);
        const imgX = x + (width - size) / 2;
        const imgY = y + (height - size) / 2;

        try {
          pdf.addImage(meta.qrDataUrl, "PNG", imgX, imgY, size, size);
        } catch {
          // ignore
        }
      },
    });

    const safeFileName = `${exportFileName}_${new Date().toISOString().slice(0, 10)}`
      .replace(/[\/\\:*?"<>|]/g, "-")
      .replace(/\s+/g, "_");

    pdf.save(`${safeFileName}.pdf`);
  };
  // ========== AKHIR LOGIC EXPORT PDF ==========

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(getFlatData());
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), `${exportFileName}.xlsx`);
  };

  const handleSubmit = (newData: InOutData) => {
    setLocalData((prev) => [...prev, newData]);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      {/* Header atas (judul, export, tambah) */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-6 py-5 border-b bg-gray-50">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">
            Data {mode === "peminjaman" ? "Peminjaman" : "Pengembalian"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 bg-red-50 text-red-600 text-sm hover:bg-red-100"
          >
            <FaFilePdf size={14} /> Export PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-sm hover:bg-green-100"
          >
            <FaFileExcel size={14} /> Export Excel
          </button>
          <button
            onClick={() => {
              if (mode === "peminjaman") setShowForm(true);
              if (mode === "pengembalian") setShowReturnPopup(true);
            }}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-[#328E6E] to-[#6D9E51] text-white text-sm shadow"
          >
            <FaPlus size={13} />
            {mode === "peminjaman" ? "Ajukan Peminjaman" : "Terima Pengembalian"}
          </button>
        </div>
      </div>

      {/* Area tabel dengan scroll horizontal */}
      <div className="px-6 py-6 overflow-x-auto">
        <table className="min-w-max w-full text-sm">
          <thead className="sticky top-0 bg-gradient-to-r from-[#2f7d63] to-[#5d9146] text-white text-xs uppercase tracking-wide">
            <tr>
              <th className="px-3 py-3 text-center">No</th>
              <th className="px-3 py-3 text-left">Dasar</th>
              <th className="px-3 py-3 text-left">Tanggal</th>
              <th className="px-3 py-3 text-left">Untuk</th>
              <th className="px-3 py-3 text-left">Nama Barang</th>
              <th className="px-3 py-3 text-center">Jumlah</th>
              <th className="px-3 py-3 text-center">Satuan</th>
              <th className="px-3 py-3 text-left">Keterangan</th>
              <th className="px-3 py-3 text-left">Serial Number</th>
              <th className="px-3 py-3 text-left">Penerima</th>
              <th className="px-3 py-3 text-left">Peminjam</th>
              <th className="px-3 py-3 text-left">Keterangan Global</th>
              <th className="px-3 py-3 text-center">Foto</th>
              <th className="px-3 py-3 text-center">QR</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {localData.map((row) => {
              let rowCounter = 0;
              return row.items.flatMap((item, itemIndex) => {
                const serials = row.serialNumbers?.[itemIndex] ?? [];
                const qty = item.jumlah;
                const qrKey = `${row.id}-${item.name}-${itemIndex}`;

                if (item.satuan === "set" && item.subGroups) {
                  // Untuk setiap unit set
                  const unitRows = [];
                  for (let unit = 0; unit < qty; unit++) {
                    rowCounter++;
                    const setSerial = serials[unit] || "-";
                    const group = item.subGroups[unit];

                    // Baris utama set
                    unitRows.push(
                      <tr key={`${row.id}-${itemIndex}-set-${unit}`} className="hover:bg-gray-50 transition">
                        <td className="px-3 py-2 text-center text-gray-500">{rowCounter}</td>
                        <td className="px-3 py-2 text-gray-900">{row.dasar}</td>
                        <td className="px-3 py-2 text-gray-800 whitespace-nowrap">{row.tanggal}</td>
                        <td className="px-3 py-2 text-gray-800">{row.untuk}</td>
                        <td className="px-3 py-2 font-medium text-gray-900">
                          {item.name} {qty > 1 ? `(Set ${unit + 1})` : ""}
                        </td>
                        <td className="px-3 py-2 text-center text-gray-900 font-semibold">1</td>
                        <td className="px-3 py-2 text-center text-gray-600">set</td>
                        <td className="px-3 py-2 text-gray-700 max-w-xs truncate">{item.keterangan || "-"}</td>
                        <td className="px-3 py-2 font-mono text-xs text-gray-700">{setSerial}</td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-900">{row.penerima.nama}</div>
                          <div className="text-xs text-gray-500">{row.penerima.pangkat}/{row.penerima.korps} - {row.penerima.nrp}</div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-900">{row.peminjam.nama}</div>
                          <div className="text-xs text-gray-500">{row.peminjam.pangkat}/{row.peminjam.korps} - {row.peminjam.nrp}</div>
                        </td>
                        <td className="px-3 py-2 text-gray-700 max-w-xs truncate">{row.keterangan || "-"}</td>
                        <td className="px-3 py-2 text-center">
                          {row.gambar ? (
                            <img src={row.gambar} className="w-9 h-9 object-cover rounded-md border shadow-sm mx-auto" />
                          ) : "-"}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {qrMap[qrKey] && (
                            <img
                              src={qrMap[qrKey]}
                              className="w-9 h-9 cursor-pointer mx-auto hover:scale-110 transition"
                              onClick={() => {
                                setSelectedQR(qrMap[qrKey]);
                                setSelectedItem(item.name);
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    );

                    // Baris komponen dalam set ini
                    if (group && group.components) {
                      group.components.forEach((comp, compIdx) => {
                        unitRows.push(
                          <tr key={`${row.id}-${itemIndex}-set-${unit}-comp-${compIdx}`} className="bg-gray-50/50">
                            <td className="px-3 py-2 text-center text-gray-400"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2 pl-8 text-gray-600">
                              <span>↳ {comp.name}</span>
                            </td>
                            <td className="px-3 py-2 text-center text-gray-700">{comp.jumlah}</td>
                            <td className="px-3 py-2 text-center text-gray-500">unit</td>
                            <td className="px-3 py-2 text-gray-600">{comp.keterangan || "-"}</td>
                            <td className="px-3 py-2 font-mono text-xs text-gray-600">{comp.serialNumber || "-"}</td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                            <td className="px-3 py-2"></td>
                          </tr>
                        );
                      });
                    }
                  }
                  return unitRows;
                } else {
                  // Item biasa (non‑set)
                  const unitRows = [];
                  for (let unit = 0; unit < qty; unit++) {
                    rowCounter++;
                    unitRows.push(
                      <tr key={`${row.id}-${itemIndex}-unit-${unit}`} className="hover:bg-gray-50 transition">
                        <td className="px-3 py-2 text-center text-gray-500">{rowCounter}</td>
                        <td className="px-3 py-2 text-gray-900">{row.dasar}</td>
                        <td className="px-3 py-2 text-gray-800 whitespace-nowrap">{row.tanggal}</td>
                        <td className="px-3 py-2 text-gray-800">{row.untuk}</td>
                        <td className="px-3 py-2 font-medium text-gray-900">
                          {qty > 1 ? `${item.name} - ${unit + 1}` : item.name}
                        </td>
                        <td className="px-3 py-2 text-center text-gray-900 font-semibold">1</td>
                        <td className="px-3 py-2 text-center text-gray-600">{item.satuan}</td>
                        <td className="px-3 py-2 text-gray-700 max-w-xs truncate">{item.keterangan || "-"}</td>
                        <td className="px-3 py-2 font-mono text-xs text-gray-700">{serials[unit] || "-"}</td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-900">{row.penerima.nama}</div>
                          <div className="text-xs text-gray-500">{row.penerima.pangkat}/{row.penerima.korps} - {row.penerima.nrp}</div>
                        </td>
                        <td className="px-3 py-2">
                          <div className="font-medium text-gray-900">{row.peminjam.nama}</div>
                          <div className="text-xs text-gray-500">{row.peminjam.pangkat}/{row.peminjam.korps} - {row.peminjam.nrp}</div>
                        </td>
                        <td className="px-3 py-2 text-gray-700 max-w-xs truncate">{row.keterangan || "-"}</td>
                        <td className="px-3 py-2 text-center">
                          {row.gambar ? (
                            <img src={row.gambar} className="w-9 h-9 object-cover rounded-md border shadow-sm mx-auto" />
                          ) : "-"}
                        </td>
                        <td className="px-3 py-2 text-center">
                          {qrMap[qrKey] && (
                            <img
                              src={qrMap[qrKey]}
                              className="w-9 h-9 cursor-pointer mx-auto hover:scale-110 transition"
                              onClick={() => {
                                setSelectedQR(qrMap[qrKey]);
                                setSelectedItem(item.name);
                              }}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  }
                  return unitRows;
                }
              });
            })}
          </tbody>
        </table>
      </div>

      {showForm && mode === "peminjaman" && (
        <InOutForm mode="peminjaman" onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
      )}

      {showReturnPopup && mode === "pengembalian" && (
        <PopUpCardPengembalian onClose={() => setShowReturnPopup(false)} />
      )}

      {selectedQR && (
        <InOutPopUpQR qr={selectedQR} itemName={selectedItem} onClose={() => setSelectedQR(null)} />
      )}
    </div>
  );
}