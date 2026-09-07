import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Mail } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useLogin } from "@/hooks/useAuth";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { m } from "motion/react";
import axios from "axios";

const GOOGLE_AUTH_URL = `${import.meta.env.VITE_APP_URL ?? "https://duwitku-backend.vercel.app/v1"}/auth/google`;

export function LoginPage() {
  const navigate = useNavigate();
  const { mutateAsync: loginUser, isPending, error: apiError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: ""},
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await loginUser(values);
      navigate("/dashboard");
    } catch {
      // apiError 
    }
  };

  const globalError = axios.isAxiosError(apiError)
  ? (apiError.response?.data?.message ?? "Email atau Password salah. Silakan coba lagi.")
  : apiError
  ? "Email atau Password salah. Silakan coba lagi."
  : null;
  
  return (
    <m.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="mb-6 text-center">
        <p className="page-subtitle">Masuk ke akun Duwitku kamu</p>
      </div>

      {globalError && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {globalError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Field label="Email" required error={errors.email?.message}>
          <Input icon={Mail} error={!!errors.email} type="email" placeholder="nama@email.com" autoComplete="email" {...register("email")} />
        </Field>

        <Field label="Kata Sandi" required error={errors.password?.message}>
          <PasswordInput error={!!errors.password} placeholder="Min. 6 karakter" autoComplete="current-password" {...register("password")} />
        </Field>

        <button
          type="submit"
          disabled={isPending}
          className="btn-primary flex w-full items-center justify-center gap-2 py-3 text-sm"
        >
          {isPending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Masuk...</>) : "Login"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-outline-variant" />
        <span className="text-label-sm text-on-surface-variant">atau</span>
        <div className="h-px flex-1 bg-outline-variant" />
      </div>

      <a href={GOOGLE_AUTH_URL} className="btn-outline flex w-full items-center justify-center gap-2 py-2.5 text-sm">
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Masuk dengan Google
      </a>

      <p className="mt-5 text-center text-body-md text-on-surface-variant">
        Belum punya akun?{" "}
        <Link to="/register" className="font-semibold text-primary hover:underline">Daftar di sini</Link>
      </p>
    </m.div>
  );
}