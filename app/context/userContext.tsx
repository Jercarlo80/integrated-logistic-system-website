"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { StaticImageData } from "next/image";
import DefaultAvatar from "../image/user.png";

export type UserProfile = {
  name: string;
  role: string;
  avatar: string | StaticImageData; // string = data URL hasil upload
};

type UserContextType = {
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
  resetUser: () => void;
};

const defaultUser: UserProfile = {
  name: "Letkol Laut (E) Kharis Nasution",
  role: "Ketua",
  avatar: DefaultAvatar,
};

const STORAGE_KEY = "user-profile";
const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  // Muat data tersimpan SETELAH mount → aman dari hydration mismatch
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setUser((prev) => ({
          name: parsed.name ?? prev.name,
          role: parsed.role ?? prev.role,
          avatar: parsed.avatar || prev.avatar, // data URL atau default
        }));
      }
    } catch (e) {
      console.error("Gagal memuat profil:", e);
    }
  }, []);

  const updateUser = (data: Partial<UserProfile>) => {
    setUser((prev) => {
      const next = { ...prev, ...data };
      try {
        // Hanya simpan field yang bisa di-serialize (avatar default berupa objek diabaikan)
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            name: next.name,
            role: next.role,
            avatar: typeof next.avatar === "string" ? next.avatar : null,
          })
        );
      } catch (e) {
        console.error("Gagal menyimpan profil:", e);
      }
      return next;
    });
  };

  const resetUser = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser harus dipakai di dalam <UserProvider>");
  return ctx;
}