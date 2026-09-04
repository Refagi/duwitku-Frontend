import { createElement } from "react";
import { m } from "motion/react";
import { ArrowRightLeft, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { getCategoryIcon, getCategoryColor } from "@/lib/categoryVisuals";
import { useUIStore } from "@/store/uiStore";
import type { Transaction } from "@/types/transaction";
import type { Transfer } from "@/types/transfer";

export type HistoryItem =
  | { kind: "transaction"; data: Transaction; date: Date }
  | { kind: "transfer"; data: Transfer; date: Date };

export function HistoryItemRow({ item, index }: { item: HistoryItem; index: number; }) {
  const openModal = useUIStore((s) => s.openModal);

  if (item.kind === "transfer") {
    const t = item.data;
    return (
      <m.button
        type="button"
        onClick={() => openModal("edit-transfer", t)}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, delay: index * 0.03 }}
        className="flex w-full items-center gap-4 rounded-lg border-b border-surface-container-high px-2 py-4 text-left last:border-0 hover:bg-surface-container-low"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
          <ArrowRightLeft className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1 text-body-md font-semibold text-on-surface">
            <span>{t.fromAccount.name}</span>
            <span className="text-on-surface-variant">→</span>
            <span>{t.toAccount.name}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span>Transfer</span>
            {t.isEdited && (
              <span className="badge-neutral py-0.5!">Edited</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-body-md font-semibold text-on-surface-variant">
            {formatCurrency(t.amount)}
          </p>
          <p className="text-xs text-on-surface-variant">
            {item.date.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </m.button>
    );
  }

  const tx = item.data;
  const Icon = getCategoryIcon(tx.category.icon);
  const color = getCategoryColor(tx.category.id);

  return (
    <m.button
      type="button"
      onClick={() => openModal("edit-transaction", tx)}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="flex w-full items-center gap-4 rounded-lg border-b border-surface-container-high px-2 py-4 text-left last:border-0 hover:bg-surface-container-low"
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${color.bg} ${color.text}`}>
        {Icon ? (
          createElement(Icon, { className: "h-5 w-5" })
        ) : (
          <span className="text-sm font-semibold">
            {tx.category.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-body-md font-semibold text-on-surface">
          {tx.note || tx.category.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-on-surface-variant">
          <span className="badge-neutral py-0.5!">{tx.category.name}</span>
          <span className="flex items-center gap-1">
            <Wallet className="h-3 w-3" />
            {tx.account.name}
          </span>
          {tx.isEdited && <span className="badge-neutral py-0.5!">Edited</span>}
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className={tx.type === "INCOME" ? "amount-income" : "amount-expense"}>
          {tx.type === "INCOME" ? "+" : "-"}
          {formatCurrency(tx.amount)}
        </p>
        <p className="text-xs text-on-surface-variant">
          {item.date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </m.button>
  );
}
