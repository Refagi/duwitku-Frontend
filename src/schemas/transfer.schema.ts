import { z } from "zod";

export const transferSchema = z
  .object({
    fromAccountId: z.string().min(1, "Dompet asal wajib dipilih"),
    toAccountId: z.string().min(1, "Dompet tujuan wajib dipilih"),
    amount: z.number({
      error: (issue) =>
        issue.input === undefined
          ? "Jumlah wajib diisi"
          : "Jumlah harus berupa angka",
    })
    .min(0, "Jumlah tidak boleh negatif"),
    date: z.string().min(1, "Tanggal wajib diisi"),
    note: z.string().optional(),
  })
  .refine((d) => d.fromAccountId !== d.toAccountId, {
    message: "Dompet asal dan tujuan tidak boleh sama",
    path: ["toAccountId"],
  });

export type TransferFormValues = z.infer<typeof transferSchema>;