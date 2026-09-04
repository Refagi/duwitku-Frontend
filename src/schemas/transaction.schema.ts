import { z } from "zod";

export const transactionSchema = z.object({
  type: z.enum(["EXPENSE", "INCOME"]),
  accountId: z.string().min(1, "Dompet wajib dipilih"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  amount: z.number({
      error: (issue) =>
        issue.input === undefined
          ? "Jumlah wajib diisi"
          : "Jumlah harus berupa angka",
    })
    .min(0, "Jumlah tidak boleh negatif"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  note: z.string().optional(),
  attachmentUrl: z.url().optional(),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;