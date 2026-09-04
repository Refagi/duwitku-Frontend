import api from "./axios";
import type { ApiResponse } from "@/types/api";
import type { Category, CreateCategoryPayload, UpdateCategoryPayload, CategoryType } from "@/types/category";

export const categoriesApi = {
  list: (type?: CategoryType) =>
    api.get<ApiResponse<{ categories: Category[] }>>("/categories", { params: { type } }),

  create: (payload: CreateCategoryPayload) =>
    api.post<ApiResponse<{ category: Category }>>("/categories", payload),

  update: (id: string, payload: UpdateCategoryPayload) =>
    api.put<ApiResponse<{ category: Category }>>(`/categories/${id}`, payload),

  remove: (id: string) => api.delete<ApiResponse>(`/categories/${id}`),
};