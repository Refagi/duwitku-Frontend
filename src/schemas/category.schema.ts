import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
  type: z.enum(["INCOME", "EXPENSE"]),
  icon: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
  icon: z.string().optional(),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormValues = z.infer<typeof updateCategorySchema>;