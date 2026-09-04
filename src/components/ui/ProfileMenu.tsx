import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { LogOut, Moon, Sun, User as UserIcon } from "lucide-react";
import { useAuth, useLogout } from "@/hooks/useAuth";
import { useThemeStore } from "@/store/themeStore";
import { toast } from "@/store/toastStore";
import { useClickOutside } from "@/hooks/useClickOutside";

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const { user } = useAuth();
  const { theme, toggleTheme } = useThemeStore();
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  const initials = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  const handleLogout = () => {
    setOpen(false);
    logout(undefined, { onSuccess: () => navigate("/login") });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-surface-variant bg-surface-container hover:ring-2 hover:ring-primary/50"
      >
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-container text-label-md text-on-primary-container">
            {initials}
          </div>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-lg"
          >
            <div className="flex items-center gap-3 border-b border-surface-container-high px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-container text-label-md text-on-primary-container">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-body-md font-semibold text-on-surface">{user?.name}</p>
                <p className="truncate text-xs text-on-surface-variant">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-0.5 p-1.5">
              <button
                type="button"
                onClick={() => { setOpen(false); toast.info("Fitur ini belum tersedia"); }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-low"
              >
                <UserIcon className="h-4 w-4" /> Edit Profil
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-low"
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                {theme === "light" ? "Mode Gelap" : "Mode Terang"}
              </button>
            </div>

            <div className="border-t border-surface-container-high p-1.5">
              <button
                type="button"
                onClick={handleLogout}
                disabled={isPending}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-error hover:bg-error-container/40 disabled:opacity-60"
              >
                <LogOut className="h-4 w-4" /> {isPending ? "Keluar..." : "Keluar dari Akun"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}