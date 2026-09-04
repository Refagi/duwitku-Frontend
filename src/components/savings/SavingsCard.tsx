import { createElement } from "react";
import { m } from "motion/react";
import { Pencil, Trash2, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { Dropdown } from "@/components/ui/DropDown";
import { getSavingsIcon } from "@/lib/savingsIcon";
import { formatCompactCurrency } from "@/lib/format";
import { useUIStore } from "@/store/uiStore";
import type { Savings } from "@/types/saving";


export function SavingsCard({ goal, index }: { goal: Savings; index: number }) {
  const openModal = useUIStore((s) => s.openModal);
  const Icon = getSavingsIcon(goal.icon);

  const current = Number(goal.currentAmount);
  const target = Number(goal.targetAmount);
  const percentage = target > 0 ? (current / target) * 100 : 0;
  const displayWidth = Math.min(percentage, 100);
  const targetLabel = goal.targetDate
    ? `Target: ${new Date(goal.targetDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`
    : "Tanpa target waktu";

  return (
    <m.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 25, delay: index * 0.04 }} className="card">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-container/20 text-primary">
            {Icon ? (createElement(Icon, { className: "h-5 w-5" })) : (<span className="text-lg font-semibold">{goal.name.charAt(0).toUpperCase()}</span>)}
          </div>
          <div>
            <p className="text-title-lg text-on-surface">{goal.name}</p>
            <p className="text-xs text-on-surface-variant">{targetLabel}</p>
          </div>
        </div>
        <Dropdown items={[
          { label: "Isi Saldo", icon: ArrowDownToLine, onClick: () => openModal("deposit-savings", goal) },
          { label: "Tarik Dana", icon: ArrowUpFromLine, onClick: () => openModal("withdraw-savings", goal) },
          { label: "Edit", icon: Pencil, onClick: () => openModal("edit-savings", goal) },
          { label: "Hapus", icon: Trash2, danger: true, onClick: () => openModal("confirm-delete", { type: "savingsGoal", id: goal.id, name: goal.name }) },
        ]} />
      </div>

      <div className="flex items-end justify-between">
        <p className="text-headline-md text-on-surface">
          {formatCompactCurrency(current)} <span className="text-body-md font-normal text-on-surface-variant">/ {formatCompactCurrency(target)}</span>
        </p>
        <span className="text-body-md font-semibold text-primary">{percentage.toFixed(0)}%</span>
      </div>
      <div className="progress-track mt-2"><div className="progress-fill" style={{ width: `${displayWidth}%` }} /></div>
    </m.div>
  );
}