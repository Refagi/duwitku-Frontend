import { useUIStore } from "@/store/uiStore";
import { AccountFormModal } from "@/components/accounts/AccountFormModal";
import { CategoryFormModal } from "@/components/categories/CategoryFormModal";
import { SavingsFormModal } from "@/components/savings/SavingsFormModal";
import { AllocateSavingsModal } from "@/components/savings/AllocateSavingsModal";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { useDeleteAccount } from "@/hooks/useAccounts";
import { useDeleteCategory } from "@/hooks/useCategories";
import { TransactionFormModal } from "@/components/transactions/TransactionsFormModal";
import { useDeleteTransaction } from "@/hooks/useTransactions";
import type { Account } from "@/types/account";
import type { Category, CategoryType } from "@/types/category";
import type { Transaction } from "@/types/transaction";
import { TransferFormModal } from "@/components/transfer/TransferFormModal";
import { useDeleteTransfer } from "@/hooks/useTransfers";
import type { Transfer } from "@/types/transfer";
import { useDeleteSavings } from "@/hooks/useSavings";
import type { Savings } from "@/types/saving";
import { toast } from "@/store/toastStore";


export function ModalRoot() {
  const activeModal = useUIStore((s) => s.activeModal);
  const modalPayload = useUIStore((s) => s.modalPayload);
  const closeModal = useUIStore((s) => s.closeModal);
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount();
  const { mutate: deleteCategory, isPending: isDeletingCategory } = useDeleteCategory();
  const { mutate: deleteTransfer, isPending: isDeletingTransfer } = useDeleteTransfer();
  const { mutate: deleteTransaction, isPending: isDeletingTransaction } = useDeleteTransaction();
  const { mutate: deleteSavings, isPending: isDeletingSaving } = useDeleteSavings();

  switch (activeModal) {
    case "add-account":
      return <AccountFormModal />;
    case "edit-account":
      return <AccountFormModal account={modalPayload as Account} />;

    case "add-category": {
      const payload = modalPayload as
        | { defaultType?: CategoryType }
        | undefined;
      return <CategoryFormModal defaultType={payload?.defaultType} />;
    }
    case "edit-category":
      return <CategoryFormModal category={modalPayload as Category} />;

    case "add-transaction":
      return <TransactionFormModal />;
    case "edit-transaction":
      return <TransactionFormModal transaction={modalPayload as Transaction} />;

    case "add-transfer":
      return <TransferFormModal />;
    case "edit-transfer":
      return <TransferFormModal transfer={modalPayload as Transfer} />;
    case "add-savings": return <SavingsFormModal />;
    case "edit-savings": return <SavingsFormModal goal={modalPayload as Savings} />;
    case "deposit-savings": return <AllocateSavingsModal goal={modalPayload as Savings} mode="deposit" />;
    case "withdraw-savings": return <AllocateSavingsModal goal={modalPayload as Savings} mode="withdraw" />;


    case "confirm-delete": {

      const payload = modalPayload as | { type: "account"; id: string; name: string } | { type: "category"; id: string; name: string } 
      | { type: "transaction"; id: string; name: string } | { type: "transfer"; id: string; name: string } | { type: "saving"; id: string; name: string };
      
      if (payload.type === "account") {
        return (
          <ConfirmDialog
            title="Hapus Dompet?"
            description={`Dompet "${payload.name}" akan dihapus permanen. Aksi ini tidak bisa dibatalkan.`}
            isLoading={isDeleting}
            onCancel={closeModal}
            onConfirm={() =>
              deleteAccount(payload.id, { onSuccess: closeModal })
            }
          />
        );
      }
      if (payload.type === "category") {
        return (
          <ConfirmDialog
            title="Hapus Kategori?"
            description={`Kategori "${payload.name}" akan dihapus permanen.`}
            isLoading={isDeletingCategory}
            onCancel={closeModal}
            onConfirm={() =>
              deleteCategory(payload.id, { onSuccess: closeModal })
            }
          />
        );
      }
      if (payload.type === "transaction") {
        return (
          <ConfirmDialog
            title="Hapus Transaksi?"
            description="Transaksi ini akan dihapus, saldo otomatis dikembalikan."
            isLoading={isDeletingTransaction}
            onCancel={closeModal}
            onConfirm={() =>
              deleteTransaction(payload.id, {
                onSuccess: () => {
                  toast.success("Transaksi berhasil dihapus");
                  closeModal();
                },
                onError: () => toast.error("Gagal menghapus transaksi"),
              })
            }
          />
        );
      }
      if (payload.type === "transfer") {
        return (
          <ConfirmDialog
            title="Hapus Transfer?"
            description="Transfer ini akan dihapus, saldo kedua dompet otomatis dikembalikan."
            isLoading={isDeletingTransfer}
            onCancel={closeModal}
            onConfirm={() =>
              deleteTransfer(payload.id, {
                onSuccess: () => {
                  toast.success("Transfer berhasil dihapus");
                  closeModal();
                },
                onError: () => toast.error("Gagal menghapus transfer"),
              })
            }
          />
        );
      }
      if (payload.type === "saving") {
        return (
        <ConfirmDialog
        title="Hapus Rencana Tabungan?"
        description={`Rencana "${payload.name}" akan dihapus. Kalau masih ada dana tersimpan, tarik dulu semuanya sebelum bisa dihapus.`}
        isLoading={isDeletingSaving}
        onCancel={closeModal}
        onConfirm={() => deleteSavings(payload.id, {
          onSuccess: () => { toast.success("Rencana berhasil dihapus"); closeModal(); },
          onError: () => toast.error("Gagal menghapus rencana"),
        })}
        />
      );
    }
      return null;
    }

    default:
      return null;
  }
}
