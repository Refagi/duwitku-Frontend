import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { accountsApi } from "@/services/api/accounts.api";
import type {
  CreateAccountPayload,
  UpdateAccountPayload,
} from "@/types/account";
import type { ApiErrorResponse } from "@/types/api";

export const accountKeys = { all: ["accounts"] as const };

export function useAccounts() {
  return useQuery({
    queryKey: accountKeys.all,
    queryFn: async () => (await accountsApi.list()).data.data?.accounts,
  });
}

export function useCreateAccount() {
  const qc = useQueryClient();
  return useMutation<
    Awaited<ReturnType<typeof accountsApi.create>>,
    AxiosError<ApiErrorResponse>,
    CreateAccountPayload
  >({
    mutationFn: (payload) => accountsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: accountKeys.all }),
  });
}

export function useUpdateAccount() {
  const qc = useQueryClient();
  return useMutation<
    Awaited<ReturnType<typeof accountsApi.update>>,
    AxiosError<ApiErrorResponse>,
    { id: string; payload: UpdateAccountPayload }
  >({
    mutationFn: ({ id, payload }) => accountsApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: accountKeys.all }),
  });
}

export function useDeleteAccount() {
  const qc = useQueryClient();
  return useMutation<
    Awaited<ReturnType<typeof accountsApi.remove>>,
    AxiosError<ApiErrorResponse>,
    string
  >({
    mutationFn: (id) => accountsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: accountKeys.all }),
  });
}
