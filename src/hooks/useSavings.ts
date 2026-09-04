import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { savingsApi } from "@/services/api/savings.api";
import type { CreateSavingsPayload, UpdateSavingsPayload, AllocateSavingsPayload } from "@/types/saving";
import type { ApiErrorResponse } from "@/types/api";

export const savingsKeys = {
  all: ["savings"] as const,
  detail: (id: string) => ["savings", id] as const,
};

export function useSavings() {
  return useQuery({ queryKey: savingsKeys.all, queryFn: async () => (await savingsApi.list()).data.data?.goals });
}

export function useSavingsDetail(id: string) {
  return useQuery({
    queryKey: savingsKeys.detail(id),
    queryFn: async () => (await savingsApi.detail(id)).data.data,
    enabled: !!id,
  });
}

function invalidateRelated(qc: ReturnType<typeof useQueryClient>, id?: string) {
  qc.invalidateQueries({ queryKey: savingsKeys.all });
  if (id) qc.invalidateQueries({ queryKey: savingsKeys.detail(id) });
  qc.invalidateQueries({ queryKey: ["accounts"] });
  qc.invalidateQueries({ queryKey: ["dashboard"] });
}

export function useCreateSavings() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof savingsApi.create>>, AxiosError<ApiErrorResponse>, CreateSavingsPayload>({
    mutationFn: (payload) => savingsApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: savingsKeys.all }),
  });
}

export function useUpdateSavings() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof savingsApi.update>>, AxiosError<ApiErrorResponse>, { id: string; payload: UpdateSavingsPayload }>({
    mutationFn: ({ id, payload }) => savingsApi.update(id, payload),
    onSuccess: (_, { id }) => invalidateRelated(qc, id),
  });
}

export function useDeleteSavings() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof savingsApi.remove>>, AxiosError<ApiErrorResponse>, string>({
    mutationFn: (id) => savingsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: savingsKeys.all }),
  });
}

export function useDepositSavings() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof savingsApi.deposit>>, AxiosError<ApiErrorResponse>, { id: string; payload: AllocateSavingsPayload }>({
    mutationFn: ({ id, payload }) => savingsApi.deposit(id, payload),
    onSuccess: (_, { id }) => invalidateRelated(qc, id),
  });
}

export function useWithdrawSavings() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof savingsApi.withdraw>>, AxiosError<ApiErrorResponse>, { id: string; payload: AllocateSavingsPayload }>({
    mutationFn: ({ id, payload }) => savingsApi.withdraw(id, payload),
    onSuccess: (_, { id }) => invalidateRelated(qc, id),
  });
}