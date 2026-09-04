export type TransactionType = "INCOME" | "EXPENSE";

export interface TransactionAccountRef { id: string; name: string; type: string }
export interface TransactionCategoryRef { id: string; name: string; type: TransactionType; icon: string | null }

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: string;
  date: string;
  note: string | null;
  attachmentUrl: string | null;
  account: TransactionAccountRef;
  category: TransactionCategoryRef;
  createdAt: string;
  isEdited: boolean;
}

export interface CreateTransactionPayload {
  accountId: string;
  categoryId: string;
  type: TransactionType;
  amount: number;
  date: string;
  note?: string;
  attachmentUrl?: string;
}

export type UpdateTransactionPayload = Partial<CreateTransactionPayload>;

export interface TransactionListQuery {
  accountId?: string;
  categoryId?: string;
  type?: TransactionType;
  from?: string;
  to?: string;
  minAmount?: number;
  maxAmount?: number;
  q?: string;
  page?: number;
  limit?: number;
}

export interface TransactionListResult {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}