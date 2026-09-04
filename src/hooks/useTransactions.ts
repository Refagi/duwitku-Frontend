import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { transactionsApi } from "@/services/api/transactions.api";
import type { CreateTransactionPayload, UpdateTransactionPayload, TransactionListQuery } from "@/types/transaction";
import type { ApiErrorResponse } from "@/types/api";

export const transactionKeys = {
  all: ["transactions"] as const,
  list: (query?: TransactionListQuery) => ["transactions", "list", query ?? {}] as const,
};

export function useTransactions(query?: TransactionListQuery) {
  return useQuery({
    queryKey: transactionKeys.list(query),
    queryFn: async () => (await transactionsApi.list(query)).data.data,
  });
}

function invalidateRelated(qc: ReturnType<typeof useQueryClient>) {
  qc.invalidateQueries({ queryKey: transactionKeys.all });
  qc.invalidateQueries({ queryKey: ["accounts"] });
  qc.invalidateQueries({ queryKey: ["dashboard"] });
}

export function useCreateTransaction() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof transactionsApi.create>>, AxiosError<ApiErrorResponse>, CreateTransactionPayload>({
    mutationFn: (payload) => transactionsApi.create(payload),
    onSuccess: () => invalidateRelated(qc),
  });
}

export function useUpdateTransaction() {
  const qc = useQueryClient();
  return useMutation<
    Awaited<ReturnType<typeof transactionsApi.update>>,
    AxiosError<ApiErrorResponse>,
    { id: string; payload: UpdateTransactionPayload }
  >({
    mutationFn: ({ id, payload }) => transactionsApi.update(id, payload),
    onSuccess: () => invalidateRelated(qc),
  });
}

export function useDeleteTransaction() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof transactionsApi.remove>>, AxiosError<ApiErrorResponse>, string>({
    mutationFn: (id) => transactionsApi.remove(id),
    onSuccess: () => invalidateRelated(qc),
  });
}