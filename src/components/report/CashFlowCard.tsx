import { m } from "motion/react";
import { formatCurrency } from "@/lib/format";
import { Landmark } from "lucide-react";
import type { CashFlowCardProps } from "@/types/report";

export function CashFlowCard({ cashFlow, incomePercent, expensePercent, delay = 0 }: CashFlowCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -4 }}
      className="card flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between">
          <p className="text-label-md text-on-surface-variant">Selisih (Cash Flow)</p>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <Landmark className="h-4.5 w-4.5" />
          </div>
        </div>

        <h3 className={cashFlow >= 0 ? "text-headline-md text-primary" : "text-headline-md text-error"}>
          {formatCurrency(cashFlow)}
        </h3>

        <p className="mt-1 text-xs text-on-primary/80">
          {cashFlow >= 0 ? "Kondisi sehat" : "Pengeluaran melebihi pemasukan"}
        </p>
      </div>

      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-on-surface-variant">
          <span>Pemasukan</span>
          <span>Pengeluaran</span>
        </div>

        <div className="progress-track flex overflow-hidden bg-white/20">
          <m.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${incomePercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <m.div
            className="h-full bg-error"
            initial={{ width: 0 }}
            animate={{ width: `${expensePercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </m.div>
  );
}