import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { transfersApi } from "@/services/api/transfers.api";
import type { CreateTransferPayload, UpdateTransferPayload, TransferListQuery } from "@/types/transfer";
import type { ApiErrorResponse } from "@/types/api";

export const transferKeys = {
  all: ["transfers"] as const,
  list: (query?: TransferListQuery) => ["transfers", "list", query ?? {}] as const,
};

export function useTransfers(query?: TransferListQuery, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: transferKeys.list(query),
    queryFn: async () => (await transfersApi.list(query)).data.data,
    enabled: options?.enabled ?? true,
  });
}

function invalidateRelated(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: transferKeys.all });
  qc.invalidateQueries({ queryKey: ["accounts"] }); // transfer ubah saldo 2 dompet
  qc.invalidateQueries({ queryKey: ["dashboard"] });
}

export function useCreateTransfer() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof transfersApi.create>>, AxiosError<ApiErrorResponse>, CreateTransferPayload>({
    mutationFn: (payload) => transfersApi.create(payload),
    onSuccess: () => invalidateRelated(qc),
  });
}

export function useUpdateTransfer() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof transfersApi.update>>, AxiosError<ApiErrorResponse>, { id: string; payload: UpdateTransferPayload }>({
    mutationFn: ({ id, payload }) => transfersApi.update(id, payload),
    onSuccess: () => invalidateRelated(qc),
  });
}

export function useDeleteTransfer() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof transfersApi.remove>>, AxiosError<ApiErrorResponse>, string>({
    mutationFn: (id) => transfersApi.remove(id),
    onSuccess: () => invalidateRelated(qc),
  });
}