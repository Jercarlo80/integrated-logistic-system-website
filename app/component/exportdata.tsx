"use client";

import React, { useEffect, useState } from "react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import type { MaterilGroup, MaterilItem } from "@/app/component/materiltable";

// ======================== META KOLOM EXPORT ========================
export type ColumnKey =
  | "no"
  | "bag"
  | "unsr"
  | "bid"
  | "subBid"
  | "subSubBid"
  | "gol"
  | "bidKlasifikasi"
  | "kel"
  | "subKel"
  | "subSubKel"
  | "jenis"
  | "tipe"
  | "urut"
  | "name"
  | "merkType"
  | "serial"
  | "negaraPembuat"
  | "tahunPembuatan"
  | "tahunPemakaian"
  | "jumlah"
  | "satuan"
  | "kondisiB"
  | "rr"
  | "rb"
  | "persen"
  | "keterangan"
  | "gambar"
  | "updateTanggal"
  | "konseptor";

const COLUMN_META: { key: ColumnKey; label: string; group: string }[] = [
  { key: "no", label: "No", group: "Umum" },
  { key: "bag", label: "BAG", group: "Identifikasi" },
  { key: "unsr", label: "UNSR", group: "Identifikasi" },
  { key: "bid", label: "BID", group: "Identifikasi" },
  { key: "subBid", label: "SUB BID", group: "Identifikasi" },
  { key: "subSubBid", label: "SUB SUB BID", group: "Identifikasi" },
  { key: "gol", label: "GOL", group: "Klasifikasi" },
  { key: "bidKlasifikasi", label: "BID (Klasifikasi)", group: "Klasifikasi" },
  { key: "kel", label: "KEL", group: "Klasifikasi" },
  { key: "subKel", label: "SUB KEL", group: "Klasifikasi" },
  { key: "subSubKel", label: "SUB SUB KEL", group: "Klasifikasi" },
  { key: "jenis", label: "JENIS", group: "Jenis" },
  { key: "tipe", label: "TIPE", group: "Jenis" },
  { key: "urut", label: "URUT", group: "Jenis" },
  { key: "name", label: "NAMA BARANG", group: "Data Barang" },
  { key: "merkType", label: "MERK/TYPE", group: "Data Barang" },
  { key: "serial", label: "NOMOR SERI", group: "Data Barang" },
  { key: "negaraPembuat", label: "NEGARA PEMBUAT", group: "Data Barang" },
  { key: "tahunPembuatan", label: "THN PEMBUATAN", group: "Data Barang" },
  { key: "tahunPemakaian", label: "THN PEMAKAIAN", group: "Data Barang" },
  { key: "jumlah", label: "JUMLAH", group: "Satuan" },
  { key: "satuan", label: "SAT", group: "Satuan" },
  { key: "kondisiB", label: "B", group: "Kondisi" },
  { key: "rr", label: "RR", group: "Kondisi" },
  { key: "rb", label: "RB", group: "Kondisi" },
  { key: "persen", label: "%", group: "Kondisi" },
  { key: "keterangan", label: "KETERANGAN", group: "Lainnya" },
  { key: "gambar", label: "GAMBAR (URL)", group: "Lainnya" },
  { key: "updateTanggal", label: "TANGGAL", group: "Update" },
  { key: "konseptor", label: "KONSEPTOR", group: "Update" },
];

const SHORT_LABEL: Record<ColumnKey, string> = {
  no: "No",
  bag: "BAG",
  unsr: "UNSR",
  bid: "BID",
  subBid: "SUB BID",
  subSubBid: "SUB SUB BID",
  gol: "GOL",
  bidKlasifikasi: "BID KLAS",
  kel: "KEL",
  subKel: "SUB KEL",
  subSubKel: "SUB SUB KEL",
  jenis: "JENIS",
  tipe: "TIPE",
  urut: "URUT",
  name: "NAMA BARANG",
  merkType: "MERK / TYPE",
  serial: "NOMOR SERI",
  negaraPembuat: "NEGARA PEMBUAT",
  tahunPembuatan: "THN BUAT",
  tahunPemakaian: "THN PAKAI",
  jumlah: "JML",
  satuan: "SAT",
  kondisiB: "B",
  rr: "RR",
  rb: "RB",
  persen: "%",
  keterangan: "KETERANGAN",
  gambar: "GAMBAR",
  updateTanggal: "TANGGAL",
  konseptor: "KONSEPTOR",
};

const COL_NO: Record<ColumnKey, number> = {
  no: 0,
  bag: 1,
  unsr: 2,
  bid: 3,
  subBid: 4,
  subSubBid: 5,
  gol: 6,
  bidKlasifikasi: 7,
  kel: 8,
  subKel: 9,
  subSubKel: 10,
  jenis: 11,
  tipe: 12,
  urut: 13,
  name: 14,
  merkType: 15,
  serial: 16,
  negaraPembuat: 17,
  tahunPembuatan: 18,
  tahunPemakaian: 19,
  jumlah: 20,
  satuan: 21,
  kondisiB: 22,
  rr: 23,
  rb: 24,
  persen: 25,
  keterangan: 26,
  gambar: 27,
  updateTanggal: 28,
  konseptor: 29,
};

const COL_W: Record<ColumnKey, number> = {
  no: 8,
  bag: 9,
  unsr: 11,
  bid: 9,
  subBid: 13,
  subSubBid: 16,
  gol: 9,
  bidKlasifikasi: 16,
  kel: 9,
  subKel: 13,
  subSubKel: 16,
  jenis: 14,
  tipe: 16,
  urut: 9,
  name: 40,
  merkType: 26,
  serial: 30,
  negaraPembuat: 18,
  tahunPembuatan: 14,
  tahunPemakaian: 14,
  jumlah: 10,
  satuan: 12,
  kondisiB: 8,
  rr: 8,
  rb: 8,
  persen: 9,
  keterangan: 42,
  gambar: 42,
  updateTanggal: 18,
  konseptor: 20,
};

const ALL_KEYS = COLUMN_META.map((c) => c.key);
const COLUMN_GROUPS = Array.from(new Set(COLUMN_META.map((c) => c.group)));

const SPANNING_GROUPS = new Set<string>([
  "Identifikasi",
  "Klasifikasi",
  "Jenis",
  "Data Barang",
  "Satuan",
  "Kondisi",
  "Update",
]);

const GROUP_TOP_LABEL: Record<string, string> = {
  Identifikasi: "IDENTIFIKASI",
  Klasifikasi: "KLASIFIKASI",
  Jenis: "JENIS",
  "Data Barang": "DATA BARANG",
  Satuan: "SATUAN",
  Kondisi: "KONDISI",
  Update: "UPDATE",
};

const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

// ======================== HELPER NILAI SEL ========================
const getField = (value: any) => (value && value !== "" ? value : "-");

const getJenisLabel = (jenis: string | undefined) => {
  if (jenis === "1") return "1 (BMN)";
  if (jenis === "2") return "2 (Non BMN)";
  return getField(jenis);
};

const getTipeLabel = (tipe: string | undefined) => {
  if (tipe === "1") return "1 (Aset Tetap)";
  if (tipe === "2") return "2 (Habis Pakai)";
  return getField(tipe);
};

const getCellValue = (
  key: ColumnKey,
  ctx: { no: number; item: MaterilItem; itemName: string; serial: string },
): string => {
  const { item, no, itemName, serial } = ctx;
  switch (key) {
    case "no":
      return String(no);
    case "bag":
      return getField(item.bag);
    case "unsr":
      return getField(item.unsr);
    case "bid":
      return getField(item.bid);
    case "subBid":
      return getField(item.subBid);
    case "subSubBid":
      return getField(item.subSubBid);
    case "gol":
      return getField(item.gol);
    case "bidKlasifikasi":
      return getField(item.bidKlasifikasi);
    case "kel":
      return getField(item.kel);
    case "subKel":
      return getField(item.subKel);
    case "subSubKel":
      return getField(item.subSubKel);
    case "jenis":
      return getJenisLabel(item.jenis);
    case "tipe":
      return getTipeLabel(item.tipe);
    case "urut":
      return getField(item.urut);
    case "name":
      return itemName;
    case "merkType":
      return getField(item.merkType);
    case "serial":
      return serial;
    case "negaraPembuat":
      return getField(item.negaraPembuat);
    case "tahunPembuatan":
      return getField(item.tahunPembuatan);
    case "tahunPemakaian":
      return getField(item.tahunPemakaian);
    case "jumlah":
      return "1";
    case "satuan":
      return getField(item.satuan);
    case "kondisiB":
      return getField(item.kondisiB);
    case "rr":
      return getField(item.rr);
    case "rb":
      return getField(item.rb);
    case "persen":
      return getField(item.persen);
    case "keterangan":
      return getField(item.keterangan);
    case "gambar":
      return item.gambar || "-";
    case "updateTanggal":
      return getField(item.updateTanggal);
    case "konseptor":
      return getField(item.konseptor);
    default:
      return "-";
  }
};

const buildGroupRows = (
  group: MaterilGroup,
  cols: { key: ColumnKey }[],
): string[][] => {
  const out: string[][] = [];
  let no = 1;
  group.items.forEach((item) => {
    const qty = item.jumlah ?? 1;
    for (let unit = 1; unit <= qty; unit++) {
      const serial = item.serialNumbers?.[unit - 1] ?? "-";
      const itemName = qty > 1 ? `${item.name} - ${unit}` : item.name;
      const ctx = { no: no++, item, itemName, serial };
      out.push(cols.map((c) => getCellValue(c.key, ctx)));
    }
  });
  return out;
};

type Seg = { group: string; keys: ColumnKey[] };

const computeSegments = (cols: { key: ColumnKey; group: string }[]): Seg[] => {
  const segs: Seg[] = [];
  cols.forEach((c) => {
    const last = segs[segs.length - 1];
    if (last && last.group === c.group) last.keys.push(c.key);
    else segs.push({ group: c.group, keys: [c.key] });
  });
  return segs;
};

const buildPdfHead = (cols: { key: ColumnKey; group: string }[]) => {
  const segs = computeSegments(cols);
  const row1: any[] = [];
  const row2: any[] = [];
  const row3: any[] = [];
  segs.forEach((seg) => {
    if (SPANNING_GROUPS.has(seg.group)) {
      row1.push({
        content: GROUP_TOP_LABEL[seg.group] ?? seg.group,
        colSpan: seg.keys.length,
      });
      seg.keys.forEach((k) => row2.push({ content: SHORT_LABEL[k] }));
    } else {
      seg.keys.forEach((k) =>
        row1.push({ content: SHORT_LABEL[k], rowSpan: 2 }),
      );
    }
    seg.keys.forEach((k) =>
      row3.push({ content: COL_NO[k] ? String(COL_NO[k]) : "" }),
    );
  });
  return [row1, row2, row3];
};

const sanitizeName = (s: string) =>
  (s || "")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "_")
    .replace(/\s+/g, "_");

type ExportFormat = "pdf" | "excel";
type Orientation = "portrait" | "landscape";
type PaperSize = "a3" | "a4" | "a5" | "b4" | "b5";

type ExportDataProps = {
  open: boolean;
  format?: ExportFormat;
  onClose: () => void;
  data: MaterilGroup[];
  title: string;
  exportFileName: string;
  year: number;
  month: number;
};

export default function ExportData({
  open,
  format = "pdf",
  onClose,
  data,
  title: _title,
  exportFileName,
  year: _year,
  month: _month,
}: ExportDataProps) {
  const [exportFormat, setExportFormat] = useState<ExportFormat>(format);
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  const [paperSize, setPaperSize] = useState<PaperSize>("a4");
  const [selectedKeys, setSelectedKeys] = useState<ColumnKey[]>([...ALL_KEYS]);
  const [fileName, setFileName] = useState<string>(exportFileName || "data");
  const [exporting, setExporting] = useState(false);

  const [satuanKerja, setSatuanKerja] = useState<string>("DEN/SUBDENXXXXXXXX");
  const [realTimeMonth, setRealTimeMonth] = useState<string>("");
  const [realTimeYear, setRealTimeYear] = useState<string>("");

  useEffect(() => {
    if (open) {
      const now = new Date();
      const monthName = MONTH_NAMES[now.getMonth()].toUpperCase();
      const yearNum = now.getFullYear();
      setRealTimeMonth(monthName);
      setRealTimeYear(yearNum.toString());
    }
  }, [open]);

  const titleLine1 = `DATA INVENTARIS MATKOMLEK (BMN) ${satuanKerja} SATKOMLEK TNI`;
  const titleLine2 = `BULAN ${realTimeMonth} TA.${realTimeYear}`;

  useEffect(() => {
    if (open) {
      setExportFormat(format);
      setFileName((prev) => prev || exportFileName || "data");
    }
  }, [open, format, exportFileName]);

  const orderedSelectedCols = COLUMN_META.filter((c) =>
    selectedKeys.includes(c.key),
  );

  // ---------------------- EXPORT PDF ----------------------
  const exportToPDF = async () => {
    const cols = COLUMN_META.filter((c) => selectedKeys.includes(c.key));
    if (cols.length === 0) return;

    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF({ orientation, unit: "mm", format: paperSize });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 8;
    const printable = pageW - margin * 2;

    const rawW = cols.map((c) => COL_W[c.key] ?? 18);
    const sumW = rawW.reduce((a, b) => a + b, 0);
    const scale = printable / sumW;
    const widths = rawW.map((w) => w * scale);

    const n = cols.length;
    const fontSize =
      n > 24 ? 5.2 : n > 18 ? 6 : orientation === "landscape" ? 7.2 : 6.6;

    const columnStyles: Record<number, any> = {};
    cols.forEach((c, i) => {
      const leftAlign =
        c.key === "name" || c.key === "keterangan" || c.key === "gambar";
      columnStyles[i] = {
        cellWidth: widths[i],
        halign: leftAlign ? "left" : "center",
      };
    });

    const head = buildPdfHead(cols);

    const body: any[] = [];
    data.forEach((group) => {
      body.push([
        {
          content: `${group.romawi}. ${group.title}`,
          colSpan: cols.length,
          styles: {
            fontStyle: "bold",
            fillColor: [238, 238, 238],
            textColor: 0,
            halign: "left",
          },
        },
      ]);
      buildGroupRows(group, cols).forEach((r) => body.push(r));
    });

    autoTable(doc, {
      head,
      body,
      startY: 32,
      theme: "grid",
      styles: {
        fontSize,
        cellPadding: 1.3,
        textColor: 0,
        lineColor: 0,
        lineWidth: 0.1,
        fillColor: 255,
        overflow: "linebreak",
        valign: "middle",
      },
      headStyles: {
        fillColor: 255,
        textColor: 0,
        fontStyle: "bold",
        halign: "center",
        valign: "middle",
        lineColor: 0,
        lineWidth: 0.1,
      },
      bodyStyles: { fillColor: 255, textColor: 0 },
      columnStyles,
      rowPageBreak: "avoid",
      margin: { top: 28, left: margin, right: margin, bottom: 12 },
      didDrawPage: () => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text(titleLine1, margin, 11);
        doc.text(titleLine2, margin, 18);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
      },
    });

    const pageCount = doc.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
      doc.setPage(p);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);
      doc.text(`Halaman ${p} / ${pageCount}`, pageW - margin - 24, pageH - 6);
    }

    const fname =
      sanitizeName(fileName) || sanitizeName(exportFileName) || "data";
    doc.save(`${fname}.pdf`);
  };

  // ---------------------- EXPORT EXCEL (dengan border yang benar) ----------------------
  const exportToExcel = async () => {
    const cols = COLUMN_META.filter((c) => selectedKeys.includes(c.key));
    if (cols.length === 0) return;

    const ExcelJS = await import("exceljs");
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data Materiil");

    worksheet.pageSetup.orientation =
      orientation === "landscape" ? "landscape" : "portrait";
    worksheet.pageSetup.fitToWidth = 1;
    worksheet.pageSetup.fitToHeight = 0;

    // Helper untuk border tipis di semua sisi
    const thinBorder = {
      top: { style: "thin" as const },
      left: { style: "thin" as const },
      bottom: { style: "thin" as const },
      right: { style: "thin" as const },
    };

    // Baris 1: Judul inventaris
    const titleRow1 = worksheet.getRow(1);
    titleRow1.getCell(1).value = titleLine1;
    titleRow1.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
    titleRow1.getCell(1).font = { bold: true, size: 12 };
    worksheet.mergeCells(1, 1, 1, cols.length);
    worksheet.getCell(1, 1).border = thinBorder;

    // Baris 2: Bulan dan tahun
    const titleRow2 = worksheet.getRow(2);
    titleRow2.getCell(1).value = titleLine2;
    titleRow2.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
    titleRow2.getCell(1).font = { bold: true, size: 11 };
    worksheet.mergeCells(2, 1, 2, cols.length);
    worksheet.getCell(2, 1).border = thinBorder;

    // Baris kosong (baris 3)
    const emptyRow = worksheet.getRow(3);
    for (let i = 1; i <= cols.length; i++) {
      emptyRow.getCell(i).value = "";
      emptyRow.getCell(i).border = thinBorder;
    }

    // Header bertingkat
    const segs = computeSegments(cols);
    let currentCol = 1;
    const mergesGroup: { start: number; end: number }[] = [];
    const groupRowCells: (string | null)[] = new Array(cols.length).fill(null);
    const subRowCells: (string | null)[] = new Array(cols.length).fill(null);
    const numberRowCells: (string | null)[] = new Array(cols.length).fill(null);

    segs.forEach((seg) => {
      const startIdx = currentCol - 1;
      if (SPANNING_GROUPS.has(seg.group)) {
        groupRowCells[startIdx] = GROUP_TOP_LABEL[seg.group] ?? seg.group;
        seg.keys.forEach((k, idx) => {
          subRowCells[startIdx + idx] = SHORT_LABEL[k];
          numberRowCells[startIdx + idx] = COL_NO[k] ? String(COL_NO[k]) : "";
        });
        if (seg.keys.length > 1) {
          mergesGroup.push({ start: startIdx + 1, end: startIdx + seg.keys.length });
        }
      } else {
        seg.keys.forEach((k, idx) => {
          groupRowCells[startIdx + idx] = SHORT_LABEL[k];
          subRowCells[startIdx + idx] = null;
          numberRowCells[startIdx + idx] = COL_NO[k] ? String(COL_NO[k]) : "";
        });
      }
      currentCol += seg.keys.length;
    });

    // Baris 4: grup header
    const headerRow4 = worksheet.getRow(4);
    for (let i = 0; i < cols.length; i++) {
      const cell = headerRow4.getCell(i + 1);
      cell.value = groupRowCells[i];
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.font = { bold: true };
      cell.border = thinBorder;
    }
    mergesGroup.forEach((m) => {
      worksheet.mergeCells(4, m.start, 4, m.end);
    });

    // Baris 5: sub-label
    const headerRow5 = worksheet.getRow(5);
    for (let i = 0; i < cols.length; i++) {
      const cell = headerRow5.getCell(i + 1);
      cell.value = subRowCells[i];
      if (subRowCells[i] !== null) {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.font = { bold: true };
      } else {
        cell.value = "";
      }
      cell.border = thinBorder;
    }

    // Merge vertikal
    for (let i = 0; i < cols.length; i++) {
      if (subRowCells[i] === null) {
        worksheet.mergeCells(4, i + 1, 5, i + 1);
      }
    }

    // Baris 6: nomor kolom
    const numberRow = worksheet.getRow(6);
    for (let i = 0; i < cols.length; i++) {
      const cell = numberRow.getCell(i + 1);
      cell.value = numberRowCells[i];
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.font = { bold: false, size: 9 };
      cell.border = thinBorder;
    }

    // Data dimulai dari baris 7
    let currentRow = 7;
    data.forEach((group) => {
      const groupTitleRow = worksheet.getRow(currentRow);
      const titleCell = groupTitleRow.getCell(1);
      titleCell.value = `${group.romawi}. ${group.title}`;
      titleCell.alignment = { horizontal: "left", vertical: "middle" };
      titleCell.font = { bold: true };
      titleCell.border = thinBorder;
      worksheet.mergeCells(currentRow, 1, currentRow, cols.length);
      currentRow++;

      const rowsData = buildGroupRows(group, cols);
      rowsData.forEach((rowCells) => {
        const dataRow = worksheet.getRow(currentRow);
        for (let i = 0; i < rowCells.length; i++) {
          const cell = dataRow.getCell(i + 1);
          cell.value = rowCells[i];
          cell.alignment = {
            horizontal: cols[i].key === "name" || cols[i].key === "keterangan" || cols[i].key === "gambar" ? "left" : "center",
            vertical: "middle",
          };
          cell.border = thinBorder;
        }
        currentRow++;
      });
    });

    // Auto-width - perbaikan error: gunakan nomor kolom (idx + 1) karena col.key bisa undefined
    worksheet.columns.forEach((_col, idx) => {
      let maxLength = 0;
      const column = worksheet.getColumn(idx + 1); // idx + 1 adalah nomor kolom yang valid
      column.eachCell({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = Math.min(Math.max(maxLength + 2, 8), 50);
    });

    const fname =
      sanitizeName(fileName) || sanitizeName(exportFileName) || "data";
    await workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fname}.xlsx`;
      link.click();
      URL.revokeObjectURL(link.href);
    });
  };

  const handleRunExport = async () => {
    if (selectedKeys.length === 0) return;
    setExporting(true);
    try {
      if (exportFormat === "pdf") await exportToPDF();
      else await exportToExcel();
      onClose();
    } catch (err) {
      console.error("Export gagal:", err);
      alert(
        "Export gagal. Pastikan paket 'jspdf', 'jspdf-autotable', dan 'exceljs' sudah terpasang.",
      );
    } finally {
      setExporting(false);
    }
  };

  const toggleKey = (key: ColumnKey) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };
  const toggleGroup = (group: string, on: boolean) => {
    const keys = COLUMN_META.filter((c) => c.group === group).map((c) => c.key);
    setSelectedKeys((prev) =>
      on
        ? Array.from(new Set([...prev, ...keys]))
        : prev.filter((k) => !keys.includes(k)),
    );
  };
  const selectAll = () => setSelectedKeys([...ALL_KEYS]);
  const clearAll = () => setSelectedKeys([]);

  const renderPreview = () => {
    const cols = orderedSelectedCols;
    if (cols.length === 0) {
      return (
        <div className="flex h-full items-center justify-center text-sm text-gray-500">
          Pilih minimal satu kolom untuk melihat preview.
        </div>
      );
    }
    const segs = computeSegments(cols);

    const thBase: React.CSSProperties = {
      border: "1px solid #000",
      padding: "3px 4px",
      background: "#fff",
      color: "#000",
      fontWeight: 700,
      textAlign: "center",
      whiteSpace: "nowrap",
    };
    const tdBase: React.CSSProperties = {
      border: "1px solid #000",
      padding: "3px 4px",
      background: "#fff",
      color: "#000",
      textAlign: "center",
      verticalAlign: "middle",
    };
    const leftKeys = new Set<ColumnKey>(["name", "keterangan", "gambar"]);

    return (
      <div
        className="mx-auto bg-white text-black shadow-lg"
        style={{
          width: orientation === "landscape" ? "100%" : "80%",
          minWidth: "100%",
          padding: "16px",
        }}
      >
        <div className="flex flex-col items-center justify-center text-center font-bold uppercase">
          <div style={{ fontSize: 13, color: "#000" }}>{titleLine1}</div>
          <div style={{ fontSize: 12, color: "#000", marginTop: 4 }}>{titleLine2}</div>
        </div>

        <div style={{ overflowX: "auto", marginTop: 16 }}>
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
              fontSize: cols.length > 18 ? 8 : 9,
              tableLayout: "auto",
            }}
          >
            <thead>
              <tr>
                {segs.map((seg, si) =>
                  SPANNING_GROUPS.has(seg.group) ? (
                    <th
                      key={`g1-${si}`}
                      colSpan={seg.keys.length}
                      style={thBase}
                    >
                      {GROUP_TOP_LABEL[seg.group] ?? seg.group}
                    </th>
                  ) : (
                    seg.keys.map((k) => (
                      <th key={`g1-${k}`} rowSpan={2} style={thBase}>
                        {SHORT_LABEL[k]}
                      </th>
                    ))
                  ),
                )}
              </tr>
              <tr>
                {segs.map((seg) =>
                  SPANNING_GROUPS.has(seg.group)
                    ? seg.keys.map((k) => (
                        <th key={`g2-${k}`} style={thBase}>
                          {SHORT_LABEL[k]}
                        </th>
                      ))
                    : null,
                )}
              </tr>
              <tr>
                {cols.map((c) => (
                  <th
                    key={`g3-${c.key}`}
                    style={{ ...thBase, fontWeight: 400, fontSize: 8 }}
                  >
                    {COL_NO[c.key] ? COL_NO[c.key] : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((group, gi) => (
                <React.Fragment key={`pg-${gi}`}>
                  <tr>
                    <td
                      colSpan={cols.length}
                      style={{
                        ...tdBase,
                        textAlign: "left",
                        fontWeight: 700,
                        background: "#eee",
                      }}
                    >
                      {group.romawi}. {group.title}
                    </td>
                  </tr>
                  {buildGroupRows(group, cols).map((row, ri) => (
                    <tr key={`pr-${gi}-${ri}`}>
                      {row.map((cell, cidx) => (
                        <td
                          key={`pc-${gi}-${ri}-${cidx}`}
                          style={{
                            ...tdBase,
                            textAlign: leftKeys.has(cols[cidx].key)
                              ? "left"
                              : "center",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 md:p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#07111c] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            {exportFormat === "pdf" ? (
              <FaFilePdf className="text-red-400" />
            ) : (
              <FaFileExcel className="text-emerald-400" />
            )}
            <h3 className="text-base font-bold text-white">
              Export {exportFormat === "pdf" ? "PDF" : "Excel"} — Preview
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {selectedKeys.length}/{ALL_KEYS.length} kolom dipilih
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {/* PANEL KIRI */}
          <div className="w-full shrink-0 overflow-y-auto border-b border-white/10 p-4 lg:w-[360px] lg:border-b-0 lg:border-r">
            {/* Format */}
            <div className="mb-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Format File
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setExportFormat("pdf")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    exportFormat === "pdf"
                      ? "border-red-400/40 bg-red-500/15 text-red-300"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                  }`}
                >
                  <FaFilePdf size={12} /> PDF
                </button>
                <button
                  onClick={() => setExportFormat("excel")}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    exportFormat === "excel"
                      ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-300"
                      : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                  }`}
                >
                  <FaFileExcel size={12} /> Excel
                </button>
              </div>
            </div>

            {/* Nama File */}
            <div className="mb-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Nama File
              </div>
              <div className="flex items-center rounded-lg border border-white/10 bg-[#0b1727] focus-within:border-cyan-400">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="contoh: Data_BMN_2026"
                  className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none"
                />
                <span className="px-3 text-xs text-slate-500">
                  .{exportFormat === "pdf" ? "pdf" : "xlsx"}
                </span>
              </div>
            </div>

            {/* Input Satuan Kerja */}
            <div className="mb-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Satuan Kerja (DEN/SUBDEN)
              </div>
              <div className="flex items-center rounded-lg border border-white/10 bg-[#0b1727] focus-within:border-cyan-400">
                <input
                  type="text"
                  value={satuanKerja}
                  onChange={(e) => setSatuanKerja(e.target.value)}
                  placeholder="Contoh: DENPOM III/1"
                  className="w-full bg-transparent px-3 py-2 text-sm text-white outline-none"
                />
              </div>
            </div>

            {/* Orientasi */}
            <div className="mb-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Orientasi
              </div>
              <div className="flex gap-2">
                {(["portrait", "landscape"] as const).map((o) => (
                  <button
                    key={o}
                    onClick={() => setOrientation(o)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
                      orientation === o
                        ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-300"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                    }`}
                  >
                    {o === "portrait" ? "Potrait" : "Landscape"}
                  </button>
                ))}
              </div>
            </div>

            {/* Ukuran Kertas (khusus PDF) */}
            {exportFormat === "pdf" && (
              <div className="mb-4">
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Ukuran Kertas
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "A3", value: "a3" },
                    { label: "A4", value: "a4" },
                    { label: "A5", value: "a5" },
                    { label: "B4", value: "b4" },
                    { label: "B5", value: "b5" },
                  ].map((size) => (
                    <button
                      key={size.value}
                      onClick={() => setPaperSize(size.value as PaperSize)}
                      className={`rounded-lg border px-3 py-2 text-sm font-medium capitalize transition ${
                        paperSize === size.value
                          ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-300"
                          : "border-white/10 bg-white/[0.03] text-slate-400 hover:bg-white/[0.06]"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Pilih Kolom */}
            <div className="mb-2 flex items-center justify-between">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Pilih Kolom
              </div>
              <div className="flex gap-2 text-xs">
                <button
                  onClick={selectAll}
                  className="rounded-md border border-white/10 px-2 py-1 text-slate-300 hover:bg-white/5"
                >
                  Pilih Semua
                </button>
                <button
                  onClick={clearAll}
                  className="rounded-md border border-white/10 px-2 py-1 text-slate-300 hover:bg-white/5"
                >
                  Kosongkan
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {COLUMN_GROUPS.map((grp) => {
                const cols = COLUMN_META.filter((c) => c.group === grp);
                const allOn = cols.every((c) => selectedKeys.includes(c.key));
                return (
                  <div
                    key={grp}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                  >
                    <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-200">
                      <input
                        type="checkbox"
                        checked={allOn}
                        onChange={(e) => toggleGroup(grp, e.target.checked)}
                        className="h-4 w-4 accent-cyan-500"
                      />
                      {grp}
                    </label>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                      {cols.map((c) => (
                        <label
                          key={c.key}
                          className="flex cursor-pointer items-center gap-2 text-xs text-slate-300"
                        >
                          <input
                            type="checkbox"
                            checked={selectedKeys.includes(c.key)}
                            onChange={() => toggleKey(c.key)}
                            className="h-3.5 w-3.5 accent-cyan-500"
                          />
                          <span className="truncate">{c.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PANEL KANAN (PREVIEW) */}
          <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#0b1727]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Preview {exportFormat === "pdf" ? "PDF" : "Excel"} (
                {orientation === "portrait" ? "Potrait" : "Landscape"})
              </span>
              <span className="text-[10px] text-slate-500">
                Tampilan hitam-putih sesuai hasil export
              </span>
            </div>
            <div className="min-h-[40vh] flex-1 overflow-auto bg-[#1f2937] p-4 lg:min-h-0">
              {renderPreview()}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-white/10 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
          >
            Batal
          </button>
          <button
            onClick={handleRunExport}
            disabled={selectedKeys.length === 0 || exporting}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-black transition ${
              selectedKeys.length === 0 || exporting
                ? "cursor-not-allowed bg-cyan-500/40"
                : "bg-cyan-500 hover:bg-cyan-400"
            }`}
          >
            {exporting
              ? "Memproses…"
              : `Export ${exportFormat === "pdf" ? "PDF" : "Excel"}`}
          </button>
        </div>
      </div>
    </div>
  );
}