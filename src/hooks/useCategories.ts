import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { categoriesApi } from "@/services/api/categories.api";
import type { CreateCategoryPayload, UpdateCategoryPayload, CategoryType } from "@/types/category";
import type { ApiErrorResponse } from "@/types/api";

export const categoryKeys = {
  all: ["categories"] as const,
  byType: (type?: CategoryType) => ["categories", type ?? "ALL"] as const,
};

export function useCategories(type?: CategoryType) {
  return useQuery({
    queryKey: categoryKeys.byType(type),
    queryFn: async () => (await categoriesApi.list(type)).data.data?.categories,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof categoriesApi.create>>, AxiosError<ApiErrorResponse>, CreateCategoryPayload>({
    mutationFn: (payload) => categoriesApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation<
    Awaited<ReturnType<typeof categoriesApi.update>>,
    AxiosError<ApiErrorResponse>,
    { id: string; payload: UpdateCategoryPayload }
  >({
    mutationFn: ({ id, payload }) => categoriesApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation<Awaited<ReturnType<typeof categoriesApi.remove>>, AxiosError<ApiErrorResponse>, string>({
    mutationFn: (id) => categoriesApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: categoryKeys.all }),
  });
}