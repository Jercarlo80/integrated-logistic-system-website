// dummyklasifikasidata.tsx
export interface KlasifikasiGroup {
  gol: number;
  bid: number;
  kel: number;
  subKel: number;
  subSubKel: number;
  uraian: string;
  satuan: string;
}

export const dummyKlasifikasiData: KlasifikasiGroup[] = [
  // Level 1: GOL
  { gol: 1, bid: 0, kel: 0, subKel: 0, subSubKel: 0, uraian: "PERSEDIAAN", satuan: "" },
  { gol: 2, bid: 0, kel: 0, subKel: 0, subSubKel: 0, uraian: "TANAH", satuan: "" },
  { gol: 3, bid: 0, kel: 0, subKel: 0, subSubKel: 0, uraian: "PERALATAN DAN MESIN", satuan: "" },

  // Level 2: BID (di bawah GOL 1)
  { gol: 1, bid: 1, kel: 0, subKel: 0, subSubKel: 0, uraian: "BARANG PAKAI HABIS", satuan: "" },
  { gol: 1, bid: 2, kel: 0, subKel: 0, subSubKel: 0, uraian: "BARANG TAK HABIS PAKAI", satuan: "" },
  { gol: 1, bid: 3, kel: 0, subKel: 0, subSubKel: 0, uraian: "ALAT/BAHAN UNTUK KEGIATAN KANTOR", satuan: "" },

  // Level 3: KEL (di bawah GOL 1, BID 1)
  { gol: 1, bid: 1, kel: 1, subKel: 0, subSubKel: 0, uraian: "BAHAN", satuan: "" },
  { gol: 1, bid: 1, kel: 2, subKel: 0, subSubKel: 0, uraian: "SUKU CADANG", satuan: "" },

  // Level 4: SUB KEL (di bawah GOL 1, BID 1, KEL 1)
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 0, uraian: "BAHAN BANGUNAN DAN KONSTRUKSI", satuan: "" },
  { gol: 1, bid: 1, kel: 1, subKel: 2, subSubKel: 0, uraian: "BAHAN KIMIA", satuan: "" },
  { gol: 1, bid: 1, kel: 1, subKel: 3, subSubKel: 0, uraian: "BAHAN PELEDAK", satuan: "" },
  { gol: 1, bid: 1, kel: 1, subKel: 4, subSubKel: 0, uraian: "BAHAN BAKAR DAN PELUMAS", satuan: "" },
  { gol: 1, bid: 1, kel: 1, subKel: 5, subSubKel: 0, uraian: "BAHAN BAKU", satuan: "" },
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 0, uraian: "BAHAN KIMIA NUKLIR", satuan: "" },
  { gol: 1, bid: 1, kel: 1, subKel: 7, subSubKel: 0, uraian: "BARANG DALAM PROSES", satuan: "" },
  { gol: 1, bid: 1, kel: 1, subKel: 99, subSubKel: 0, uraian: "BAHAN LAINNYA", satuan: "" },

  // Level 5: SUB-SUB KEL (detail)
  // Bahan Bangunan dan Konstruksi
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 1, uraian: "Aspal", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 2, uraian: "Semen", satuan: "Zak" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 3, uraian: "Kaca", satuan: "Lembar" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 4, uraian: "Pasir", satuan: "M³" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 5, uraian: "Batu", satuan: "M³" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 6, uraian: "Cat", satuan: "Kaleng" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 7, uraian: "Seng", satuan: "Lembar" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 8, uraian: "Baja", satuan: "Batang" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 9, uraian: "Electro Dalas", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 10, uraian: "Patok Beton", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 11, uraian: "Tiang Beton", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 12, uraian: "Besi Beton", satuan: "Batang" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 13, uraian: "Tegel", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 14, uraian: "Genteng", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 15, uraian: "Bis Beton", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 16, uraian: "Plat", satuan: "Lembar" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 17, uraian: "Steel Sheet Pile", satuan: "Lembar" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 18, uraian: "Concrete Sheet Pile", satuan: "Lembar" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 19, uraian: "Kawat Bronjong", satuan: "Rol" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 20, uraian: "Karung", satuan: "Lembar" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 21, uraian: "Minyak Cat/Thinner", satuan: "Liter" },
  { gol: 1, bid: 1, kel: 1, subKel: 1, subSubKel: 999, uraian: "Bahan Bangunan Dan Konstruksi Lainnya", satuan: "" },

  // Bahan Kimia
  { gol: 1, bid: 1, kel: 1, subKel: 2, subSubKel: 1, uraian: "Bahan Kimia Padat", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 2, subSubKel: 2, uraian: "Bahan Kimia Cair", satuan: "Liter" },
  { gol: 1, bid: 1, kel: 1, subKel: 2, subSubKel: 3, uraian: "Bahan Kimia Gas", satuan: "Tabung" },
  { gol: 1, bid: 1, kel: 1, subKel: 2, subSubKel: 5, uraian: "Bahan Kimia Nuklir", satuan: "Gram" },
  { gol: 1, bid: 1, kel: 1, subKel: 2, subSubKel: 999, uraian: "Bahan Kimia Lainnya", satuan: "" },

  // Bahan Peledak
  { gol: 1, bid: 1, kel: 1, subKel: 3, subSubKel: 1, uraian: "Anfo", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 3, subSubKel: 2, uraian: "Detonator", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 1, subKel: 3, subSubKel: 3, uraian: "Dinamit", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 3, subSubKel: 4, uraian: "Gelatine", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 3, subSubKel: 5, uraian: "Sumbu Ledak/Api", satuan: "Rol" },
  { gol: 1, bid: 1, kel: 1, subKel: 3, subSubKel: 6, uraian: "Amunisi", satuan: "Butir" },
  { gol: 1, bid: 1, kel: 1, subKel: 3, subSubKel: 999, uraian: "Bahan Peledak Lainnya", satuan: "" },

  // Bahan Bakar dan Pelumas
  { gol: 1, bid: 1, kel: 1, subKel: 4, subSubKel: 1, uraian: "Bahan Bakar Minyak", satuan: "Liter" },
  { gol: 1, bid: 1, kel: 1, subKel: 4, subSubKel: 2, uraian: "Minyak Pelumas", satuan: "Liter" },
  { gol: 1, bid: 1, kel: 1, subKel: 4, subSubKel: 3, uraian: "Minyak Hydrolis", satuan: "Liter" },
  { gol: 1, bid: 1, kel: 1, subKel: 4, subSubKel: 4, uraian: "Bahan Bakar Gas", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 4, subSubKel: 5, uraian: "Batubara", satuan: "Ton" },
  { gol: 1, bid: 1, kel: 1, subKel: 4, subSubKel: 999, uraian: "Bahan Bakar Dan Pelumas Lainnya", satuan: "" },

  // Bahan Baku
  { gol: 1, bid: 1, kel: 1, subKel: 5, subSubKel: 1, uraian: "Kawat", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 5, subSubKel: 2, uraian: "Kayu", satuan: "M³" },
  { gol: 1, bid: 1, kel: 1, subKel: 5, subSubKel: 3, uraian: "Logam/Metalorgi", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 5, subSubKel: 4, uraian: "Latex", satuan: "Liter" },
  { gol: 1, bid: 1, kel: 1, subKel: 5, subSubKel: 5, uraian: "Biji Plastik", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 5, subSubKel: 6, uraian: "Karet (Bahan Baku)", satuan: "Kg" },
  { gol: 1, bid: 1, kel: 1, subKel: 5, subSubKel: 999, uraian: "Bahan Baku Lainnya", satuan: "" },

  // Bahan Kimia Nuklir
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 1, uraian: "Uranium - 233", satuan: "Gram" },
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 2, uraian: "Uranium - 235", satuan: "Gram" },
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 3, uraian: "Uranium - 238", satuan: "Gram" },
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 4, uraian: "Plutonium (PU)", satuan: "Gram" },
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 5, uraian: "Neptarim (NP)", satuan: "Gram" },
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 6, uraian: "Uranium Dioksida", satuan: "Gram" },
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 7, uraian: "Thorium", satuan: "Gram" },
  { gol: 1, bid: 1, kel: 1, subKel: 6, subSubKel: 999, uraian: "Bahan Kimia Nuklir Lainnya", satuan: "" },

  // Barang Dalam Proses
  { gol: 1, bid: 1, kel: 1, subKel: 7, subSubKel: 1, uraian: "Barang Dalam Proses", satuan: "" },
  { gol: 1, bid: 1, kel: 1, subKel: 7, subSubKel: 999, uraian: "Barang Dalam Proses Lainnya", satuan: "" },

  // Bahan Lainnya
  { gol: 1, bid: 1, kel: 1, subKel: 99, subSubKel: 999, uraian: "Bahan Lainnya", satuan: "" },

  // Suku Cadang (GOL 1, BID 1, KEL 2)
  { gol: 1, bid: 1, kel: 2, subKel: 1, subSubKel: 0, uraian: "SUKU CADANG ALAT ANGKUTAN", satuan: "" },
  { gol: 1, bid: 1, kel: 2, subKel: 1, subSubKel: 1, uraian: "Suku Cadang Alat Angkutan Darat Bermotor", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 2, subKel: 1, subSubKel: 2, uraian: "Suku Cadang Alat Angkutan Darat Tak Bermotor", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 2, subKel: 1, subSubKel: 3, uraian: "Suku Cadang Alat Angkutan Apung Bermotor", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 2, subKel: 1, subSubKel: 999, uraian: "Suku Cadang Alat Angkutan Lainnya", satuan: "" },

  { gol: 1, bid: 1, kel: 2, subKel: 2, subSubKel: 0, uraian: "SUKU CADANG ALAT BESAR", satuan: "" },
  { gol: 1, bid: 1, kel: 2, subKel: 2, subSubKel: 1, uraian: "Suku Cadang Alat Besar Darat", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 2, subKel: 2, subSubKel: 2, uraian: "Suku Cadang Alat Besar Apung", satuan: "Buah" },
  { gol: 1, bid: 1, kel: 2, subKel: 2, subSubKel: 999, uraian: "Suku Cadang Alat Besar Lainnya", satuan: "" },

  // Alat Tulis Kantor (GOL 1, BID 3, KEL 1)
  { gol: 1, bid: 3, kel: 1, subKel: 1, subSubKel: 0, uraian: "ALAT TULIS KANTOR", satuan: "" },
  { gol: 1, bid: 3, kel: 1, subKel: 1, subSubKel: 1, uraian: "Alat Tulis", satuan: "Buah" },
  { gol: 1, bid: 3, kel: 1, subKel: 1, subSubKel: 2, uraian: "Tinta Tulis, Tinta Stempel", satuan: "Botol" },
  { gol: 1, bid: 3, kel: 1, subKel: 1, subSubKel: 3, uraian: "Penjepit Kertas", satuan: "Dus" },
  { gol: 1, bid: 3, kel: 1, subKel: 1, subSubKel: 4, uraian: "Penghapus/Korektor", satuan: "Buah" },
  { gol: 1, bid: 3, kel: 1, subKel: 1, subSubKel: 5, uraian: "Buku Tulis", satuan: "Buah" },
  { gol: 1, bid: 3, kel: 1, subKel: 1, subSubKel: 999, uraian: "Alat Tulis Kantor Lainnya", satuan: "" },

  // Kertas dan Cover
  { gol: 1, bid: 3, kel: 1, subKel: 2, subSubKel: 0, uraian: "KERTAS DAN COVER", satuan: "" },
  { gol: 1, bid: 3, kel: 1, subKel: 2, subSubKel: 1, uraian: "Kertas HVS", satuan: "Rim" },
  { gol: 1, bid: 3, kel: 1, subKel: 2, subSubKel: 2, uraian: "Berbagai Kertas", satuan: "Rim" },
  { gol: 1, bid: 3, kel: 1, subKel: 2, subSubKel: 3, uraian: "Kertas Cover", satuan: "Lembar" },
  { gol: 1, bid: 3, kel: 1, subKel: 2, subSubKel: 4, uraian: "Amplop", satuan: "Buah" },
  { gol: 1, bid: 3, kel: 1, subKel: 2, subSubKel: 5, uraian: "Kop Surat", satuan: "Lembar" },
  { gol: 1, bid: 3, kel: 1, subKel: 2, subSubKel: 999, uraian: "Kertas Dan Cover Lainnya", satuan: "" },

  // Level 2: TANAH (GOL 2)
  { gol: 2, bid: 1, kel: 1, subKel: 1, subSubKel: 0, uraian: "TANAH BANGUNAN PERUMAHAN/G.TEMPAT TINGGAL", satuan: "M2" },
  { gol: 2, bid: 1, kel: 1, subKel: 1, subSubKel: 1, uraian: "Tanah Bangunan Rumah Negara Golongan I", satuan: "M2" },
  { gol: 2, bid: 1, kel: 1, subKel: 1, subSubKel: 2, uraian: "Tanah Bangunan Rumah Negara Golongan II", satuan: "M2" },
  { gol: 2, bid: 1, kel: 1, subKel: 1, subSubKel: 3, uraian: "Tanah Bangunan Rumah Negara Golongan III", satuan: "M2" },
  { gol: 2, bid: 1, kel: 1, subKel: 1, subSubKel: 4, uraian: "Tanah Bangunan Rumah Negara Tanpa Golongan", satuan: "M2" },
  { gol: 2, bid: 1, kel: 1, subKel: 1, subSubKel: 5, uraian: "Tanah Bangunan Mess/Wisma/Asrama", satuan: "M2" },
  { gol: 2, bid: 1, kel: 1, subKel: 1, subSubKel: 999, uraian: "Tanah Bangunan Fasilitas Tempat Tinggal Lainnya", satuan: "M2" },
];

export default dummyKlasifikasiData;