import api from "./axios";
import type { ApiResponse } from "@/types/api";
import type { Transfer, CreateTransferPayload, UpdateTransferPayload, TransferListQuery, TransferListResult } from "@/types/transfer";

export const transfersApi = {
  list: (query?: TransferListQuery) => api.get<ApiResponse<TransferListResult>>("/transfers", { params: query }),
  create: (payload: CreateTransferPayload) => api.post<ApiResponse<{ transfer: Transfer }>>("/transfers", payload),
  update: (id: string, payload: UpdateTransferPayload) => api.put<ApiResponse<{ transfer: Transfer }>>(`/transfers/${id}`, payload),
  remove: (id: string) => api.delete<ApiResponse>(`/transfers/${id}`),
};