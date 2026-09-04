import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { CategoryIconPicker } from "./CategoryIconPicker";
import { useCreateCategory, useUpdateCategory } from "@/hooks/useCategories";
import {
  createCategorySchema,
  updateCategorySchema,
  type CreateCategoryFormValues,
  type UpdateCategoryFormValues,
} from "@/schemas/category.schema";
import type { Category, CategoryType, CategoryFormModalProps } from "@/types/category";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

export function CategoryFormModal({
  category,
  defaultType,
}: CategoryFormModalProps) {
  const closeModal = useUIStore((s) => s.closeModal);
  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateCategory();

  if (category) {
    return (
      <EditForm
        category={category}
        isPending={isUpdating}
        onClose={closeModal}
        onSubmit={async (values) => {
          await updateCategory({ id: category.id, payload: values });
          closeModal();
        }}
      />
    );
  }

  return (
    <CreateForm
      defaultType={defaultType}
      isPending={isCreating}
      onClose={closeModal}
      onSubmit={async (values) => {
        await createCategory(values);
        closeModal();
      }}
    />
  );
}

function CreateForm({
  defaultType,
  isPending,
  onSubmit,
  onClose,
}: {
  defaultType?: CategoryType;
  isPending: boolean;
  onSubmit: (values: CreateCategoryFormValues) => Promise<void>;
  onClose: () => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      type: defaultType ?? "EXPENSE",
      icon: undefined,
    },
  });
  const type = useWatch({ control, name: "type" });
  const icon = useWatch({ control, name: "icon" });

  return (
    <Modal open onClose={onClose} title="Tambah Kategori">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Nama Kategori" required error={errors.name?.message}>
          <Input
            placeholder="Contoh: Zakat, Kado"
            error={!!errors.name}
            {...register("name")}
          />
        </Field>

        <Field label="Jenis" required error={errors.type?.message}>
          <div className="grid grid-cols-2 gap-2">
            {(["EXPENSE", "INCOME"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setValue("type", value, { shouldValidate: true })
                }
                className={cn(
                  "rounded-xl border py-2.5 text-sm font-medium transition-colors",
                  type === value
                    ? "border-primary bg-primary-container/10 text-primary"
                    : "border-outline-variant text-on-surface-variant hover:bg-surface-container-low",
                )}
              >
                {value === "EXPENSE" ? "Pengeluaran" : "Pemasukan"}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Icon" error={errors.icon?.message}>
          <CategoryIconPicker
            value={icon}
            onChange={(name) =>
              setValue("icon", name, { shouldValidate: true })
            }
          />
        </Field>

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />} Tambah
          Kategori
        </button>
      </form>
    </Modal>
  );
}

function EditForm({
  category,
  isPending,
  onSubmit,
  onClose,
}: {
  category: Category;
  isPending: boolean;
  onSubmit: (values: UpdateCategoryFormValues) => Promise<void>;
  onClose: () => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateCategoryFormValues>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: { name: category.name, icon: category.icon ?? undefined },
  });
  const icon = useWatch({ control, name: "icon" });

  return (
    <Modal open onClose={onClose} title="Edit Kategori">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Nama Kategori" required error={errors.name?.message}>
          <Input error={!!errors.name} {...register("name")} />
        </Field>
        <Field label="Icon" error={errors.icon?.message}>
          <CategoryIconPicker
            value={icon}
            onChange={(name) =>
              setValue("icon", name, { shouldValidate: true })
            }
          />
        </Field>
        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex w-full items-center justify-center gap-2 py-2.5 text-sm"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin" />} Simpan
          Perubahan
        </button>
      </form>
    </Modal>
  );
}
