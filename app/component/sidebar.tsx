"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

import SatkomlekLogo from "@/app/image/satkomlekLogo.png";

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

// Context untuk tooltip saat sidebar collapsed
type TipContextType = {
  collapsed: boolean;
  show: (label: string, rect: DOMRect) => void;
  hide: () => void;
};
const SidebarTipContext = createContext<TipContextType | null>(null);

export default function Sidebar({
  isMobile = false,
  open = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [tip, setTip] = useState<{
    label: string;
    top: number;
    left: number;
  } | null>(null);

  const handleNavigate = (url: string) => {
    router.push(url);
    if (isMobile && onClose) onClose();
  };

  // Hanya aktif saat collapsed (desktop)
  const showTip = (label: string, rect: DOMRect) => {
    if (!collapsed) return;
    setTip({
      label,
      top: rect.top + rect.height / 2,
      left: rect.right + 8,
    });
  };
  const hideTip = () => setTip(null);

  return (
    <SidebarTipContext.Provider
      value={{ collapsed, show: showTip, hide: hideTip }}
    >
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
        ${collapsed ? "w-20" : "w-72"}
        ${isMobile ? "fixed left-0 top-0 z-50 h-screen" : ""}
        ${isMobile && !open ? "-translate-x-full" : "translate-x-0"}
        flex flex-col bg-gray-950 shadow-2xl transition-all duration-300 ease-in-out
        `}
      >
        {!isMobile && (
          <button
            onClick={() => {
              setCollapsed((c) => !c);
              hideTip();
            }}
            aria-label={collapsed ? "Perlebar sidebar" : "Perkecil sidebar"}
            className="absolute -right-3 top-20 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 shadow-md transition-shadow hover:shadow-lg"
          >
            {collapsed ? (
              <ChevronRightCircle className="text-green-500" size={20} />
            ) : (
              <ChevronLeftCircle className="text-green-500" size={20} />
            )}
          </button>
        )}

        {/* Header */}
        <div className="flex h-20 items-center gap-3 px-6">
          <div className="relative h-10 w-10 shrink-0">
            <Image
              src={SatkomlekLogo}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>

          {!collapsed && (
            <div className="leading-tight">
              <div className="font-semibold text-gray-100">Satkomlek TNI</div>
              <div className="text-xs tracking-wide text-gray-400">
                Sistem E-Kodefikasi
              </div>
            </div>
          )}
        </div>

        {/* Menu */}
        <div className="mt-8 flex h-full flex-col overflow-y-auto px-3">
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
              active={pathname === "/proseskodefikasi"}
              onClick={() => handleNavigate("/proseskodefikasi")}
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
              active={pathname === "/kategorimaterial"}
              onClick={() => handleNavigate("/kategorimaterial")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Pabrikan"
              icon={Factory}
              active={pathname === "/pabrikan"}
              onClick={() => handleNavigate("/pabrikan")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Negara"
              icon={Globe}
              active={pathname === "/negara"}
              onClick={() => handleNavigate("/negara")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Satuan Pemilik"
              icon={Building2}
              active={pathname === "/satuanpemilik"}
              onClick={() => handleNavigate("/satuanpemilik")}
            />
          </Section>

          {/* Administrasi */}
          <Section title="Administrasi" collapsed={collapsed}>
            <MenuItem
              collapsed={collapsed}
              label="Pengguna"
              icon={Users}
              active={pathname === "/pengguna"}
              onClick={() => handleNavigate("/pengguna")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Pengaturan"
              icon={Settings}
              active={pathname === "/pengaturan"}
              onClick={() => handleNavigate("/pengaturan")}
            />
            <MenuItem
              collapsed={collapsed}
              label="Audit Trail"
              icon={ClipboardList}
              active={pathname === "/audittrail"}
              onClick={() => handleNavigate("/audittrail")}
            />
          </Section>
        </div>
      </aside>

      {/* Tooltip (fixed, lolos dari overflow container) */}
      {collapsed && tip && (
        <div
          className="pointer-events-none fixed z-60 -translate-y-1/2 whitespace-nowrap rounded-lg border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm font-medium text-gray-100 shadow-xl"
          style={{ top: tip.top, left: tip.left }}
        >
          {tip.label}
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
        </div>
      )}
    </SidebarTipContext.Provider>
  );
}

function Section({ title, children, collapsed }: any) {
  return (
    <div className="mt-6 first:mt-0">
      {collapsed ? (
        // Pemisah halus antar grup saat collapsed (tanpa judul)
        <div className="mx-auto mb-2 h-px w-8 bg-gray-800 first:hidden" />
      ) : (
        <div className="mb-2 ml-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {title}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function MenuItem({ label, icon: Icon, active, onClick, collapsed }: any) {
  const ctx = useContext(SidebarTipContext);

  return (
    <div
      onClick={onClick}
      onMouseEnter={(e) =>
        collapsed && ctx?.show(label, e.currentTarget.getBoundingClientRect())
      }
      onMouseLeave={() => ctx?.hide()}
      aria-label={collapsed ? label : undefined}
      title={collapsed ? undefined : undefined}
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
      <div className="flex w-6 justify-center">
        <Icon size={18} />
      </div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </div>
  );
}