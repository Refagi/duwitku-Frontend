import { Bell, Menu } from "lucide-react";
import { useLocation } from "react-router";
import { useUIStore } from '@/store/uiStore';
import { toast } from "@/store/toastStore";
import { ProfileMenu } from '@/components/ui/ProfileMenu';


const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/accounts": "Dompet",
  "/categories": "Kategori",
  "/savings": "Rencana",
  "/history": "Riwayat",
  "/reports": "Laporan",
};

export function Header() {
  const { pathname } = useLocation();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-surface-container-high/50 bg-background px-4 py-3 min-[1000px]:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest min-[1000px]:hidden"
          aria-label="Buka menu navigasi"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h2 className="hidden text-headline-md text-on-surface min-[1000px]:block">{title}</h2>

        <div className="flex items-center gap-2 min-[1000px]:hidden">
          <h1 className="text-title-lg text-primary">Duwitku</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 min-[1000px]:gap-4">
        <button onClick={() => toast.info("Fitur ini belum tersedia")} className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-highest">
          <Bell className="h-5 w-5" />
        </button>
        <ProfileMenu />
      </div>
    </header>
  );
}