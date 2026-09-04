import { NavLink, useNavigate } from "react-router";
import { LayoutDashboard, Wallet, Tags, History, BarChart3, Settings, Plus, Loader2, LogOut, PiggyBank} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/uiStore";
import { useLogout } from "@/hooks/useAuth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/accounts", label: "Dompet", icon: Wallet },
  { to: "/categories", label: "Kategori", icon: Tags },
  { to: "/savings", label: "Rencana", icon: PiggyBank },
  { to: "/history", label: "Riwayat", icon: History },
  { to: "/reports", label: "Laporan", icon: BarChart3 },
] as const;

export function Sidebar() {
  const isSidebarOpen = useUIStore((s) => s.isSidebarOpen);
  const closeSidebar = useUIStore((s) => s.closeSidebar);
  const openModal = useUIStore((s) => s.openModal);
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate("/login"),
    });
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/30 min-[1000px]:hidden"
          aria-hidden="true"
        />
      )}

      <nav
        className={cn(
          "fixed z-50 flex flex-col gap-2 bg-surface transition-transform duration-300 ease-in-out",
          "inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-surface-container-high py-6 shadow-lg",
          "min-[900px]:inset-x-auto min-[900px]:left-0 min-[900px]:top-0 min-[900px]:h-screen min-[900px]:w-64 min-[900px]:max-h-none min-[900px]:border-b-0 min-[900px]:border-r",
          "min-[1000px]:translate-x-0 min-[1000px]:translate-y-0 min-[1000px]:shadow-none min-[1000px]:border-r",
          isSidebarOpen
            ? "translate-y-0 min-[900px]:translate-x-0 min-[900px]:translate-y-0"
            : "-translate-y-full min-[900px]:-translate-x-full min-[900px]:translate-y-0",
        )}
      >
        <div className="flex items-center gap-3 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Wallet className="h-5 w-5 text-on-primary" strokeWidth={2.5} />
          </div>
          <h1 className="text-headline-md text-primary">Duwitku</h1>
        </div>

        <div className="px-2">
          <button
            type="button"
            onClick={() => {
              openModal("add-transaction");
              closeSidebar();
            }}
            className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm"
          >
            <Plus className="h-4 w-4" />
            Transaksi
          </button>
        </div>
        <div className="px-2">
          <button
            type="button"
            onClick={() => {
              openModal("add-transfer");
              closeSidebar();
            }}
            className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm"
          >
            <Plus className="h-4 w-4" />
            Transfer
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                  isActive
                    ? "border-l-4 border-primary bg-surface-container-low font-bold text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low",
                )
              }
            >
              <Icon className="h-5 w-5" strokeWidth={2} />
              <span className="text-body-md">{label}</span>
            </NavLink>
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-1 px-4">
          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant/40"
          >
            <Settings className="h-5 w-5" strokeWidth={2} />
            <span className="text-body-md">Pengaturan</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-on-surface-variant transition-colors hover:bg-error-container/40 hover:text-error disabled:opacity-60"
          >
            {isLoggingOut ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <LogOut className="h-5 w-5" strokeWidth={2} />
            )}
            <span className="text-body-md">
              {isLoggingOut ? "Keluar..." : "Keluar"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
