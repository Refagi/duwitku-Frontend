import { Outlet } from "react-router";
import { m } from "motion/react";
import { Wallet } from "lucide-react";
// import logoApp from "@/assets/logo.png";

export function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-4 border">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-container/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface-container/60 blur-3xl" />
      </div>

      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type : "spring", bounce: 0.70, duration: 0.7, }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="card shadow-card">
          <div className="text-center">
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.50, duration: 0.5, }}
              className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-card"
            >
                <Wallet
                  className="h-7 w-7 text-on-primary"
                  strokeWidth={2.5}
                />
            </m.div>
            <m.div               
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <h1 className="text-3xl font-bold text-on-surface">Duwitku</h1>
              <p className="mt-1 text-sm text-on-surface-variant">DuwitKita</p>
            </m.div>
          </div>

          <Outlet />
        </div>

        <p className="mt-6 text-center text-xs text-on-surface-variant/70">
          © 2026 DUWITKU
        </p>
      </m.div>
    </div>
  );
}
