import { m } from "motion/react";
import { Building2, Pencil, Smartphone, Trash2, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";
import type { Account } from "@/types/account";

const TYPE_META: Record<
  Account["type"],
  {
    icon: typeof Wallet;
    label: string;
    card: string;
    chip: string;
    action: string;
    labelText: string;
  }
> = {
  BANK: {
    icon: Building2,
    label: "Rekening Bank",
    card: "bg-primary text-on-primary shadow-lg",
    chip: "bg-white/20 backdrop-blur-sm",
    action: "bg-white/20 hover:bg-white/30",
    labelText: "text-on-primary/80",
  },
  CASH: {
    icon: Wallet,
    label: "Tunai",
    card: "bg-primary-container text-on-primary-container shadow-card",
    chip: "bg-on-primary-container/10",
    action: "bg-on-primary-container/10 hover:bg-on-primary-container/20",
    labelText: "text-on-primary-container/70",
  },
  EWALLET: {
    icon: Smartphone,
    label: "E-Wallet",
    card: "bg-surface-container-lowest border border-surface-container-high text-on-surface shadow-card",
    chip: "bg-on-surface/10",
    action: "bg-on-surface/10 hover:bg-on-surface-container/20",
    labelText: "text-on-surface-variant",
  },
};

export function AccountCard({ account }: { account: Account }) {
  const openModal = useUIStore((s) => s.openModal);
  const { icon: Icon, label, card, chip, action, labelText } = TYPE_META[account.type];

  return (
    <m.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group relative flex h-50 flex-col justify-between overflow-hidden rounded-2xl p-6", card)}
    >
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="z-10 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={cn("rounded-md p-1.5", chip)}>
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-title-lg leading-tight">{account.name}</p>
            <p className={cn("text-xs", labelText)}>{label}</p>
          </div>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => openModal("edit-account", account)}
            className={cn("rounded-full p-1.5 transition-colors cursor-pointer", action)}
            title="Edit"
          >
            <Pencil className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={() => openModal("confirm-delete", { type: "account", id: account.id, name: account.name })}
            className={cn("rounded-full p-1.5 transition-colors cursor-pointer", action)}
            title="Hapus"
          >
            <Trash2 className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      <div className="z-10">
        <p className={cn("mb-1 text-label-sm uppercase tracking-wider", labelText)}>Saldo Saat Ini</p>
        <p className="text-headline-lg">{formatCurrency(account.balance)}</p>
      </div>
    </m.div>
  );
}