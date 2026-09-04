import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Loader2, Trash2 } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { useAccounts } from "@/hooks/useAccounts";
import { useCategories } from "@/hooks/useCategories";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "@/hooks/useTransactions";
import {
  transactionSchema,
  type TransactionFormValues,
} from "@/schemas/transaction.schema";
import type { Transaction, TransactionType } from "@/types/transaction";
import { useUIStore } from "@/store/uiStore";
import { toast } from "@/store/toastStore";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function TransactionFormModal({ transaction }: { transaction?: Transaction; }) {
  const openModal = useUIStore((s) => s.openModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const isEdit = !!transaction;
  const isLocked = transaction?.isEdited ?? false;

  const { mutateAsync: createTransaction, isPending: isCreating } = useCreateTransaction();
  const { mutateAsync: updateTransaction, isPending: isUpdating } = useUpdateTransaction();
  const isPending = isCreating || isUpdating;

  const {register, control, handleSubmit, setValue, formState: { errors }, } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: transaction?.type ?? "EXPENSE",
      accountId: transaction?.account.id ?? "",
      categoryId: transaction?.category.id ?? "",
      amount: transaction ? Number(transaction.amount) : 0,
      date:
        transaction?.date?.slice(0, 10) ??
        new Date().toISOString().slice(0, 10),
      note: transaction?.note ?? "",
    },
  });

  const type = useWatch({ control, name: "type" });
  const { data: accounts } = useAccounts();
  const { data: categories } = useCategories(type as TransactionType);

  const handleTypeChange = (t: TransactionType) => {
    setValue("type", t, { shouldValidate: true });
    setValue("categoryId", "");
  };

  const onSubmit = async (values: TransactionFormValues) => {
    try {
      if (isEdit) {
        await updateTransaction({ id: transaction.id, payload: values });
        toast.success("Transaksi berhasil diperbarui");
      } else {
        await createTransaction(values);
        toast.success("Transaksi berhasil dicatat");
      }
      closeModal();
    } catch {
      toast.error(
        isEdit ? "Gagal memperbarui transaksi" : "Gagal mencatat transaksi",
      );
    }
  };

  return (
    <Modal
      open
      onClose={closeModal}
      title={isEdit ? "Edit Transaksi" : "Tambah Transaksi"}
    >
      {isLocked && (
        <div className="mb-4 rounded-lg bg-surface-container-low p-3 text-center text-xs text-on-surface-variant">
          Transaksi ini sudah pernah diedit sebelumnya.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-2">
          {(["EXPENSE", "INCOME"] as const).map((t) => (
            <button
              key={t}
              type="button"
              disabled={isLocked}
              onClick={() => handleTypeChange(t)}
              className={cn(
                "rounded-xl py-2.5 text-sm font-semibold transition-colors",
                type === t
                  ? t === "EXPENSE"
                    ? "bg-error text-on-error"
                    : "bg-primary text-on-primary"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container",
              )}
            >
              {t === "EXPENSE" ? "Pengeluaran" : "Pemasukan"}
            </button>
          ))}
        </div>

        <fieldset disabled={isLocked} className="space-y-4">
          <Field label="Nominal" required error={errors.amount?.message}>
            <Input
              type="number"
              step="0.01"
              placeholder="0"
              error={!!errors.amount}
              {...register("amount", { valueAsNumber: true })}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tanggal" required error={errors.date?.message}>
              <Input type="date" error={!!errors.date} {...register("date")} />
            </Field>
            <Field label="Kategori" required error={errors.categoryId?.message}>
              <Select error={!!errors.categoryId} {...register("categoryId")}>
                <option value="">Pilih kategori</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Dompet" required error={errors.accountId?.message}>
            <Select error={!!errors.accountId} {...register("accountId")}>
              <option value="">Pilih dompet</option>
              {accounts?.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({formatCurrency(a.balance)})
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Catatan (opsional)">
            <textarea
              {...register("note")}
              rows={2}
              placeholder="Tambah detail..."
              className="input-base resize-none"
            />
          </Field>
        </fieldset>

        <div>
          <p className="label-base">Lampiran</p>
          <button
            type="button"
            onClick={() => toast.info("Fitur ini belum tersedia")}
            className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-outline-variant/50 py-6 text-on-surface-variant transition-colors hover:bg-surface-container-low"
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs">Klik untuk unggah foto struk</span>
          </button>
        </div>

        {!isLocked && (
          <button
            type="submit"
            disabled={isPending}
            className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEdit ? "Simpan Perubahan" : "Simpan Transaksi"}
          </button>
        )}

        {isEdit && (
          <button
            type="button"
            onClick={() =>
              openModal("confirm-delete", {
                type: "transaction",
                id: transaction.id,
                name: transaction.note || "transaksi ini",
              })
            }
            className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-error hover:underline"
          >
            <Trash2 className="h-4 w-4" /> Batalkan Transaksi Ini
          </button>
        )}
      </form>
    </Modal>
  );
}
