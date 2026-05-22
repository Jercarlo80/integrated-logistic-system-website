// DetailBarang.tsx
"use client";

import React from "react";
import { MaterilItem } from "@/app/component/materiltable"; // Sesuaikan path import
import DetailBMN from "@/app/penyimpanan/asettetap/bmn/detailbmn";
import DetailNonBMN from "@/app/penyimpanan/asettetap/nonbmn/detailnonbmn";
import DetailPersediaanBMN from "@/app/penyimpanan/persediaan/bmn/detailbmn";
import DetailPersediaanNonBMN from "@/app/penyimpanan/persediaan/nonbmn/detailnonbmn";

type DetailBarangProps = {
  item: MaterilItem;
  onClose: () => void;
  variant?: 'bmn' | 'nonBmn' | 'persediaanBmn' | 'persediaanNonBmn';
};

export default function DetailBarang({ item, onClose, variant }: DetailBarangProps) {
  const resolvedVariant = variant || item.kategoriDetail || 'bmn';

  switch (resolvedVariant) {
    case 'nonBmn':
      return <DetailNonBMN item={item} onClose={onClose} />;
    case 'persediaanBmn':
      return <DetailPersediaanBMN item={item} onClose={onClose} />;
    case 'persediaanNonBmn':
      return <DetailPersediaanNonBMN item={item} onClose={onClose} />;
    default:
      return <DetailBMN item={item} onClose={onClose} />;
  }
}