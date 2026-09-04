import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(1, "Nama dompet wajib diisi"),
  type: z.enum(["CASH", "BANK", "EWALLET"]),
  balance: z.number({
      error: (issue) =>
        issue.input === undefined
          ? "Saldo wajib diisi"
          : "Saldo harus berupa angka",
    })
    .min(0, "Saldo tidak boleh negatif"),
});

export type AccountFormValues = z.infer<typeof accountSchema>;