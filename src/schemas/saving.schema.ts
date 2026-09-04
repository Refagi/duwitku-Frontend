import { z } from "zod";
export const savingsSchema = z.object({
  name: z.string().min(1, "Nama rencana wajib diisi"),
  targetAmount: z.number({
      error: (issue) =>
        issue.input === undefined
          ? "Nominal wajib diisi"
          : "Nominal harus berupa angka",
    })
    .min(1, "Nominal tidak boleh negatif").positive("Target nominal harus lebih dari 0"),
  targetDate: z.string().optional(),
  icon: z.string().optional(),
});
export type SavingsFormValues = z.infer<typeof savingsSchema>;

export const allocateSavingsSchema = z.object({
  accountId: z.string().min(1, "Dompet wajib dipilih"),
  amount: z.number({
      error: (issue) =>
        issue.input === undefined
          ? "Jumlah wajib diisi"
          : "Jumlah harus berupa angka",
    })
    .min(1, "Jumlah tidak boleh negatif").positive("Nominal harus lebih dari 0"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  note: z.string().optional(),
});
export type AllocateSavingsFormValues = z.infer<typeof allocateSavingsSchema>;