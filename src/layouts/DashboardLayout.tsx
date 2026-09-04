import { Outlet } from "react-router";
import { Sidebar } from "@/components/ui/SideBar";
import { Header } from "@/components/ui/Header";
import { ModalRoot } from "@/components/layouts/ModalRoot";

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />

      <div className="flex h-screen flex-1 flex-col overflow-hidden min-[1000px]:ml-64">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 min-[1000px]:p-6">
          <div className="mx-auto w-full max-w-7xl space-y-6 pb-24 min-[1000px]:pb-8">
            <Outlet />
          </div>
        </main>
      </div>

      <ModalRoot />
    </div>
  );
}