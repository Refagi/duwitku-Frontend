import api from "./axios";
import type { ApiResponse } from "@/types/api";
import type {
  Savings, SavingsAllocation, CreateSavingsPayload,
  UpdateSavingsPayload, AllocateSavingsPayload,
} from "@/types/saving";

export const savingsApi = {
  list: () => api.get<ApiResponse<{ goals: Savings[] }>>("/savings"),

  detail: (id: string) => api.get<ApiResponse<{ goal: Savings; allocations: SavingsAllocation[] }>>(`/savings/${id}`),

  create: (payload: CreateSavingsPayload) => api.post<ApiResponse<{ goal: Savings }>>("/savings", payload),

  update: (id: string, payload: UpdateSavingsPayload) => api.put<ApiResponse<{ goal: Savings }>>(`/savings/${id}`, payload),

  remove: (id: string) => api.delete<ApiResponse>(`/savings/${id}`),

  deposit: (id: string, payload: AllocateSavingsPayload) => api.post<ApiResponse<{ allocation: SavingsAllocation }>>(`/savings/${id}/deposit`, payload),

  withdraw: (id: string, payload: AllocateSavingsPayload) => api.post<ApiResponse<{ allocation: SavingsAllocation }>>(`/savings/${id}/withdraw`, payload),
};