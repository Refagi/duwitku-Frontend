import { useMemo, useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { useTransfers } from "@/hooks/useTransfers";
import { HistoryFilterBar } from "@/components/history/HistoryFilterBar";
import type { HistoryFilters } from "@/types/history";
import { HistoryItemRow, type HistoryItem } from "@/components/history/HistoryItemRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { HistorySkeleton } from "@/components/history/HistorySkeleton";

function groupByDate(items: HistoryItem[]) {
  const groups = new Map<string, HistoryItem[]>();
  for (const item of items) {
    const key = item.date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(item);
  }
  return groups;
}

export function HistoryPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<HistoryFilters>({});
  const hasCategoryFilter = !!filters.categoryId;

  const { data: txResult, isLoading: loadingTx } = useTransactions({ 
    q: search || undefined,
    from: filters.from,
    to: filters.to,
    categoryId: filters.categoryId,
    accountId: filters.accountId,
    minAmount: filters.minAmount,
    maxAmount: filters.maxAmount, 
    limit: 20 });
  const { data: trResult, isLoading: loadingTr } = useTransfers({ 
    q: search || undefined,
    from: filters.from, 
    to: filters.to, 
    accountId: filters.accountId, 
    minAmount: filters.minAmount, maxAmount: filters.maxAmount,
    limit: 50 },
    { enabled: !hasCategoryFilter });

  const items: HistoryItem[] = useMemo(() => {
    const txItems: HistoryItem[] = (txResult?.data ?? []).map((t) => ({ kind: "transaction", data: t, date: new Date(t.date) }));
    const trItems: HistoryItem[] = (hasCategoryFilter ? [] : (trResult?.data ?? [])).map((t) => ({ kind: "transfer", data: t, date: new Date(t.date) }));
    return [...txItems, ...trItems].sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [txResult, trResult, hasCategoryFilter]);

  const grouped = groupByDate(items);
  const isLoading = loadingTx || (loadingTr && !hasCategoryFilter);

  return (
    <>
    <HistoryFilterBar search={search} onSearchChange={setSearch} filters={filters} onFiltersChange={setFilters} />

      {isLoading ? (
        <HistorySkeleton />
      ) : items.length === 0 ? (
        <div className="card"><EmptyState message="Tidak ada transaksi yang cocok dengan filter ini." /></div>
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([dateLabel, dayItems]) => (
            <div key={dateLabel} className="card">
              <p className="mb-2 text-label-md uppercase tracking-wider text-on-surface-variant">{dateLabel}</p>
              {dayItems.map((item, i) => <HistoryItemRow key={`${item.kind}-${item.data.id}`} item={item} index={i} />)}
            </div>
          ))}
        </div>
      )}
    </>
  );
}