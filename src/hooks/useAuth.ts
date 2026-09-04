import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/services/api/auth.api";
import type { LoginPayload, RegisterPayload } from "@/types/auth";
import type { ApiErrorResponse } from '@/types/api';
import { authKeys } from "@/lib/queryKeys";
import type { AxiosError } from "axios";

export function useMeQuery() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: async () => (await authApi.getMe()).data?.data ?? null,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useAuth() {
  const { data: user, isLoading } = useMeQuery();
  return { user, isAuthenticated: !!user, isLoading };
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation<
    Awaited<ReturnType<typeof authApi.register>>,
    AxiosError<ApiErrorResponse>,                 
    RegisterPayload
  >({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (res) => {
      const user = res.data?.data?.user ?? null;
      qc.setQueryData(authKeys.me, user);
    },
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (res) => {
      const user = res.data?.data?.user ?? null;
      qc.setQueryData(authKeys.me, user);
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      qc.setQueryData(authKeys.me, null);
      qc.clear();
    },
  });
}

