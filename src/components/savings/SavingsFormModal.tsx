import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { SavingsIconPicker } from "./SavingsIconPicker";
import {
  useCreateSavings,
  useUpdateSavings,
} from "@/hooks/useSavings";
import {
  savingsSchema,
  type SavingsFormValues,
} from "@/schemas/saving.schema";
import type { Savings } from "@/types/saving";
import { useUIStore } from "@/store/uiStore";
import { toast } from "@/store/toastStore";

export function SavingsFormModal({ goal }: { goal?: Savings }) {
  const closeModal = useUIStore((s) => s.closeModal);
  const isEdit = !!goal;
  const { mutateAsync: createGoal, isPending: isCreating } = useCreateSavings();
  const { mutateAsync: updateGoal, isPending: isUpdating } = useUpdateSavings();
  const isPending = isCreating || isUpdating;

  const { register, control, setValue, handleSubmit, formState: { errors },} = useForm<SavingsFormValues>({
    resolver: zodResolver(savingsSchema),
    defaultValues: {
      name: goal?.name ?? "",
      targetAmount: goal ? Number(goal.targetAmount) : 0,
      targetDate: goal?.targetDate?.slice(0, 10) ?? "",
      icon: goal?.icon ?? undefined,
    },
  });
  const icon = useWatch({ control, name: "icon" });

  const onSubmit = async (values: SavingsFormValues) => {
    try {
      if (isEdit) {
        await updateGoal({ id: goal.id, payload: values });
        toast.success("Rencana berhasil diperbarui");
      } else {
        await createGoal(values);
        toast.success("Rencana berhasil dibuat");
      }
      closeModal();
    } catch {
      toast.error(
        isEdit ? "Gagal memperbarui rencana" : "Gagal membuat rencana",
      );
    }
  };

  return (
    <Modal
      open
      onClose={closeModal}
      title={isEdit ? "Edit Rencana Tabungan" : "Buat Rencana Tabungan"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Nama Rencana" required error={errors.name?.message}>
          <Input
            placeholder="Contoh: Liburan Bali, Dana Darurat"
            error={!!errors.name}
            {...register("name")}
          />
        </Field>
        <Field label="Icon">
          <SavingsIconPicker
            value={icon}
            onChange={(name) => setValue("icon", name)}
          />
        </Field>
        <Field
          label="Target Nominal"
          required
          error={errors.targetAmount?.message}
        >
          <Input
            type="number"
            step="0.01"
            placeholder="0"
            error={!!errors.targetAmount}
            {...register("targetAmount", { valueAsNumber: true })}
          />
        </Field>
        <Field label="Target Tanggal (opsional)">
          <Input type="date" {...register("targetDate")} />
        </Field>
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />}{" "}
          {isEdit ? "Simpan Perubahan" : "Buat Rencana"}
        </button>
      </form>
    </Modal>
  );
}
