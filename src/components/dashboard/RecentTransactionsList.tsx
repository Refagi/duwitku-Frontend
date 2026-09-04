import { m } from "motion/react";
import { Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { EmptyState } from "@/components/ui/EmptyState";
import type { RecentTransaction } from "@/types/dashboard";
import { useUIStore } from "@/store/uiStore";

function TransactionRow({ tx, index }: { tx: RecentTransaction; index: number }) {
  const openModal = useUIStore((s) => s.openModal);

  return (
    <m.button
      type="button"
      onClick={() => openModal("edit-transaction", tx)}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="flex w-full items-center gap-4 rounded-lg border-b border-surface-container-high px-2 py-4 text-left last:border-0 hover:bg-surface-container-low"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
        {tx.category.name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-body-md font-semibold text-on-surface">{tx.note || tx.category.name}</p>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-on-surface-variant">
          <span className="badge-neutral py-0.5!">{tx.category.name}</span>
          <span className="flex items-center gap-1"><Wallet className="h-3 w-3" /> {tx.account.name}</span>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className={tx.type === "INCOME" ? "amount-income" : "amount-expense"}>
          {tx.type === "INCOME" ? "+" : "-"}{formatCurrency(tx.amount)}
        </p>
        <p className="text-xs text-on-surface-variant">
          {new Date(tx.date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
        </p>
      </div>
    </m.button>
  );
}

export function RecentTransactionsList({ data }: { data: RecentTransaction[] }) {
  if (data.length === 0) return <EmptyState compact message="Belum ada transaksi. Yuk catat transaksi pertamamu!" />;
  return (
    <div className="flex flex-col">
      {data.map((tx, i) => <TransactionRow key={tx.id} tx={tx} index={i} />)}
    </div>
  );
}