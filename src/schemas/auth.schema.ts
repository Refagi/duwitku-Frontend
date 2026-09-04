import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.email("Format email tidak valid"),
    age: z.number().optional().refine((age) => age === undefined || (age >= 15),{ message: 'Age must be between 15'}),
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi kata sandi wajib diisi"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const loginSchema = z
  .object({
    email: z.email("Format email tidak valid"),
    password: z.string().min(6, "Kata sandi minimal 6 karakter"),
  })

export type LoginFormValues = z.infer<typeof loginSchema>;