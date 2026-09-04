import { m } from "motion/react";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { BalanceHeroCardProps } from "@/types/dashboard";

export function BalanceHeroCard({ totalBalance, trendPercent }: BalanceHeroCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-2xl bg-primary p-6 text-on-primary shadow-lg"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between">
          <p className="text-label-md uppercase tracking-wider text-on-primary/80">Total Saldo</p>
          <Wallet className="h-5 w-5 opacity-70" />
        </div>
        <h3 className="text-display-lg">{formatCurrency(totalBalance)}</h3>
        {trendPercent !== null && (
          <div className="mt-4 flex items-center gap-2 text-sm text-on-primary">
            {trendPercent >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{trendPercent >= 0 ? "+" : ""}{trendPercent.toFixed(1)}% dari bulan lalu</span>
          </div>
        )}
      </div>
    </m.div>
  );
}