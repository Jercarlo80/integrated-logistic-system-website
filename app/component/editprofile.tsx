"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useUser } from "../context/userContext";
import { RiUploadCloud2Line, RiResetLeftLine } from "react-icons/ri";
import { FiEdit3 } from "react-icons/fi";

export default function EditProfile() {
  const { user, updateUser, resetUser } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("File harus berupa gambar.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateUser({ avatar: reader.result }); // data URL → sinkron real-time
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <FiEdit3 className="text-green-400" size={20} />
        <h2 className="text-lg font-semibold text-gray-100">
          Edit Profil Akun
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* AVATAR */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <Image
              src={user.avatar}
              alt="Foto profil"
              width={120}
              height={120}
              unoptimized={typeof user.avatar === "string"}
              className="rounded-2xl object-cover w-30 h-30 border-2 border-gray-700 shadow-lg"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 transition"
          >
            <RiUploadCloud2Line size={16} className="text-green-400" />
            Ganti Foto
          </button>
        </div>

        {/* FORM */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => updateUser({ name: e.target.value })}
              placeholder="Masukkan nama"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-gray-100 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/40 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-400">
              Jabatan
            </label>
            <input
              type="text"
              value={user.role}
              onChange={(e) => updateUser({ role: e.target.value })}
              placeholder="Masukkan jabatan"
              className="w-full px-4 py-2.5 rounded-xl bg-gray-950 border border-gray-700 text-gray-100 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/40 transition"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <span className="flex items-center gap-1.5 text-xs text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Perubahan tersimpan & tersinkron otomatis
            </span>
            <button
              onClick={resetUser}
              className="ml-auto flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-gray-700 hover:bg-gray-800 text-gray-300 transition"
            >
              <RiResetLeftLine size={16} className="text-red-400" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}