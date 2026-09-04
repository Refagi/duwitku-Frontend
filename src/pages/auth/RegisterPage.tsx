import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Mail, User } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useRegister } from "@/hooks/useAuth";
import { registerSchema, type RegisterFormValues } from "@/schemas/auth.schema";
import { m } from "motion/react";
import axios from "axios";


export function RegisterPage() {
  const navigate = useNavigate();
  const { mutateAsync: registerUser, isPending, error: apiError } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser(values);
      navigate("/login");
    } catch {
      // apiError 
    }
  };

  const globalError = axios.isAxiosError(apiError)
  ? (apiError.response?.data?.message ?? "Registrasi gagal. Silakan coba lagi.")
  : apiError
  ? "Registrasi gagal. Silakan coba lagi."
  : null;
  
  return (
    <m.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="mb-6 text-center">
        <p className="page-subtitle">Bergabung dengan Duwitku sekarang</p>
      </div>

      {globalError && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Nama Lengkap" required error={errors.name?.message}>
          <Input icon={User} error={!!errors.name} placeholder="Nama lengkap Anda" autoComplete="name" {...register("name")} />
        </Field>

        <Field label="Email" required error={errors.email?.message}>
          <Input icon={Mail} error={!!errors.email} type="email" placeholder="nama@email.com" autoComplete="email" {...register("email")} />
        </Field>

        <Field label="Kata Sandi" required error={errors.password?.message}>
          <PasswordInput error={!!errors.password} placeholder="Min. 6 karakter" autoComplete="new-password" {...register("password")} />
        </Field>

        <Field label="Konfirmasi Kata Sandi" required error={errors.confirmPassword?.message}>
          <PasswordInput error={!!errors.confirmPassword} placeholder="Ulangi kata sandi" autoComplete="new-password" {...register("confirmPassword")} />
        </Field>

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex w-full items-center justify-center gap-2 py-3 text-sm"
        >
          {isPending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Mendaftar...</>) : "Daftar Sekarang"}
        </button>
      </form>

      <p className="mt-5 text-center text-body-md text-on-surface-variant">
        Sudah punya akun?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">Masuk di sini</Link>
      </p>
    </m.div>
  );
}