"use client";

import { useState, use } from "react";
import Appbar from "@/app/component/appbar";
import Sidebar from "@/app/component/sidebar";
import Layer from "@/app/datakoleksimaterial/layer";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function DetailDataKoleksiMaterial({ params }: PageProps) {
  const { slug } = use(params); // ambil string slug dari promise
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 z-[60] h-full md:hidden">
            <Sidebar
              isMobile
              open={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Appbar onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-auto">
          <Layer slug={slug} />
        </main>
      </div>
    </div>
  );
}