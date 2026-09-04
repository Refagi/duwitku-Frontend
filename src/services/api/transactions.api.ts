import api from "./axios";
import type { ApiResponse } from "@/types/api";
import type {
  Transaction, CreateTransactionPayload, UpdateTransactionPayload,
  TransactionListQuery, TransactionListResult,
} from "@/types/transaction";

export const transactionsApi = {
  list: (query?: TransactionListQuery) =>
    api.get<ApiResponse<TransactionListResult>>("/transactions", { params: query }),

  create: (payload: CreateTransactionPayload) =>
    api.post<ApiResponse<{ transaction: Transaction }>>("/transactions", payload),

  update: (id: string, payload: UpdateTransactionPayload) =>
    api.put<ApiResponse<{ transaction: Transaction }>>(`/transactions/${id}`, payload),

  remove: (id: string) => api.delete<ApiResponse>(`/transactions/${id}`),
};