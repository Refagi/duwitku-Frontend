import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Wallet, Building2, Smartphone } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useCreateAccount, useUpdateAccount } from "@/hooks/useAccounts";
import { accountSchema, type AccountFormValues } from "@/schemas/account.schema";
import type { Account, AccountType } from "@/types/account";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

const TYPE_OPTIONS: { value: AccountType; label: string; icon: typeof Wallet }[] = [
  { value: "CASH", label: "Tunai", icon: Wallet },
  { value: "BANK", label: "Bank", icon: Building2 },
  { value: "EWALLET", label: "E-Wallet", icon: Smartphone },
];

interface AccountFormModalProps {
  account?: Account;
}

export function AccountFormModal({ account }: AccountFormModalProps) {
  const closeModal = useUIStore((s) => s.closeModal);
  const isEdit = !!account;

  const { mutateAsync: createAccount, isPending: isCreating } = useCreateAccount();
  const { mutateAsync: updateAccount, isPending: isUpdating } = useUpdateAccount();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: account?.name ?? "",
      type: account?.type ?? "CASH",
      balance: account ? Number(account.balance) : 0,
    },
  });

  const selectedType = useWatch({
    control,
    name: "type",
  });

  const onSubmit = async (values: AccountFormValues) => {
    if (isEdit) {
      await updateAccount({ id: account.id, payload: values });
    } else {
      await createAccount(values);
    }
    closeModal();
  };

  return (
    <Modal open onClose={closeModal} title={isEdit ? "Edit Dompet" : "Tambah Dompet"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Nama Dompet" required error={errors.name?.message}>
          <Input placeholder="Contoh: BCA, Cash, GoPay" error={!!errors.name} {...register("name")} />
        </Field>

        <Field label="Jenis Dompet" required error={errors.type?.message}>
          <div className="grid grid-cols-3 gap-2">
            {TYPE_OPTIONS.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue("type", value, { shouldValidate: true })}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs transition-colors",
                  selectedType === value
                    ? "border-primary bg-primary-container/10 text-primary"
                    : "border-outline-variant text-on-surface-variant hover:bg-surface-container-low",
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </button>
            ))}
          </div>
        </Field>

        <Field label={isEdit ? "Saldo Saat Ini" : "Saldo Awal"} required error={errors.balance?.message}>
          <Input type="number" step="0.01" placeholder="0" error={!!errors.balance} {...register("balance", { valueAsNumber: true })} />
        </Field>

        <button type="submit" disabled={isPending} className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm">
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? "Simpan Perubahan" : "Tambah Dompet"}
        </button>
      </form>
    </Modal>
  );
}