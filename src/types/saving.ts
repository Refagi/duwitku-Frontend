export type AllocationType = "DEPOSIT" | "WITHDRAW";

export interface Savings {
  id: string;
  name: string;
  icon: string | null;
  targetAmount: string;
  currentAmount: string;
  targetDate: string | null;
  createdAt: string;
}

export interface SavingsAllocation {
  id: string;
  type: AllocationType;
  amount: string;
  date: string;
  note: string | null;
  account: { id: string; name: string; type: string };
  createdAt: string;
}

export interface CreateSavingsPayload {
  name: string;
  targetAmount: number;
  targetDate?: string;
  icon?: string;
}

export type UpdateSavingsPayload = Partial<CreateSavingsPayload>;

export interface AllocateSavingsPayload {
  accountId: string;
  amount: number;
  date: string;
  note?: string;
}