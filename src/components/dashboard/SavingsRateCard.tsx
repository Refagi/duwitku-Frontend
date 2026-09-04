import { m } from "motion/react";
import { PiggyBank } from "lucide-react";

export function SavingsRateCard({ income, cashFlow, delay = 0 }: { income: number; cashFlow: number; delay?: number }) {
  const rate = income > 0 ? (cashFlow / income) * 100 : null;

  return (
    <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }} className="card">
      <div className="flex items-start justify-between">
        <p className="text-label-md text-on-surface-variant">Tingkat Menabung</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-container/20 text-primary">
          <PiggyBank className="h-4.5 w-4.5" />
        </div>
      </div>
      <p className="mt-2 text-headline-md text-on-surface">{rate === null ? "-" : `${rate.toFixed(0)}%`}</p>
      <p className="mt-2 text-xs text-on-surface-variant">
        {rate === null ? "Belum ada pemasukan bulan ini" : rate >= 0 ? "dari pemasukan bulan ini berhasil disisihkan" : "pengeluaran melebihi pemasukan bulan ini"}
      </p>
    </m.div>
  );
}