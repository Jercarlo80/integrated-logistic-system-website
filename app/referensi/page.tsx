"use client";

import { useState } from "react";
import Appbar from "@/app/component/appbar";
import Sidebar from "@/app/component/sidebar";
import Layer from "./layer";
import { UserProvider } from "@/app/context/userContext"; // ⬅️ sesuaikan path jika berbeda

export default function Referensi() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <UserProvider>
      <div className="h-screen w-full flex bg-gray-50 overflow-hidden">

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* MOBILE SIDEBAR DRAWER */}
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Drawer */}
            <div className="fixed left-0 top-0 h-full z-60 md:hidden">
              <Sidebar
                isMobile
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </>
        )}

        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col min-w-0">
          <Appbar onToggleSidebar={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-auto">
            <Layer />
          </main>
        </div>
      </div>
    </UserProvider>
  );
}