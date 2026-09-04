import { m } from "motion/react";
import { TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export function SpendingPaceCard({ expense, delay = 0 }: { expense: number; delay?: number }) {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysLeft = daysInMonth - dayOfMonth;

  const dailyAverage = dayOfMonth > 0 ? expense / dayOfMonth : 0;
  const projected = dailyAverage * daysInMonth;

  return (
    <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }} className="card">
      <div className="flex items-start justify-between">
        <p className="text-label-md text-on-surface-variant">Rata-rata Pengeluaran Harian</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-tertiary-container/20 text-tertiary">
          <TrendingUp className="h-4.5 w-4.5" />
        </div>
      </div>
      <p className="mt-2 text-headline-md text-on-surface">{formatCurrency(dailyAverage)}<span className="text-body-md text-on-surface-variant">/hari</span></p>
      <p className="mt-2 text-xs text-on-surface-variant">
        {daysLeft > 0
          ? `${daysLeft} hari lagi · proyeksi akhir bulan ${formatCurrency(projected)}`
          : "Bulan ini sudah berakhir"}
      </p>
    </m.div>
  );
}