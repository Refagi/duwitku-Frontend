import { AnimatePresence, m } from "motion/react";
import { Plus, Wallet as WalletIcon } from "lucide-react";
import { useAccounts } from "@/hooks/useAccounts";
import { AccountCard } from "@/components/accounts/AccountCard";
import { AccountSkeleton } from "@/components/accounts/AccountSkeleton";
import { useUIStore } from "@/store/uiStore";

export function AccountsPage() {
  const { data: accounts, isLoading } = useAccounts();
  const openModal = useUIStore((s) => s.openModal);

  return (
    <>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => openModal("add-account")}
          className="btn-primary flex items-center gap-2 py-2.5 text-sm"
        >
          <Plus className="h-4 w-4" />
          Tambah Dompet
        </button>
      </div>

      {isLoading ? (
        <AccountSkeleton />
      ) : !accounts || accounts.length === 0 ? (
        <div className="card flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
            <WalletIcon className="h-7 w-7" />
          </div>
          <p className="text-body-md text-on-surface-variant">
            Belum ada dompet. Tambahkan dompet pertamamu untuk mulai mencatat
            transaksi.
          </p>
        </div>
      ) : (
        <m.div
          layout
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </AnimatePresence>
        </m.div>
      )}
    </>
  );
}
