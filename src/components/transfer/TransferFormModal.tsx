import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, Loader2, Trash2 } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { useAccounts } from "@/hooks/useAccounts";
import { useCreateTransfer, useUpdateTransfer } from "@/hooks/useTransfers";
import { transferSchema, type TransferFormValues } from "@/schemas/transfer.schema";
import type { Transfer } from "@/types/transfer";
import { useUIStore } from "@/store/uiStore";
import { toast } from "@/store/toastStore";
import { formatCurrency } from "@/lib/format";

export function TransferFormModal({ transfer }: { transfer?: Transfer }) {
  const closeModal = useUIStore((s) => s.closeModal);
  const openModal = useUIStore((s) => s.openModal);
  const isEdit = !!transfer;
  const isLocked = transfer?.isEdited ?? false;

  const { mutateAsync: createTransfer, isPending: isCreating } = useCreateTransfer();
  const { mutateAsync: updateTransfer, isPending: isUpdating } = useUpdateTransfer();
  const isPending = isCreating || isUpdating;

  const { register, control, handleSubmit, formState: { errors } } = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      fromAccountId: transfer?.fromAccount.id ?? "",
      toAccountId: transfer?.toAccount.id ?? "",
      amount: transfer ? Number(transfer.amount) : 0,
      date: transfer?.date?.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
      note: transfer?.note ?? "",
    },
  });

  const fromId = useWatch({ control, name: "fromAccountId" });
  const { data: accounts } = useAccounts();

  const onSubmit = async (values: TransferFormValues) => {
    try {
      if (isEdit) {
        await updateTransfer({ id: transfer.id, payload: values });
        toast.success("Transfer berhasil diperbarui");
      } else {
        await createTransfer(values);
        toast.success("Transfer berhasil dicatat");
      }
      closeModal();
    } catch {
      toast.error(isEdit ? "Gagal memperbarui transfer" : "Gagal mencatat transfer");
    }
  };

  return (
    <Modal open onClose={closeModal} title={isEdit ? "Edit Transfer" : "Transfer Antar Dompet"}>
      {isLocked && (
        <div className="mb-4 rounded-lg bg-surface-container-low p-3 text-center text-xs text-on-surface-variant">
          Transfer ini sudah pernah diedit sebelumnya.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <fieldset disabled={isLocked} className="space-y-4 disabled:opacity-60">
          <Field label="Dari Dompet" required error={errors.fromAccountId?.message}>
            <Select error={!!errors.fromAccountId} {...register("fromAccountId")}>
              <option value="">Pilih dompet asal</option>
              {accounts?.map((a) => <option key={a.id} value={a.id}>{a.name} ({formatCurrency(a.balance)})</option>)}
            </Select>
          </Field>

          <div className="flex justify-center"><ArrowDown className="h-5 w-5 text-on-surface-variant" /></div>

          <Field label="Ke Dompet" required error={errors.toAccountId?.message}>
            <Select error={!!errors.toAccountId} {...register("toAccountId")}>
              <option value="">Pilih dompet tujuan</option>
              {accounts?.filter((a) => a.id !== fromId).map((a) => (
                <option key={a.id} value={a.id}>{a.name} ({formatCurrency(a.balance)})</option>
              ))}
            </Select>
          </Field>

          <Field label="Nominal" required error={errors.amount?.message}>
            <Input type="number" step="0.01" placeholder="0" error={!!errors.amount} {...register("amount", { valueAsNumber: true })} />
          </Field>

          <Field label="Tanggal" required error={errors.date?.message}>
            <Input type="date" error={!!errors.date} {...register("date")} />
          </Field>

          <Field label="Catatan (opsional)">
            <textarea {...register("note")} rows={2} className="input-base resize-none" />
          </Field>
        </fieldset>

        {!isLocked && (
          <button type="submit" disabled={isPending} className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm">
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEdit ? "Simpan Perubahan" : "Simpan Transfer"}
          </button>
        )}

        {isEdit && (
          <button
            type="button"
            onClick={() => openModal("confirm-delete", { type: "transfer", id: transfer.id, name: transfer.note || "transfer ini" })}
            className="flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-error hover:underline"
          >
            <Trash2 className="h-4 w-4" /> Batalkan Transfer Ini
          </button>
        )}
      </form>
    </Modal>
  );
}