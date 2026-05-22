"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import SatkomlekLogo from "../image/satkomlekLogo.png";

import {
  ChevronLeftCircle,
  ChevronRightCircle,
  LayoutDashboard,
  Boxes,
  PlusCircle,
  Settings2,
  BookOpen,
  BarChart3,
  Tags,
  Factory,
  Globe,
  Building2,
  Users,
  Settings,
  ClipboardList,
} from "lucide-react";

type SidebarProps = {
  isMobile?: boolean;
  open?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  isMobile = false,
  open = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  const handleNavigate = (url: string) => {
    router.push(url);
    if (isMobile && onClose) onClose();
  };

  return (
    <>
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        ${collapsed ? "w-20" : "w-72"}
        ${isMobile ? "fixed top-0 left-0 h-screen z-50" : ""}
        ${isMobile && !open ? "-translate-x-full" : "translate-x-0"}
        flex flex-col bg-gray-950  shadow-2xl transition-all duration-300 ease-in-out
        `}
      >
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-20 -right-3 w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
          >
            {collapsed ? (
              <ChevronRightCircle className="text-green-500" size={20} />
            ) : (
              <ChevronLeftCircle className="text-green-500" size={20} />
            )}
          </button>
        )}

        {/* Header */}
        <div className="h-20 flex items-center gap-3 px-6 ">
          <div className="relative w-10 h-10">
            <Image
              src={SatkomlekLogo}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>

          {!collapsed && (
            <div className="leading-tight">
              <div className="font-semibold text-gray-100">
                Satkomlek TNI
              </div>
              <div className="text-xs text-gray-400 tracking-wide">
                Sistem E-Kodefikasi
              </div>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="h-full flex flex-col   mt-8 px-3 overflow-y-auto">

          {/* Menu Utama */}
          <Section title="Menu Utama" collapsed={collapsed}>
            <MenuItem
              collapsed={collapsed}
              label="Dashboard"
              icon={LayoutDashboard}
              active={pathname === "/dashboard"}
              onClick={() => handleNavigate("/dashboard")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Koleksi Material"
              icon={Boxes}
              active={pathname === "/koleksimaterial"}
              onClick={() => handleNavigate("/koleksimaterial")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Usulan Kodefikasi"
              icon={PlusCircle}
              active={pathname === "/usulankodefikasi"}
              onClick={() => handleNavigate("/usulankodefikasi")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Proses Kodefikasi"
              icon={Settings2}
              active={pathname === "/proses-kodefikasi"}
              onClick={() => handleNavigate("/proses-kodefikasi")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Referensi"
              icon={BookOpen}
              active={pathname === "/referensi"}
              onClick={() => handleNavigate("/referensi")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Laporan"
              icon={BarChart3}
              active={pathname === "/laporan"}
              onClick={() => handleNavigate("/laporan")}
            />
          </Section>

          {/* Master Data */}
          <Section title="Master Data" collapsed={collapsed}>
            <MenuItem
              collapsed={collapsed}
              label="Kategori Material"
              icon={Tags}
              active={pathname === "/master/kategori-material"}
              onClick={() => handleNavigate("/master/kategori-material")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Pabrikan"
              icon={Factory}
              active={pathname === "/master/pabrikan"}
              onClick={() => handleNavigate("/master/pabrikan")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Negara"
              icon={Globe}
              active={pathname === "/master/negara"}
              onClick={() => handleNavigate("/master/negara")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Satuan Pemilik"
              icon={Building2}
              active={pathname === "/master/satuan-pemilik"}
              onClick={() => handleNavigate("/master/satuan-pemilik")}
            />
          </Section>

          {/* Administrasi */}
          <Section title="Administrasi" collapsed={collapsed}>
            <MenuItem
              collapsed={collapsed}
              label="Pengguna"
              icon={Users}
              active={pathname === "/admin/pengguna"}
              onClick={() => handleNavigate("/admin/pengguna")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Pengaturan"
              icon={Settings}
              active={pathname === "/admin/pengaturan"}
              onClick={() => handleNavigate("/admin/pengaturan")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Audit Trail"
              icon={ClipboardList}
              active={pathname === "/admin/audit-trail"}
              onClick={() => handleNavigate("/admin/audit-trail")}
            />
          </Section>

        </div>
      </aside>
    </>
  );
}

function Section({ title, children, collapsed }: any) {
  if (collapsed) return null;

  return (
    <div className="mt-6 first:mt-0">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-3 mb-2">
        {title}
      </div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function MenuItem({ label, icon: Icon, active, onClick, collapsed }: any) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center ${collapsed ? "justify-center" : "gap-3"} 
        h-11 px-4 rounded-xl cursor-pointer transition-all duration-200
        ${
          active
            ? "bg-green-900/40 text-green-400 font-medium"
            : "text-gray-300 hover:bg-gray-800/60 hover:text-gray-100"
        }
      `}
    >
      <div className={`w-6 flex justify-center`}>
        <Icon size={18} />
      </div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}