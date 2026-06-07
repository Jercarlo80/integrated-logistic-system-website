import { useEffect, useState } from "react";
function ModalPenolakan({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: (reason: string) => void;
  onCancel: () => void;
}) {
  const [reason, setReason] = useState("");

  // Reset reason setiap modal dibuka (agar tidak tersisa dari sebelumnya)
  useEffect(() => {
    if (isOpen) {
      setReason("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (reason.trim() === "") {
      alert("Harap masukkan alasan penolakan.");
      return;
    }
    onConfirm(reason);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#07111c] p-5 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-3">Tolak Pengajuan</h3>
        <p className="text-sm text-slate-300 mb-4">
          Berikan alasan penolakan atau catatan perbaikan:
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-[#0a1a2f] p-2 text-sm text-white focus:outline-none focus:border-cyan-500"
          placeholder="Alasan penolakan..."
          autoFocus
        />
        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onCancel}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-black hover:bg-red-600"
          >
            Konfirmasi Tolak
          </button>
        </div>
      </div>
    </div>
  );
}