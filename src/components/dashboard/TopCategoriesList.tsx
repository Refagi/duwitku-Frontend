import { m } from "motion/react";
import { formatCurrency } from "@/lib/format";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TopExpenseCategory } from "@/types/dashboard";

export function TopCategoriesList({ data }: { data: TopExpenseCategory[] }) {
  if (data.length === 0) return <EmptyState compact message="Belum ada data" />;

  const max = data[0]?.total || 1;

  return (
    <div className="space-y-4">
      {data.map((cat, i) => {
        const width = (cat.total / max) * 100;
        return (
          <div key={cat.categoryId}>
            <div className="mb-1 flex items-end justify-between">
              <span className="text-body-md font-medium text-on-surface">{cat.categoryName}</span>
              <span className="text-label-md text-on-surface-variant">{formatCurrency(cat.total)}</span>
            </div>
            <div className="progress-track">
              <m.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${width}%`, opacity: 1 - i * 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}