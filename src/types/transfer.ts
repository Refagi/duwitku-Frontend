export interface TransferAccountRef { id: string; name: string; type: string }

export interface Transfer {
  id: string;
  amount: string;
  date: string;
  note: string | null;
  isEdited: boolean;
  fromAccount: TransferAccountRef;
  toAccount: TransferAccountRef;
  createdAt: string;
}

export interface CreateTransferPayload {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  date: string;
  note?: string;
}

export type UpdateTransferPayload = Partial<CreateTransferPayload>;

export interface TransferListQuery {
  accountId?: string;
  from?: string;
  to?: string;
  minAmount?: number;
  maxAmount?: number;
  q?: string;
  page?: number;
  limit?: number;
}

export interface TransferListResult {
  data: Transfer[];
  total: number;
  page: number;
  limit: number;
}