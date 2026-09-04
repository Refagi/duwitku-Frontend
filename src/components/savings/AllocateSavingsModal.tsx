import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { useAccounts } from "@/hooks/useAccounts";
import { useDepositSavings, useWithdrawSavings } from "@/hooks/useSavings";
import { allocateSavingsSchema, type AllocateSavingsFormValues } from "@/schemas/saving.schema";
import type { Savings } from "@/types/saving";
import { useUIStore } from "@/store/uiStore";
import { toast } from "@/store/toastStore";
import { formatCurrency } from "@/lib/format";

export function AllocateSavingsModal({ goal, mode }: { goal: Savings; mode: "deposit" | "withdraw" }) {
  const closeModal = useUIStore((s) => s.closeModal);
  const { mutateAsync: deposit, isPending: isDepositing } = useDepositSavings();
  const { mutateAsync: withdraw, isPending: isWithdrawing } = useWithdrawSavings();
  const isPending = isDepositing || isWithdrawing;

  const { register, handleSubmit, formState: { errors } } = useForm<AllocateSavingsFormValues>({
    resolver: zodResolver(allocateSavingsSchema),
    defaultValues: { accountId: "", amount: 0, date: new Date().toISOString().slice(0, 10), note: "" },
  });
  const { data: accounts } = useAccounts();

  const onSubmit = async (values: AllocateSavingsFormValues) => {
    try {
      if (mode === "deposit") { await deposit({ id: goal.id, payload: values }); toast.success("Dana berhasil dialokasikan"); }
      else { await withdraw({ id: goal.id, payload: values }); toast.success("Dana berhasil ditarik"); }
      closeModal();
    } catch {
      toast.error(mode === "deposit" ? "Gagal mengalokasikan dana" : "Gagal menarik dana");
    }
  };

  return (
    <Modal open onClose={closeModal} title={mode === "deposit" ? `Isi Saldo - ${goal.name}` : `Tarik Dana - ${goal.name}`}>
      <p className="mb-4 text-body-md text-on-surface-variant">
        Terkumpul: <span className="font-semibold text-on-surface">{formatCurrency(goal.currentAmount)}</span> / {formatCurrency(goal.targetAmount)}
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label={mode === "deposit" ? "Dari Dompet" : "Ke Dompet"} required error={errors.accountId?.message}>
          <Select error={!!errors.accountId} {...register("accountId")}>
            <option value="">Pilih dompet</option>
            {accounts?.map((a) => <option key={a.id} value={a.id}>{a.name} ({formatCurrency(a.balance)})</option>)}
          </Select>
        </Field>
        <Field label="Nominal" required error={errors.amount?.message}>
          <Input type="number" step="0.01" placeholder="0" error={!!errors.amount} {...register("amount", { valueAsNumber: true })} />
        </Field>
        <Field label="Tanggal" required error={errors.date?.message}>
          <Input type="date" error={!!errors.date} {...register("date")} />
        </Field>
        <Field label="Catatan (opsional)"><textarea {...register("note")} rows={2} className="input-base resize-none" /></Field>
        <button type="submit" disabled={isPending} className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />} {mode === "deposit" ? "Isi Saldo" : "Tarik Dana"}
        </button>
      </form>
    </Modal>
  );
}