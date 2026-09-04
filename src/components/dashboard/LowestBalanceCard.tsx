import { m } from "motion/react";
import { useNavigate } from "react-router";
import { AlertTriangle, Wallet } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { Account } from "@/types/account";

const LOW_BALANCE_THRESHOLD = 20_000;

export function LowestBalanceCard({ accounts, delay = 0 }: { accounts: Account[]; delay?: number }) {
  const navigate = useNavigate();

  if (accounts.length === 0) {
    return (
      <m.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }} className="card">
        <p className="text-label-md text-on-surface-variant">Saldo Terendah</p>
        <p className="mt-2 text-body-md text-on-surface-variant">Belum ada dompet</p>
      </m.div>
    );
  }

  const lowest = accounts.reduce((min, a) => (Number(a.balance) < Number(min.balance) ? a : min), accounts[0]);
  const isLow = Number(lowest.balance) < LOW_BALANCE_THRESHOLD;

  return (
    <m.button
      type="button"
      onClick={() => navigate("/accounts")}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="card text-left"
    >
      <div className="flex items-start justify-between">
        <p className="text-label-md text-on-surface-variant">Saldo Terendah</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${isLow ? "bg-error-container/40 text-error" : "bg-surface-container-highest text-on-surface-variant"}`}>
          {isLow ? <AlertTriangle className="h-4.5 w-4.5" /> : <Wallet className="h-4.5 w-4.5" />}
        </div>
      </div>
      <p className="mt-2 text-headline-md text-on-surface">{formatCurrency(lowest.balance)}</p>
      <p className="mt-2 text-xs text-on-surface-variant">{lowest.name}{isLow ? " · pertimbangkan isi ulang" : ""}</p>
    </m.button>
  );
}