"use client";

import React from "react";
import { FaUndo, FaTrash } from "react-icons/fa";
import { DeletedItemRecord } from "@/app/component/materiltable";

type Props = {
  deletedItems?: DeletedItemRecord[];
  onRestore: (record: DeletedItemRecord) => void;
  onPermanentDelete: (id: string) => void;
};

export default function RecyclebinTabel({
  deletedItems = [],
  onRestore,
  onPermanentDelete,
}: Props) {
  const safeDeletedItems = Array.isArray(deletedItems) ? deletedItems : [];

  if (safeDeletedItems.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        Tidak ada data yang dihapus.
      </div>
    );
  }

  const generateRows = (): React.ReactNode[] => {
    const rows: React.ReactNode[] = [];
    let globalRowNumber = 0;

    safeDeletedItems.forEach((record) => {
      const isSet = record.item.satuan === "set" && record.subGroups?.length;
      const mainRowNumber = ++globalRowNumber;

      rows.push(
        <tr key={`main-${record.id}`} className="transition hover:bg-gray-50">
          <td className="border px-4 py-3 text-center">{mainRowNumber}</td>
          <td className="border px-4 py-3">{record.item.name}</td>
          <td className="border px-4 py-3 text-center">
            {record.item.serialNumbers?.length
              ? record.item.serialNumbers.join(", ")
              : "-"}
          </td>
          <td className="border px-4 py-3 text-center">
            {record.item.jumlah !== undefined ? record.item.jumlah : 1}
          </td>
          <td className="border px-4 py-3 text-center">
            {record.item.satuan || "-"}
          </td>
          <td className="border px-4 py-3">{record.item.keterangan || "-"}</td>
          <td className="border px-4 py-3 text-center">
            {record.item.tanggal_masuk || "-"}
          </td>
          <td className="border px-4 py-3 text-center">{record.deletedBy}</td>
          <td className="border px-4 py-3 text-center">
            {new Date(record.deletedAt).toLocaleString("id-ID")}
          </td>
          <td className="border px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => onRestore(record)}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                title="Pulihkan data"
                type="button"
              >
                <FaUndo size={14} />
                Pulihkan
              </button>

              <button
                onClick={() => onPermanentDelete(record.id)}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                title="Hapus permanen"
                type="button"
              >
                <FaTrash size={14} />
                Hapus
              </button>
            </div>
          </td>
        </tr>
      );

      if (isSet) {
        record.subGroups!.forEach((sg) => {
          sg.components.forEach((comp: any, compIdx: number) => {
            ++globalRowNumber;
            rows.push(
              <tr
                key={`${record.id}-comp-${sg.label}-${compIdx}`}
                className="bg-gray-50/50 hover:bg-gray-100"
              >
                <td className="border px-4 py-3 text-center"></td>
                <td className="border px-4 py-3 pl-8 text-gray-600">
                  <span>↳ {comp.name}</span>
                </td>
                <td className="border px-4 py-3 text-center">{comp.serialNumber}</td>
                <td className="border px-4 py-3 text-center">{comp.jumlah}</td>
                <td className="border px-4 py-3 text-center">-</td>
                <td className="border px-4 py-3">-</td>
                <td className="border px-4 py-3 text-center">
                  {record.item.tanggal_masuk || "-"}
                </td>
                <td className="border px-4 py-3 text-center"></td>
                <td className="border px-4 py-3 text-center"></td>
                <td className="border px-4 py-3 text-center"></td>
              </tr>
            );
          });
        });
      }
    });

    return rows;
  };

  return (
    <div className="mt-6 w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="border px-4 py-3 text-center">No</th>
            <th className="border px-4 py-3 text-left">Nama Barang</th>
            <th className="border px-4 py-3 text-center">Nomor Seri</th>
            <th className="border px-4 py-3 text-center">Jumlah</th>
            <th className="border px-4 py-3 text-center">Satuan</th>
            <th className="border px-4 py-3 text-left">Keterangan</th>
            <th className="border px-4 py-3 text-center">Status</th>
            <th className="border px-4 py-3 text-center">Dihapus Oleh</th>
            <th className="border px-4 py-3 text-center">Tanggal Hapus</th>
            <th className="border px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>{generateRows()}</tbody>
      </table>
    </div>
  );
}