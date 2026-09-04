export type CategoryType = "INCOME" | "EXPENSE";

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon: string | null;
  isDefault: boolean;
  createdAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  type: CategoryType;
  icon?: string;
}

export interface UpdateCategoryPayload {
  name?: string;
  icon?: string;
}

export interface CategoryFormModalProps {
  category?: Category;
  defaultType?: CategoryType;
}