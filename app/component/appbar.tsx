"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import User from "../image/user.png";
import { FaChevronDown } from "react-icons/fa6";
import { RiNotification3Fill, RiLogoutBoxRLine } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";

type AppbarProps = {
  onToggleSidebar?: () => void;
};

type NotificationItem = {
  id: number;
  title: string;
  time: string;
  read?: boolean;
};

export default function Appbar({ onToggleSidebar }: AppbarProps) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotif, setOpenNotif] = useState(false);

  // State untuk jam
  const [currentTime, setCurrentTime] = useState({
    wib: "",
    wita: "",
    wit: "",
    gmt: "", // GMT+00 (UTC)
  });

  // State untuk tanggal lengkap
  const [currentDate, setCurrentDate] = useState("");

  const router = useRouter();

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Laporan aset telah diperbarui",
      time: "5 menit lalu",
      read: false,
    },
    {
      id: 2,
      title: "Permintaan peminjaman baru",
      time: "1 jam lalu",
      read: false,
    },
    {
      id: 3,
      title: "Data personel diperbarui",
      time: "Kemarin",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Update jam & tanggal setiap detik
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      // Formatter zona waktu
      const formatterWIB = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const formatterWITA = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const formatterWIT = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jayapura",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const formatterGMT = new Intl.DateTimeFormat("id-ID", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // Format tanggal lengkap (contoh: Senin, 25 Mei 2026)
      const dateFormatter = new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentTime({
        wib: formatterWIB.format(now),
        wita: formatterWITA.format(now),
        wit: formatterWIT.format(now),
        gmt: formatterGMT.format(now),
      });

      setCurrentDate(dateFormatter.format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfile(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setOpenNotif(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    router.push("/login");
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="w-full h-16 md:h-20 bg-gray-950 flex items-center px-4 md:px-8 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      {/* LEFT - hanya tombol hamburger menu */}
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-800/60 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* RIGHT */}
      <div className="ml-auto flex items-center gap-4">
        {/* DIGITAL CLOCK & DATE - WIB, WITA, WIT, GMT + Tanggal */}
        <div className="hidden md:flex flex-row flex-col items-end gap-x-6">
          {/* Baris zona waktu */}
          <div className="flex items-center gap-3 bg-gray-900/50 rounded-xl px-3 py-1.5 border border-gray-800">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-green-400 font-mono">WIB</span>
              <span className="text-sm font-mono font-medium text-gray-200 tracking-wider">
                {currentTime.wib}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-yellow-400 font-mono">
                WITA
              </span>
              <span className="text-sm font-mono font-medium text-gray-200 tracking-wider">
                {currentTime.wita}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-blue-400 font-mono">WIT</span>
              <span className="text-sm font-mono font-medium text-gray-200 tracking-wider">
                {currentTime.wit}
              </span>
            </div>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-purple-400 font-mono">
                GMT+00
              </span>
              <span className="text-sm font-mono font-medium text-gray-200 tracking-wider">
                {currentTime.gmt}
              </span>
            </div>
          </div>

          {/* Baris tanggal lengkap */}

          <div className="flex flex-row justify-center items-center gap-x-2 text-xs font-medium text-white bg-gray-900/30 rounded-lg px-3 py-3">
            <IoCalendarOutline size={20} className="text-green-400" />
            <div className="w-px h-6 bg-gray-700"></div>
            {currentDate}
          </div>
        </div>

        {/* NOTIFICATION */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setOpenNotif(!openNotif)}
            className="relative p-2.5 rounded-xl hover:bg-gray-800/60 transition"
          >
            <RiNotification3Fill size={20} className="text-green-500" />

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 bg-red-600 text-white text-[10px] font-semibold flex items-center justify-center rounded-full shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {openNotif && (
            <div className="absolute right-0 mt-3 w-85 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn z-50">
              <div className="flex items-center justify-between px-5 py-4 bg-gray-900/90">
                <div className="flex items-center gap-2">
                  <RiNotification3Fill className="text-green-500" />
                  <h3 className="text-sm font-semibold text-gray-200">
                    Notifikasi
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-900/40 text-green-400 font-medium">
                      {unreadCount} baru
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-gray-400 hover:text-green-400 transition"
                >
                  Tandai dibaca
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto z-50">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-gray-500 text-sm">
                    Tidak ada notifikasi
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="flex items-start gap-3 px-5 py-4 hover:bg-gray-800/60 cursor-pointer transition"
                    >
                      <div className="mt-1">
                        {!notif.read ? (
                          <span className="w-2.5 h-2.5 bg-green-500 rounded-full block"></span>
                        ) : (
                          <span className="w-2.5 h-2.5 bg-gray-600 rounded-full block"></span>
                        )}
                      </div>
                      <div className="flex flex-col flex-1">
                        <p
                          className={`text-sm leading-snug ${!notif.read ? "font-medium text-gray-100" : "text-gray-400"}`}
                        >
                          {notif.title}
                        </p>
                        <span className="text-xs text-gray-500 mt-1">
                          {notif.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="px-5 py-3 text-center bg-gray-900/90">
                <button className="text-sm text-green-400 font-medium hover:text-green-300 transition">
                  Lihat semua notifikasi
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div ref={profileRef} className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800/60 transition cursor-pointer"
          >
            <Image
              src={User}
              alt="User-profile"
              width={44}
              height={44}
              className="rounded-xl object-cover shadow-sm"
            />

            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-200">
                Letda Sus Jeremia Carlo Christianto
              </span>
              <span className="text-xs text-gray-400">
                Danton PaldukLap Denkomsat
              </span>
            </div>

            <FaChevronDown className="text-gray-500 hidden md:block text-sm" />
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-3 w-52 bg-gray-900 rounded-2xl shadow-2xl py-2 animate-fadeIn">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800/60 transition"
              >
                <RiLogoutBoxRLine size={18} className="text-red-400" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
