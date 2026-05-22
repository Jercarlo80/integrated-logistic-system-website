"use client";

import { FaTimes, FaDownload } from "react-icons/fa";

type Props = {
  qr: string;
  itemName: string;
  onClose: () => void;
};

export default function InOutPopUpQR({
  qr,
  itemName,
  onClose,
}: Props) {

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = `QR-${itemName}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          <FaTimes />
        </button>

        <div className="text-center">

          <h2 className="text-lg font-bold text-gray-800">
            QR Code Barang
          </h2>

          <p className="text-sm text-gray-500 mb-5">
            {itemName}
          </p>

          <div className="flex justify-center mb-6">

            <img
              src={qr}
              className="w-56 h-56 border rounded-xl shadow"
            />

          </div>

          <div className="flex justify-center gap-3">

            <button
              onClick={downloadQR}
              className="flex items-center gap-2 px-4 py-2 bg-[#328E6E] text-white rounded-lg text-sm hover:bg-[#2b7b60]"
            >
              <FaDownload size={14} />
              Download
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}