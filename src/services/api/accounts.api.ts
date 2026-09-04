import api from "./axios";
import type { ApiResponse } from "@/types/api";
import type { Account, CreateAccountPayload, UpdateAccountPayload } from "@/types/account";

export const accountsApi = {
  list: () => api.get<ApiResponse<{ accounts: Account[] }>>("/accounts"),

  create: (payload: CreateAccountPayload) =>
    api.post<ApiResponse<{ account: Account }>>("/accounts", payload),

  update: (id: string, payload: UpdateAccountPayload) =>
    api.put<ApiResponse<{ account: Account }>>(`/accounts/${id}`, payload),

  remove: (id: string) => api.delete<ApiResponse>(`/accounts/${id}`),
};