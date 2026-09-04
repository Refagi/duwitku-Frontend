import { motion } from "motion/react";
import { Link } from "react-router";
import { PiggyBank } from "lucide-react";
import { getSavingsIcon } from "@/lib/savingsIcon";
import { formatCompactCurrency } from "@/lib/format";
import type { Savings } from "@/types/saving";

export function SavingsRateCard({ goals, delay = 0 }: { goals: Savings[]; delay?: number }) {
  const top2 = goals.slice(0, 2);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }} className="card">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-label-md text-on-surface-variant">Saving Goals</p>
        <Link to="/savings-goals" className="text-xs font-medium text-primary hover:underline">Lihat semua</Link>
      </div>

      {top2.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-4 text-center">
          <PiggyBank className="h-6 w-6 text-on-surface-variant" />
          <p className="text-xs text-on-surface-variant">Belum ada rencana tabungan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {top2.map((goal) => {
            const Icon = getSavingsIcon(goal.icon);
            const current = Number(goal.currentAmount);
            const target = Number(goal.targetAmount);
            const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
            const targetLabel = goal.targetDate
              ? new Date(goal.targetDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
              : "Tanpa target waktu";

            return (
              <div key={goal.id}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 font-medium text-on-surface"><Icon className="h-3.5 w-3.5 text-primary" /> {goal.name}</span>
                  <span className="font-semibold text-primary">{((current / target) * 100 || 0).toFixed(0)}%</span>
                </div>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div>
                <p className="mt-1 text-[11px] text-on-surface-variant">{formatCompactCurrency(current)} / {formatCompactCurrency(target)} · {targetLabel}</p>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}