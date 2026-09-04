import { m } from "motion/react";
import { getCategoryIcon, getCategoryColor } from "@/lib/categoryVisuals";
import { formatCurrency } from "@/lib/format";
import { EmptyState } from "@/components/ui/EmptyState";
import type { CategoryBreakdownItem } from "@/types/report";


export function CategoryBreakdownList({ data }: { data: CategoryBreakdownItem[] }) {
  if (data.length === 0) return <EmptyState compact message="Belum ada pengeluaran di periode ini" />;
  return (
    <div className="space-y-4">
      {data.map((cat, i) => {
        const Icon = getCategoryIcon(cat.icon);
        const color = getCategoryColor(cat.categoryId);
        return (
          <m.div key={cat.categoryId} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color.bg} ${color.text}`}>
              {Icon ? <Icon className="h-4.5 w-4.5" /> : <span className="text-xs font-semibold">{cat.categoryName.charAt(0).toUpperCase()}</span>}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between text-body-md">
                <span className="font-medium text-on-surface">{cat.categoryName}</span>
                <span className="text-on-surface-variant">{formatCurrency(cat.total)} ({cat.percentage.toFixed(0)}%)</span>
              </div>
              <div className="progress-track"><div className="progress-fill" style={{ width: `${cat.percentage}%` }} /></div>
            </div>
          </m.div>
        );
      })}
    </div>
  );
}